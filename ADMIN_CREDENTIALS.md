# 🔐 Admin Credentials - PRODUCTION

## Admin Panel Access

**Login URL:** `/admin/login`  
**Direct URL:** `https://premium-salon-anand.preview.emergentagent.com/admin/login`

**Credentials:**
- **Email:** `admin@artistrysalon.com`
- **Password:** `ArtSalon2026!Secure#123`

⚠️ **IMPORTANT:** This password has been changed from the default weak password to a strong one. Keep this secure!

## Security Notes

1. **Admin panel is NOT accessible from main navigation** - only via direct URL
2. **Password strength:** 20 characters, includes uppercase, lowercase, numbers, and special characters
3. **JWT authentication** with httpOnly cookies for session management
4. **Protected routes:** All admin endpoints require valid authentication

## Dashboard Features

Once logged in, you can:
- View all customer bookings
- Update booking status (pending → confirmed → completed)
- Filter bookings by date
- Manage staff/stylists (add, edit, delete, toggle availability)

## Password Change

To change the password in the future:
1. Edit `/app/backend/.env`
2. Update `ADMIN_PASSWORD="your-new-password"`
3. Restart backend: `sudo supervisorctl restart backend`
4. The seed function will auto-update the password hash in MongoDB

## Production Deployment

Before going live:
- [ ] Change email to actual salon owner email
- [ ] Consider implementing password reset flow
- [ ] Set up 2FA for additional security (future enhancement)
- [ ] Regular password rotation policy
