# Firebase Storage Setup Guide

## IMPORTANT: Configure Firebase Storage Rules

To allow image uploads, you need to update your Firebase Storage security rules:

### Steps:

1. Open Firebase Console: https://console.firebase.google.com/project/smart-civic-eye-83e60/storage

2. Click on the **Rules** tab

3. Replace the existing rules with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read and write access to complaints folder
    match /complaints/{allPaths=**} {
      allow read: if true;
      allow write: if true;
    }
    
    // Deny access to all other paths
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

4. Click **Publish**

### What This Does:
- ✅ Allows anyone to upload images to `/complaints/` folder
- ✅ Allows anyone to read images from `/complaints/` folder
- ❌ Blocks access to all other storage paths

### For Production:
For a production app, you should add authentication:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /complaints/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users
    }
  }
}
```

## Testing the Upload

After updating the rules:
1. Refresh your app (http://localhost:5173)
2. Capture an image
3. Submit the complaint
4. If successful, you'll see the success screen with officer details!

## Troubleshooting

If you still get CORS errors:
1. Check if rules are published
2. Wait 1-2 minutes for rules to propagate
3. Clear browser cache and try again
4. Check browser console for specific error messages
