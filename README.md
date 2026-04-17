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

> "I've just cloned this template. Set up the tools so can run: npm run dev in another terminal"

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

### One-time setup

**1. Update `wrangler.jsonc`**

Change `"name": "your-site-name"` to a short slug — this becomes your Cloudflare Pages project name and your initial URL (`your-slug.pages.dev`).

**2. Log in to Wrangler**

```bash
npx wrangler login
```

Opens a browser. Authorise it in the Cloudflare dashboard, then return to the terminal.

**3. Connect your GitHub repo**

1. Go to [Cloudflare Pages](https://pages.cloudflare.com) → **Create a project** → **Connect to Git**
2. Select your repo
3. Set build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Add an environment variable:
   - `SITE_URL` = `https://yourdomain.com` (or `https://your-slug.pages.dev` to start)
5. Click **Save and Deploy**

That's it. Your site is live at `your-slug.pages.dev`.

> **Why `SITE_URL` matters:** Astro uses it to generate your sitemap and canonical link tags. Without it those will contain `https://example.com`.

### Deploying changes

After the initial setup, push to the `production` branch — Cloudflare Pages deploys automatically.

```bash
# When your changes are ready:
git checkout production
git merge development
git push
```

Or just tell Claude: *"Merge development to production and push"*

### Manual deploy (no GitHub connection)

If you prefer not to connect GitHub, deploy from the CLI at any time:

```bash
npm run deploy
```

This builds the site and pushes it to Cloudflare Pages via Wrangler.

### Custom domain

Once your site is live on `*.pages.dev`:
- Cloudflare Pages → project → **Custom Domains** → **Add a domain**
- If your domain is registered with Cloudflare it wires up automatically; otherwise add a CNAME at your registrar.
- Update `SITE_URL` in Cloudflare Pages → **Settings → Environment variables** to your real domain, then redeploy.

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

## Example
This is the terminal 1 console log from me testing the template ..

It should give you an idea of how losely you can be chatting to claude.

This was approx 2 mins from starting claude to having an empty site running on my local machine.

There is no real subtsance to the site at the end but it was running locally .. and that's where it starts to get fun ..

```
pbm@ubuntu-dev:~/lsrc/exp1$ claude
           Claude Code v2.1.112
 ▐▛███▜▌   Sonnet 4.6 with medium effort · Claude Pro
▝▜█████▛▘  ~/lsrc/exp1
  ▘▘ ▝▝    Welcome to Opus 4.7 xhigh! · /effort to tune speed vs. intelligence

❯ "I've just cloned this template. Set up the tools, I want to: npm run dev"

● Let me check the project structure first.

  Listed 1 directory (ctrl+o to expand)

● Bash(npm install)
  ⎿  added 288 packages, and audited 289 packages in 6s

     140 packages are looking for funding
     … +3 lines (ctrl+o to expand)

● Dependencies installed. Now run the dev server:

● Bash(npm run dev)
  ⎿  Running in the background (↓ to manage)

● Bash(sleep 3 && cat /tmp/claude-1000/-home-pbm-lsrc-exp1/05465a24-de97-43c8-a044-6e2b69e8d8d4/tasks/
      b0g7vzjzk.output)
  ⎿  > your-site-name@0.1.0 dev
     > NODE_OPTIONS=--no-deprecation astro dev
     … +7 lines (ctrl+o to expand)

● Dev server is running at http://localhost:4321/.

  Next step: fill in CLAUDE.md (the "Your project" section) and docs/tone-of-voice.md /
  docs/copy-rules.md so Claude has context for writing copy when you're ready.

❯ OK do that for me

● I need a few details first — I can't invent your product. Quick questions:

  1. What does the site/business do? (1-2 sentences)
  2. Who is it for? (your main audience)
  3. What pages do you need? (beyond Home, About, Contact)
  4. Tone? (e.g. professional, friendly, direct, witty, formal)
  5. Any copy rules? (e.g. never use "synergy", always say "you" not "users", Oxford comma yes/no)

❯ 1: makes jewlery 2: customers, high end ideas with modest means 3: you figure it out 4: use best
  practice for driving enquiries 5: not sure but go for simple and easy to understand

● Let me read the existing docs files first.

● Reading 3 files… (ctrl+o to expand)
  ⎿  CLAUDE.md

● Update(CLAUDE.md)
  ⎿  Added 6 lines, removed 5 lines
      35
      36  ## Your project
      37
      38 -**Fill in this section.** Claude reads it every session.
      39 -
      38  **What this site is:**
      41 -[Describe your product or service in 1–2 sentences]
      39 +A handmade jewellery business. Customers get the look and feel of high-end jewellery
         +at prices that don't require a special occasion to justify.
      40
      41  **Who it's for:**
      44 -[List your main audiences]
      42 +People who love beautiful jewellery but don't want to pay luxury-brand prices — style
         +-conscious buyers who want something unique and personal.
      43
      44 +**Goal:**
      45 +Drive enquiries. Every page should give visitors a clear, easy next step to get in to
         +uch or ask about a piece.
      46 +
      47  **Pages planned:**
      48  - Home (`/`)
      49  - About (`/about`)
      50 +- Gallery (`/gallery`) — showcase pieces
      51  - Contact (`/contact`)
      50 -- [Add more as you build them]
      52
      53  **Copy rules:** see `docs/copy-rules.md`
      54

● Write(docs/tone-of-voice.md)
  ⎿  Added 12 lines, removed 19 lines
       1  # Tone of voice
       2
       3 -Fill this in so Claude matches your brand when writing copy.
       4 -
       3  ## Voice
       4
       7 -<!-- Describe the personality behind your writing. Examples:
       8 -  - Direct and warm. Not corporate. Talks to readers as equals.
       9 -  - Friendly but professional. Plain language. No jargon.
      10 -  - Energetic and confident. Short sentences. Gets to the point.
      11 --->
       5 +Warm, honest, and direct. Talks to the reader as a person, not a customer. Confident
         +without being boastful. No fluff — every sentence earns its place.
       6
       7 +The feeling to aim for: a skilled maker who is proud of their work and happy to talk
         +about it, not a luxury brand trying to intimidate you into buying.
       8 +
       9  ## Things to avoid
      10
      15 -<!-- Examples:
      16 -  - No exclamation marks
      17 -  - No passive voice
      18 -  - No filler phrases ("In order to...", "It is important to note that...")
      19 -  - No em-dashes — rewrite the sentence instead
      20 --->
      11 +- No jargon ("artisanal", "curated", "bespoke" used lazily)
      12 +- No hype or superlatives ("stunning", "incredible", "world-class")
      13 +- No passive voice — say who does what
      14 +- No filler phrases ("In order to...", "It is important to note that...")
      15 +- No exclamation marks
      16 +- Don't use "journey" to describe anything
      17
      18  ## On-brand copy examples
      19
      24 -<!-- Paste 2–3 sentences you like. Claude will pattern-match to these.
      25 -  Examples:
      26 -  - "We built this because we were frustrated with X."
      27 -  - "No account needed. Just open it and go."
      28 -  - "We're small, which means you'll actually talk to the person who built it."
      29 --->
      20 +- "Each piece is made by hand. If you don't see exactly what you want, ask — most thi
         +ngs can be made to order."
      21 +- "Good jewellery doesn't have to cost a fortune. It has to be made well."
      22 +- "Tell us what you have in mind. We'll tell you what's possible and what it costs."

● Write(docs/copy-rules.md)
  ⎿  Added 9 lines, removed 8 lines
       1  # Copy rules
       2
       3 -Rules Claude must follow when writing or editing copy on this site.
       4 -
       5 -<!-- Add your rules below. Examples:
       6 -  - No em-dashes — rewrite the sentence instead
       7 -  - Always use sentence case for headings (not Title Case)
       8 -  - Spell the product name exactly: "YourProduct" not "your product"
       9 -  - Never say something is "easy" — show why instead
      10 --->
       3 +- Use sentence case for all headings — not Title Case
       4 +- Spell "jewellery" not "jewelry" (British English throughout)
       5 +- Use "you" and "we" — never "customers", "users", or "clients"
       6 +- Every page must have one clear call to action pointing toward contact or enquiry
       7 +- Keep sentences short. If a sentence needs a comma, consider splitting it in two
       8 +- Show value by being specific — "made by hand in the UK" beats "handcrafted with car
         +e"
       9 +- Never say something is "affordable" — let the price or context do that work
      10 +- Oxford comma: yes
      11 +- Numbers under 10: spell them out

● Done. Three files updated:

  - CLAUDE.md — project description, audience, goal, planned pages
  - docs/tone-of-voice.md — warm and direct, maker not luxury brand, things to avoid
  - docs/copy-rules.md — British spelling, sentence case, one CTA per page, no "affordable", etc.

  One thing to confirm: I've used British English ("jewellery") — is that right for your market?

❯ sure

● Ready to build. A good next step would be updating src/config.ts with your site name and tagline,
  then building out the home page. What's the business called?

❯ name: sparkles tag: bling without funding

  Read 1 file (ctrl+o to expand)

● Update(src/config.ts)
  ⎿  Added 3 lines, removed 2 lines
       3  // generating pages and copy. After changing, tell Claude what you changed
       4  // so it can update CLAUDE.md.
       5
       6 -export const SITE_NAME    = 'Your Site Name';
       7 -export const SITE_TAGLINE = 'A short line that says what you do';
       6 +export const SITE_NAME    = 'Sparkles';
       7 +export const SITE_TAGLINE = 'Bling without funding';
       8  export const SITE_DOMAIN  = import.meta.env.SITE_URL || 'https://example.com';
       9
      10  // Contact — used in the footer and anywhere Claude generates contact copy
     ...
      12
      13  // Nav links — edit labels and hrefs, or ask Claude to add/remove entries
      14  export const NAV_LINKS = [
      15 +  { label: 'Gallery', href: '/gallery' },
      16    { label: 'About',   href: '/about'   },
      17    { label: 'Contact', href: '/contact' },
      18  ];

● Done. Name and tagline set, and I've added Gallery to the nav while I was in there. What's your
  contact email — hello@example.com is still a placeholder?
```
