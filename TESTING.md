# Testing Guide - Razorpay Test Mode

## 🧪 Test Cards

### ✅ Successful Payment

**Card Number:** 4111 1111 1111 1111  
**CVV:** Any 3 digits (e.g., 123)  
**Expiry:** Any future date (e.g., 12/25)  
**Name:** Any name

### ❌ Failed Payment

**Card Number:** 4111 1111 1111 1234  
**CVV:** Any 3 digits  
**Expiry:** Any future date  

### 💳 Other Test Cards

| Card Number | Type | Result |
|-------------|------|--------|
| 5555 5555 5555 4444 | Mastercard | Success |
| 3782 822463 10005 | American Express | Success |
| 6011 1111 1111 1117 | Discover | Success |

## 📱 Test UPI

### Successful UPI Payment
**UPI ID:** success@razorpay

### Failed UPI Payment
**UPI ID:** failure@razorpay

## 🏦 Test Netbanking

Select any bank from the test mode list. All will succeed in test mode.

## 💰 Test Wallets

All wallets (Paytm, PhonePe, etc.) work in test mode and will show success.

## 🧪 Testing Scenarios

### Scenario 1: Successful Payment Flow

1. **Fill Form:**
   - Name: John Doe
   - Email: john@example.com
   - Amount: 100

2. **Click "Pay Now"**

3. **Razorpay Checkout Opens:**
   - Select "Card"
   - Enter: 4111 1111 1111 1111
   - CVV: 123
   - Expiry: 12/25

4. **Click Pay**

5. **Expected Result:**
   - ✅ Green success message
   - Transaction ID displayed
   - Form resets
   - Check MongoDB - transaction saved

### Scenario 2: Failed Payment

1. Fill form with valid data
2. Use card: **4111 1111 1111 1234**
3. Payment will fail
4. **Expected Result:**
   - ❌ Red error message
   - No transaction in database

### Scenario 3: Payment Cancelled

1. Fill form
2. Click "Pay Now"
3. Close Razorpay modal without paying
4. **Expected Result:**
   - ❌ "Payment cancelled" message

### Scenario 4: Invalid Form Data

**Test 1 - Empty Name:**
- Leave name empty
- Fill other fields
- Click "Pay Now"
- **Expected:** Error message "Please enter your name"

**Test 2 - Invalid Email:**
- Name: John
- Email: invalidemail
- Amount: 100
- **Expected:** Error message "Please enter a valid email"

**Test 3 - Zero Amount:**
- Name: John
- Email: john@example.com
- Amount: 0
- **Expected:** Error message "Please enter a valid amount"

**Test 4 - Negative Amount:**
- Amount: -50
- **Expected:** Error or validation prevents submission

## 🔍 Verification Checklist

After each test payment:

### Frontend Checks
- [ ] Success/error message displays correctly
- [ ] Message has correct styling (green/red)
- [ ] Form resets after successful payment
- [ ] Loading state shows during processing
- [ ] Pay button disables during processing

### Backend Checks
- [ ] Check terminal logs for API calls
- [ ] Verify no errors in console
- [ ] Check MongoDB for new transaction

### MongoDB Checks
1. Go to MongoDB Atlas
2. Browse Collections → Transactions
3. Verify transaction has:
   - Correct name
   - Correct email
   - Correct amount
   - razorpay_payment_id
   - razorpay_order_id
   - razorpay_signature
   - status: "success"
   - createdAt timestamp

### Razorpay Dashboard Checks
1. Go to https://dashboard.razorpay.com/
2. Click "Transactions" → "Payments"
3. Verify test payment appears
4. Check payment status
5. View payment details

## 🐛 Common Test Issues

### Issue: Razorpay checkout doesn't open
**Cause:** Missing Razorpay Key ID  
**Fix:** Check `VITE_RAZORPAY_KEY_ID` in `.env`

### Issue: Payment succeeds but not saved in DB
**Cause:** Signature verification failed  
**Fix:** 
- Check Razorpay Key Secret in backend `.env`
- Verify keys match (test mode keys with test mode)

### Issue: CORS error
**Cause:** Frontend can't connect to backend  
**Fix:** 
- Ensure backend is running
- Check CORS is enabled in `server.js`
- Verify `VITE_API_URL` is correct

### Issue: MongoDB connection error
**Cause:** Invalid connection string or network access  
**Fix:**
- Whitelist your IP in MongoDB Atlas
- Check connection string format
- Verify database user credentials

## 📊 Test Coverage

Make sure to test:

- [x] Successful card payment
- [x] Failed card payment
- [x] Payment cancellation
- [x] Form validation (all fields)
- [x] Database storage
- [x] API error handling
- [ ] UPI payment (optional)
- [ ] Netbanking (optional)
- [ ] Different amounts (1, 100, 1000, 9999.99)
- [ ] Special characters in name/email
- [ ] Very long names/emails

## 🔄 Switching to Live Mode

**⚠️ WARNING:** Only switch to live mode when ready for production!

### Steps:

1. **Razorpay Dashboard:**
   - Switch to "Live Mode"
   - Generate Live API Keys
   - Complete KYC verification

2. **Update Environment Variables:**
   ```env
   # Backend .env
   RAZORPAY_KEY_ID=rzp_live_xxxxx
   RAZORPAY_KEY_SECRET=live_secret_xxxxx
   
   # Frontend .env
   VITE_RAZORPAY_KEY_ID=rzp_live_xxxxx
   ```

3. **Test with Small Amount:**
   - Use real card with ₹1
   - Verify payment works
   - Check database storage
   - Refund test payment

4. **Go Live:**
   - Update deployment environment variables
   - Monitor first few transactions
   - Set up webhooks for payment updates

---

**Happy Testing! 🚀**
