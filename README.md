# Karthick N — Portfolio

Single-page personal site. Vanilla HTML + CSS + JS, no build step, deployed on GitHub Pages:
https://karthick-71.github.io/Karthick-Portfolio/

## Files

| File | Purpose |
|---|---|
| `index.html` | Hero, About, Domains, Skills, Experience, Selected work, Credentials, Contact |
| `style.css` | "Test report" theme. Sections alternate light and dark bands. The page follows the visitor's system light/dark setting until they use the toggle. |
| `script.js` | Theme toggle, mobile menu, active-section nav, terminal type-in, scroll reveals, 3D hero and ID-card tilt, page-turn transitions, copy buttons, "Email me" chooser |
| `Karthick-N_QA_Resume_Sep-2026-01.pdf` | Resume behind the "Download resume" buttons |
| `og-image.png` | 1200x630 link-preview card (LinkedIn, WhatsApp, Slack) |
| `avatar.png` | Portrait in the About ID card. Keep it small (about 480px on the long side). |

All content mirrors the resume of record. When the resume changes, update these together and swap the PDF:

- the hero stats
- the Experience bullets
- the Selected work cards
- the ID-card details

Only use numbers that appear on the resume.

## Cache busting

`index.html` loads `style.css`, `script.js` and `avatar.png` with a `?v=YYYY-MM-DD<letter>` tag.
Bump that tag whenever one of those files changes. Otherwise returning visitors can get a cached old copy.

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

Push to the `main` branch of `Karthick-71/Karthick-Portfolio`. GitHub Pages republishes in about a minute.
LinkedIn caches link previews. After changing `og-image.png`, refresh the preview with
[Post Inspector](https://www.linkedin.com/post-inspector/).
