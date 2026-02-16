# Payment Website - Quick Start Guide

## 🚀 Local Development Setup

### Step 1: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 2: Configure Backend Environment
```bash
# Copy the example file
copy .env.example .env

# Edit .env and add:
# - MongoDB Atlas connection string
# - Razorpay Key ID
# - Razorpay Key Secret
```

### Step 3: Install Frontend Dependencies
```bash
cd ../client
npm install
```

### Step 4: Configure Frontend Environment
```bash
# Copy the example file
copy .env.example .env

# Edit .env and add:
# - Razorpay Key ID (same as backend)
# - API URL (http://localhost:5000 for local)
```

### Step 5: Start Backend Server
```bash
cd ../server
npm start
```
Backend runs on: http://localhost:5000

### Step 6: Start Frontend (New Terminal)
```bash
cd client
npm run dev
```
Frontend runs on: http://localhost:5173

## 🧪 Test Payment

1. Open http://localhost:5173
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Amount: 100
3. Click "Pay Now"
4. Use test card: **4111 1111 1111 1111**
5. CVV: Any 3 digits
6. Expiry: Any future date

## 📋 Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Razorpay account created (test mode)
- [ ] Backend .env configured
- [ ] Frontend .env configured
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend server running
- [ ] Frontend dev server running
- [ ] Test payment successful

## 🔗 Quick Links

- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Razorpay Dashboard:** https://dashboard.razorpay.com/
- **Render (Backend Deploy):** https://render.com/
- **Vercel (Frontend Deploy):** https://vercel.com/

## 🆘 Need Help?

Check the main README.md for detailed instructions and troubleshooting.
