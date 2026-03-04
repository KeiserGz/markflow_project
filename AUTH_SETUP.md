# Authentication & Firestore Setup Guide

## Overview

MarkFlow now includes email/password authentication with Firestore database integration. Each user's notes are stored securely in Firestore and synced in real-time.

## Features

- ✅ Email/Password signup and login
- ✅ Authenticated notes stored in Firestore
- ✅ Real-time note sync across devices
- ✅ Secure user data with Firestore rules
- ✅ Protected routes (requires login)
- ✅ Automatic logout functionality

## Setup Steps

### 1. Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project `markflow-app`
3. Go to **Authentication** → **Sign-in method**
4. Enable **Email/Password** provider
5. Click **Save**

### 2. Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create Database**
3. Choose **Start in production mode**
4. Select region (recommend `us-central1`)
5. Click **Create**

### 3. Set Firestore Security Rules

1. In Firestore, go to **Rules** tab
2. Replace all rules with this:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own notes
    match /notes/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId ||
                          request.auth.uid == request.resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }
  }
}
```

3. Click **Publish**

### 4. Test Locally

```bash
npm run dev
```

Then navigate to:

- **Signup**: http://localhost:3000/signup
- **Login**: http://localhost:3000/login
- **App**: http://localhost:3000 (requires login)

## Project Structure

```
pages/
├── _app.js          # App with AuthProvider wrapper
├── index.js         # Protected editor page
├── login.js         # Login page
└── signup.js        # Signup page

components/
├── ProtectedRoute.js      # Route protection wrapper
├── Editor.js              # Markdown editor
├── Preview.js             # Live preview
└── Sidebar.js             # Note navigation

context/
└── AuthContext.js         # Auth provider & context

hooks/
└── useAuth.js            # Firebase authentication hook

store/
├── noteStore-firestore.js # Firestore-based note store
└── noteStore.js           # Legacy localStorage store (kept for reference)

lib/
└── firebase.js            # Firebase config & initialization
```

## Key Components

### useAuth Hook

Manages Firebase authentication:

```javascript
const { user, loading, error, signup, login, logout } = useAuth()
```

### ProtectedRoute Component

Wraps pages that require authentication:

```javascript
<ProtectedRoute>
  <EditorPage />
</ProtectedRoute>
```

### AuthContext

Provides authentication state across app:

```javascript
const { user, logout } = useAuthContext()
```

## Migration from localStorage to Firestore

The app now uses two note stores:

- **`noteStore.js`** - Legacy localStorage (kept for reference)
- **`noteStore-firestore.js`** - New Firestore-based store (active)

The Firestore store:

- Syncs notes in real-time
- Persists to database
- Automatically loads on user login
- Updates instantly across devices

## Deploying to Vercel

1. Ensure Firebase config is in `lib/firebase.js`
2. No environment variables needed (Firebase SDK is public)
3. Deploy as usual:
   ```bash
   git push
   ```
4. Vercel will auto-deploy

## File Changes Summary

### New Files Created

- `pages/login.js` - Login page
- `pages/signup.js` - Signup page
- `hooks/useAuth.js` - Auth hook
- `context/AuthContext.js` - Auth provider
- `components/ProtectedRoute.js` - Protected route wrapper
- `store/noteStore-firestore.js` - Firestore store

### Modified Files

- `pages/_app.js` - Added AuthProvider
- `pages/index.js` - Added ProtectedRoute, updated to use Firestore store

## Troubleshooting

### "Permission denied - check Firestore rules"

This error appears when Firestore rejects write/read requests. **Follow these steps:**

1. **Has Firestore database been created?**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select `markflow-app` project
   - Go to **Firestore Database**
   - If you see "Create Database", click it and finish setup
   - Choose **Production mode**, select region `us-central1`, click **Create**

2. **Are security rules published?**
   - In Firebase Console → **Firestore Database** → **Rules** tab
   - Copy-paste the rules from **Step 3** above
   - Click **Publish** (must see checkmark)
   - Wait 30 seconds for rules to propagate

3. **Check Browser Console for Details**
   - Press `F12` to open DevTools
   - Go to **Console** tab
   - Look for red error messages
   - Share the full error message if stuck

4. **Try These Steps in Order**
   - ✅ Verify database was created
   - ✅ Publish rules and wait 30 seconds
   - ✅ Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
   - ✅ Clear browser cache/cookies
   - ✅ Try signing up with new account
   - ✅ Check Firebase quota hasn't been exceeded

5. **Still Not Working?**
   - Check Firebase free tier limits aren't exceeded
   - Ensure Email/Password auth is enabled (Step 1)
   - Try in incognito/private browser window
   - Check browser console (F12 → Console) for exact error code

### "User not found" or "Wrong password"

- Check email/password are correct
- Try signing up if account doesn't exist

### Notes not loading after login

- Check Firestore database is created
- Verify Firestore rules are published
- Check browser console for errors
- Wait 30 seconds for rules propagation

### Deployment issues

- Ensure Firebase config is correct in `lib/firebase.js`
- Check Firestore database is in production mode
- View Vercel logs for detailed errors

## Next Steps

- [ ] Add password reset functionality
- [ ] Add Google OAuth authentication
- [ ] Add email verification
- [ ] Add user profile editing
- [ ] Add note sharing between users
- [ ] Add backup to cloud storage

## Support

For issues, check:

1. [Firebase Auth Docs](https://firebase.google.com/docs/auth)
2. [Firestore Docs](https://firebase.google.com/docs/firestore)
3. Browser console errors (F12)
4. Vercel deployment logs
