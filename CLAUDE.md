# Project context for Claude

This file is read automatically by Claude Code at the start of every session. Keep it up to date as your project evolves.
check the readme in the project to get more context/instruction.
---

## Stack

**Framework:** Astro — static site, output: 'static'. No server-side rendering.
**Deployment:** Cloudflare Pages — auto-deploys from the `production` branch.
**Local dev:** `npm run dev` (Astro dev server at localhost:4321)
**Local preview:** `npm run preview` (Wrangler — matches Cloudflare Pages exactly)
**Deploy manually:** `npm run deploy`

### Key files

| File | Purpose |
|------|---------|
| `src/config.ts` | Site name, tagline, domain, nav links — start here |
| `src/layouts/Base.astro` | Page shell: head meta, header, nav, footer |
| `src/styles/global.css` | Design tokens, reset, buttons, utilities |
| `src/pages/` | One `.astro` file per route |
| `astro.config.mjs` | Astro config: static output, sitemap, site URL |
| `wrangler.jsonc` | Cloudflare Pages deployment config |
| `docs/tone-of-voice.md` | Brand voice guidelines — read before writing copy |
| `docs/copy-rules.md` | Specific copy rules to follow |

### Branch structure

- `production` — Cloudflare Pages auto-deploys on push to this branch
- `development` — day-to-day working branch; merge to production to deploy
- Feature branches merge to `development` first, then `development` → `production`

---

## Your project

**Fill in this section.** Claude reads it every session.

**What this site is:**
[Describe your product or service in 1–2 sentences]

**Who it's for:**
[List your main audiences]

**Pages planned:**
- Home (`/`)
- About (`/about`)
- Contact (`/contact`)
- [Add more as you build them]

**Copy rules:** see `docs/copy-rules.md`

**Tone of voice:** see `docs/tone-of-voice.md`

---

## Working with Claude

Claude reads this file automatically — no need to paste it into chat.

**Useful prompts:**
- "Add a new page called /pricing with a three-column pricing table"
- "The hero on the home page feels generic — rewrite it for [audience]"
- "Add a contact form that emails me at [address]"
- "Review all copy against the rules in docs/copy-rules.md"
- "Bump the version to 1.1.0"
- "Merge development to production and push"

**Before asking Claude to write copy:** fill in `docs/tone-of-voice.md` and `docs/copy-rules.md`.
