# 🔄 Upstream Sync - Quick Cheat Sheet

## ⚡ Quick Sync (Most Common)

```bash
git fetch upstream
git merge upstream/main
git push origin main
```

---

## 🔍 Check Before Sync

```bash
# See what's new in upstream
git fetch upstream
git log main..upstream/main --oneline
```

---

## 🚨 If You Get Conflicts

### Keep YOUR custom files (Docker/ghcr.io setup):
```bash
git checkout --ours .github/workflows/build-and-publish.yml
git checkout --ours docker-compose.yml
git checkout --ours Dockerfile
git add .
git commit -m "Merge upstream, keeping custom setup"
git push origin main
```

### Keep UPSTREAM files (new features):
```bash
git checkout --theirs path/to/file
git add path/to/file
```

---

## 📋 Your Custom Files (Don't Lose These!)

When merging, protect these files:
- ✅ `.github/workflows/build-and-publish.yml` (ghcr.io config)
- ✅ `docker-compose.yml` (your images)
- ✅ `Dockerfile` (your label)
- ✅ `index.html` (ZemPDF branding)
- ✅ `DEPLOYMENT.md`, `QUICKSTART.md`, etc.

---

## 🎯 Weekly Routine

```bash
# Every Sunday (or whenever)
git fetch upstream
git log main..upstream/main --oneline  # Check what's new
git merge upstream/main                # Merge if you want
git push origin main                   # Deploy!
```

---

## 🔗 Quick Links

- **Upstream:** https://github.com/alam00000/bentopdf
- **Your Fork:** https://github.com/mafridi143/bentopdf
- **Releases:** https://github.com/alam00000/bentopdf/releases

---

## 📖 Full Guide
See [UPSTREAM_SYNC.md](./UPSTREAM_SYNC.md) for complete documentation.
