# Karthick N — Portfolio

Personal portfolio site. Single-page, vanilla HTML + CSS + JS. No build step. Deploys on GitHub Pages.

> **Tagline:** Python-first SDET with a FreightTech edge. I build automation that keeps production quiet — 1,000+ tests · ~78% coverage · 35% fewer defect escapes.

---

## 📁 Files

| File | Purpose |
|---|---|
| `index.html` | All 7 sections (hero, about, experience, projects, certifications, education, contact) |
| `style.css` | Dark theme + blue accent (`#2A6FBB`, matches FA resume) |
| `script.js` | Smooth scroll · hamburger nav · scroll progress bar · stats counter · fade-in observers |
| `Karthick_n_Sr-QA_Engineer_Resume.pdf` | Drop the compiled FA resume PDF here so the "Download Resume" button works |

---

## 👀 Preview locally (60 seconds)

```bash
cd "/Users/mako/Documents/A New File Format/karthick_n/portfolio"
# Option 1 — just open in browser:
open index.html

# Option 2 — Python simple server (auto-reload-friendly):
python3 -m http.server 8000
# then open http://localhost:8000
```

If you see content but no styling, hard-refresh: `Cmd + Shift + R`.

---

## 🚀 Deploy to GitHub Pages (5 minutes)

### Step 1 — Add the resume PDF
Copy your compiled FA resume PDF into this folder as `Karthick_n_Sr-QA_Engineer_Resume.pdf` (filename must match the link in `index.html` line ~74). Use the version with the new Mako-reframing edits.

### Step 2 — Create the GitHub repo
- Sign into [github.com/Karthick-71](https://github.com/Karthick-71)
- Click **New repository**
- Repo name: `Karthick-Portfolio` (or whatever you prefer)
- **Public** (required for free GitHub Pages)
- Don't initialize with README — you already have one
- **Create repository**

### Step 3 — Push the code
From this directory:

```bash
git init
git add .
git commit -m "Initial portfolio scaffold"
git branch -M main
git remote add origin https://github.com/Karthick-71/Karthick-Portfolio.git
git push -u origin main
```

### Step 4 — Enable GitHub Pages
- Go to your repo → **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: **main** · folder: **/ (root)**
- **Save**

Wait 30–60 seconds. Your site will be live at:

**`https://karthick-71.github.io/Karthick-Portfolio/`**

---

## ✏️ Customize

### Hero stats
Open `index.html`, find the `.hero-stats` block (~line 60). Each `<div class="stat-card">` has a `data-target` attribute — change the number and the counter animation will adapt.

### Add your certifications
Find the `<!-- Certifications -->` section in `index.html` (~line 220). Replace the 3 placeholder `<div class="cert-card placeholder">` blocks with real ones:

```html
<div class="cert-card">
  <div class="cert-org">ISTQB</div>
  <div class="cert-name">ISTQB Foundation Level</div>
  <div class="cert-meta">ISTQB · 2024</div>
</div>
```

Remove the `placeholder` class to remove the dashed border. Delete the `<p class="note">...</p>` line once all placeholders are gone.

### Change accent color
In `style.css` find `:root` (line 8). Change:
- `--accent: #2A6FBB;` → main accent color
- `--accent-hover: #4A8FDB;` → lighter hover variant

### Change tagline
In `index.html`, find `.hero-tagline` (~line 50). Edit the text.

### Add a project
Copy any `<article class="project-card">` block and edit. Projects-grid auto-flows.

---

## 🎨 Design tokens (for tweaking)

| Token | Value | Used for |
|---|---|---|
| `--bg` | `#0A0E1A` | Page background (deep navy-black) |
| `--surface` | `#131826` | Card backgrounds |
| `--accent` | `#2A6FBB` | Primary accent (matches FA resume) |
| `--accent-hover` | `#4A8FDB` | Hover/highlight variant |
| `--text` | `#E8EEF8` | Primary text |
| `--text-soft` | `#B6C0D6` | Secondary text |
| `--success` | `#4ADE80` | Status pill, "Open to Opportunities" |
| `--font-display` | `Syne` | Headings |
| `--font-body` | `Inter` | Body text |
| `--font-mono` | `JetBrains Mono` | Badges, tags, dates |

---

## 🔗 Linked in the site

- **Email:** karthick7140341@gmail.com
- **Phone:** +91 63803 34553
- **LinkedIn:** linkedin.com/in/karthick-n-4601a8203 (active profile)
- **GitHub:** github.com/Karthick-71

---

## 📝 What's not included (you may want to add)

- [ ] Real certifications (currently 3 placeholders)
- [ ] Custom favicon (drop `favicon.ico` in this folder)
- [ ] Open Graph image (`og-image.png` for LinkedIn previews — 1200×630)
- [ ] Google Analytics or Plausible (privacy-friendly) — optional
- [ ] Custom domain (e.g., `karthick.dev`) — optional, requires DNS config

---

## 🛠️ Built with

Vanilla HTML, CSS, JavaScript. No framework, no build pipeline, no dependencies.

© 2026 Karthick N
