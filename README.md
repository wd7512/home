# William Dennis — Portfolio

Static portfolio site. Source of truth is the [`content/`](content/) directory — Markdown files with YAML frontmatter. A GitHub Actions workflow builds and deploys to GitHub Pages on every push to `main`.

## How it works

1. Edit Markdown files in `content/` (experience, education, projects, publications, skills)
2. Push to `main`
3. GitHub Actions runs `uv run python build.py` → generates `dist/index.html`
4. Deploys to `gh-pages` branch → live at [wd7512.github.io/home](https://wd7512.github.io/home)

## Content structure

```
content/
  personal.md           — Name, title, tagline, contact links
  experience/
    aurora.md           — Frontmatter: role, company, location, period. Body: bullet points
    jpmorgan.md
    milbotix.md
    ocean-partners.md
  education/
    bristol.md          — Frontmatter: institution, degree, details, period. Body: achievements
    bath.md
  projects/
    robust-ml.md        — Frontmatter: title, tags[], year, links[]. Body: description
    signal-quality.md
    snake-ai.md         — Frontmatter: title, tags[], year, link. Body: description
    chess-guides.md
    pi-temp.md
    ai-trader.md
    steam-market.md
  publications/
    icaart-2025.md      — Frontmatter: title, authors, venue, date, status, link
    lnai-2025.md
    signal-quality.md
  skills/
    languages.md        — Frontmatter: category, skills[]
    frameworks.md
    cloud.md
```

Each file uses YAML frontmatter for metadata and Markdown for content. The build script reads the folder structure, parses frontmatter, and generates a single HTML file.

## Local build

```bash
uv run python build.py          # build to dist/
uv run python build.py --serve  # build and open in browser
```
