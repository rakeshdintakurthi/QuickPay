# 🚀 Setup Complete - Next Steps

## ✅ What's Done

- [x] Backend dependencies installed (130 packages)
- [x] Frontend dependencies installed (from Vite setup)
- [x] `.env` files created in both directories
- [x] Project structure ready

## 📝 Configuration Required

### Step 1: Get MongoDB Atlas Connection String

1. Go to **https://www.mongodb.com/cloud/atlas**
2. Sign up for a free account
3. Create a **free cluster** (M0 Sandbox)
4. Click **"Connect"** on your cluster
5. Choose **"Connect your application"**
6. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. Replace `<password>` with your actual database password
8. Replace `username` if different

### Step 2: Get Razorpay Test Keys

1. Go to **https://dashboard.razorpay.com/**
2. Sign up / Login
3. Make sure you're in **"Test Mode"** (toggle in top left)
4. Go to **Settings** → **API Keys**
5. Click **"Generate Test Keys"**
6. You'll get:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (click "Show" to reveal)

### Step 3: Update Environment Files

**Backend:** Open `server/.env` and update:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/paymentdb?retryWrites=true&w=majority
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
PORT=5000
```

**Frontend:** Open `client/.env` and update:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
VITE_API_URL=http://localhost:5000
```

⚠️ **Important:** Use the SAME Razorpay Key ID in both files!

## 🏃 Running the Application

### Terminal 1 - Start Backend

```bash
cd c:\allmyprogramfiles\paymentwebsite\server
npm start
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected
```

### Terminal 2 - Start Frontend

```bash
cd c:\allmyprogramfiles\paymentwebsite\client
npm run dev
```

You should see:
```
VITE v7.3.1  ready in XXX ms
➜  Local:   http://localhost:5173/
```

## 🧪 Test Your Payment

1. Open **http://localhost:5173** in your browser
2. Fill in the form:
   - **Name:** Test User
   - **Email:** test@example.com
   - **Amount:** 100
3. Click **"Pay Now"**
4. In Razorpay checkout, use:
   - **Card:** 4111 1111 1111 1111
   - **CVV:** 123
   - **Expiry:** 12/25
   - **Name:** Any name
5. Click **"Pay"**
6. You should see: ✅ **"Payment successful!"**

## ✅ Verification

### Check MongoDB
1. Go to MongoDB Atlas dashboard
2. Click **"Browse Collections"**
3. You should see a `transactions` collection
4. Your test payment should be there!

### Check Razorpay Dashboard
1. Go to https://dashboard.razorpay.com/
2. Click **"Transactions"** → **"Payments"**
3. Your test payment should appear

## 🐛 Troubleshooting

### Backend won't start
- **Error:** "MongoDB connection failed"
  - Check your connection string
  - Make sure password is correct
  - Whitelist your IP in MongoDB Atlas (Network Access)

### Frontend can't connect to backend
- **Error:** "Failed to fetch" or CORS error
  - Make sure backend is running on port 5000
  - Check `VITE_API_URL` in `client/.env`

### Razorpay checkout doesn't open
- **Error:** "Razorpay is not defined"
  - Check `VITE_RAZORPAY_KEY_ID` in `client/.env`
  - Make sure you're using the Key ID, not the Secret

### Payment verification fails
- **Error:** "Payment verification failed"
  - Make sure both `.env` files have the SAME Key ID
  - Check that Key Secret is correct in backend `.env`

## 📚 Quick Reference

**Test Cards:**
- Success: `4111 1111 1111 1111`
- Failure: `4111 1111 1111 1234`

**Test UPI:**
- Success: `success@razorpay`
- Failure: `failure@razorpay`

**Documentation:**
- Main guide: `README.md`
- Quick start: `QUICKSTART.md`
- Testing: `TESTING.md`
- Deployment: `DEPLOYMENT.md`
- Security: `SECURITY.md`

## 🎯 Current Status

```
✅ Dependencies installed
✅ .env files created
⏳ Waiting for MongoDB credentials
⏳ Waiting for Razorpay credentials
⏳ Ready to test!
```

---

**Need help?** Check the comprehensive guides in the project root or refer to the walkthrough document!
