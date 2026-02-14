/* eslint-disable no-undef */
export type Theme = 'light' | 'dark' | 'system';

export function getCurrentTheme(): Theme {
  const stored = localStorage.getItem('xsun-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return 'system';
}

export function applyTheme(theme: Theme): void {
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function setTheme(theme: Theme): void {
  if (theme === 'system') {
    localStorage.removeItem('xsun-theme');
  } else {
    localStorage.setItem('xsun-theme', theme);
  }
  applyTheme(theme);
}
