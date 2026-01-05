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
- Updates copyright year (© 2025 → © 2026)
- Injects theme-manager.ts script into all pages
- Injects zempdf-theme.css import into all pages
- Removes licensing links and GitHub stars badges
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
git commit -m "Sync with upstream v$(node -p \"require('./package.json').version\") and apply ZemPDF branding"
git push origin main
```

## What Gets Preserved After Upstream Merge

### ✅ Safe from Upstream (YOUR custom files)
| File | Purpose |
|------|---------|
| `scripts/zempdf/rebrand.js` | Rebranding automation script |
| `src/js/utils/theme-manager.ts` | Light/dark theme toggle |
| `src/css/zempdf-theme.css` | All light theme CSS overrides |
| `public/images/zempdf-*.svg` | ZemPDF logo files |
| `.agent/workflows/sync-upstream.md` | This workflow |

### ⚠️ Overwritten but Auto-restored by `npm run rebrand`
| File | What rebrand.js fixes |
|------|----------------------|
| `index.html` | Brand names, theme imports, licensing removal |
| `src/pages/*.html` | Same as above for all tool pages |
| `public/locales/*.json` | Brand name replacements |

### ⚠️ Potentially Overwritten (monitor these)
| File | Impact |
|------|--------|
| `src/css/styles.css` | May have upstream changes - your light theme is SAFE in `zempdf-theme.css` |

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
| © 2025 | © 2026 |

**Injections:**
- `<script type="module" src="/src/js/utils/theme-manager.ts">` before other scripts
- `<link href="/src/css/zempdf-theme.css" rel="stylesheet" />` after styles.css

**Removals:**
- Licensing links from navigation and footer
- GitHub stars badges (hidden via comment)

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

### Light theme looks broken after merge
The light theme CSS is in `src/css/zempdf-theme.css` which won't be overwritten.
Just run `npm run rebrand` to re-inject the CSS import into all HTML files.
