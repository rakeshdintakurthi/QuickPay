# Deployment Guide

## 🚀 Deploy Backend to Render (Free)

### Step 1: Prepare Repository
1. Push your code to GitHub
2. Make sure `server/` folder is in the repository

### Step 2: Create Web Service on Render
1. Go to https://render.com/
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Select your repository
5. Configure settings:

**Build Settings:**
- **Name:** payment-backend (or any name)
- **Root Directory:** `server`
- **Environment:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### Step 3: Add Environment Variables
Click "Advanced" → "Add Environment Variable"

Add these variables:
```
MONGODB_URI = your_mongodb_atlas_connection_string
RAZORPAY_KEY_ID = your_razorpay_key_id
RAZORPAY_KEY_SECRET = your_razorpay_key_secret
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL: `https://your-app.onrender.com`

**⚠️ Note:** Free tier may sleep after inactivity. First request might be slow.

---

## 🌐 Deploy Frontend to Vercel (Free)

### Step 1: Prepare Repository
Make sure `client/` folder is in your GitHub repository

### Step 2: Import Project on Vercel
1. Go to https://vercel.com/
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"
4. Select your repository
5. Configure settings:

**Build Settings:**
- **Framework Preset:** Vite
- **Root Directory:** `client`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Step 3: Add Environment Variables
Click "Environment Variables" and add:

```
VITE_RAZORPAY_KEY_ID = your_razorpay_key_id
VITE_API_URL = https://your-backend-url.onrender.com
```

**⚠️ Important:** Use your Render backend URL here!

### Step 4: Deploy
1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Your site will be live at: `https://your-project.vercel.app`

---

## 🔄 Update Deployment

### Update Backend
1. Push changes to GitHub
2. Render will auto-deploy

### Update Frontend
1. Push changes to GitHub
2. Vercel will auto-deploy

---

## ✅ Post-Deployment Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Environment variables added on both platforms
- [ ] Frontend API URL points to Render backend
- [ ] Test payment works on live site
- [ ] MongoDB connection successful
- [ ] No console errors in browser

---

## 🐛 Common Deployment Issues

### Backend Issues

**Problem:** MongoDB connection fails  
**Solution:** 
- Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access
- Check connection string format
- Verify username/password

**Problem:** Environment variables not working  
**Solution:**
- Re-check variable names (case-sensitive)
- Redeploy after adding variables
- Check Render logs for errors

### Frontend Issues

**Problem:** API calls fail  
**Solution:**
- Verify `VITE_API_URL` is correct
- Check if backend is running
- Look for CORS errors in console

**Problem:** Razorpay not loading  
**Solution:**
- Verify `VITE_RAZORPAY_KEY_ID` is set
- Check browser console for errors
- Ensure using Key ID, not Secret

---

## 📊 Monitor Your Deployment

### Render Dashboard
- View logs: Click your service → "Logs"
- Check status: Green = running
- View metrics: CPU, Memory usage

### Vercel Dashboard
- View deployments: Project → "Deployments"
- Check logs: Click deployment → "View Logs"
- Monitor analytics: "Analytics" tab

---

## 🔒 Production Checklist

Before going live with real payments:

- [ ] Switch Razorpay to Live Mode
- [ ] Update Razorpay keys (Live keys)
- [ ] Add rate limiting
- [ ] Implement webhook handling
- [ ] Add logging system
- [ ] Set up error monitoring (Sentry)
- [ ] Add user authentication
- [ ] Implement HTTPS (automatic on Vercel/Render)
- [ ] Add terms and privacy policy
- [ ] Test with real small amount
- [ ] Set up backup system

---

## 💡 Tips

1. **Free Tier Limits:**
   - Render: 750 hours/month, sleeps after 15 min inactivity
   - Vercel: Unlimited deployments, 100GB bandwidth
   - MongoDB Atlas: 512MB storage

2. **Keep Backend Awake:**
   - Use a service like UptimeRobot to ping every 10 minutes
   - Or upgrade to paid plan

3. **Custom Domain:**
   - Both Render and Vercel support custom domains
   - Configure in project settings

---

**Need help?** Check the main README.md or Render/Vercel documentation.
