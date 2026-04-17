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

## Deploying to Cloudflare Pages

When the user asks to set up deployment or deploy to Cloudflare, guide them through these steps.

### One-time setup

**Step 1 — Update `wrangler.jsonc`**
Change `"name": "your-site-name"` to a slug that will become the Cloudflare Pages project name (e.g. `"my-jewellery-site"`). This must match the project name in the Cloudflare dashboard.

**Step 2 — Authenticate Wrangler**
The user needs to log in once before any deploy commands will work:
```bash
npx wrangler login
```
This opens a browser. They authorise Wrangler in the Cloudflare dashboard and return to the terminal.

**Step 3 — Connect GitHub repo to Cloudflare Pages (recommended path)**
1. Go to [Cloudflare Pages](https://pages.cloudflare.com) → **Create a project** → **Connect to Git**
2. Select the GitHub repo
3. Set build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Under **Environment variables**, add:
   - `SITE_URL` = `https://yourdomain.com` (or their Cloudflare Pages URL for now, e.g. `https://my-jewellery-site.pages.dev`)
5. Click **Save and Deploy**

After this, every push to the `production` branch auto-deploys the site.

**Alternative: deploy manually from the CLI**
If they don't want GitHub-connected auto-deploy, they can deploy by running:
```bash
npm run deploy
```
This builds the site and pushes to Cloudflare Pages via Wrangler. On first run it will create the project if it doesn't exist.

### Ongoing deploys

```bash
# Merge development work to production and push (triggers auto-deploy)
git checkout production
git merge development
git push
```

Or tell Claude: *"Merge development to production and push"*

### Custom domain

After the site is live on `*.pages.dev`, add a custom domain:
- Cloudflare Pages → project → **Custom Domains** → Add
- If the domain is registered with Cloudflare, it wires up automatically.
- If not, they'll need to add a CNAME record at their registrar.

### Environment variables

`SITE_URL` must be set in Cloudflare Pages → project → **Settings → Environment variables**.
It's used by `astro.config.mjs` to build correct sitemap URLs and canonical links.
Without it, the sitemap will contain `https://example.com` URLs.

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
