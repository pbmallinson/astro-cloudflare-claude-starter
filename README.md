# astro-cloudflare-claude-starter

A starter for building a static site by chatting with Claude Code.

I used this stack to build [capiche-limited.com](https://capiche-limited.com) — a multi-page marketing site. I'm not a professional web developer. I built the whole thing by describing what I wanted to Claude and iterating from there. I thought others may find it useful.

**This was the setup that worked well for me:** two terminals beside a browser showing the site.
Ask Claude to make a change, watch it rebuild in the lower terminal, refresh the browser if necessary.
Permission sometimes get in the way of claude doing git opperations (esp. push) but you can alwways run these manually.
This README tries to describe emulating the same dev approach.
```
┌──────────────────────────────┬───────────────────────────────┐
│  terminal 1 (wsl)            │                               │
│   claude                     │   browser — localhost:4321    │
│                              │                               │
│   chat here to               │   see changes live            │
│   build the site             │   as you go                   │
│                              │                               │
│                              │                               │
│                              │                               │
├──────────────────────────────┤                               │
│  terminal 2  (wsl)           │                               │
│   npm run dev                │                               │
│   build output / errors      │                               │
└──────────────────────────────┴───────────────────────────────┘
```
**No support offered.** This is shared as-is. If it works for you, great. If not, it's MIT — feel free to fork and take it wherever you need.

---

## What's in here

- **[Astro](https://astro.build)** — static site framework. Outputs plain HTML/CSS/JS.
- **[Claude Code](https://claude.ai/code)** — AI coding assistant that reads `CLAUDE.md` for project context each session.
- **[Cloudflare Pages](https://pages.cloudflare.com)** — free hosting, global CDN, auto-deploys from git.
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)** — Cloudflare's CLI for local preview and deploy.
- A design system in `src/styles/global.css` covering colour, spacing, typography, buttons, and forms.
- A `src/config.ts` file where you set your site name, nav links, and contact details.

---

## What you'll need

- A [GitHub account](https://github.com)
- [Node.js](https://nodejs.org) 22+ — required for Claude Code and the build toolchain
- [Claude Code](https://claude.ai/code) installed
- A [Cloudflare account](https://cloudflare.com) (free tier is fine)

I built this on Ubuntu under WSL2 on Windows. It should work on Mac or Linux directly. Native Windows (without WSL) is untested.

---


## Get started

**1. Create your repo from this template**

Click **Use this template** → **Create a new repository** on GitHub.

**2. Open a terminal (#1):** Clone the repo and open Claude Code

```bash
git clone https://github.com/your-username/your-repo-name
cd your-repo-name
claude
```

**3. Ask Claude to help you get going**

Claude reads `CLAUDE.md` automatically. A good opening prompt:

> "I've just cloned this template. Set up the tools, I want to: npm run dev"

Claude should get everything soted for you.

---

## Run locally - this will let you see the changes as you make them

Once Claude has set everyting up (run `npm install`), start the dev server.

Open your browser, go to [localhost:4321](http://localhost:4321).

You will see the site updating in (near) real-time as you make changes.

```bash
npm run dev
```

---

## Make it yours
I got claude to help me write this README and it came up with all this ~~struck-out~~ rubbish below..

**In reality I pointed it at my previous site, described a bit about what the does, told it to do some research and apply best practice.**

What came back was far from perfect .. but it was a pretty good first cut.

The prompt was much more like:
> "go look at extsing website, do some research and make a better one that uses best practice"


**My approach throughout this has been to use very open-ended prompts - under rather than over specify, and then ~~criticise~~ itterate :-)**

~~**`src/config.ts`** — site name, tagline, domain, nav links, contact email. Start here.~~

~~**`CLAUDE.md`** — fill in the "Your project" section. Claude reads this every session. Describe what your site is, who it's for, and what pages you're planning.~~

~~**`docs/tone-of-voice.md`** — describe how you want the copy to sound. Once it's filled in, Claude will match it automatically when writing or editing copy.~~

~~**`docs/copy-rules.md`** — specific rules Claude must follow (e.g. "no em-dashes", "always sentence case"). Add to this whenever you correct something you don't want repeated.~~

---

## Deploy to Cloudflare Pages
** TODO .. I need to make sure this is propely documented **
1. Push your repo to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com) → Create a project → Connect to Git
3. Select your repo
4. Set build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Add environment variable:
   - `SITE_URL` = `https://yourdomain.com`
6. Deploy

After the initial setup, every push to the `production` branch auto-deploys.

**Branch workflow:**
- `development` — day-to-day working branch
- `production` — Cloudflare Pages watches this. Pushing here deploys the site.

```bash
# When you're ready to go live:
git checkout production
git merge development
git push
```

Ask Claude: *"Merge development to production and push"* — it will handle this for you.

---

## Example prompts that worked when building Capiche
Below is more of the ~~struck-out~~ rubish claude thinks we did while we were building this (we didn't) ...

Again my prompting was very loose and open-ended.

I would ask questions, criticise cajole .. but not once did I try to give it a more traditional user story:
> "as an impatient person I want to intercat with claude in a colaborative way so I don't over-costrain the outcome and can avoid the tedious detail" 

Prompts were much more along the lines of

> Section xyz sounds terrible

> The font sizes are all over the place - fix it

> Could we add text to audio .. or is that going too far?

 
 **Building pages**

~~- "Create a new page called /about with a hero section, a short paragraph about the team, and a footer CTA linking to /contact"~~

~~- "Add a three-column features section to the home page with icons"~~

~~- "Add a pricing page with two tiers — free and pro"~~

**Copy and tone**

~~- "The hero headline is too generic. We're targeting [audience] who struggle with [problem]. Rewrite it."~~

~~- "Review all the copy on /about against the rules in docs/copy-rules.md"~~

~~- "The contact page confirmation message sounds too corporate — make it warmer"~~

**Layout and design**

~~- "The home page hero needs more space above the headline"~~

~~- "Make the CTA button a bit bigger and change the colour to match the brand"~~

~~- "Add a two-column layout to the about page — text on the left, photo on the right"~~

**Navigation and structure**

~~- "Add a /blog link to the nav"~~

~~- "The footer needs a privacy policy link"~~

~~- "Create a simple /privacy-policy page with the standard sections"~~

**Forms**

~~- "Add a contact form that sends to my email using EmailJS"~~

~~- "The form needs a dropdown for 'How did you hear about us?'"~~

**Deployment** These are probably the only ones I did use..

- "Bump the version to 1.1.0"

- "Merge development to production and push"

---

## Tips
These are probably worth doing .. but to be honest I never did .. (perhaps claude did it for me).

**Fill in `docs/tone-of-voice.md` early.** Once you have a few sentences you like, paste them in. Claude will pattern-match to them.

**Fill in `docs/copy-rules.md` as you go.** When Claude writes something and you correct it, add the rule to the file so it sticks across sessions.

**Update `CLAUDE.md` as the project evolves.** New pages, new audiences, things that changed. Claude reads it fresh each session.

---

## Licence

MIT — see [LICENSE](LICENSE).
