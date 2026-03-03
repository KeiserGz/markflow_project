# MarkFlow Deployment Guide

## Quick Deployment to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications with automatic updates.

### Steps:

1. **Create a Vercel Account**
   - Visit https://vercel.com
   - Click "Sign Up"
   - Choose "Continue with GitHub"

2. **Connect GitHub**
   - Authorize Vercel to access your repositories
   - Select `markflow_project` from the list

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app
   - Your app will be live at a URL like: `markflow-project.vercel.app`

4. **Auto-Deployment**
   - Every time you push to GitHub, Vercel automatically redeploys
   - No additional steps needed!

---

## Alternative Deployment Options

### Netlify

1. Go to https://netlify.com
2. Click "Sign up with GitHub"
3. Authorize and select `markflow_project`
4. Click "Deploy"

### GitHub Pages (Static Export)

Requires modifying `next.config.js` to build as static site (loses some dynamic features).

### Self-Hosted (Node.js Required)

- Railway.app (easy)
- Heroku
- AWS/Google Cloud
- DigitalOcean

---

## After Deployment

### Share Your App

Once deployed, share the Vercel URL with others. Your markdown note app will be live and accessible!

### Custom Domain (Optional)

Both Vercel and Netlify allow connecting custom domains for free.

### Continuous Updates

Just push changes to GitHub, and your deployed app updates automatically.

---

## Vercel Environment Variables (if needed)

Create a `.env.local` file for local testing:

```
NEXT_PUBLIC_API_URL=your-api-url
```

Upload to Vercel through the dashboard if needed.

---

**Questions?** Check Vercel's docs: https://vercel.com/docs
