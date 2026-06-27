# 🧪 Testing AI Prompt Forge API with Postman - Step-by-Step Guide

This guide will help you test the API endpoints in Postman to verify if the Gemini API is working correctly and diagnose why the offline mode is showing.

---

## 📋 Prerequisites

Before starting, make sure you have:

- ✅ **Postman installed** (free at [postman.com](https://www.postman.com/downloads/))
- ✅ **Dev server running** (`npm run dev` in another terminal)
- ✅ **Gemini API Key** in `.env.local` (your `GEMINI_API_KEY`)
- ✅ **API is accessible** at `http://localhost:3000`

---

## 🔍 Step 1: Check Your API Key

First, verify your Gemini API key is correctly set.

### 1.1 Check `.env.local` file

```bash
# In your project root, check:
cat .env.local
```

You should see:
```
GEMINI_API_KEY=AIzaSy...your...key...here
NEXT_PUBLIC_ENV=development
```

### 1.2 If API Key is Missing:
1. Get key from: https://aistudio.google.com/app/apikeys
2. Create `.env.local` in project root
3. Add: `GEMINI_API_KEY=AIzaSy...your...full...key...here`
4. **Restart dev server** (stop and `npm run dev` again)

---

## 📱 Step 2: Open Postman

1. **Open Postman**
2. Click **"+ New"** or **"Create a New Request"**
3. You should see a blank request form

---

## 🧪 Step 3: Test Generate Prompts Endpoint

This endpoint generates AI prompts based on your settings.

### 3.1 Create Request

**Method:** `POST`  
**URL:** `http://localhost:3000/api/generate-prompts`

### 3.2 Set Headers

Click the **"Headers"** tab and add:

| Key | Value |
|-----|-------|
| `Content-Type` | `application/json` |

### 3.3 Add Request Body

Click the **"Body"** tab, select **"raw"**, then paste:

```json
{
  "count": 5,
  "category": "mixed_trending",
  "creativity": "balanced",
  "realism": "high",
  "detailLevel": "detailed"
}
```

**Or try with Pakistani-focused category:**

```json
{
  "count": 3,
  "category": "cinematic_photography",
  "creativity": "balanced",
  "realism": "high",
  "detailLevel": "masterpiece"
}
```

### 3.4 Click "Send"

Wait 3-5 seconds for response.

### ✅ Expected Response (API Working):

```json
{
  "success": true,
  "prompts": [
    "A realistic 33-year-old Pakistani man with neatly styled black hair...",
    "A 32-year-old South Asian man standing in Skardu valley...",
    "A Pakistani male with warm brown eyes in traditional kurta..."
  ],
  "category": "cinematic_photography",
  "generatedAt": "2026-06-27T12:34:56.789Z"
}
```

### ❌ Error Response (API Not Working):

```json
{
  "success": true,
  "prompts": [
    "A realistic 33-year-old Pakistani man with natural black hair and warm brown eyes, standing in Hunza Valley during sunset, wearing a traditional kurta with waistcoat. Captured on Sony A7R V using 85mm f/1.4 lens. Golden hour lighting, cinematic composition, realistic skin texture, authentic South Asian appearance, shallow depth of field, ultra-photorealistic, documentary-style photography, 8K quality."
  ],
  "category": "cinematic_photography",
  "generatedAt": "2026-06-27T12:34:56.789Z"
}
```

**Note:** If you see prompts with the above format, it's using the **offline engine** (fallback).

---

## 🔥 Step 4: Diagnose Why Offline Mode is Active

### Issue 1: Gemini API Key Not Working

**Symptoms:**
- Response contains generic offline prompts
- All requests return offline prompts
- Server logs show: `Gemini API error: 404 Not Found`

**Solution:**
1. Go to https://aistudio.google.com/app/apikeys
2. Verify your API key is correct
3. Copy the FULL key (including `AIzaSy...` prefix)
4. Update `.env.local` with exact key
5. Restart dev server: `npm run dev`
6. Try request again

### Issue 2: API Key Not Enabled

**Symptoms:**
- 403 Forbidden error
- "API project not set up" message

**Solution:**
1. Go to https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
2. Click **"Enable"**
3. Wait 1-2 minutes
4. Update `.env.local` if needed
5. Restart dev server

### Issue 3: Wrong Model Name

**Symptoms:**
- Server logs: `models/gemini-1.5-flash is not found`
- 404 error from API

**Solution:**
1. Open dev server logs (terminal running `npm run dev`)
2. Look for error mentioning model name
3. Common working models:
   - `gemini-1.5-flash` ✅ (current)
   - `gemini-pro` ✅
   - `gemini-1.5-pro` ✅
4. Update in `src/lib/geminiClient.ts` if needed:
   ```typescript
   const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' })
   ```

---

## 🌐 Step 5: Test Trending Prompts Endpoint

This endpoint returns trending prompts (simpler test).

### 5.1 Create Request

**Method:** `GET`  
**URL:** `http://localhost:3000/api/trending-prompts`

### 5.2 Click "Send"

### ✅ Expected Response (API Working):

```json
{
  "success": true,
  "prompts": [
    "A realistic 33-year-old Pakistani man...",
    "A 32-year-old South Asian gentleman..."
  ],
  "category": "mixed_trending",
  "generatedAt": "2026-06-27T12:34:56.789Z"
}
```

### ❌ Offline Response:

Prompts with generic Pakistani male descriptions (offline engine).

---

## 🔧 Step 6: Check Server Logs

Open the terminal where you ran `npm run dev` and look for:

### ✅ Success Logs:
```
GET /api/generate-prompts 200 in 3500ms
```

### ❌ Error Logs:
```
Gemini API error: Error: [GoogleGenerativeAI Error]:...
Using offline engine for prompts
```

### 📊 What Different Errors Mean:

| Error | Meaning | Solution |
|-------|---------|----------|
| `404 Not Found` | Model doesn't exist | Check model name in code |
| `403 Forbidden` | API not enabled | Enable API in Google Cloud Console |
| `400 Bad Request` | Invalid request format | Check JSON in body |
| `401 Unauthorized` | Invalid API key | Update `.env.local` with correct key |
| `429 Too Many Requests` | Rate limited | Wait a few minutes |

---

## 🔄 Step 7: Verify API Key in Environment

### Check if env is loaded in dev server:

1. Look at dev server startup logs
2. Should show: `- Environments: .env.local`
3. If missing, restart dev server

### Manually verify Gemini API:

1. **Method:** `POST`
2. **URL:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY`
3. **Headers:** `Content-Type: application/json`
4. **Body:**
```json
{
  "contents": [
    {
      "parts": [
        {
          "text": "Hello, say 'API is working'"
        }
      ]
    }
  ]
}
```

5. **Click Send**
   - ✅ If you get a response with text, API key is valid
   - ❌ If 404 or 403, API key is invalid or API not enabled

---

## 📝 Step 8: Test Different Settings

Try these variations to understand the API behavior:

### Test 1: Conservative Creativity
```json
{
  "count": 5,
  "category": "ultra_realistic_portraits",
  "creativity": "conservative",
  "realism": "ultra",
  "detailLevel": "masterpiece"
}
```

### Test 2: Pakistani Locations
```json
{
  "count": 5,
  "category": "travel_tourism",
  "creativity": "experimental",
  "realism": "high",
  "detailLevel": "detailed"
}
```

### Test 3: Islamic Art
```json
{
  "count": 3,
  "category": "islamic_art",
  "creativity": "balanced",
  "realism": "high",
  "detailLevel": "masterpiece"
}
```

---

## 🎯 Step 9: Compare Online vs Offline

### Online Response (Gemini API Working):
- Prompts are **unique and varied**
- Include **specific Pakistani details**
- Feature **camera specifications**
- Have **cinematic descriptions**
- Example:
  ```
  "A realistic 33-year-old Pakistani man with neatly styled black hair, 
  a well-groomed beard, warm brown eyes, and a natural wheatish complexion, 
  standing beside a wooden boat on Upper Kachura Lake in Skardu during sunrise..."
  ```

### Offline Response (Fallback Engine):
- Prompts are **generic patterns**
- May **vary less** each time
- Use **template structure**
- Example:
  ```
  "A realistic 33-year-old Pakistani man with natural black hair and warm 
  brown eyes, standing in Hunza Valley during sunset, wearing a traditional kurta..."
  ```

---

## ✅ Troubleshooting Checklist

Before concluding API isn't working:

- [ ] API key is copied exactly (including `AIzaSy...` part)
- [ ] `.env.local` file has correct key
- [ ] Dev server **restarted** after changing `.env.local`
- [ ] API is **enabled** in Google Cloud Console
- [ ] JSON body is **valid** (use Postman's formatter to check)
- [ ] Dev server logs show **no errors**
- [ ] Waited **5+ seconds** for response (Gemini can be slow)
- [ ] Checked **different categories** (not just first one)
- [ ] Tried **GET trending endpoint** (simpler test)

---

## 🚀 If API is Working

Once you confirm API is working in Postman:

1. **Refresh the browser** (Ctrl+Shift+R)
2. Click **"Generate Today's Prompts"** button
3. You should see **unique, varied prompts** appearing
4. **No offline badge** should show

---

## 🔧 If API is NOT Working

If all tests show offline mode:

### Option 1: Use Offline Mode (Recommended for Development)
- Offline engine is fully functional
- All features work without API
- Good for testing UI/UX
- No API costs

### Option 2: Fix Gemini API
- Double-check API key
- Enable API in Google Cloud Console
- Try different model name
- Check API quota limits
- Contact Google support if needed

### Option 3: Alternative Models
If `gemini-1.5-flash` doesn't work, try:
- `gemini-pro`
- `gemini-1.5-pro` (slower but more capable)
- `text-bison-001`

---

## 📞 Debug Commands

Run these in terminal to debug:

```bash
# Check if .env.local exists and has API key
cat .env.local

# Check dev server output for errors
npm run dev

# Kill dev server and restart
# Ctrl+C to stop
npm run dev

# Check for TypeScript errors
npm run type-check

# Check for build errors
npm run build
```

---

## 📊 Summary Table

| Status | Indicator | Solution |
|--------|-----------|----------|
| **API Working** | Unique, detailed prompts in Postman | ✅ Use in production |
| **API Failing** | Generic prompts (offline engine) | Check API key & setup |
| **API Timeout** | Takes 10+ seconds or fails | Check internet, try again |
| **API 404** | Model not found error | Update model name in code |
| **API 403** | Forbidden error | Enable API in Cloud Console |

---

## 🎓 Next Steps

**If API is working:**
1. Test in browser (should show Pakistani male prompts)
2. Try all categories (Mixed Trending, Portraits, Nature, etc.)
3. Adjust creativity/realism/detail levels
4. Deploy to Vercel (API key in env variables)

**If offline mode is preferred:**
1. Leave as is (works great offline)
2. Can still add Gemini API later
3. Perfect for demos without internet

---

**Last Updated:** June 2026  
**Framework:** Next.js 15 + React 18  
**API:** Google Gemini  
**Fallback:** Offline Prompt Engine

