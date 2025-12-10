# Deployment Guide - Dean's Panel

## Quick Deploy Options

### 1. **Render.com (Recommended - Free)**

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `Sanjai-Kumar-B/AttendX`
4. Configure:
   - **Name:** dean-panel-staff-monitoring
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
5. Click "Create Web Service"
6. Your app will be live at: `https://dean-panel-staff-monitoring.onrender.com`

**Note:** Free tier may spin down with inactivity, first request takes 30-60 seconds.

---

### 2. **Railway.app (Easy & Fast)**

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose `Sanjai-Kumar-B/AttendX`
5. Railway auto-detects Node.js and deploys
6. Get your URL from the deployment dashboard

**Free tier:** $5 credit/month (plenty for this app)

---

### 3. **Vercel (Serverless)**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Follow prompts to deploy. Your app will be live instantly!

---

### 4. **Heroku**

```bash
# Install Heroku CLI first
heroku login
heroku create dean-panel-staff-monitoring
git push heroku main
heroku open
```

---

### 5. **Cyclic.sh (Simplest)**

1. Go to [cyclic.sh](https://cyclic.sh)
2. Click "Connect GitHub"
3. Select `Sanjai-Kumar-B/AttendX`
4. Click "Connect" - Done!

---

## Environment Variables

If needed on deployment platform:
- `PORT` - Automatically set by most platforms
- `NODE_ENV` - Set to `production`

---

## Deployment Checklist

✅ Port configured to use `process.env.PORT || 3000`  
✅ `Procfile` created for Heroku/Render  
✅ `vercel.json` created for Vercel  
✅ `.gitignore` configured  
✅ All code pushed to GitHub  

---

## Post-Deployment

After deployment:
1. Test the live URL
2. Check if department selection works
3. Verify period detection is accurate
4. Test on mobile devices
5. Update README with live demo link

---

## Troubleshooting

**Issue:** App doesn't start  
**Solution:** Check logs on platform dashboard, verify `npm start` works locally

**Issue:** Data not persisting  
**Solution:** Deploy platforms may have ephemeral filesystems. Consider MongoDB/PostgreSQL for persistence.

**Issue:** Slow response  
**Solution:** Free tiers may have cold starts. Upgrade or use Railway/Render paid tier.

---

## Recommended: Render.com

Best balance of:
- ✅ Free tier
- ✅ Easy setup  
- ✅ Auto-deploys from GitHub
- ✅ SSL certificate included
- ✅ No credit card required
