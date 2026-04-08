# Artistry Family Salon — PRD

## Original Problem Statement
Build a full-stack salon booking website for "Artistry Family Salon" with pages: Home, Services, Online Booking (step-by-step), Gallery, About, Contact, Admin Panel. MongoDB backend, "Pay at Salon" model, WhatsApp notification via wa.me link, warm luxury aesthetic.

## Color Palette
- Deep Warm Charcoal: #1C1410
- Warm Cream: #FDF6EC
- Gold: #C9A84C
- Rose Gold: #C4956A

## Tech Stack
React (Tailwind + Shadcn) | FastAPI | MongoDB

## What's Been Implemented
- Full page set: Home, Services, Gallery, About, Contact, Booking, AdminLogin, AdminDashboard
- Admin panel with Booking + Staff (Stylist) CRUD management
- Step-by-step booking flow with "Pay at Salon"
- WhatsApp wa.me link on booking confirmation
- Warm luxury theme across all pages
- CSS scroll animations (Intersection Observer, no heavy JS libs)
- Mobile bottom navigation bar
- SEO meta tags
- Deployment-ready config (CORS, pagination)
- Custom AI-generated hero image (GPT Image 1) — cinematic salon banner (2026-04-08)

## Prioritized Backlog
### P0
(none — current tasks complete)

### P1
- Replace placeholder WhatsApp number (91XXXXXXXXXX) with actual salon number

### P2
- Gallery image management from admin panel
- Service pricing management from admin panel
- Email/SMS booking confirmations

## Key API Endpoints
- POST /api/auth/login
- GET /api/stylists | POST /api/stylists
- POST /api/bookings | GET /api/bookings
- PUT /api/bookings/{id}/status

## DB Collections
- bookings, stylists, users (admin)
