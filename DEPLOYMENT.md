# 🚀 Taskify Deployment Guide

## Prerequisites
- GitHub account
- MongoDB Atlas account (free tier available)
- Vercel account (for frontend)
- Railway/Heroku account (for backend)

## Step 1: Push to GitHub

### Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `taskify` or `taskify-task-manager`
3. Make it public or private (your choice)
4. Don't initialize with README (we already have one)

### Push Your Code
```bash
# Add remote origin (replace with your GitHub URL)
git remote add origin https://github.com/yourusername/taskify.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Set Up MongoDB Atlas

### Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user
5. Get your connection string

### Connection String Format
```
mongodb+srv://username:password@cluster.mongodb.net/taskify?retryWrites=true&w=majority
```

## Step 3: Deploy Backend (Railway)

### Option A: Railway (Recommended)
1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your Taskify repository
5. Set root directory to `server`
6. Add environment variables:
   - `MONGODB_URI`: Your Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `PORT`: 5000 (or leave default)
7. Deploy!

### Option B: Heroku
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create taskify-backend`
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI="your-atlas-connection-string"
   heroku config:set JWT_SECRET="your-secure-jwt-secret"
   ```
5. Deploy: `git push heroku main`

## Step 4: Deploy Frontend (Vercel)

### Deploy with Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Set build settings:
   - Framework Preset: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variable:
   - `VITE_REACT_APP_API_URL`: Your backend URL (e.g., `https://taskify-backend.railway.app/api`)
7. Deploy!

## Step 5: Update Frontend API Configuration

### Update API Base URL
In `client/src/api/axios.js`, update the base URL:
```javascript
const api = axios.create({
  baseURL: process.env.VITE_REACT_APP_API_URL || "https://your-backend-url.com/api",
  withCredentials: true,
});
```

## Step 6: Test Your Deployment

### Test Checklist
- [ ] Frontend loads correctly
- [ ] Can register new admin account
- [ ] Can register new employee account
- [ ] Can login with both roles
- [ ] Can create tasks (admin)
- [ ] Can assign tasks to all employees (admin)
- [ ] Can update task status (employee)
- [ ] All features work as expected

## Step 7: Custom Domain (Optional)

### Add Custom Domain
1. **Frontend (Vercel)**:
   - Go to project settings
   - Add your domain
   - Update DNS records

2. **Backend (Railway)**:
   - Go to project settings
   - Add custom domain
   - Update DNS records

## Environment Variables Summary

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskify
JWT_SECRET=your-super-secure-jwt-secret-key
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_REACT_APP_API_URL=https://your-backend-url.com/api
```

## Troubleshooting

### Common Issues
1. **CORS Errors**: Make sure backend allows your frontend domain
2. **Database Connection**: Verify MongoDB Atlas connection string
3. **Build Failures**: Check Node.js version compatibility
4. **Environment Variables**: Ensure all required variables are set

### Debug Commands
```bash
# Check backend logs
railway logs

# Check frontend build
npm run build

# Test API locally
curl https://your-backend-url.com/api/tasks
```

## Security Considerations

### Production Security
- Use strong JWT secrets
- Enable MongoDB Atlas IP whitelist
- Use HTTPS for all connections
- Regularly update dependencies
- Monitor for security vulnerabilities

## Monitoring & Maintenance

### Keep Your App Running
- Monitor Railway/Heroku logs
- Set up uptime monitoring
- Regular database backups
- Update dependencies monthly
- Monitor performance metrics

---

🎉 **Congratulations! Your Taskify app is now live!**

Share your deployed app with the world and start managing tasks efficiently!
