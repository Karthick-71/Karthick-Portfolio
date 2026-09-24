# Karthick N — Portfolio

Single-page personal site. Vanilla HTML + CSS + JS, no build step, deployed on GitHub Pages:
https://karthick-71.github.io/Karthick-Portfolio/

## Files

| File | Purpose |
|---|---|
| `index.html` | Hero, About, Skills, Experience, Selected work, Credentials, Contact |
| `style.css` | "Test report" theme — light by default, dark via system setting or the toggle |
| `script.js` | Theme toggle, mobile menu, active-section nav, terminal type-in, scroll reveals |
| `Karthick-N_QA_Resume_Sep-2026-01.pdf` | Resume behind the "Download resume" button |
| `og-image.png` | 1200x630 link-preview card (LinkedIn, WhatsApp, Slack) |
| `avatar.png` | Portrait in the About section |

All content mirrors the resume of record. When the resume changes, update the hero stats,
Experience bullets and Selected work cards together, and swap the PDF.

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

Push to the `main` branch of `Karthick-71/Karthick-Portfolio`; GitHub Pages republishes in about a minute.
