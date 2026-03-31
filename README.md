# Artistry Family Salon - Full Stack Booking Website

A premium salon booking platform built with React, FastAPI, and MongoDB. Features include online booking, staff management, admin dashboard, and SEO optimization.

## 🎨 Features

- **Customer Features:**
  - Online appointment booking with multi-step form
  - Service catalog with pricing
  - Staff selection
  - Photo gallery
  - Contact form with Google Maps integration
  - Mobile-responsive design with bottom action bar
  - WhatsApp integration

- **Admin Features:**
  - Secure login with JWT authentication
  - Booking management (view, filter, update status)
  - Staff/stylist management (add, edit, delete, toggle availability)
  - Date-based filtering

- **Technical Features:**
  - SEO optimized with structured data
  - Smooth animations and transitions
  - Lazy loading images
  - Mobile-first responsive design
  - Accessibility support (prefers-reduced-motion)

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router v6
- Tailwind CSS
- Shadcn/UI components
- Axios for API calls
- React Helmet for SEO

**Backend:**
- FastAPI (Python)
- Motor (async MongoDB driver)
- JWT authentication with bcrypt
- Pydantic for data validation

**Database:**
- MongoDB

## 📁 Project Structure

```
artistry-salon/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Shadcn components
│   │   │   ├── home/            # Home page sections
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── MobileBottomBar.js
│   │   │   ├── SEO.js
│   │   │   ├── AnimatedSection.js
│   │   │   ├── PageTransition.js
│   │   │   └── StaffManagement.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── hooks/
│   │   │   └── useAnimations.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Services.js
│   │   │   ├── Booking.js
│   │   │   ├── Gallery.js
│   │   │   ├── About.js
│   │   │   ├── Contact.js
│   │   │   ├── AdminLogin.js
│   │   │   └── AdminDashboard.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   └── .env
└── README.md
```

## 🚀 Local Development Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.9+
- MongoDB (local or MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd artistry-salon
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (see Backend Environment Variables below)
cp .env.example .env
# Edit .env with your values

# Run the backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

Backend will run on `http://localhost:8001`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
# or
yarn install

# Create .env file (see Frontend Environment Variables below)
cp .env.example .env
# Edit .env with your values

# Run the frontend
npm start
# or
yarn start
```

Frontend will run on `http://localhost:3000`

### 4. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod --dbpath /path/to/data/directory
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Use in backend `.env` as `MONGO_URL`

## 🔐 Environment Variables

### Backend `.env`

Create `/backend/.env`:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=artistry_salon
CORS_ORIGINS=http://localhost:3000
JWT_SECRET=your-secure-random-secret-key-here-minimum-32-characters
ADMIN_EMAIL=admin@artistrysalon.com
ADMIN_PASSWORD=YourSecurePassword123!
FRONTEND_URL=http://localhost:3000
```

**Important:**
- Generate a strong `JWT_SECRET` (use: `openssl rand -hex 32`)
- Change `ADMIN_PASSWORD` to a secure password
- For production, update `CORS_ORIGINS` and `FRONTEND_URL`

### Frontend `.env`

Create `/frontend/.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

**For production:** Use your deployed backend URL

## 📱 Admin Access

After starting the backend, an admin user is automatically created:

- **Login URL:** `/admin/login`
- **Email:** Value from `ADMIN_EMAIL` in backend .env
- **Password:** Value from `ADMIN_PASSWORD` in backend .env

## 🌐 Deployment

### Deploy Frontend to Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
cd frontend
vercel
```

3. **Configure Environment Variables in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `REACT_APP_BACKEND_URL` = `<your-backend-url>`

4. **Set Build Settings:**
   - Build Command: `npm run build` or `yarn build`
   - Output Directory: `build`
   - Install Command: `npm install` or `yarn install`

### Deploy Backend to Railway

1. **Create Railway Account:** https://railway.app

2. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

3. **Login and Initialize:**
```bash
railway login
cd backend
railway init
```

4. **Add MongoDB:**
   - In Railway Dashboard → Add Plugin → MongoDB
   - Copy the connection string

5. **Configure Environment Variables:**
   - Go to Railway Dashboard → Your Project → Variables
   - Add all variables from backend `.env`:
     ```
     MONGO_URL=<railway-mongodb-connection-string>
     DB_NAME=artistry_salon
     CORS_ORIGINS=<your-vercel-frontend-url>
     JWT_SECRET=<your-secure-secret>
     ADMIN_EMAIL=admin@artistrysalon.com
     ADMIN_PASSWORD=<your-secure-password>
     FRONTEND_URL=<your-vercel-frontend-url>
     ```

6. **Deploy:**
```bash
railway up
```

7. **Get Backend URL:**
   - Railway will provide a public URL (e.g., `https://your-app.up.railway.app`)
   - Update frontend `REACT_APP_BACKEND_URL` in Vercel with this URL

### Alternative: Deploy Both on Emergent

1. Click **"Deploy"** button in Emergent dashboard
2. Select production deployment
3. Wait 10-15 minutes
4. Get public URL (format: `yourapp.emergent.app`)
5. Cost: 50 credits/month per app

## 🔧 Configuration

### Update Phone Number

Replace `91XXXXXXXXXX` in these files with your actual number:
- `/frontend/src/components/Navbar.js`
- `/frontend/src/components/MobileBottomBar.js`
- `/frontend/src/components/Footer.js`
- `/frontend/src/pages/Contact.js`
- `/frontend/src/pages/Booking.js`

### Update Google Maps Location

Update coordinates in:
- `/frontend/src/pages/Contact.js` (line 120)
- `/frontend/src/components/SEO.js` (lines 21-22)

Current coordinates: `22.560621, 72.9254909`

## 🧪 Testing

### Test Admin Login
```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@artistrysalon.com","password":"YourPassword"}'
```

### Test Booking Creation
```bash
curl -X POST http://localhost:8001/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "service_category": "Hair",
    "service_name": "Haircut",
    "stylist": "Priya Sharma",
    "date": "2026-04-15",
    "time": "2:00 PM",
    "customer_name": "Test User",
    "customer_phone": "9876543210",
    "notes": "Test booking"
  }'
```

## 📚 API Documentation

Once backend is running, visit:
- **Swagger UI:** `http://localhost:8001/docs`
- **ReDoc:** `http://localhost:8001/redoc`

### Main Endpoints

**Public:**
- `GET /api/stylists` - Get all available stylists
- `POST /api/bookings` - Create new booking

**Protected (require admin auth):**
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin user
- `POST /api/auth/logout` - Logout
- `GET /api/bookings` - Get all bookings (with optional date filter)
- `PATCH /api/bookings/{id}` - Update booking status
- `POST /api/stylists` - Add new stylist
- `PATCH /api/stylists/{id}` - Update stylist
- `DELETE /api/stylists/{id}` - Delete stylist

## 🐛 Troubleshooting

### Frontend cannot connect to backend
- Check `REACT_APP_BACKEND_URL` in frontend `.env`
- Ensure backend is running on correct port
- Check CORS settings in backend

### MongoDB connection failed
- Verify MongoDB is running
- Check `MONGO_URL` in backend `.env`
- For MongoDB Atlas, ensure IP whitelist includes your IP

### Admin login not working
- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` in backend `.env`
- Backend auto-creates admin on startup
- Check backend logs for errors

### Animations not working
- Clear browser cache
- Check browser console for errors
- Verify all dependencies installed

## 📄 License

This project is private and proprietary to Artistry Family Salon.

## 🤝 Support

For technical support, contact: admin@artistrysalon.com

## 🔄 Updates

To update the project after changes:
1. Pull latest from repository
2. Run `npm install` in frontend (if package.json changed)
3. Run `pip install -r requirements.txt` in backend (if requirements.txt changed)
4. Restart both servers

---

**Built with ❤️ for Artistry Family Salon**
