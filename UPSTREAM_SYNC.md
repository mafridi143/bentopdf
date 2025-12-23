# 🔄 Syncing with Upstream BentoPDF Repository

## 📋 Current Setup

✅ **Origin:** Your fork (`mafridi143/bentopdf`)  
✅ **Upstream:** Original repo (`alam00000/bentopdf`)

You can now track and sync changes from the original BentoPDF repository!

---

## 🔍 Check Your Remotes

```bash
git remote -v
```

**Output:**
```
origin    https://github.com/mafridi143/bentopdf.git (fetch)
origin    https://github.com/mafridi143/bentopdf.git (push)
upstream  https://github.com/alam00000/bentopdf.git (fetch)
upstream  https://github.com/alam00000/bentopdf.git (push)
```

---

## 🔄 Syncing Workflow

### **Option 1: Quick Sync (Recommended)**

Use this when you want to get the latest changes from upstream:

```bash
# 1. Fetch latest changes from upstream
git fetch upstream

# 2. Make sure you're on your main branch
git checkout main

# 3. Merge upstream changes into your main
git merge upstream/main

# 4. Push to your fork
git push origin main
```

---

### **Option 2: Rebase (Clean History)**

Use this if you want a cleaner commit history:

```bash
# 1. Fetch latest changes
git fetch upstream

# 2. Rebase your changes on top of upstream
git rebase upstream/main

# 3. Force push to your fork (use with caution!)
git push origin main --force-with-lease
```

⚠️ **Warning:** Only use rebase if you haven't shared your commits with others or if you're okay with rewriting history.

---

### **Option 3: Check Before Syncing**

See what changes are in upstream before merging:

```bash
# 1. Fetch upstream
git fetch upstream

# 2. See commits in upstream that you don't have
git log main..upstream/main --oneline

# 3. See detailed differences
git diff main..upstream/main

# 4. If you want to merge, proceed with Option 1
git merge upstream/main
```

---

## 🎯 Regular Sync Schedule

### **Weekly Sync (Recommended):**
```bash
# Every week, run this to stay updated
git fetch upstream
git merge upstream/main
git push origin main
```

### **Before Starting New Work:**
```bash
# Always sync before starting new features
git fetch upstream
git merge upstream/main
# Now start your work
```

---

## 🚨 Handling Merge Conflicts

If you get conflicts when merging upstream changes:

### **Step 1: Identify Conflicts**
```bash
git status
```

You'll see files marked as "both modified".

### **Step 2: Resolve Conflicts**

Open the conflicting files and look for:
```
<<<<<<< HEAD
Your changes
=======
Upstream changes
>>>>>>> upstream/main
```

**Important Files to Watch:**
- `.github/workflows/build-and-publish.yml` - You modified this for ghcr.io
- `docker-compose.yml` - You modified this for your images
- `Dockerfile` - You modified the label
- `index.html` - You changed branding to ZemPDF

### **Step 3: Choose Your Strategy**

**For Docker/GitHub Actions files:**
```bash
# Keep YOUR version (ghcr.io setup)
git checkout --ours .github/workflows/build-and-publish.yml
git checkout --ours docker-compose.yml
git checkout --ours Dockerfile

# Or manually merge if you want some upstream changes
```

**For other files:**
```bash
# Keep UPSTREAM version
git checkout --theirs path/to/file

# Or manually edit to combine both
```

### **Step 4: Complete the Merge**
```bash
# After resolving all conflicts
git add .
git commit -m "Merge upstream changes"
git push origin main
```

---

## 🛡️ Protecting Your Custom Changes

### **Files You've Customized:**
1. `.github/workflows/build-and-publish.yml` - ghcr.io configuration
2. `docker-compose.yml` - Your image references
3. `Dockerfile` - Your repo label
4. `index.html` - ZemPDF branding
5. Documentation files (DEPLOYMENT.md, QUICKSTART.md, etc.)

### **Strategy for Updates:**

**Option A: Keep Your Changes (Recommended)**
```bash
# When merging, if conflicts occur in your custom files:
git checkout --ours .github/workflows/build-and-publish.yml
git checkout --ours docker-compose.yml
git checkout --ours Dockerfile
git add .
git commit -m "Merge upstream, keeping custom Docker setup"
```

**Option B: Manual Merge**
- Review each conflict carefully
- Combine upstream improvements with your customizations
- Test thoroughly before pushing

---

## 📊 Monitoring Upstream Changes

### **Watch the Repository on GitHub:**
1. Go to: https://github.com/alam00000/bentopdf
2. Click **"Watch"** → **"All Activity"** or **"Releases only"**
3. You'll get notifications for new releases

### **Check for Updates:**
```bash
# See if upstream has new commits
git fetch upstream
git log main..upstream/main --oneline

# See if there are new tags/releases
git tag -l
git fetch upstream --tags
git tag -l
```

### **Compare Versions:**
```bash
# See what's different between your fork and upstream
git log --oneline --graph --decorate main upstream/main
```

---

## 🚀 Automated Sync (Optional)

You can create a GitHub Action to automatically sync with upstream:

Create `.github/workflows/sync-upstream.yml`:

```yaml
name: Sync with Upstream

on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday
  workflow_dispatch:  # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Sync with upstream
        run: |
          git remote add upstream https://github.com/alam00000/bentopdf.git
          git fetch upstream
          git merge upstream/main --no-edit
          git push origin main
```

⚠️ **Note:** This auto-sync might fail if there are conflicts. Manual sync is safer.

---

## 🎯 Best Practices

### **DO:**
✅ Sync regularly (weekly or before new work)  
✅ Check what's changed before merging (`git log`, `git diff`)  
✅ Keep your custom Docker/deployment files  
✅ Test after merging upstream changes  
✅ Commit your work before syncing  

### **DON'T:**
❌ Force push without `--force-with-lease`  
❌ Merge without checking for conflicts  
❌ Lose your custom ghcr.io configuration  
❌ Forget to test after merging  

---

## 📝 Quick Reference Commands

```bash
# Check remotes
git remote -v

# Fetch upstream
git fetch upstream

# See new commits
git log main..upstream/main --oneline

# Sync with upstream
git merge upstream/main

# Push to your fork
git push origin main

# See all branches
git branch -a

# See all tags
git tag -l
```

---

## 🔗 Useful Links

- **Your Fork:** https://github.com/mafridi143/bentopdf
- **Upstream Repo:** https://github.com/alam00000/bentopdf
- **Upstream Releases:** https://github.com/alam00000/bentopdf/releases
- **Upstream Issues:** https://github.com/alam00000/bentopdf/issues

---

## 💡 Example: Complete Sync Workflow

```bash
# 1. Check current status
git status

# 2. Commit any pending work
git add .
git commit -m "WIP: Save current work"

# 3. Fetch upstream
git fetch upstream

# 4. Check what's new
git log main..upstream/main --oneline

# 5. Merge upstream
git merge upstream/main

# 6. If conflicts, resolve them
# (Keep your Docker/deployment configs)

# 7. Test locally
npm install
npm run dev

# 8. Push to your fork
git push origin main

# 9. GitHub Actions will build and deploy automatically!
```

---

## 🎉 You're All Set!

Your fork is now properly configured to track and sync with the upstream BentoPDF repository. You can get the latest features and bug fixes while maintaining your custom Docker/deployment setup!

**Current Status:**
- ✅ Upstream configured: `alam00000/bentopdf`
- ✅ Already synced with latest upstream
- ✅ Custom ghcr.io setup preserved
- ✅ Ready for future updates!
