# Deployment Guide - Artistry Family Salon

Complete guide for deploying the salon booking website to various platforms.

## 📋 Table of Contents

1. [Vercel (Frontend) + Railway (Backend)](#vercel--railway-deployment)
2. [Emergent Native Deployment](#emergent-deployment)
3. [Other Options](#other-deployment-options)

---

## 🚀 Vercel + Railway Deployment

This is the recommended setup for maximum flexibility and scalability.

### Part 1: Deploy Backend to Railway

**Step 1: Create Railway Account**
1. Go to https://railway.app
2. Sign up with GitHub
3. Create a new project

**Step 2: Deploy Backend**
1. Click "New Project" → "Deploy from GitHub repo"
2. Select your repository
3. Railway will auto-detect the backend folder
4. If not, set root directory to `/backend`

**Step 3: Add MongoDB Database**
1. In Railway dashboard → Click "New" → "Database" → "Add MongoDB"
2. Railway will create a MongoDB instance
3. Connection string is automatically added as environment variable `MONGO_URL`

**Step 4: Configure Environment Variables**

In Railway dashboard → Your Service → Variables, add:

```
MONGO_URL=<auto-populated-by-railway>
DB_NAME=artistry_salon
CORS_ORIGINS=<your-vercel-url>
JWT_SECRET=<generate-with-openssl-rand-hex-32>
ADMIN_EMAIL=admin@artistrysalon.com
ADMIN_PASSWORD=<your-secure-password>
FRONTEND_URL=<your-vercel-url>
```

**Step 5: Configure Build Settings**

Railway should auto-detect, but verify:
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`

**Step 6: Deploy**
Railway will automatically deploy. Copy the public URL (e.g., `https://your-app.up.railway.app`)

---

### Part 2: Deploy Frontend to Vercel

**Step 1: Install Vercel CLI (Optional)**
```bash
npm install -g vercel
```

**Step 2: Deploy via Dashboard**
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect React

**Step 3: Configure Project Settings**

- **Framework Preset:** Create React App
- **Root Directory:** `/frontend` (if monorepo)
- **Build Command:** `npm run build` or `yarn build`
- **Output Directory:** `build`
- **Install Command:** `npm install` or `yarn install`

**Step 4: Add Environment Variables**

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```
REACT_APP_BACKEND_URL=https://your-railway-backend.up.railway.app
```

**Step 5: Deploy**
Click "Deploy". Vercel will build and deploy your frontend.

**Step 6: Update Backend CORS**

Go back to Railway → Environment Variables → Update:
```
CORS_ORIGINS=https://your-app.vercel.app
FRONTEND_URL=https://your-app.vercel.app
```

Redeploy backend for changes to take effect.

**Step 7: Test Deployment**
1. Visit your Vercel URL
2. Test booking flow
3. Test admin login at `/admin/login`
4. Verify all API calls work

---

### Custom Domain Setup (Optional)

**On Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `artistrysalon.com`)
3. Update DNS records as instructed
4. SSL automatically provisioned

**On Railway:**
1. Go to Service Settings → Networking
2. Click "Generate Domain" or add custom domain
3. Update DNS records
4. Update Vercel environment variable with new backend URL

---

## 🎯 Emergent Deployment

Simple one-click deployment with everything managed.

**Step 1: Click Deploy**
In your Emergent workspace, click the "Deploy" button

**Step 2: Configure**
- Select production environment
- Review settings
- Confirm deployment

**Step 3: Wait**
Deployment takes approximately 10-15 minutes

**Step 4: Get URL**
You'll receive a public URL: `https://your-app.emergent.app`

**Features:**
- ✅ Automatic HTTPS/SSL
- ✅ MongoDB hosted
- ✅ Backend + Frontend together
- ✅ Auto-scaling
- ✅ Custom domain support (via Entri)

**Cost:** 50 credits/month per app

**Custom Domain:**
1. Go to Settings → Domains in deployed app
2. Add custom domain
3. Follow DNS configuration
4. SSL auto-generated

---

## 🌐 Other Deployment Options

### Netlify (Frontend)

Similar to Vercel:
1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variable: `REACT_APP_BACKEND_URL`

### Render (Backend)

Similar to Railway:
1. Create new Web Service
2. Connect GitHub repo
3. Set root directory to `/backend`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
6. Add environment variables
7. Add PostgreSQL or use external MongoDB

### Heroku (Full Stack)

1. Create two apps (frontend and backend)
2. Backend:
   ```bash
   cd backend
   heroku create your-app-backend
   heroku addons:create mongolab
   git push heroku main
   ```
3. Frontend:
   ```bash
   cd frontend
   heroku create your-app-frontend
   heroku buildpacks:set mars/create-react-app
   git push heroku main
   ```

---

## 🔒 Security Checklist Before Production

- [ ] Change default admin password
- [ ] Generate new JWT_SECRET (use: `openssl rand -hex 32`)
- [ ] Update CORS_ORIGINS to only allow your frontend domain
- [ ] Use HTTPS for all URLs
- [ ] Enable rate limiting (add to FastAPI if needed)
- [ ] Set up MongoDB authentication if not using managed service
- [ ] Review and remove any console.log statements
- [ ] Test all endpoints with production URLs
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Configure database backups

---

## 📊 Post-Deployment Checklist

- [ ] Test booking flow end-to-end
- [ ] Test admin login and dashboard
- [ ] Verify staff management works
- [ ] Check mobile responsiveness
- [ ] Test WhatsApp integration
- [ ] Verify Google Maps shows correct location
- [ ] Test all animations on live site
- [ ] Confirm "Made with Emergent" badge is hidden
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on multiple devices (iOS, Android)
- [ ] Set up Google Analytics (optional)
- [ ] Submit sitemap to Google Search Console
- [ ] Test page load speed (use Lighthouse)

---

## 🐛 Common Deployment Issues

### CORS Errors
**Problem:** Frontend can't access backend API  
**Solution:**
- Verify `CORS_ORIGINS` in backend includes your frontend URL
- Check for typos in URLs (http vs https)
- Ensure no trailing slashes

### MongoDB Connection Failed
**Problem:** Backend can't connect to database  
**Solution:**
- Verify `MONGO_URL` is correct
- For MongoDB Atlas, whitelist your backend IP
- Check database credentials

### Environment Variables Not Loading
**Problem:** App behaves differently than local  
**Solution:**
- Verify all env vars are set in deployment platform
- Check for typos in variable names
- Redeploy after adding variables

### Build Failures
**Problem:** Deployment fails during build  
**Solution:**
- Check build logs for specific errors
- Verify all dependencies are in package.json / requirements.txt
- Ensure Node/Python versions match local environment

### 404 Errors on Page Refresh
**Problem:** React routes don't work on refresh  
**Solution:**
- Add `_redirects` file to Netlify: `/* /index.html 200`
- For Vercel: Add `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/" }]
  }
  ```

---

## 🎓 Resources

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas/
- **FastAPI Deployment:** https://fastapi.tiangolo.com/deployment/
- **React Deployment:** https://create-react-app.dev/docs/deployment/

---

**Need help? Contact: admin@artistrysalon.com**
