# Gemini API Key Setup Guide

## Current Issue
You're getting: "API Error: Gemini API is not responding"

This usually means:
1. The API key is incorrect
2. The API key hasn't been fully copied
3. The Gemini API isn't enabled

## How to Get Your API Key

### Step 1: Go to Google AI Studio
- Visit: https://aistudio.google.com/app/apikeys
- Or go to: https://ai.google.dev/ and click "Get API Key"

### Step 2: Create/Copy Your Key
1. Click **"Create API Key"** or **"Create API key in new project"**
2. Wait for the key to be generated
3. You'll see a key like: `AIza...` (long string)
4. Click the **copy icon** (📋) to copy the entire key

### Step 3: Update Your .env.local File

**Option A: Manual Edit**
1. Open: `D:\prompt generator\.env.local`
2. Find the line: `GEMINI_API_KEY=`
3. Replace everything after the `=` with your NEW key
4. Make sure there are NO spaces before or after the key
5. Save the file

**Example (replace with your actual key):**
```
GEMINI_API_KEY=AIzaSyBMa6RcwjyzvJ7ZMtKSpn06bACh_dcFBbw
```

### Step 4: Restart the Dev Server
1. Stop the dev server (Ctrl+C)
2. Run: `npm run dev`
3. Refresh your browser

## Troubleshooting

### "Invalid API Key"
- ✅ Check the key is COMPLETE (copy again from Google AI Studio)
- ✅ Make sure NO spaces are in the key
- ✅ Make sure you copied the entire key

### "API Quota Exceeded"
- Your free tier quota is exhausted
- Upgrade to a paid plan in Google Cloud Console

### "API Not Enabled"
- Go to Google Cloud Console
- Enable "Generative Language API"

## Test Your Key

To verify your key works:
1. Run: `npm run dev`
2. Go to: `http://localhost:3000`
3. Click "Generate Prompts"
4. If it works, you'll see 5 prompts in seconds
5. If it fails, check the error message

## Security Note

⚠️ **NEVER share this key publicly or commit it to GitHub!**

The `.env.local` file is already in `.gitignore` so it won't be committed.

---

**Need Help?**

If you're still getting errors:
1. Check the browser console (F12) for detailed errors
2. Verify the key in Google AI Studio (make sure it's not deleted/revoked)
3. Check your internet connection
4. Try creating a NEW API key in Google AI Studio
