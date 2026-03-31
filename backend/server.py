from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path
import os
import logging

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
import secrets

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

JWT_ALGORITHM = "HS256"

def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(minutes=15), "type": "access"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "refresh"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"email": payload["email"]}, {"_id": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

class LoginRequest(BaseModel):
    email: str
    password: str

class BookingCreate(BaseModel):
    service_category: str
    service_name: str
    stylist: str
    date: str
    time: str
    customer_name: str
    customer_phone: str
    notes: Optional[str] = ""

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    service_category: str
    service_name: str
    stylist: str
    date: str
    time: str
    customer_name: str
    customer_phone: str
    notes: str = ""
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BookingStatusUpdate(BaseModel):
    status: str

class StylistCreate(BaseModel):
    name: str
    photo_url: str
    specialty: str
    is_available: bool = True

class Stylist(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    photo_url: str
    specialty: str
    is_available: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StylistUpdate(BaseModel):
    name: Optional[str] = None
    photo_url: Optional[str] = None
    specialty: Optional[str] = None
    is_available: Optional[bool] = None

@api_router.post("/auth/login")
async def login(credentials: LoginRequest, response: Response):
    email = credentials.email.lower().strip()
    user = await db.users.find_one({"email": email}, {"_id": 0})
    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    user_id = user.get("id", str(uuid.uuid4()))
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax", max_age=900, path="/")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="lax", max_age=604800, path="/")
    
    user.pop("password_hash", None)
    return user

@api_router.get("/auth/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    return user

@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Logged out successfully"}

@api_router.post("/bookings", response_model=Booking)
async def create_booking(booking_input: BookingCreate):
    booking_dict = booking_input.model_dump()
    booking_obj = Booking(**booking_dict)
    doc = booking_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.bookings.insert_one(doc)
    return booking_obj

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings(request: Request, date: Optional[str] = None, limit: int = 100, skip: int = 0):
    await get_current_user(request)
    
    query = {}
    if date:
        query["date"] = date
    
    bookings = await db.bookings.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(min(limit, 100)).to_list(limit)
    for booking in bookings:
        if isinstance(booking['created_at'], str):
            booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    return bookings

@api_router.patch("/bookings/{booking_id}")
async def update_booking_status(booking_id: str, status_update: BookingStatusUpdate, request: Request):
    await get_current_user(request)
    result = await db.bookings.update_one({"id": booking_id}, {"$set": {"status": status_update.status}})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Status updated successfully"}

@api_router.post("/stylists", response_model=Stylist)
async def create_stylist(stylist_input: StylistCreate, request: Request):
    await get_current_user(request)
    stylist_dict = stylist_input.model_dump()
    stylist_obj = Stylist(**stylist_dict)
    doc = stylist_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.stylists.insert_one(doc)
    return stylist_obj

@api_router.get("/stylists", response_model=List[Stylist])
async def get_stylists():
    stylists = await db.stylists.find({}, {"_id": 0}).limit(50).to_list(50)
    for stylist in stylists:
        if isinstance(stylist['created_at'], str):
            stylist['created_at'] = datetime.fromisoformat(stylist['created_at'])
    return stylists

@api_router.patch("/stylists/{stylist_id}")
async def update_stylist(stylist_id: str, stylist_update: StylistUpdate, request: Request):
    await get_current_user(request)
    update_data = {k: v for k, v in stylist_update.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = await db.stylists.update_one({"id": stylist_id}, {"$set": update_data})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Stylist not found")
    return {"message": "Stylist updated successfully"}

@api_router.delete("/stylists/{stylist_id}")
async def delete_stylist(stylist_id: str, request: Request):
    await get_current_user(request)
    result = await db.stylists.delete_one({"id": stylist_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Stylist not found")
    return {"message": "Stylist deleted successfully"}

async def seed_admin():
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@artistrysalon.com")
    admin_password = os.environ.get("ADMIN_PASSWORD", "Admin@123")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        hashed = hash_password(admin_password)
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hashed,
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        })
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
    
    Path("/app/memory").mkdir(exist_ok=True)
    with open("/app/memory/test_credentials.md", "w") as f:
        f.write(f"# Test Credentials\n\n")
        f.write(f"## Admin Account\n")
        f.write(f"- Email: {admin_email}\n")
        f.write(f"- Password: {admin_password}\n")
        f.write(f"- Role: admin\n\n")
        f.write(f"## Auth Endpoints\n")
        f.write(f"- POST /api/auth/login\n")
        f.write(f"- GET /api/auth/me\n")
        f.write(f"- POST /api/auth/logout\n\n")
        f.write(f"## Staff Management\n")
        f.write(f"- GET /api/stylists (public)\n")
        f.write(f"- POST /api/stylists (admin only)\n")
        f.write(f"- PATCH /api/stylists/:id (admin only)\n")
        f.write(f"- DELETE /api/stylists/:id (admin only)\n")

async def seed_stylists():
    existing_count = await db.stylists.count_documents({})
    if existing_count == 0:
        initial_stylists = [
            {
                "id": str(uuid.uuid4()),
                "name": "Priya Sharma",
                "photo_url": "https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg",
                "specialty": "Hair Specialist",
                "is_available": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Anjali Patel",
                "photo_url": "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
                "specialty": "Bridal Makeup Expert",
                "is_available": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Ravi Kumar",
                "photo_url": "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
                "specialty": "Men's Grooming",
                "is_available": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.stylists.insert_many(initial_stylists)

@app.on_event("startup")
async def startup_event():
    await seed_admin()
    await seed_stylists()
    await db.users.create_index("email", unique=True)
    await db.bookings.create_index("id")
    await db.stylists.create_index("id")

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
