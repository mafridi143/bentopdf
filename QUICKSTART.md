# Quick Start: Deploy to Coolify

## ⚡ 3-Step Setup

### 1️⃣ Add GitHub Secrets
Go to: https://github.com/mafridi143/bentopdf/settings/secrets/actions

Add these two secrets:
```
DOCKER_USERNAME = mafridi143
DOCKER_TOKEN = <your-docker-hub-token>
```

Get token from: https://hub.docker.com/settings/security

---

### 2️⃣ Push to Trigger Build
```bash
git add .
git commit -m "Initial setup for auto-deployment"
git push origin main
```

Wait ~5-10 minutes for build to complete.
Check: https://github.com/mafridi143/bentopdf/actions

---

### 3️⃣ Configure Coolify

**In Coolify Dashboard:**
1. New Resource → Docker Image
2. Image: `mafridi143/bentopdf-simple:edge`
3. Port: `8080`
4. Enable: "Watch for new images"
5. Polling: `60` seconds
6. Deploy!

---

## 🎯 Your Images

After build completes, these will be available:

**Docker Hub:**
- `mafridi143/bentopdf:edge`
- `mafridi143/bentopdf-simple:edge`

**GitHub Container Registry:**
- `ghcr.io/mafridi143/bentopdf:edge`
- `ghcr.io/mafridi143/bentopdf-simple:edge`

---

## 🔄 Auto-Update Flow

```
You push to main
    ↓
GitHub Actions builds
    ↓
Pushes to Docker Hub
    ↓
Coolify detects new image
    ↓
Auto-deploys! 🚀
```

---

## 📖 Full Guide
See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete documentation.
