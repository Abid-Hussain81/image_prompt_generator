# Deployment Guide - AI Prompt Forge

Complete guide for deploying AI Prompt Forge to production.

## Pre-Deployment Checklist

- [ ] Test locally with `npm run dev`
- [ ] Build with `npm run build` (verify no errors)
- [ ] Test production build with `npm start`
- [ ] Have Google Gemini API key
- [ ] Have a GitHub/GitLab account
- [ ] Set up Vercel account

## Deploy to Vercel (Recommended)

### Method 1: Via Vercel Dashboard (Easiest)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit: AI Prompt Forge"
git remote add origin https://github.com/YOUR_USERNAME/ai-prompt-forge.git
git push -u origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select "ai-prompt-forge" repo

3. **Configure Environment**
   - In Vercel dashboard: Settings → Environment Variables
   - Add: `GEMINI_API_KEY` = your key
   - Add: `NEXT_PUBLIC_ENV` = production

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Get production URL

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts to configure
```

## Deploy to Other Platforms

### Docker

1. **Build Docker image**
```bash
docker build -t ai-prompt-forge .
```

2. **Run locally**
```bash
docker run -p 3000:3000 \
  -e GEMINI_API_KEY=your_key \
  -e NEXT_PUBLIC_ENV=production \
  ai-prompt-forge
```

3. **Push to registry**
```bash
docker tag ai-prompt-forge:latest username/ai-prompt-forge:latest
docker push username/ai-prompt-forge:latest
```

### AWS (EC2/App Runner)

1. **Create Dockerfile** (already in project)

2. **Build and push**
```bash
aws ecr get-login-password | docker login --username AWS --password-stdin <ECR_URI>
docker build -t ai-prompt-forge .
docker tag ai-prompt-forge:latest <ECR_URI>/ai-prompt-forge:latest
docker push <ECR_URI>/ai-prompt-forge:latest
```

3. **Deploy with App Runner**
   - AWS Console → App Runner
   - Create application
   - Select ECR image
   - Set environment variables
   - Deploy

### Google Cloud Run

1. **Build and push to Artifact Registry**
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/ai-prompt-forge
```

2. **Deploy**
```bash
gcloud run deploy ai-prompt-forge \
  --image gcr.io/PROJECT_ID/ai-prompt-forge \
  --region us-central1 \
  --set-env-vars GEMINI_API_KEY=your_key
```

### DigitalOcean App Platform

1. **Connect GitHub**
   - Visit DigitalOcean App Platform
   - Connect GitHub account
   - Select repository

2. **Configure**
   - Framework: Node.js
   - Build command: `npm ci && npm run build`
   - Start command: `npm start`

3. **Environment**
   - Add `GEMINI_API_KEY`
   - Add `NEXT_PUBLIC_ENV=production`

4. **Deploy**
   - Click Deploy

## Post-Deployment

### Verify Deployment

1. **Health Check**
```bash
curl https://your-domain.com/api/trending-prompts
# Should return JSON with prompts
```

2. **Test Full Flow**
   - Visit production URL
   - Generate prompts
   - Test favorites
   - Test export
   - Check console for errors

3. **Monitor Performance**
   - Check Lighthouse score
   - Monitor API latency
   - Track error rates

### Production Environment Variables

| Variable | Value | Required |
|----------|-------|----------|
| `GEMINI_API_KEY` | Your API key | Yes |
| `NEXT_PUBLIC_ENV` | production | Yes |
| `NODE_ENV` | production | Auto |

### Enable Security Features

1. **HTTPS**
   - Vercel: Automatic
   - Custom domain: Configure DNS

2. **Security Headers** (Add to next.config.ts)
```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
      ],
    },
  ]
}
```

## Monitoring & Maintenance

### Set Up Monitoring

1. **Application Performance**
   - Vercel Analytics (built-in)
   - Monitor response times
   - Track errors

2. **API Usage**
   - Google Cloud Console
   - Set up billing alerts
   - Monitor quota usage

3. **Uptime Monitoring**
   - Use Uptime Robot or similar
   - Monitor `/api/trending-prompts`
   - Set up alerts

### Logging

```bash
# View Vercel logs
vercel logs production

# Or in Vercel dashboard
# Deployments → Select deployment → Logs
```

### Database/Cache

Currently using:
- In-memory cache (trending prompts)
- Browser localStorage (favorites)

For scaling:
- Add Redis for distributed cache
- Add database for user accounts

## Update & Rollback

### Deploy Updates

```bash
git commit -am "Update: feature description"
git push origin main

# Vercel auto-deploys on push
# Check: vercel.com → deployments
```

### Rollback to Previous Version

```bash
# Via Vercel dashboard
# Deployments → Select previous → Click "..." → Promote to Production

# Or via CLI
vercel --prod --env GEMINI_API_KEY=your_key
```

## Performance Optimization

### Caching Strategy

- **Trending prompts**: 24 hours (configured)
- **Static assets**: 1 year
- **API responses**: Query-based

### Database Connection Pooling

If adding database:
```typescript
// Add connection pooling
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
```

### CDN Configuration

Vercel automatically:
- Caches static files
- Minifies assets
- Optimizes images
- Uses edge functions

## Scaling Considerations

### When to Scale

- Trending prompts need database caching
- Multiple servers needed: Add database
- High traffic: Implement queue system

### Add Database (PostgreSQL)

```typescript
// Example: Add to geminiClient.ts
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
```

### Implement Rate Limiting

```typescript
// Add rate limiting middleware
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 h'),
})
```

## Disaster Recovery

### Backup Strategy

1. **Code**: GitHub repository
2. **Configuration**: Environment variables in Vercel
3. **User data**: localStorage (client-side)

### Business Continuity

- Multiple API keys (rotate regularly)
- Offline fallback always active
- No critical user data in backend

## Security in Production

1. **API Key Security**
   - Rotate keys quarterly
   - Use different keys per environment
   - Monitor for unauthorized access

2. **Input Validation**
   - All inputs validated server-side
   - XSS protection via React
   - CSRF tokens (if adding forms)

3. **CORS Configuration**
   - Restrict to your domain
   - Review in next.config.ts

4. **Secrets Management**
   - Never commit `.env.local`
   - Use Vercel secrets manager
   - Audit access logs

## Cost Optimization

### Vercel Pricing
- Hobby: Free (limited)
- Pro: $20/month
- Enterprise: Custom

### Google Gemini API
- Pay-per-request model
- ~$0.075 per 1M input tokens
- ~$0.30 per 1M output tokens

### Estimate Monthly Cost
```
500 requests × 2000 tokens avg = 1M tokens
1M tokens × $0.075 = $75/month (rough estimate)
+ Vercel Pro: $20
= ~$95/month
```

## Troubleshooting Production Issues

### 500 Error
```bash
# Check logs
vercel logs production

# Common causes:
# - Missing environment variable
# - API key invalid
# - Database connection error
```

### Slow Response
```bash
# Check performance
# Vercel dashboard → Analytics
# Google Cloud Console → Metrics

# Solutions:
# - Add caching
# - Optimize API queries
# - Use edge functions
```

### API Quota Exceeded
```bash
# View usage
# Google Cloud Console → Gemini API

# Solutions:
# - Upgrade API plan
# - Implement caching
# - Add rate limiting
```

## Success Metrics

Track these in production:

- **Availability**: 99.9%+
- **Response Time**: < 2s
- **Error Rate**: < 0.1%
- **API Usage**: Monitor quota
- **User Satisfaction**: Feedback form

---

**Deployment Complete!** Your AI Prompt Forge is live. 🚀

Questions? Check logs or review platform-specific documentation.
