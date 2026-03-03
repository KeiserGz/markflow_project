# MarkFlow Cloud Sync Setup Guide

## Enable Cloud Saving to Firebase

Your notes can now auto-sync to the cloud! Follow these steps to set up Firebase:

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add Project"**
3. Enter project name: `markflow-app`
4. Click **"Create Project"**

### Step 2: Add a Web App

1. In Firebase Console, click the **"</>Web"** icon
2. Register app name: `MarkFlow`
3. Copy the Firebase config object

### Step 3: Update Your Config

1. Open `lib/firebase.js` in your project
2. Replace the `firebaseConfig` object with your actual Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef123456',
}
```

### Step 4: Enable Firestore Database

1. In Firebase Console, go to **"Firestore Database"**
2. Click **"Create Database"**
3. Choose **"Start in test mode"** (for development)
4. Click **"Next"** → **"Enable"**

### Step 5: Set Firestore Rules (Important!)

1. Go to **Firestore** → **"Rules"** tab
2. Replace with these rules for secure access:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/notes/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

### Step 6: Test Cloud Sync

1. Push your code to GitHub
2. Vercel will auto-deploy with cloud sync enabled
3. In the app header, click the **"Cloud: Off"** button to enable it
4. Your notes will now sync to Firebase!

## How It Works

- **Local First**: Notes are saved locally via browser storage
- **Auto Sync**: When cloud is enabled, notes sync automatically
- **Offline**: App works offline; syncs when connection returns
- **Real-time**: Multiple devices sync in real-time

## Important Security Notes

- Firebase rules above are for **development only**
- For production, implement proper authentication
- Use environment variables to store secrets
- Never commit real Firebase config to public repos

## Troubleshooting

**"Cloud Sync Failed"?**

- Check your Firebase config is correct
- Verify Firestore rules are published
- Check browser console for errors (F12)

**No sync happening?**

- Make sure cloud toggle is ON
- Check network connection
- Verify Firebase project exists

## Next Steps

- Integrate Firebase Authentication for user accounts
- Add Google/GitHub login
- Build user UI for managing cloud sync
- Add data export/import features

---

Need help? Check [Firebase Docs](https://firebase.google.com/docs) or [MarkFlow GitHub](https://github.com/KeiserGz/markflow_project)
