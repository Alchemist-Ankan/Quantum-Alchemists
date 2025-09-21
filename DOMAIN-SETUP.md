# 🌐 Domain Configuration Guide for MindBridge Coach

## 🎯 **Current Domain**
**Live URL**: https://quantum-alchemists-jrusiaqes-ankan-sarkars-projects.vercel.app

## 🔄 **Domain Change Options**

### **Option 1: Better Vercel Subdomain** (Free)
Change to a cleaner subdomain like:
- `mindbridge-coach.vercel.app`
- `mind-bridge.vercel.app`
- `wellness-coach.vercel.app`

### **Option 2: Custom Domain** (Requires Domain Purchase)
Use your own domain like:
- `mindbridge-coach.com`
- `mindwellness.app`
- `yourname-mindbridge.com`

## 📋 **How to Change Domain**

### 🆓 **Method 1: Change Vercel Subdomain (Free)**

**Step 1: Go to Vercel Dashboard**
1. Visit: https://vercel.com/dashboard
2. Click on your project: "quantum-alchemists"
3. Go to **Settings** → **Domains**

**Step 2: Add New Domain**
1. Click **"Add Domain"**
2. Enter desired subdomain: `mindbridge-coach.vercel.app`
3. Click **"Add"**
4. Set as primary domain if desired

**Step 3: Update Project Name (Optional)**
1. Go to **Settings** → **General**
2. Change project name to: `mindbridge-coach`
3. This will update the default domain

### 💰 **Method 2: Custom Domain (Paid)**

**Step 1: Buy a Domain**
Popular registrars:
- **Namecheap** (~$10-15/year)
- **GoDaddy** (~$12-20/year)
- **Google Domains** (~$12/year)
- **Vercel Domains** (integrated with dashboard)

**Step 2: Add Custom Domain to Vercel**
1. In Vercel Dashboard → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your custom domain: `yourdomain.com`
4. Follow DNS configuration instructions

**Step 3: Configure DNS**
Vercel will provide DNS settings to add to your domain registrar.

## 🚀 **Recommended Domain Names for Hackathon**

### **Free Vercel Options:**
- `mindbridge-coach.vercel.app` ⭐ (Best match)
- `mental-wellness-ai.vercel.app`
- `mood-tracker-ai.vercel.app`
- `wellness-companion.vercel.app`

### **Custom Domain Ideas:**
- `mindbridge-coach.com` ⭐
- `mentalhealthai.app`
- `moodcompanion.io`
- `wellnessbridge.app`

## 🔧 **Quick Setup via CLI**

You can also change the project name via CLI:

```bash
# Change project name (affects default domain)
vercel --name mindbridge-coach --prod

# This will create: mindbridge-coach.vercel.app
```

## 📊 **Domain for Firebase OAuth**

**Important**: After changing domain, you need to:

**Step 1: Update Firebase Authorized Domains**
1. Go to Firebase Console: https://console.firebase.google.com/project/mind-bridge-f020f
2. **Authentication** → **Settings** → **Authorized Domains**
3. **Add your new domain**: `mindbridge-coach.vercel.app`
4. **Remove old domain** if desired

**Step 2: Test Authentication**
- Visit new domain
- Test Google OAuth login
- Verify it works correctly

## 🎯 **Recommendation for Hackathon**

**Best Option**: Change to `mindbridge-coach.vercel.app`

**Why:**
- ✅ **Free** - No additional cost
- ✅ **Professional** - Clean, memorable URL
- ✅ **Fast** - Can be done in 2 minutes
- ✅ **Perfect for Demo** - Easy for judges to remember
- ✅ **Brandable** - Matches your app name

## 📱 **Steps to Change to mindbridge-coach.vercel.app**

**Method A: Via Dashboard (Recommended)**
1. Go to: https://vercel.com/dashboard
2. Click "quantum-alchemists" project
3. **Settings** → **General** → Change project name to `mindbridge-coach`
4. **Settings** → **Domains** → Add `mindbridge-coach.vercel.app`
5. Update Firebase authorized domains

**Method B: Via CLI**
```bash
vercel --name mindbridge-coach --prod
```

## 🌟 **Final Result**

After changing, your app will be available at:
**https://mindbridge-coach.vercel.app** ⭐

Much cleaner and more professional for hackathon presentation!

---

## 🔗 **Current Live App**
**Active URL**: https://quantum-alchemists-jrusiaqes-ankan-sarkars-projects.vercel.app

**New URL** (after change): https://mindbridge-coach.vercel.app