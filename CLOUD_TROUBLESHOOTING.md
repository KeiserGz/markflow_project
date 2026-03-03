# Cloud Sync Troubleshooting & Checklist

## ✅ Quick Checklist - Make Sure You Did These:

### 1️⃣ Firebase Console Setup
- [ ] Go to https://console.firebase.google.com
- [ ] See your project "markflow-app"
- [ ] Go to **Build** → **Firestore Database**
- [ ] Click **"Create Database"**
- [ ] Select **"Start in test mode"**
- [ ] Click **"Enable"**
- [ ] Wait for it to finish (1-2 minutes)

### 2️⃣ Firestore Security Rules
- [ ] In Firestore, click **"Rules"** tab
- [ ] You should see rules starting with `rules_version = '2';`
- [ ] If not, paste this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/notes/{document=**} {
      allow read, write: if true;
    }
  }
}
```

- [ ] Click **"Publish"**

### 3️⃣ Test Your App
1. Go to https://markflow-project.vercel.app
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Top right - look for **"Cloud: Off"** button
4. Click it to turn **"Cloud: On"** (should turn BLUE)
5. You should see **"Synced!"** message
6. Check Firebase Console - go to Firestore and look for "users" collection

---

## 🆘 Troubleshooting

### Button doesn't click or respond
**Solution:**
- On mobile: Wait 2 seconds, click again
- Try refreshing the page (F5)
- Try a different browser

### Shows "Sync Error ❌"
**This means:** Firestore database isn't set up correctly

**Solution:**
- [ ] Make sure you clicked **"Enable"** in Firestore
- [ ] Check that database status shows **GREEN** (ready/online)
- [ ] Verify rules are published (should show **Timestamp** in Rules tab)

### No "Cloud: Off" button visible
**Solution:**
- Refresh page (Ctrl+Shift+R)
- Wait 2-3 minutes for Vercel to deploy
- Check browser console (F12) for errors

### Data not appearing in Firestore
**Solution:**
1. Make sure button says **"Cloud: On"** (BLUE)
2. Create a NEW note while cloud is ON
3. Check Firestore Console:
   - Click **Firestore Database**
   - Look for **"users"** folder
   - Inside should be your notes

---

## 📱 On Your Phone

Same process:
1. Open https://markflow-project.vercel.app
2. Tap **"Cloud: Off"** button
3. It turns **blue** → **"Cloud: On"**
4. See **"Synced!"** message
5. Create/edit notes
6. Check Firebase Console - data should appear!

---

## ✨ When It's Working

You'll see:
- ✅ Button says **"Cloud: On"** (solid blue)
- ✅ "Synced!" message appears briefly
- ✅ Notes appear in Firestore Console
- ✅ Works on all your devices!

---

## Need More Help?

Check the browser console for errors (F12):
1. Press **F12** to open Developer Tools
2. Click **Console** tab
3. Look for red error messages
4. Copy the error and share it!

---

That's it! Your cloud sync should now work! 🚀
