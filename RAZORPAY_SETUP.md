# 💳 Razorpay Setup Guide

## Step-by-Step Instructions to Get Your API Keys

### Step 1: Create Razorpay Account

1. Go to **https://dashboard.razorpay.com/**
2. Click **"Sign Up"**
3. Fill in details:
   - Email address
   - Password
   - Business name (can be anything, e.g., "Test Business")
4. Verify your email
5. Complete the signup process

### Step 2: Switch to Test Mode

**⚠️ IMPORTANT:** Always use Test Mode for development!

1. After login, look at the **top-left corner**
2. You'll see a toggle switch: **"Test Mode"** / **"Live Mode"**
3. Make sure it's set to **"Test Mode"** (should be blue/active)
4. Test Mode lets you test payments without real money

### Step 3: Generate Test API Keys

1. In the dashboard, go to **Settings** (gear icon on left sidebar)
2. Click **"API Keys"** (under "Developer" section)
3. You'll see **"Test Keys"** section
4. Click **"Generate Test Keys"** (if not already generated)
5. You'll get two keys:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (hidden by default)

### Step 4: Copy Your Keys

**Key ID:**
- Visible by default
- Looks like: `rzp_test_1234567890abcd`
- Click the **copy icon** to copy it

**Key Secret:**
- Click **"Show"** or the eye icon to reveal it
- Looks like: `abcdefghijklmnopqrstuvwxyz123456`
- Click the **copy icon** to copy it
- **⚠️ Keep this secret! Never share it publicly!**

### Step 5: Update Your .env Files

**Backend:** Open `server/.env` and update:

```env
MONGODB_URI=mongodb+srv://... (already done ✅)
RAZORPAY_KEY_ID=rzp_test_1234567890abcd
RAZORPAY_KEY_SECRET=abcdefghijklmnopqrstuvwxyz123456
PORT=5000
```

**Frontend:** Open `client/.env` and update:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_1234567890abcd
VITE_API_URL=http://localhost:5000
```

**⚠️ IMPORTANT:** 
- Use the **SAME Key ID** in both files
- Only put **Key ID** in frontend (NOT the Secret!)
- **Key Secret** only goes in backend

## 🎯 Quick Checklist

- [ ] Created Razorpay account
- [ ] Verified email
- [ ] Switched to Test Mode
- [ ] Generated Test API Keys
- [ ] Copied Key ID (starts with `rzp_test_`)
- [ ] Copied Key Secret
- [ ] Updated `server/.env` with both keys
- [ ] Updated `client/.env` with Key ID only

## 📸 Visual Reference

### Where to find API Keys:
```
Dashboard → Settings (⚙️) → API Keys → Test Keys
```

### What the keys look like:
- **Key ID:** `rzp_test_xxxxxxxxxxxxxxxx` (16-20 characters)
- **Key Secret:** `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (32 characters)

## ✅ Verify Your Setup

After updating both `.env` files, your configuration should look like:

**server/.env:**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/paymentdb?retryWrites=true&w=majority
RAZORPAY_KEY_ID=rzp_test_1234567890abcd
RAZORPAY_KEY_SECRET=abcdefghijklmnopqrstuvwxyz123456
PORT=5000
```

**client/.env:**
```env
VITE_RAZORPAY_KEY_ID=rzp_test_1234567890abcd
VITE_API_URL=http://localhost:5000
```

## 🚀 Next Steps

Once you've updated the `.env` files:

1. **Start Backend Server:**
   ```bash
   cd c:\allmyprogramfiles\paymentwebsite\server
   npm start
   ```
   
   Should show:
   ```
   🚀 Server running on port 5000
   ✅ MongoDB Connected
   ```

2. **Start Frontend (New Terminal):**
   ```bash
   cd c:\allmyprogramfiles\paymentwebsite\client
   npm run dev
   ```
   
   Should show:
   ```
   VITE v7.3.1  ready in XXX ms
   ➜  Local:   http://localhost:5173/
   ```

3. **Test Payment:**
   - Open http://localhost:5173
   - Fill the form
   - Use test card: **4111 1111 1111 1111**
   - CVV: 123, Expiry: 12/25

## 🐛 Common Issues

### Issue: "Razorpay is not defined"
**Solution:** 
- Check `VITE_RAZORPAY_KEY_ID` in `client/.env`
- Make sure it starts with `rzp_test_`
- Restart frontend server after changing `.env`

### Issue: "Invalid key_id"
**Solution:**
- Make sure you're using Test Mode keys
- Copy the key exactly (no extra spaces)
- Check both `.env` files have the same Key ID

### Issue: "Payment verification failed"
**Solution:**
- Check Key Secret in `server/.env`
- Make sure it matches the Key ID
- Both keys should be from the same Test Mode account

## 🔗 Useful Links

- **Razorpay Dashboard:** https://dashboard.razorpay.com/
- **Test Cards:** https://razorpay.com/docs/payments/payments/test-card-details/
- **API Documentation:** https://razorpay.com/docs/api/

---

**Ready to test?** Once you update the Razorpay keys, you're all set! 🚀
