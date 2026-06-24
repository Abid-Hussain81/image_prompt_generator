# Setup Guide - AI Prompt Forge

Complete setup instructions for getting AI Prompt Forge running.

## Prerequisites

- Node.js 18.17 or higher
- npm or yarn package manager
- Google account (for Gemini API)

## Step 1: Get Google Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key" or "Create API Key"
3. Create a new project if needed
4. Select "Create API key in new project"
5. Copy the generated API key

## Step 2: Clone and Install

```bash
# Navigate to project directory
cd "D:\prompt generator"

# Install dependencies
npm install
```

## Step 3: Configure Environment

1. Create `.env.local` file in project root:

```bash
# Copy example
copy .env.example .env.local

# Or manually create with:
GEMINI_API_KEY=your_api_key_here
NEXT_PUBLIC_ENV=development
```

2. Replace `your_api_key_here` with your actual Gemini API key

## Step 4: Verify Setup

```bash
# Check Node version
node --version        # Should be 18.17+

# Check npm
npm --version

# Check dependencies
npm list next react typescript
```

## Step 5: Start Development

```bash
# Start dev server
npm run dev

# Open browser to http://localhost:3000
```

## Step 6: Test Generation

1. Open app at http://localhost:3000
2. Keep default settings
3. Click "Generate Prompts"
4. Wait for 3-5 prompts to generate

## Troubleshooting

### "Module not found" errors
```bash
# Clear cache and reinstall
rm -r node_modules package-lock.json
npm install
```

### Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :3000
kill -9 <PID>
```

### API Key not working
- Verify key is correct: https://ai.google.dev/
- Check `.env.local` file exists
- Restart dev server: `Ctrl+C` then `npm run dev`
- Check API usage limits

### Offline Mode appears
- Check internet connection
- Verify API key is valid
- Check API hasn't hit quota
- System will work offline with fallback generator

## Production Deployment

### Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

During deployment:
1. Connect Git repository (GitHub, GitLab, Bitbucket)
2. Add environment variables in Vercel dashboard
3. Set `GEMINI_API_KEY`
4. Deploy automatically on push

### Environment Variables for Production

In Vercel Dashboard:
- Go to Settings → Environment Variables
- Add `GEMINI_API_KEY` = your key
- Add `NEXT_PUBLIC_ENV` = production

## Configuration Files

### .env.local
```
GEMINI_API_KEY=sk-... (your key)
NEXT_PUBLIC_ENV=development
```

### next.config.ts
Handles:
- React strict mode
- Code minification
- Security headers
- SWC optimization

### tailwind.config.ts
Provides:
- Dark theme colors
- Glassmorphism utilities
- Gradient animations
- Custom spacing/sizing

### tsconfig.json
Enables:
- Strict TypeScript checking
- Path aliases (@/*)
- Modern JavaScript target

## File Structure

```
project/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/                # Backend API routes
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   ├── hooks/                  # Custom hooks (ready for extension)
│   ├── lib/                    # Business logic
│   ├── store/                  # Zustand store
│   ├── types/                  # TypeScript types
│   └── utils/                  # Helper functions
├── package.json                # Dependencies
├── next.config.ts              # Next.js config
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config
├── postcss.config.mjs          # PostCSS config
├── .env.example                # Example env vars
├── .env.local                  # Local env vars (not committed)
├── README.md                   # Documentation
└── SETUP.md                    # This file
```

## Features Testing

### Test Prompt Generation
1. Select category: "Cinematic Photography"
2. Set count: "5 Prompts"
3. Set creativity: "Balanced"
4. Click "Generate Prompts"
5. Should see 5 unique prompts

### Test Favorites
1. Click "Save" (heart icon) on any prompt
2. Navigate to "Saved Favorites" section
3. Should see the prompt listed
4. Favorites persist on page reload

### Test Export
1. Generate prompts
2. Click "Copy All" to copy to clipboard
3. Click "JSON" to download as JSON file
4. Click "Text" to download as TXT file

### Test Trending
1. Page loads automatically with trending prompts
2. Refresh button reloads (cached 24 hours)
3. Offline badge appears if API unavailable

### Test Offline Mode
1. Disconnect internet (or invalid API key)
2. Click "Generate Prompts"
3. Should show "Offline Mode Active" badge
4. Prompts still generate using fallback engine

## Performance Optimization

### Enable Caching
Add to `.env.local`:
```
CACHE_ENABLED=true
CACHE_TTL=86400
```

### Optimize Images
- Already optimized with Tailwind CSS
- Use Next.js Image component for any images

### Monitor Performance
```bash
npm run build
# Check .next/static for bundle size
```

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Rotate API keys** periodically
3. **Use production keys** only in production
4. **Monitor API usage** in Google Cloud Console
5. **Validate inputs** on both client and server
6. **Use HTTPS** only in production

## Next Steps

1. Read [README.md](./README.md) for feature documentation
2. Explore source code in `src/` directory
3. Customize styles in `tailwind.config.ts`
4. Add new categories in `src/types/index.ts`
5. Deploy to Vercel for production use

## Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Google Gemini API](https://ai.google.dev/)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## API Limits

- **Free Tier**: 60 requests per minute
- **Rate Limit**: Check Google AI Studio dashboard
- **Quota**: Subject to Google Gemini API limits

Monitor usage:
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Check API usage metrics
3. Set up billing alerts

---

Need help? Check the README or create an issue on GitHub.
