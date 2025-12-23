# 🚀 GitHub Container Registry (ghcr.io) Setup

## ✅ Good News!

Using GitHub Container Registry is **MUCH SIMPLER** than Docker Hub because:
- ✅ **No extra secrets needed** - Uses built-in `GITHUB_TOKEN`
- ✅ **Already configured** - The workflow is ready to go
- ✅ **Free for public repos** - No limits on pulls/pushes
- ✅ **Integrated with GitHub** - All in one place

---

## 🎯 What You Need to Do:

### **Step 1: Make Container Registry Public** (One-time setup)

After the first successful build, you need to make the packages public:

1. **Go to your packages:**
   - Visit: https://github.com/mafridi143?tab=packages
   - Or: Your profile → Packages

2. **For each package** (`bentopdf` and `bentopdf-simple`):
   - Click on the package name
   - Click **"Package settings"** (right sidebar)
   - Scroll down to **"Danger Zone"**
   - Click **"Change visibility"**
   - Select **"Public"**
   - Type the package name to confirm
   - Click **"I understand, change package visibility"**

---

## 🔄 Commit and Push Changes

The workflow is now configured to use **only** ghcr.io. Let's push the changes:

```bash
# Stage changes
git add .

# Commit
git commit -m "Switch to GitHub Container Registry (ghcr.io) for Docker images"

# Push
git push origin main
```

This will trigger a new build that will:
- ✅ Build images for amd64 and arm64
- ✅ Push to ghcr.io (no Docker Hub credentials needed!)
- ✅ Take ~5-10 minutes

---

## 📦 Your Docker Images

After the build completes, your images will be available at:

### **Development (Edge) Builds:**
- `ghcr.io/mafridi143/bentopdf:edge`
- `ghcr.io/mafridi143/bentopdf-simple:edge`
- `ghcr.io/mafridi143/bentopdf:sha-<commit>`
- `ghcr.io/mafridi143/bentopdf-simple:sha-<commit>`

### **Production (Release) Builds:**
When you create a tag (e.g., `v1.0.0`):
- `ghcr.io/mafridi143/bentopdf:latest`
- `ghcr.io/mafridi143/bentopdf:1.0.0`
- `ghcr.io/mafridi143/bentopdf:v1.0.0`
- `ghcr.io/mafridi143/bentopdf-simple:latest`
- `ghcr.io/mafridi143/bentopdf-simple:1.0.0`
- `ghcr.io/mafridi143/bentopdf-simple:v1.0.0`

---

## 🐳 Coolify Setup

### **Option 1: Using Docker Image (Recommended)**

1. In Coolify, create **New Resource** → **Docker Image**
2. Configure:
   ```
   Image: ghcr.io/mafridi143/bentopdf-simple:edge
   Port: 8080
   ```
3. Enable **"Watch for new images"**
4. Set polling interval: `60` seconds
5. Deploy!

### **Option 2: Using GitHub Integration**

1. In Coolify, create **New Resource** → **GitHub App**
2. Select repository: `mafridi143/bentopdf`
3. Configure:
   ```
   Branch: main
   Build Pack: Dockerfile
   Port: 8080
   Registry: ghcr.io
   ```
4. Enable auto-deploy
5. Deploy!

---

## 🔍 Monitoring

### **Check Build Status:**
- GitHub Actions: https://github.com/mafridi143/bentopdf/actions

### **View Your Packages:**
- Your packages: https://github.com/mafridi143?tab=packages
- Package details: https://github.com/users/mafridi143/packages/container/bentopdf

### **Pull Statistics:**
Once public, you can see download stats in the package settings.

---

## 🎯 Workflow Summary

```
You push to main
    ↓
GitHub Actions builds
    ↓
Pushes to ghcr.io (automatic, no secrets needed!)
    ↓
Coolify detects new image
    ↓
Auto-deploys! 🚀
```

---

## 🔐 Authentication (If Needed)

If you need to pull private images or authenticate:

```bash
# Login to ghcr.io
echo $GITHUB_TOKEN | docker login ghcr.io -u mafridi143 --password-stdin

# Pull image
docker pull ghcr.io/mafridi143/bentopdf-simple:edge
```

For Coolify, if the package is private:
1. Create a GitHub Personal Access Token with `read:packages` scope
2. Add it to Coolify as a registry credential

---

## 📊 Advantages of ghcr.io

✅ **No rate limits** for public images  
✅ **Integrated with GitHub** - Same authentication  
✅ **Free for public repos** - Unlimited storage and bandwidth  
✅ **Multi-arch support** - amd64 and arm64  
✅ **Fast CDN** - Global distribution  
✅ **Version control** - Linked to your commits and releases  

---

## 🛠️ Local Testing

Test pulling the image locally:

```bash
# Pull the image
docker pull ghcr.io/mafridi143/bentopdf-simple:edge

# Run it
docker run -p 8080:8080 ghcr.io/mafridi143/bentopdf-simple:edge

# Or use docker-compose
docker-compose up
```

---

## 📝 Next Steps

1. ✅ Commit and push the changes
2. ✅ Wait for GitHub Actions to complete (~5-10 min)
3. ✅ Make packages public (see Step 1 above)
4. ✅ Configure Coolify to use `ghcr.io/mafridi143/bentopdf-simple:edge`
5. ✅ Enjoy automatic deployments! 🎉

---

## 🔗 Quick Links

- **GitHub Actions:** https://github.com/mafridi143/bentopdf/actions
- **Your Packages:** https://github.com/mafridi143?tab=packages
- **Workflow File:** [.github/workflows/build-and-publish.yml](.github/workflows/build-and-publish.yml)
- **Docker Compose:** [docker-compose.yml](docker-compose.yml)
