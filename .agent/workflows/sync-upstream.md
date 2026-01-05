---
description: Sync with upstream BentoPDF and apply ZemPDF rebranding
---

# Sync Upstream and Rebrand Workflow

This workflow fetches the latest changes from the original BentoPDF repository and applies ZemPDF branding.

## Prerequisites

- Upstream remote configured: `git remote add upstream https://github.com/alam00000/bentopdf.git`

## Steps

### 1. Stash Local Changes (if any)
```bash
git stash push -m "Local changes before upstream merge"
```

### 2. Fetch Upstream Updates
// turbo
```bash
git fetch upstream
```

### 3. Merge Upstream Main Branch
```bash
git merge upstream/main
```

**If conflicts occur:**
- To accept all upstream changes: `git checkout --theirs .`
- Then: `git add -A`
- Then: `git commit -m "Merge upstream/main"`

### 4. Install Any New Dependencies
// turbo
```bash
npm install
```

### 5. Apply ZemPDF Rebranding
// turbo
```bash
npm run rebrand
```

This script:
- Replaces "BentoPDF" with "ZemPDF" in all HTML files
- Replaces brand names in all locale JSON files
- Preserves GitHub repo links and npm package names
- Safe to run multiple times (idempotent)

### 6. Build the Project
// turbo
```bash
npm run build
```

### 7. Re-apply Stashed Changes (if needed)
```bash
git stash pop
```

### 8. Commit and Push
```bash
git add .
git commit -m "Sync with upstream v$(node -p "require('./package.json').version") and apply ZemPDF branding"
git push origin main
```

## What the Rebrand Script Does

**Files processed:**
- Root HTML files (index.html, about.html, etc.)
- Tool pages in `src/pages/*.html`
- Locale JSON files in `public/locales/*/`

**Replacements:**
| Original | Replacement |
|----------|-------------|
| BentoPDF | ZemPDF |
| Bentopdf | Zempdf |
| bentopdf | zempdf |
| bentopdf.com | zempdf.com |
| @BentoPDF | @ZemPDF |
| x.com/BentoPDF | x.com/ZemPDF |

**Preserved (not replaced):**
- GitHub repo links (github.com/alam00000/bentopdf)
- npm package names (@bentopdf/gs-wasm, bento-pdf)
- GitHub sponsor links

## Troubleshooting

### Build fails after merge
Run `npm install` to install any new dependencies added by upstream.

### TypeScript errors about missing modules
Install the missing packages, e.g.:
```bash
npm install zgapdfsigner node-forge @types/node-forge
```

### Merge conflicts
Accept upstream changes for clean merge:
```bash
git checkout --theirs .
git add -A
git commit -m "Merge upstream/main"
```
