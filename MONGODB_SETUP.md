# 🗄️ MongoDB Atlas Setup Guide

## Step-by-Step Instructions to Get Your Connection String

### Step 1: Create MongoDB Atlas Account

1. Go to **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up with:
   - Email and password, OR
   - Google account, OR
   - GitHub account
4. Complete the registration

### Step 2: Create a Free Cluster

1. After login, you'll see **"Create a deployment"**
2. Choose **"M0 FREE"** tier (it's completely free!)
3. Configuration:
   - **Cloud Provider:** AWS, Google Cloud, or Azure (any is fine)
   - **Region:** Choose closest to you (e.g., Mumbai for India)
   - **Cluster Name:** Leave as default or name it "PaymentCluster"
4. Click **"Create Deployment"** (or "Create Cluster")
5. Wait 1-3 minutes for cluster creation

### Step 3: Create Database User

You'll see a popup **"Security Quickstart"**:

1. **Create Database User:**
   - Username: `paymentuser` (or any name you want)
   - Password: Click **"Autogenerate Secure Password"** 
   - **⚠️ COPY THIS PASSWORD!** You'll need it later
   - Or create your own password (remember it!)
2. Click **"Create User"**

### Step 4: Set Network Access

1. **Add IP Address:**
   - You'll see "Where would you like to connect from?"
   - Click **"Add My Current IP Address"** (for local testing)
   - OR click **"Allow Access from Anywhere"** (0.0.0.0/0) for easier setup
   - Click **"Add Entry"**
2. Click **"Finish and Close"**

### Step 5: Get Connection String

1. Click **"Connect"** button on your cluster
2. Choose **"Drivers"** (or "Connect your application")
3. Select:
   - **Driver:** Node.js
   - **Version:** 5.5 or later (default)
4. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://paymentuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Modify Connection String

Replace `<password>` with your actual password:

**Before:**
```
mongodb+srv://paymentuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**After (example):**
```
mongodb+srv://paymentuser:MySecurePass123@cluster0.abc12.mongodb.net/?retryWrites=true&w=majority
```

**⚠️ Important:** 
- Remove the `< >` brackets
- If your password has special characters (@, #, %, etc.), you need to URL encode them:
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `%` becomes `%25`
  - Use this tool: https://www.urlencoder.org/

### Step 7: Add Database Name (Optional but Recommended)

Add `/paymentdb` before the `?`:

```
mongodb+srv://paymentuser:MySecurePass123@cluster0.abc12.mongodb.net/paymentdb?retryWrites=true&w=majority
```

This creates a database called `paymentdb` for your transactions.

### Step 8: Update Your .env File

Open `server/.env` and paste your connection string:

```env
MONGODB_URI=mongodb+srv://paymentuser:MySecurePass123@cluster0.abc12.mongodb.net/paymentdb?retryWrites=true&w=majority
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=5000
```

## 🎯 Quick Checklist

- [ ] Created MongoDB Atlas account
- [ ] Created free M0 cluster
- [ ] Created database user (saved username & password)
- [ ] Whitelisted IP address (or allowed all IPs)
- [ ] Copied connection string
- [ ] Replaced `<password>` with actual password
- [ ] Added database name `/paymentdb`
- [ ] Pasted into `server/.env`

## 🐛 Common Issues

### Issue: "Authentication failed"
**Solution:** 
- Check password is correct
- Make sure you removed `< >` brackets
- URL encode special characters in password

### Issue: "Connection timeout"
**Solution:**
- Check Network Access in MongoDB Atlas
- Add your IP address or use 0.0.0.0/0
- Check firewall/antivirus isn't blocking

### Issue: "Cannot find module 'mongodb'"
**Solution:**
- Run `npm install` in server directory
- Dependencies should already be installed

## 📸 Visual Reference

### What the connection string looks like:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.xxxxx.mongodb.net/DATABASE?options
```

**Parts explained:**
- `mongodb+srv://` - Protocol (don't change)
- `USERNAME` - Your database username
- `PASSWORD` - Your database password
- `CLUSTER.xxxxx.mongodb.net` - Your cluster address
- `DATABASE` - Your database name (optional)
- `?options` - Connection options (don't change)

## ✅ Test Your Connection

After updating `.env`, start the backend:

```bash
cd c:\allmyprogramfiles\paymentwebsite\server
npm start
```

**Success looks like:**
```
🚀 Server running on port 5000
✅ MongoDB Connected
```

**Failure looks like:**
```
❌ MongoDB Connection Error: MongoServerError: bad auth
```

If you see the error, double-check your username and password!

## 🔗 Useful Links

- **MongoDB Atlas Dashboard:** https://cloud.mongodb.com/
- **MongoDB Documentation:** https://www.mongodb.com/docs/atlas/
- **URL Encoder:** https://www.urlencoder.org/

---

**Need help?** I can open MongoDB Atlas in a browser and guide you through the process visually!
