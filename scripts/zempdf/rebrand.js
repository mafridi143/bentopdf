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

    // Patterns to SKIP (preserve these - they are code/repo references)
    // These are checked per-line, if line matches any, skip brand replacement
    preservePatterns: [
        /github\.com\/alam00000\/bentopdf/,         // GitHub repo links
        /github\.com\/sponsors\/alam00000/,          // GitHub sponsors
        /"name":\s*"bento-pdf"/,                     // package.json name field
        /bento-pdf@\d+\.\d+\.\d+/,                   // package version strings (like "bento-pdf@1.15.4")
        /@bentopdf\/(gs-wasm|pymupdf-wasm)/,         // npm packages
    ],

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
 * Preserves GitHub repo links and code references
 */
function applyReplacements(content, filePath) {
    let modifiedContent = content;
    let replacementCount = 0;

    // Split into lines to check each line individually
    const lines = modifiedContent.split('\n');
    const processedLines = lines.map((line) => {
        let processedLine = line;

        // Skip lines with preserve patterns (GitHub, npm packages, etc.)
        if (shouldPreserveLine(line)) {
            return processedLine;
        }

        // Apply URL replacements first
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
 * Process a single file
 */
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const { content: modifiedContent, replacementCount } = applyReplacements(content, filePath);

        stats.filesProcessed++;

        if (modifiedContent !== content) {
            fs.writeFileSync(filePath, modifiedContent, 'utf8');
            stats.filesModified++;
            stats.replacementsTotal += replacementCount;
            console.log(`  ✓ Modified: ${path.relative(CONFIG.htmlRootDir, filePath)} (${replacementCount} replacements)`);
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
    console.log('║  Replacing: BentoPDF → ZemPDF                                  ║');
    console.log('║  Preserves: GitHub repo links, npm package names               ║');
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
