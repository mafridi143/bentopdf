# 🎯 Quick Start: ghcr.io + Coolify

## ⚡ 2-Step Setup (No Docker Hub needed!)

### 1️⃣ Push Changes
```bash
git add .
git commit -m "Switch to GitHub Container Registry (ghcr.io)"
git push origin main
```

Wait ~5-10 minutes for build to complete.  
Check: https://github.com/mafridi143/bentopdf/actions

---

### 2️⃣ Make Packages Public (After first build)

1. Go to: https://github.com/mafridi143?tab=packages
2. Click on each package (`bentopdf` and `bentopdf-simple`)
3. Package settings → Change visibility → Public

---

## 🐳 Your Images

**Development:**
- `ghcr.io/mafridi143/bentopdf:edge`
- `ghcr.io/mafridi143/bentopdf-simple:edge`

**Production (when you tag):**
- `ghcr.io/mafridi143/bentopdf:latest`
- `ghcr.io/mafridi143/bentopdf-simple:latest`

---

## 🚀 Coolify Setup

**In Coolify Dashboard:**
1. New Resource → Docker Image
2. Image: `ghcr.io/mafridi143/bentopdf-simple:edge`
3. Port: `8080`
4. Enable: "Watch for new images"
5. Polling: `60` seconds
6. Deploy!

---

## ✅ Auto-Update Flow

```
Push to main → GitHub builds → ghcr.io → Coolify deploys 🚀
```

**No secrets needed!** Uses built-in `GITHUB_TOKEN` ✨

---

## 📖 Full Guide
See [FIX_GITHUB_ACTIONS.md](./FIX_GITHUB_ACTIONS.md)
