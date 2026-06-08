# William Dennis — Portfolio

Static portfolio site. Source of truth is [`cv.yaml`](cv.yaml). A GitHub Actions workflow builds and deploys to GitHub Pages on every push to `main`.

## How it works

1. Edit `cv.yaml` with your latest CV data
2. Push to `main`
3. GitHub Actions runs `build.py` → generates `dist/index.html`
4. Deploys to `gh-pages` branch → live at [wd7512.github.io/home](https://wd7512.github.io/home)

## Local build

```bash
python3 build.py          # build to dist/
python3 build.py --serve  # build and open in browser
```

## Structure

```
cv.yaml                    — Ground truth CV data (edit this)
build.py                   — Static site generator (Python + pyyaml)
.github/workflows/deploy.yml — CI/CD: build + deploy on push
dist/index.html            — Generated output (single file, inline CSS)
```
