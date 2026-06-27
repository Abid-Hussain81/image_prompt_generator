# 🚀 Deploy AI Prompt Forge to Vercel - Complete Step-by-Step Guide

Professional AI image prompt generator powered by Google Gemini API. Deploy your app to production in 10 minutes.

---

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ **GitHub Account** (free at [github.com](https://github.com))
- ✅ **Vercel Account** (free at [vercel.com](https://vercel.com), sign up with GitHub)
- ✅ **Google Gemini API Key** (free at [ai.google.dev](https://ai.google.dev))
- ✅ **Project on GitHub** (already done!)

---

## 🔑 Step 1: Get Your Google Gemini API Key

### 1.1 Visit Google AI Studio
- Go to: **https://aistudio.google.com/app/apikeys**
- Or: https://ai.google.dev → Click "Get API Key"

### 1.2 Create API Key
1. Click **"Create API Key"** or **"Create API key in new project"**
2. Select your project
3. Wait for the key to generate
4. **Copy the full key** (looks like: `AIzaSy...`)
5. Save it somewhere safe - you'll need it in Step 4

### ⚠️ Important
- Keep this key **SECRET**
- Never share it publicly
- Never commit it to GitHub
- We'll add it as an environment variable in Vercel

---

## 📦 Step 2: Link Your GitHub Repository to Vercel

### 2.1 Sign In to Vercel
- Go to **https://vercel.com**
- Click **"Sign up"** or **"Log in"**
- Select **"Continue with GitHub"**
- Authorize Vercel to access your GitHub account

### 2.2 Import Your Project
1. After signing in, click **"+ New Project"** (or "Add New")
2. You'll see: "Import Git Repository"
3. Find and click on: **`image_prompt_generator`** (your repo)
4. Click **"Import"**

### 2.3 Configure Project
- **Project Name**: Keep as `image-prompt-generator`
- **Framework**: Should auto-detect **"Next.js"** ✓
- **Root Directory**: Leave blank (default)
- Click **"Continue"**

---

## ⚙️ Step 3: Add Environment Variables

### 3.1 Environment Variables Page
You'll see a section: **"Environment Variables"**

### 3.2 Add Gemini API Key
1. In the **"Name"** field, enter: `GEMINI_API_KEY`
2. In the **"Value"** field, paste: Your API key from Step 1 (the `AIza...` string)
3. Click **"Add"**

Your environment variables should look like:
```
GEMINI_API_KEY = AIzaSy...your...key...here
```

### ✅ Make sure this is added before deploying!

---

## 🚀 Step 4: Deploy to Vercel

### 4.1 Start Deployment
1. Make sure the environment variable is added ✓
2. Click **"Deploy"** button (bottom right)
3. Wait for the deployment to complete (usually 2-3 minutes)

### 4.2 Deployment Success
You'll see a screen showing:
- ✓ Deployment successful
- Your live URL (looks like: `https://image-prompt-generator-xxxx.vercel.app`)
- Visit button to see your app live

### 🎉 Your app is now live!

---

## ✨ Step 5: Test Your Live App

### 5.1 Visit Your App
1. Click the **"Visit"** button or copy your Vercel URL
2. Your app should load with:
   - Hero section with Abid Hussain Shah profile
   - Control panel with generation settings
   - "Generate Today's Prompts" button working
   - All features functional

### 5.2 Test Prompt Generation
1. Click **"Generate"** button
2. Wait 3-5 seconds for API response
3. You should see generated prompts appear

### 5.3 If Prompts Don't Generate
- Check browser console for errors (F12 → Console tab)
- Verify API key is correct in Vercel dashboard
- Check that API key is enabled in Google Cloud Console

---

## 📱 Features After Deployment

Your live AI Prompt Forge includes:

✅ **Prompt Generation**
- Generate 5, 10, or 15 unique prompts
- 16 categories (Cinematic, Portraits, Nature, etc.)
- Creativity, Realism, Detail controls

✅ **Professional Output**
- Pakistani male subject defaults
- Realistic appearance specifications
- Cinematic composition details
- Technical camera specifications

✅ **Export & Save**
- Download as TXT or JSON
- Copy all prompts to clipboard
- Save favorites to browser
- Export favorites as file

✅ **Mobile Friendly**
- Optimized for Android
- Touch-friendly buttons
- Responsive design
- Fast loading

✅ **Daily Trending**
- Auto-generated trending prompts
- 24-hour caching
- Fresh ideas daily

---

## 🔧 Updating Your App

### Update Code on Live App
1. Make changes to your local code
2. Push to GitHub: `git push origin main`
3. Vercel automatically rebuilds and deploys
4. Your live app updates within 1-2 minutes

### Update API Key
1. Go to Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Edit `GEMINI_API_KEY` with new key
5. Click "Save"
6. Go to "Deployments" → Click "..." menu → "Redeploy"

---

## 🛠️ Troubleshooting

### Problem: "API Error: Gemini API is not responding"
**Solution:**
- Verify API key is correct (copy from Google AI Studio again)
- Check API key is added in Vercel environment variables
- Make sure API is enabled: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com

### Problem: "Cannot find module"
**Solution:**
- This is a build error
- Go to Vercel dashboard → Deployments
- Check build logs for details
- Most likely: missing dependency (run `npm install` locally and push)

### Problem: App loads but buttons don't work
**Solution:**
- Open browser console (F12)
- Check for JavaScript errors
- Try hard refresh (Ctrl+Shift+R)
- If errors persist, check GitHub repo for uncommitted changes

### Problem: Prompts take too long to load
**Solution:**
- Gemini API can take 5-10 seconds on first request
- This is normal
- Loading state shows "Generating..." while waiting
- Subsequent requests are faster

---

## 📊 Monitoring Your App

### Check Deployment Status
1. Go to **https://vercel.com/dashboard**
2. Click your project
3. See all deployments and their status

### View Logs
1. Click on a deployment
2. Scroll to "Build Logs"
3. See detailed build information

### Performance Analytics
1. In project settings, click "Analytics"
2. See Web Vitals and performance metrics
3. Monitor usage and errors

---

## 🎯 Next Steps

### Customize Your Deployment
- **Custom Domain**: Go to Settings → Domains to add your own domain
- **Analytics**: Monitor usage in Vercel dashboard
- **Auto-rebuild**: Already enabled - pushes to GitHub auto-deploy

### Share Your App
- Share the Vercel URL with friends/clients
- No account needed to use the app
- Anyone can generate prompts

### Iterate & Improve
- Make changes locally
- Push to GitHub: `git push`
- Vercel auto-deploys in 1-2 minutes
- See changes live immediately

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Google Gemini API**: https://ai.google.dev/docs
- **GitHub Issues**: Post issues in your repo

---

## ✅ Deployment Checklist

Before going live, confirm:

- [ ] GitHub account created and project pushed
- [ ] Vercel account created
- [ ] Google Gemini API key obtained
- [ ] Project imported to Vercel
- [ ] Environment variable `GEMINI_API_KEY` added
- [ ] Deployment completed successfully
- [ ] App loads at Vercel URL
- [ ] "Generate" button works
- [ ] Prompts display correctly
- [ ] Mobile responsive on Android

---

## 🎉 Congratulations!

Your AI Prompt Forge is now live on Vercel! 

**Your App URL:**
```
https://your-project.vercel.app
```

Share this with your audience and start generating professional AI image prompts!

---

**Last Updated:** June 2026
**Framework:** Next.js 15 + React 18
**Hosted On:** Vercel (Free)
**API:** Google Gemini (Free tier)
