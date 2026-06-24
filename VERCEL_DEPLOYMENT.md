# Deploy AI Prompt Forge to Vercel - Complete Guide

This guide walks you through deploying AI Prompt Forge to Vercel step-by-step. The deployment is straightforward and takes about 10 minutes.

## Prerequisites

Before you start, make sure you have:

- ✅ GitHub account (free at [github.com](https://github.com))
- ✅ Vercel account (free at [vercel.com](https://vercel.com))
- ✅ Google Gemini API key (free at [ai.google.dev](https://ai.google.dev))
- ✅ Project pushed to GitHub (already done!)

## Step 1: Prepare Your GitHub Repository

Your project is already pushed to GitHub at:
```
https://github.com/Abid-Hussain81/image_prompt_generator
```

**Verify your repository is public:**
1. Go to your GitHub repo
2. Click **Settings** → **General**
3. Ensure "Public" is selected (or make it public for Vercel to access)

## Step 2: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub account
5. Complete signup

## Step 3: Import Your Project to Vercel

### Method 1: Direct Import (Recommended)

1. Log in to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Click **Import Git Repository**
4. Search for `image_prompt_generator`
5. Click **Import**

### Method 2: Via GitHub App

1. Go to your GitHub repo settings
2. Install [Vercel GitHub App](https://github.com/apps/vercel)
3. Select your repository
4. Click **Install & Authorize**

## Step 4: Configure Environment Variables

After clicking Import, you'll see the project configuration page.

**Add Environment Variables:**

1. Scroll to **Environment Variables** section
2. Click **Add New**
3. Add the following:

| Name | Value | Scope |
|------|-------|-------|
| `GEMINI_API_KEY` | Your API key | Production, Preview, Development |
| `NEXT_PUBLIC_ENV` | production | Production, Preview, Development |

**To get your Gemini API key:**
1. Go to [ai.google.dev](https://ai.google.dev)
2. Click **Get Started** or **API Console**
3. Create a new project
4. Enable the Generative AI API
5. Create an API key
6. Copy the key and paste it into Vercel

### Example Configuration

```
GEMINI_API_KEY = AIzaSyBMa6RcwjyzvJ7ZMtKSpn06bACh_dcFBbw
NEXT_PUBLIC_ENV = production
```

## Step 5: Deploy

1. Review the build settings (should auto-detect Next.js):
   - **Framework**: Next.js
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

2. Click **Deploy**

3. Wait for deployment to complete (2-5 minutes)

4. You'll see **Congratulations!** when done

5. Click **Visit** to see your live site!

## Step 6: Verify Your Deployment

Once deployed:

1. **Check the live site** - Click the URL provided
2. **Test the interface**:
   - Select a category
   - Click "Generate"
   - Verify prompts appear
   - Try downloading a prompt
   - Save to favorites

3. **Check for errors**:
   - Open browser DevTools (F12)
   - Check Console tab
   - Report any errors in Vercel dashboard

## Your Live Site

After successful deployment, your site will be live at:

```
https://image-prompt-generator-[random].vercel.app
```

**Or with a custom domain** (optional - covered below)

## Optional: Add a Custom Domain

To use your own domain (e.g., `prompts.example.com`):

1. Go to Vercel Dashboard → Your Project → **Settings**
2. Click **Domains**
3. Enter your domain name
4. Click **Add**
5. Follow DNS instructions for your domain registrar:
   - Add CNAME record pointing to Vercel
   - Or update nameservers (easier option)
6. Wait 24-48 hours for DNS propagation
7. Your site will be available at your custom domain

## Environment Variables Explained

### `GEMINI_API_KEY`
- **Purpose**: Authenticates with Google Gemini API
- **Where to get**: [ai.google.dev/api/keys](https://ai.google.dev/api/keys)
- **Security**: Kept secret (never exposed in frontend)
- **Can change**: Yes, update in Vercel dashboard

### `NEXT_PUBLIC_ENV`
- **Purpose**: Indicates environment type
- **Values**: `development`, `production`
- **Note**: `NEXT_PUBLIC_` prefix makes it available in browser
- **Can change**: Yes, update and redeploy

## Monitoring Your Deployment

### Vercel Dashboard
- Go to [vercel.com/dashboard](https://vercel.com/dashboard)
- Click your project
- View:
  - **Deployments**: See all deployment history
  - **Analytics**: Track performance metrics
  - **Functions**: Monitor API routes
  - **Logs**: View build and runtime logs

### View Logs
1. Go to project dashboard
2. Click **Deployments**
3. Click the deployment you want to check
4. Click **Logs** to see build and runtime output

### Performance Metrics
1. Go to project → **Analytics**
2. View:
   - Page load times
   - API response times
   - Error rates
   - Traffic patterns

## Updating Your Site

### Make Code Changes

1. Make changes locally in your editor
2. Test with `npm run dev`
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```
4. Vercel automatically deploys on push!
5. View deployment status in Vercel dashboard

### Update Environment Variables

1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Environment Variables**
3. Edit the value
4. Click **Save**
5. Vercel automatically redeplooys
6. No code change needed!

## Troubleshooting

### "Cannot find module" Error
**Solution**: Clear cache and redeploy
1. Go to Vercel dashboard
2. Click **Deployments**
3. Click the three dots on the failed deployment
4. Click **Redeploy**

### Deployment Takes Too Long
**Solution**: Check build logs
1. Go to failed deployment
2. Click **Logs**
3. Look for the error message
4. Fix and commit
5. Push again

### API Key Not Working
**Checklist**:
- [ ] API key is correct (copy-paste from ai.google.dev)
- [ ] API key is set in Vercel environment variables
- [ ] Generative AI API is enabled in Google Cloud Console
- [ ] Environment variable name is exactly `GEMINI_API_KEY`

### Site Shows Offline Mode
**Usually means**:
- API key is invalid or expired
- API quota exceeded
- Network issue (site still works with offline fallback!)

**Fix**:
- Check API key in Vercel dashboard
- Verify API key hasn't been rotated
- Check Google Cloud Console quota

### 404 Error on Subpages
This app is single-page, so all routes go to `/
- If you see 404, click browser back button
- This is normal for Next.js deployment

### Favorites Not Saving
**Cause**: localStorage works offline only
**Solution**: This is by design - localStorage is browser-based

## Performance Tips

### Optimize Bundle Size
1. Keep dependencies updated:
   ```bash
   npm update
   ```

2. Monitor bundle:
   ```bash
   npm run build
   ```
   Check the output for bundle size

### Improve Cold Start Times
- Vercel serverless functions are automatically optimized
- First API call may take 1-2s (cold start)
- Subsequent calls are instant

### Content Delivery
- Vercel CDN automatically caches static assets
- Images cached globally
- No additional configuration needed

## Security Best Practices

### Never Commit Secrets
✅ Do:
- Use environment variables in Vercel
- Add `.env.local` to `.gitignore` (already done)
- Rotate API keys periodically

❌ Don't:
- Commit API keys to GitHub
- Paste keys in comments or issues
- Share `.env.local` file

### Verify HTTPS
- ✅ Vercel automatically provides HTTPS
- All traffic is encrypted
- Your site URL will be `https://...`

### Monitor API Usage
- Check Google Cloud Console for API quota
- Set up billing alerts to avoid surprises
- Free tier includes generous quota

## Rollback to Previous Deployment

If something goes wrong after deploying:

1. Go to Vercel Dashboard → Your Project
2. Click **Deployments**
3. Find the previous working deployment
4. Click the three dots
5. Click **Promote to Production**
6. Your site reverts immediately

## Delete Your Deployment

To remove your site from Vercel:

1. Go to Dashboard → Your Project
2. Click **Settings** → **Danger Zone**
3. Click **Delete Project**
4. Confirm deletion
5. Your site is removed

## FAQ

### Q: Is it really free?
**A**: Yes! Vercel's free tier includes:
- Unlimited deployments
- Serverless functions (API routes)
- Global CDN
- HTTPS certificate
- No credit card required

### Q: Will my site go down?
**A**: No. Vercel has 99.99% uptime SLA. Your site stays online.

### Q: Can I use a custom domain?
**A**: Yes! Premium feature, but domain registration is separate (Namecheap, GoDaddy, etc.)

### Q: How do I add new features?
**A**: 
1. Make code changes locally
2. Test with `npm run dev`
3. Push to GitHub
4. Vercel auto-deploys

### Q: What if the API quota is exceeded?
**A**: 
- Offline fallback activates automatically
- App still works with local prompt generation
- Users won't notice the difference

### Q: Can I use different API providers?
**A**: Yes, but would require code changes:
- Replace `@google/generative-ai` with another provider
- Update API route logic
- Recommended to keep current setup (working well)

## Support & Resources

### Vercel Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables Guide](https://vercel.com/docs/environment-variables)

### Google Gemini API
- [Getting Started](https://ai.google.dev/tutorials/setup)
- [API Reference](https://ai.google.dev/api/python/google/generativeai)
- [Pricing](https://ai.google.dev/pricing)

### Troubleshooting
- Check Vercel status page: [status.vercel.com](https://status.vercel.com)
- GitHub issues for this project
- Vercel support dashboard

## Congratulations! 🎉

Your AI Prompt Forge is now live on the internet! 

**Next steps:**
1. ✅ Share your site with others
2. ✅ Monitor performance in Vercel dashboard
3. ✅ Track API usage and quota
4. ✅ Make updates and improvements
5. ✅ Consider adding a custom domain

---

**Questions or issues?** Check the troubleshooting section above or refer to Vercel's documentation.

**Happy prompting! 🚀✨**
