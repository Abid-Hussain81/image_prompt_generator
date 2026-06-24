# Quick Start - AI Prompt Forge

Get up and running in 5 minutes.

## 1. Get API Key (1 min)

1. Go to https://ai.google.dev/
2. Click "Get API Key"
3. Create new project or use existing
4. Copy the API key

## 2. Install Dependencies (2 min)

```bash
# Navigate to project
cd "D:\prompt generator"

# Install
npm install
```

## 3. Configure (1 min)

```bash
# Create .env.local
echo GEMINI_API_KEY=your_api_key_here > .env.local
echo NEXT_PUBLIC_ENV=development >> .env.local
```

Replace `your_api_key_here` with your actual key.

## 4. Run Dev Server (< 1 min)

```bash
npm run dev
```

Opens automatically at http://localhost:3000

## 5. Test It!

1. **Generate Prompts**
   - Keep default settings
   - Click "Generate Prompts"
   - See 5 prompts appear

2. **Save a Favorite**
   - Click heart icon on any prompt
   - View in "Saved Favorites" below

3. **Export Prompts**
   - Click "Copy All", "JSON", or "Text"
   - Download your prompts

4. **Check Trending**
   - Scroll up to see today's trending prompts
   - Auto-loaded on page load

Done! 🎉

## Common Issues

### "Cannot find module" error
```bash
npm install
npm run dev
```

### API not working
- Check API key is correct
- Restart server: Ctrl+C then `npm run dev`
- Check .env.local exists

### Port 3000 in use
```bash
npm run dev -- -p 3001
```

## Next Steps

1. **Read docs**: `README.md` for full features
2. **Deploy**: `DEPLOYMENT.md` for production
3. **Customize**: Edit `tailwind.config.ts` for styles
4. **Extend**: Add more categories in `src/types/index.ts`

## Project Files Overview

```
Key files:
├── package.json              # Dependencies
├── .env.local               # Your API key (create this)
├── src/app/page.tsx         # Main page
├── src/api/route.ts         # Backend logic
├── src/components/          # React components
└── tailwind.config.ts       # Styling
```

## Available Commands

```bash
npm run dev          # Start development (this one!)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Check for errors
npm run type-check   # Check TypeScript
```

## Features at a Glance

- ✅ Generate 5, 10, or 15 prompts
- ✅ 16 different categories
- ✅ Adjust creativity, realism, detail
- ✅ Save favorites locally
- ✅ Export as JSON or TXT
- ✅ Daily trending prompts
- ✅ Works offline with fallback
- ✅ Dark beautiful UI
- ✅ Mobile responsive

## API Endpoints

```
POST /api/generate-prompts
GET  /api/trending-prompts
```

Both return JSON with prompts.

## Offline Mode

If internet is down or API key invalid:
- Yellow "Offline Mode" badge appears
- Prompts still generate using fallback engine
- Everything works normally

## Keyboard Shortcuts

(Ready to add - modify `src/app/page.tsx`)

## Tips & Tricks

1. **Experiment with settings**
   - Conservative = predictable
   - Experimental = creative
   - Ultra realism = detailed

2. **Trending prompts auto-refresh**
   - Cached 24 hours
   - Click refresh to reload
   - Mix different categories

3. **Favorites are persistent**
   - Save between sessions
   - Export anytime
   - Share via JSON file

4. **Copy prompts to clipboard**
   - Click "Copy" on any prompt
   - Click "Copy All" for batch

## Production Checklist

Before deploying:
- [ ] Test locally with `npm run dev`
- [ ] Build with `npm run build`
- [ ] Get Gemini API key
- [ ] Set up Vercel account
- [ ] Deploy: See `DEPLOYMENT.md`

## Support

- 📖 Read `README.md` for documentation
- 🚀 See `DEPLOYMENT.md` for production
- ⚙️ Check `SETUP.md` for detailed setup
- 💬 Create GitHub issue for problems

---

That's it! You're ready to generate amazing prompts. 🚀✨

Questions? Start with the README or SETUP guide.
