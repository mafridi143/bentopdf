# 📚 Documentation Index

This directory contains comprehensive documentation for your BentoPDF fork setup.

---

## 🚀 Quick Start

**New to this setup?** Start here:
1. Read [`QUICKSTART.md`](./QUICKSTART.md) - 2-step setup
2. Read [`SETUP_COMPLETE.md`](./SETUP_COMPLETE.md) - Current status

---

## 📖 Documentation Files

### **Setup & Deployment**

| File | Description | When to Use |
|------|-------------|-------------|
| [`QUICKSTART.md`](./QUICKSTART.md) | Quick 2-step setup guide | First time setup |
| [`SETUP_COMPLETE.md`](./SETUP_COMPLETE.md) | Setup summary & next steps | Check current status |
| [`FIX_GITHUB_ACTIONS.md`](./FIX_GITHUB_ACTIONS.md) | Complete ghcr.io guide | Understand Docker setup |
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | Full deployment documentation | Detailed deployment info |

### **Upstream Sync**

| File | Description | When to Use |
|------|-------------|-------------|
| [`SYNC_CHEATSHEET.md`](./SYNC_CHEATSHEET.md) | Quick sync commands | Daily reference |
| [`UPSTREAM_SYNC.md`](./UPSTREAM_SYNC.md) | Complete sync guide | Detailed sync instructions |

### **Overview**

| File | Description | When to Use |
|------|-------------|-------------|
| [`REPOSITORY_SUMMARY.md`](./REPOSITORY_SUMMARY.md) | Visual overview of entire setup | Understand the big picture |
| [`CHANGES.md`](./CHANGES.md) | Summary of changes made | See what was modified |

---

## 🎯 Common Tasks

### **I want to...**

#### **Deploy my app**
1. Read: [`QUICKSTART.md`](./QUICKSTART.md)
2. Follow: [`FIX_GITHUB_ACTIONS.md`](./FIX_GITHUB_ACTIONS.md)

#### **Sync with upstream**
1. Quick: [`SYNC_CHEATSHEET.md`](./SYNC_CHEATSHEET.md)
2. Detailed: [`UPSTREAM_SYNC.md`](./UPSTREAM_SYNC.md)

#### **Understand the setup**
1. Start: [`REPOSITORY_SUMMARY.md`](./REPOSITORY_SUMMARY.md)
2. Details: [`SETUP_COMPLETE.md`](./SETUP_COMPLETE.md)

#### **Configure Coolify**
1. Read: [`FIX_GITHUB_ACTIONS.md`](./FIX_GITHUB_ACTIONS.md) - Section "Coolify Setup"
2. Or: [`DEPLOYMENT.md`](./DEPLOYMENT.md) - Section "Coolify Setup"

---

## 🔗 Important Links

### **Your Repositories**
- **Your Fork:** https://github.com/mafridi143/bentopdf
- **Upstream:** https://github.com/alam00000/bentopdf

### **GitHub**
- **Actions:** https://github.com/mafridi143/bentopdf/actions
- **Packages:** https://github.com/mafridi143?tab=packages
- **Settings:** https://github.com/mafridi143/bentopdf/settings

### **Docker Images**
- **Your Packages:** https://github.com/mafridi143?tab=packages
- **Image:** `ghcr.io/mafridi143/bentopdf-simple:edge`

---

## ⚡ Quick Commands

### **Deploy:**
```bash
git add .
git commit -m "Your changes"
git push origin main
```

### **Sync:**
```bash
git fetch upstream
git merge upstream/main
git push origin main
```

### **Check Status:**
```bash
git status
git remote -v
git log --oneline -5
```

---

## 🎯 Workflow Summary

```
┌─────────────────┐
│  Make changes   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  git push       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │
│ builds images   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Push to ghcr.io │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Coolify deploys │
│      🚀         │
└─────────────────┘
```

---

## 📊 File Organization

```
bentopdf/
├── .github/
│   └── workflows/
│       └── build-and-publish.yml    # Docker build workflow
├── src/                              # Application source
├── docker-compose.yml                # Docker compose config
├── Dockerfile                        # Docker build config
├── package.json                      # Node.js config
│
└── Documentation:
    ├── QUICKSTART.md                 # ⭐ Start here
    ├── SETUP_COMPLETE.md             # Current status
    ├── FIX_GITHUB_ACTIONS.md         # ghcr.io guide
    ├── DEPLOYMENT.md                 # Full deployment
    ├── SYNC_CHEATSHEET.md            # ⭐ Quick sync
    ├── UPSTREAM_SYNC.md              # Detailed sync
    ├── REPOSITORY_SUMMARY.md         # Big picture
    ├── CHANGES.md                    # What changed
    └── DOCS_INDEX.md                 # This file
```

---

## 💡 Tips

- 📌 **Bookmark** [`SYNC_CHEATSHEET.md`](./SYNC_CHEATSHEET.md) for daily use
- 📖 **Read** [`REPOSITORY_SUMMARY.md`](./REPOSITORY_SUMMARY.md) to understand the setup
- 🔄 **Sync weekly** with upstream to get latest features
- 🐳 **Use** `bentopdf-simple` for faster builds and smaller images
- ✅ **Test locally** before pushing to production

---

## 🆘 Need Help?

1. **Check the docs** - Most questions are answered here
2. **GitHub Issues** - Check upstream issues for known problems
3. **GitHub Actions** - Check build logs if deployment fails
4. **Coolify Logs** - Check deployment logs if app doesn't start

---

## 🎉 You're All Set!

All documentation is ready. Pick the guide you need and get started! 🚀
