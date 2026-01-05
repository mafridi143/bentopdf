/**
 * ZemPDF Rebranding Script
 * 
 * This script replaces all BentoPDF branding with ZemPDF branding
 * in HTML files and locale JSON files.
 * 
 * SAFE for future upstream updates - it preserves GitHub repo links
 * and only replaces visible brand names.
 * 
 * Usage: npm run rebrand
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
    // Brand replacements (order matters - more specific first)
    brandReplacements: [
        // Case-sensitive replacements
        { from: 'BentoPDF', to: 'ZemPDF' },
        { from: 'Bentopdf', to: 'Zempdf' },
        { from: 'bentopdf', to: 'zempdf' },
        { from: 'BENTOPDF', to: 'ZEMPDF' },
        { from: 'Bento PDF', to: 'Zem PDF' },
    ],

    // URL and domain replacements (applied first)
    urlReplacements: [
        { from: 'www.bentopdf.com', to: 'www.zempdf.com' },
        { from: 'bentopdf.com', to: 'zempdf.com' },
    ],

    // Social media handle replacements
    socialReplacements: [
        { from: 'x.com/BentoPDF', to: 'x.com/ZemPDF' },
        { from: 'twitter.com/BentoPDF', to: 'twitter.com/ZemPDF' },
        { from: '@BentoPDF', to: '@ZemPDF' },
        { from: '@bentopdf', to: '@zempdf' },
    ],

    // Copyright year replacement
    copyrightReplacements: [
        { from: '© 2025', to: '© 2026' },
        { from: '©2025', to: '©2026' },
    ],

    // Patterns to SKIP (preserve these - they are code/repo references)
    preservePatterns: [
        /github\.com\/alam00000\/bentopdf/,         // GitHub repo links
        /github\.com\/sponsors\/alam00000/,          // GitHub sponsors
        /"name":\s*"bento-pdf"/,                     // package.json name field
        /bento-pdf@\d+\.\d+\.\d+/,                   // package version strings
        /@bentopdf\/(gs-wasm|pymupdf-wasm)/,         // npm packages
    ],

    // Hide GitHub stars badges
    hideGitHubStars: true,

    // Remove licensing links from navigation
    removeLicensingLinks: true,

    // Directories and files to process
    htmlRootDir: path.join(__dirname, '..', '..'),
    htmlPagesDir: path.join(__dirname, '..', '..', 'src', 'pages'),
    localesDir: path.join(__dirname, '..', '..', 'public', 'locales'),

    // File extensions
    htmlExtensions: ['.html'],
    jsonExtensions: ['.json'],
};

// Statistics
const stats = {
    filesProcessed: 0,
    filesModified: 0,
    replacementsTotal: 0,
    elementsRemoved: 0,
    errors: [],
};

/**
 * Escape special regex characters
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Check if a line should be preserved (no replacements)
 */
function shouldPreserveLine(line) {
    return CONFIG.preservePatterns.some(pattern => pattern.test(line));
}

/**
 * Apply brand replacements to content
 */
function applyReplacements(content, filePath) {
    let modifiedContent = content;
    let replacementCount = 0;

    // Split into lines to check each line individually
    const lines = modifiedContent.split('\n');
    const processedLines = lines.map((line) => {
        let processedLine = line;

        // Skip lines with preserve patterns
        if (shouldPreserveLine(line)) {
            return processedLine;
        }

        // Apply copyright year replacements
        CONFIG.copyrightReplacements.forEach(({ from, to }) => {
            const regex = new RegExp(escapeRegExp(from), 'g');
            const matches = processedLine.match(regex);
            if (matches) {
                replacementCount += matches.length;
                processedLine = processedLine.replace(regex, to);
            }
        });

        // Apply URL replacements
        CONFIG.urlReplacements.forEach(({ from, to }) => {
            const regex = new RegExp(escapeRegExp(from), 'g');
            const matches = processedLine.match(regex);
            if (matches) {
                replacementCount += matches.length;
                processedLine = processedLine.replace(regex, to);
            }
        });

        // Apply social media replacements
        CONFIG.socialReplacements.forEach(({ from, to }) => {
            const regex = new RegExp(escapeRegExp(from), 'g');
            const matches = processedLine.match(regex);
            if (matches) {
                replacementCount += matches.length;
                processedLine = processedLine.replace(regex, to);
            }
        });

        // Apply brand replacements
        CONFIG.brandReplacements.forEach(({ from, to }) => {
            const regex = new RegExp(escapeRegExp(from), 'g');
            const matches = processedLine.match(regex);
            if (matches) {
                replacementCount += matches.length;
                processedLine = processedLine.replace(regex, to);
            }
        });

        return processedLine;
    });

    modifiedContent = processedLines.join('\n');

    return { content: modifiedContent, replacementCount };
}

/**
 * Remove licensing links and hide GitHub stars from HTML content
 */
function removeElements(content, filePath) {
    let modifiedContent = content;
    let removedCount = 0;

    // Only apply to HTML files
    if (!filePath.endsWith('.html')) {
        return { content: modifiedContent, removedCount };
    }

    if (CONFIG.removeLicensingLinks) {
        // Remove licensing links from desktop nav (with nav-link class)
        const desktopLicensingPattern = /\s*<a href="\/licensing\.html" class="nav-link"[^>]*>[^<]*<\/a>\s*/g;
        const desktopMatches = modifiedContent.match(desktopLicensingPattern);
        if (desktopMatches) {
            modifiedContent = modifiedContent.replace(desktopLicensingPattern, '\n          ');
            removedCount += desktopMatches.length;
        }

        // Remove licensing links from mobile nav (with mobile-nav-link class)
        const mobileLicensingPattern = /\s*<a href="\/licensing\.html" class="mobile-nav-link"[^>]*>[^<]*<\/a>\s*/g;
        const mobileMatches = modifiedContent.match(mobileLicensingPattern);
        if (mobileMatches) {
            modifiedContent = modifiedContent.replace(mobileLicensingPattern, '\n        ');
            removedCount += mobileMatches.length;
        }

        // Remove licensing links from footer (wrapped in <li>)
        const footerLicensingPattern = /\s*<li>\s*<a href="\/licensing\.html"[^>]*>[^<]*<\/a>\s*<\/li>\s*/g;
        const footerMatches = modifiedContent.match(footerLicensingPattern);
        if (footerMatches) {
            modifiedContent = modifiedContent.replace(footerLicensingPattern, '\n');
            removedCount += footerMatches.length;
        }
    }

    // Hide GitHub stars badges by commenting them out
    if (CONFIG.hideGitHubStars) {
        // Desktop GitHub stars badge (entire <a> element with github link and stars)
        const desktopStarsPattern = /(\s*)<a href="https:\/\/github\.com\/alam00000\/bentopdf\/"[^>]*>[\s\S]*?<span id="github-stars-desktop">[\s\S]*?<\/a>/g;
        const desktopStarsMatches = modifiedContent.match(desktopStarsPattern);
        if (desktopStarsMatches) {
            modifiedContent = modifiedContent.replace(desktopStarsPattern, '$1<!-- GitHub stars badge hidden by ZemPDF rebrand -->');
            removedCount += desktopStarsMatches.length;
        }

        // Mobile GitHub stars badge
        const mobileStarsPattern = /(\s*)<a href="https:\/\/github\.com\/alam00000\/bentopdf\/"[^>]*>[\s\S]*?<span id="github-stars-mobile">[\s\S]*?<\/a>/g;
        const mobileStarsMatches = modifiedContent.match(mobileStarsPattern);
        if (mobileStarsMatches) {
            modifiedContent = modifiedContent.replace(mobileStarsPattern, '$1<!-- GitHub stars badge hidden by ZemPDF rebrand -->');
            removedCount += mobileStarsMatches.length;
        }
    }

    return { content: modifiedContent, removedCount };
}

/**
 * Add theme manager script to HTML files if not already present
 */
function addThemeManager(content, filePath) {
    // Only apply to HTML files
    if (!filePath.endsWith('.html')) {
        return { content, added: false };
    }

    let modifiedContent = content;
    let added = false;

    // Check if theme manager is already added
    if (modifiedContent.includes('theme-manager.ts') || modifiedContent.includes('theme-manager.js')) {
        return { content: modifiedContent, added: false };
    }

    // Find the first <script type="module"> tag and add theme manager before it
    const scriptPattern = /(\s*)(<script type="module" src="[^"]*lucide-init[^"]*"><\/script>)/;
    const match = modifiedContent.match(scriptPattern);

    if (match) {
        const indent = match[1];
        const themeScript = `${indent}<script type="module" src="/src/js/utils/theme-manager.ts"></script>\n`;
        modifiedContent = modifiedContent.replace(scriptPattern, themeScript + match[0]);
        added = true;
    } else {
        // Alternative: look for any script tag and add before it
        const anyScriptPattern = /(\s*)(<script type="module" src="[^"]*"><\/script>)/;
        const altMatch = modifiedContent.match(anyScriptPattern);
        if (altMatch) {
            const indent = altMatch[1];
            const themeScript = `${indent}<script type="module" src="/src/js/utils/theme-manager.ts"></script>\n`;
            modifiedContent = modifiedContent.replace(anyScriptPattern, themeScript + altMatch[0]);
            added = true;
        }
    }

    return { content: modifiedContent, added };
}

/**
 * Process a single file
 */
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Apply brand replacements
        const { content: brandedContent, replacementCount } = applyReplacements(content, filePath);

        // Remove/hide elements (only for HTML)
        const { content: elementsRemoved, removedCount } = removeElements(brandedContent, filePath);

        // Add theme manager script (only for HTML)
        const { content: finalContent, added: themeAdded } = addThemeManager(elementsRemoved, filePath);

        stats.filesProcessed++;

        if (finalContent !== content) {
            fs.writeFileSync(filePath, finalContent, 'utf8');
            stats.filesModified++;
            stats.replacementsTotal += replacementCount;
            stats.elementsRemoved += removedCount;
            if (themeAdded) stats.themeScriptsAdded = (stats.themeScriptsAdded || 0) + 1;

            const changes = [];
            if (replacementCount > 0) changes.push(`${replacementCount} replacements`);
            if (removedCount > 0) changes.push(`${removedCount} elements removed`);
            if (themeAdded) changes.push('theme script added');

            console.log(`  ✓ Modified: ${path.relative(CONFIG.htmlRootDir, filePath)} (${changes.join(', ')})`);
        } else {
            console.log(`  - Skipped:  ${path.relative(CONFIG.htmlRootDir, filePath)} (no changes needed)`);
        }
    } catch (error) {
        stats.errors.push({ file: filePath, error: error.message });
        console.error(`  ✗ Error:    ${path.relative(CONFIG.htmlRootDir, filePath)} - ${error.message}`);
    }
}

/**
 * Get all files with specific extensions from a directory
 */
function getFiles(directory, extensions, recursive = false) {
    const files = [];

    if (!fs.existsSync(directory)) {
        console.warn(`  ⚠ Directory not found: ${directory}`);
        return files;
    }

    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory() && recursive) {
            files.push(...getFiles(fullPath, extensions, recursive));
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (extensions.includes(ext)) {
                files.push(fullPath);
            }
        }
    }

    return files;
}

/**
 * Main rebranding function
 */
function rebrand() {
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║              ZemPDF Rebranding Script                          ║');
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log('║  Replacing: BentoPDF → ZemPDF, © 2025 → © 2026                 ║');
    console.log('║  Removing:  Licensing links, GitHub stars badges              ║');
    console.log('║  Preserves: GitHub repo links, npm package names              ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    // Process root HTML files
    console.log('📁 Processing root HTML files...');
    const rootHtmlFiles = getFiles(CONFIG.htmlRootDir, CONFIG.htmlExtensions, false);
    rootHtmlFiles.forEach(processFile);

    // Process src/pages HTML files
    console.log('\n📁 Processing src/pages HTML files...');
    const pagesHtmlFiles = getFiles(CONFIG.htmlPagesDir, CONFIG.htmlExtensions, false);
    pagesHtmlFiles.forEach(processFile);

    // Process locale JSON files
    console.log('\n📁 Processing locale JSON files...');
    const localeFiles = getFiles(CONFIG.localesDir, CONFIG.jsonExtensions, true);
    localeFiles.forEach(processFile);

    // Print summary
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║                        Summary                                 ║');
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log(`║  Files processed:    ${String(stats.filesProcessed).padEnd(41)}║`);
    console.log(`║  Files modified:     ${String(stats.filesModified).padEnd(41)}║`);
    console.log(`║  Total replacements: ${String(stats.replacementsTotal).padEnd(41)}║`);
    console.log(`║  Elements removed:   ${String(stats.elementsRemoved).padEnd(41)}║`);

    if (stats.errors.length > 0) {
        console.log(`║  Errors:             ${String(stats.errors.length).padEnd(41)}║`);
    }

    console.log('╚════════════════════════════════════════════════════════════════╝');

    if (stats.errors.length > 0) {
        console.log('\n⚠ Errors encountered:');
        stats.errors.forEach(({ file, error }) => {
            console.log(`  - ${file}: ${error}`);
        });
    }

    console.log('\n✅ Rebranding complete!\n');
    console.log('Next steps:');
    console.log('  1. Review the changes: git diff');
    console.log('  2. Build the project: npm run build');
    console.log('  3. Commit changes: git add . && git commit -m "Apply ZemPDF branding"');
    console.log('');
}

// Run the script
rebrand();
