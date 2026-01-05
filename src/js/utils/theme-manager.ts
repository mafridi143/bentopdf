/**
 * Theme Manager for ZemPDF
 * Handles light/dark theme switching with system preference detection
 */

type Theme = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'zempdf-theme';

/**
 * Get the current system preference
 */
function getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Get the stored theme preference
 */
function getStoredTheme(): Theme | null {
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
            return stored;
        }
    } catch {
        // localStorage not available
    }
    return null;
}

/**
 * Store theme preference
 */
function storeTheme(theme: Theme): void {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        // localStorage not available
    }
}

/**
 * Apply theme to document
 */
function applyTheme(theme: 'light' | 'dark'): void {
    const root = document.documentElement;

    if (theme === 'light') {
        root.classList.remove('dark');
        root.classList.add('light');
    } else {
        root.classList.remove('light');
        root.classList.add('dark');
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'light' ? '#ffffff' : '#111827');
    }
}

/**
 * Get effective theme (resolving 'system' to actual theme)
 */
function getEffectiveTheme(preference: Theme): 'light' | 'dark' {
    if (preference === 'system') {
        return getSystemTheme();
    }
    return preference;
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme(): void {
    const root = document.documentElement;
    const isCurrentlyLight = root.classList.contains('light');
    const newTheme: 'light' | 'dark' = isCurrentlyLight ? 'dark' : 'light';

    applyTheme(newTheme);
    storeTheme(newTheme);

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
}

/**
 * Initialize theme based on stored preference or system preference
 */
function initTheme(): void {
    const stored = getStoredTheme();
    const preference: Theme = stored ?? 'dark'; // Default to dark theme
    const effectiveTheme = getEffectiveTheme(preference);

    applyTheme(effectiveTheme);

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const storedPref = getStoredTheme();
        if (storedPref === 'system' || storedPref === null) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

/**
 * Create and inject theme toggle button into nav
 */
function createThemeToggle(): void {
    // Find the desktop nav
    const desktopNav = document.querySelector('nav .hidden.md\\:flex');

    if (desktopNav) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle theme');
        toggleBtn.setAttribute('title', 'Toggle light/dark theme');
        toggleBtn.innerHTML = `
      <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;

        toggleBtn.addEventListener('click', toggleTheme);
        desktopNav.appendChild(toggleBtn);
    }

    // Find the mobile nav area
    const mobileNavArea = document.querySelector('nav .md\\:hidden.flex');

    if (mobileNavArea) {
        const mobileToggleBtn = document.createElement('button');
        mobileToggleBtn.className = 'theme-toggle';
        mobileToggleBtn.setAttribute('aria-label', 'Toggle theme');
        mobileToggleBtn.setAttribute('title', 'Toggle light/dark theme');
        mobileToggleBtn.innerHTML = `
      <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;

        mobileToggleBtn.addEventListener('click', toggleTheme);
        mobileNavArea.insertBefore(mobileToggleBtn, mobileNavArea.firstChild);
    }
}

// Initialize theme immediately to prevent flash
initTheme();

// Wait for DOM to create toggle buttons
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createThemeToggle);
} else {
    createThemeToggle();
}

// Export for use in other modules
export { toggleTheme, initTheme, getStoredTheme, applyTheme };
