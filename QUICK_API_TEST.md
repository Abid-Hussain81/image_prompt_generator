# ⚡ Quick API Test - 5 Minutes

If the app is showing **"offline mode"**, use this quick guide to test the API in Postman.

---

## 🚀 Why Offline Mode?

The app automatically switches to offline mode when:
1. Gemini API key is incorrect or invalid
2. API endpoint is unreachable  
3. Wrong model name is specified
4. API quota exceeded

**The fix:** Test in Postman to identify which of these is the problem.

---

## 📱 Open Postman

1. **Launch Postman**
2. Create **New → Request**
3. Follow the steps below

---

## ✅ Test 1: Simple API Test (30 seconds)

### URL
```
POST http://localhost:3000/api/trending-prompts
```

### Steps:
1. Change method to **GET** (not POST)
2. URL: `http://localhost:3000/api/trending-prompts`
3. Click **"Send"**

### ✅ Success (You'll See):
```json
{
  "success": true,
  "prompts": [
    "A realistic 33-year-old Pakistani man with...",
    "A 32-year-old South Asian..."
  ],
  "category": "mixed_trending",
  "generatedAt": "2026-06-27T..."
}
```

### ❌ Problem (You'll See):
Generic offline prompts (templated format)

---

## ✅ Test 2: Generate Prompts Test (60 seconds)

### URL & Method
```
POST http://localhost:3000/api/generate-prompts
```

### Steps:

1. **Method:** Change to `POST`
2. **URL:** `http://localhost:3000/api/generate-prompts`
3. **Headers tab:** 
   - Key: `Content-Type`
   - Value: `application/json`
   
4. **Body tab:**
   - Select `raw`
   - Select `JSON` format
   - Paste:

```json
{
  "count": 5,
  "category": "mixed_trending",
  "creativity": "balanced",
  "realism": "high",
  "detailLevel": "detailed"
}
```

5. **Click "Send"**

### ✅ Success Response:
```json
{
  "success": true,
  "prompts": [
    "A realistic 33-year-old Pakistani man with neatly styled black hair, a well-groomed beard, warm brown eyes, and a natural wheatish complexion, standing beside a wooden boat on Upper Kachura Lake in Skardu during sunrise. Wearing a navy blue kurta with a traditional waistcoat. Captured on a Sony A7R V using an 85mm f/1.4 lens...",
    ...
  ],
  "category": "mixed_trending",
  "generatedAt": "2026-06-27T12:34:56.789Z"
}
```

### ❌ Offline Response:
More generic, templated prompts

---

## 🔍 Quick Diagnosis

### Response Time?
- **3-5 seconds** = API is working ✅
- **Instant/very fast** = Offline engine ❌
- **10+ seconds or timeout** = Check internet

### Prompt Quality?
- **Very detailed, specific Pakistani details** = API ✅
- **Generic templates, repeating pattern** = Offline ❌
- **Unique each time** = API ✅

---

## 🔧 If Offline Mode is Active

### Problem 1: Wrong API Key

**Check:**
```bash
# In terminal, go to your project folder
cat .env.local
```

You should see:
```
GEMINI_API_KEY=AIzaSy...long...key...here
```

**If missing or wrong:**
1. Go to: https://aistudio.google.com/app/apikeys
2. Copy your key (it starts with `AIzaSy`)
3. Update `.env.local` file
4. **Restart dev server** (`npm run dev`)

### Problem 2: API Not Enabled

1. Go to: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
2. Click **"Enable"**
3. Wait 2 minutes
4. Restart dev server

### Problem 3: Check Dev Server Logs

Open the terminal where you run `npm run dev`:

```
✓ Ready in 5.2s
GET /api/generate-prompts 200 in 3500ms  ← API is working ✅

OR

Gemini API error: [404 Not Found]  ← API problem ❌
Using offline prompt generator (API failed)
```

---

## 📋 Test Variations

### Test Pakistani Category
```json
{
  "count": 3,
  "category": "cinematic_photography",
  "creativity": "balanced",
  "realism": "high",
  "detailLevel": "masterpiece"
}
```

### Test Ultra Realism
```json
{
  "count": 5,
  "category": "ultra_realistic_portraits",
  "creativity": "conservative",
  "realism": "ultra",
  "detailLevel": "masterpiece"
}
```

### Test Islamic Art
```json
{
  "count": 3,
  "category": "islamic_art",
  "creativity": "experimental",
  "realism": "high",
  "detailLevel": "detailed"
}
```

---

## ✅ Conclusion

**If all tests work (3-5 second response):**
- API is configured correctly ✅
- Refresh browser and try again
- The app should show unique prompts

**If offline mode persists:**
- App uses offline engine as fallback
- This is actually good for development!
- Can work on UI/UX without API costs
- Real Gemini API testing can happen later

---

**See full guide:** `POSTMAN_TESTING_GUIDE.md`

