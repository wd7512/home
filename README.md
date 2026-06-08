# William Dennis — Portfolio

Static portfolio site built from [`cv.yaml`](cv.yaml) using a simple Python build script.

## How it works

1. Edit `cv.yaml` with your latest CV data
2. Run `python3 build.py` to generate `dist/index.html`
3. Push to deploy (GitHub Pages serves from `dist/`)

## Build

```bash
python3 build.py          # build to dist/
python3 build.py --serve  # build and open in browser
```

## Deploy

The site is deployed to GitHub Pages. Push to `main` and the `dist/index.html` is served.

## Structure

```
cv.yaml          — Ground truth CV data (edit this)
build.py         — Static site generator (Python, no dependencies beyond pyyaml)
dist/index.html  — Generated output (single file, inline CSS)
```
