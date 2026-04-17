// ─── Site configuration ───────────────────────────────────────────────────────
// Edit these values to match your site. Claude will use this file when
// generating pages and copy. After changing, tell Claude what you changed
// so it can update CLAUDE.md.

export const SITE_NAME    = 'Your Site Name';
export const SITE_TAGLINE = 'A short line that says what you do';
export const SITE_DOMAIN  = import.meta.env.SITE_URL || 'https://example.com';

// Contact — used in the footer and anywhere Claude generates contact copy
export const CONTACT_EMAIL = 'hello@example.com';

// Nav links — edit labels and hrefs, or ask Claude to add/remove entries
export const NAV_LINKS = [
  { label: 'About',   href: '/about'   },
  { label: 'Contact', href: '/contact' },
];
