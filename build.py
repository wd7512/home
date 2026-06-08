#!/usr/bin/env python3
"""Build the static portfolio site from Markdown content files.

Usage:
    python3 build.py          # build to dist/
    python3 build.py --serve  # build and open in browser
"""

import argparse
import re
from pathlib import Path

import yaml

SCRIPT_DIR = Path(__file__).parent
CONTENT_DIR = SCRIPT_DIR / "content"
DIST_DIR = SCRIPT_DIR / "dist"


def parse_md(path: Path) -> tuple[dict, str]:
    """Parse a Markdown file with YAML frontmatter. Returns (meta, body)."""
    text = path.read_text()
    m = re.match(r"^---\n(.*?)\n---\n?(.*)", text, re.DOTALL)
    if m:
        meta = yaml.safe_load(m.group(1)) or {}
        body = m.group(2).strip()
    else:
        meta = {}
        body = text.strip()
    return meta, body


def load_section(dir_name: str) -> list[tuple[dict, str]]:
    """Load all .md files in a content subdirectory, sorted by filename."""
    files = sorted((CONTENT_DIR / dir_name).glob("*.md"))
    return [parse_md(f) for f in files]


def build_html() -> str:
    # Personal
    personal, _ = parse_md(CONTENT_DIR / "personal.md")

    # Experience
    experience = load_section("experience")

    # Education
    education = load_section("education")

    # Projects (research + personal mixed — research projects have "links" in meta)
    all_projects = load_section("projects")
    research_projects = [(m, b) for m, b in all_projects if "links" in m]
    personal_projects = [(m, b) for m, b in all_projects if "links" not in m]

    # Publications
    publications = load_section("publications")

    # Skills
    skills = load_section("skills")

    p = personal

    # ── Experience ──
    exp_items = ""
    for meta, body in experience:
        descs = "".join(f"<li>{line[2:]}</li>" for line in body.splitlines() if line.startswith("- "))
        exp_items += f"""
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="card">
            <h3>{meta.get('role', '')}</h3>
            <div class="meta">{meta.get('company', '')} · {meta.get('location', '')}</div>
            <div class="period">{meta.get('period', '')}</div>
            <ul>{descs}</ul>
          </div>
        </div>"""

    # ── Education ──
    edu_items = ""
    for meta, body in education:
        achvs = "".join(f"<li>{line[2:]}</li>" for line in body.splitlines() if line.startswith("- "))
        edu_items += f"""
        <div class="card">
          <div class="edu-header">
            <div>
              <h3>{meta.get('institution', '')}</h3>
              <div class="meta">{meta.get('degree', '')}</div>
            </div>
            <span class="period">{meta.get('period', '')}</span>
          </div>
          <div class="badge">{meta.get('details', '')}</div>
          <ul>{achvs}</ul>
        </div>"""

    # ── Research Projects ──
    research_items = ""
    for meta, body in research_projects:
        tags = "".join(f'<span class="tag">{t}</span>' for t in meta.get("tags", []))
        links = "".join(
            f'<a href="{link["url"]}" class="link-btn" target="_blank" rel="noopener">{link["label"]}</a>'
            for link in meta.get("links", [])
        )
        research_items += f"""
        <div class="card">
          <div class="card-header">
            <h4>{meta['title']}</h4>
            <span class="period">{meta.get('year', '')}</span>
          </div>
          <p>{body}</p>
          <div class="tags">{tags}</div>
          <div class="links">{links}</div>
        </div>"""

    # ── Personal Projects ──
    proj_items = ""
    for meta, body in personal_projects:
        tags = "".join(f'<span class="tag">{t}</span>' for t in meta.get("tags", []))
        link_html = ""
        if "link" in meta:
            link_html = f'<a href="{meta["link"]}" class="link-btn" target="_blank" rel="noopener">View →</a>'
        proj_items += f"""
        <div class="card project-card">
          <div class="card-header">
            <h4>{meta['title']}</h4>
            <span class="period">{meta.get('year', '')}</span>
          </div>
          <p>{body}</p>
          <div class="tags">{tags}</div>
          {link_html}
        </div>"""

    # ── Publications ──
    pub_items = ""
    for meta, body in publications:
        status = meta.get("status", "")
        status_class = "published" if status == "Published" else "pending"
        title = meta.get("title", "")
        link = meta.get("link", "")
        title_html = f'<a href="{link}" target="_blank" rel="noopener">{title}</a>' if link else title
        pub_items += f"""
        <div class="pub-item">
          <div class="pub-top">
            <h4>{title_html}</h4>
            <span class="status {status_class}">{status}</span>
          </div>
          <p class="authors">{meta.get('authors', '')}</p>
          <div class="pub-bottom">
            <span class="venue">{meta.get('venue', '')}</span>
            <span class="period">{meta.get('date', '')}</span>
          </div>
        </div>"""

    # ── Skills ──
    skill_sections = ""
    for meta, body in skills:
        category = meta.get("category", "")
        items = "".join(f'<span class="skill">{s}</span>' for s in meta.get("skills", []))
        skill_sections += f"""
        <div class="skill-group">
          <h3>{category}</h3>
          <div class="skills">{items}</div>
        </div>"""

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{p['name']} | {p['title']}</title>
  <meta name="description" content="{p['tagline']}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}

    :root {{
      --bg: #0f172a;
      --bg-card: #1e293b;
      --bg-card-hover: #263348;
      --text: #e2e8f0;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --accent: #818cf8;
      --accent-dim: #4f46e5;
      --border: #334155;
      --success: #34d399;
      --pending: #fbbf24;
      --radius: 12px;
      --max-w: 1100px;
    }}

    html {{ scroll-behavior: smooth; }}

    body {{
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }}

    a {{ color: var(--accent); text-decoration: none; }}
    a:hover {{ text-decoration: underline; }}

    .container {{ max-width: var(--max-w); margin: 0 auto; padding: 0 24px; }}
    section {{ padding: 80px 0; }}
    .section-title {{
      font-size: 1.75rem; font-weight: 700; margin-bottom: 48px;
      padding-bottom: 16px; border-bottom: 2px solid var(--accent-dim);
      display: inline-block;
    }}

    nav {{
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
    }}
    nav .container {{
      display: flex; justify-content: space-between; align-items: center;
      height: 56px;
    }}
    nav .logo {{ font-weight: 700; color: var(--text); font-size: 1.1rem; }}
    nav .logo:hover {{ text-decoration: none; color: var(--accent); }}
    nav .links {{ display: flex; gap: 24px; }}
    nav .links a {{ color: var(--text-muted); font-size: 0.875rem; font-weight: 500; }}
    nav .links a:hover {{ color: var(--text); text-decoration: none; }}

    #hero {{
      min-height: 100vh; display: flex; align-items: center;
      padding-top: 56px;
      background: radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 60%);
    }}
    #hero h1 {{ font-size: 3rem; font-weight: 700; line-height: 1.1; margin-bottom: 16px; }}
    #hero .subtitle {{ font-size: 1.25rem; color: var(--text-muted); margin-bottom: 32px; max-width: 560px; }}
    #hero .cta {{ display: flex; gap: 16px; flex-wrap: wrap; }}
    .btn {{
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 20px; border-radius: 8px; font-weight: 500; font-size: 0.875rem;
      transition: all 0.15s;
    }}
    .btn-primary {{ background: var(--accent-dim); color: white; }}
    .btn-primary:hover {{ background: var(--accent); text-decoration: none; }}
    .btn-outline {{ border: 1px solid var(--border); color: var(--text); }}
    .btn-outline:hover {{ border-color: var(--text-muted); text-decoration: none; }}

    .card {{
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      transition: border-color 0.15s;
    }}
    .card:hover {{ border-color: var(--text-dim); }}
    .card h3 {{ font-size: 1.1rem; font-weight: 600; margin-bottom: 4px; }}
    .card h4 {{ font-size: 1rem; font-weight: 600; }}
    .card .meta {{ color: var(--accent); font-size: 0.875rem; font-weight: 500; }}
    .card .period {{ color: var(--text-dim); font-size: 0.8rem; font-family: monospace; }}
    .card ul {{ margin-top: 12px; padding-left: 20px; }}
    .card li {{ color: var(--text-muted); font-size: 0.875rem; margin-bottom: 4px; }}
    .card p {{ color: var(--text-muted); font-size: 0.875rem; margin: 8px 0; }}

    .card-header {{
      display: flex; justify-content: space-between; align-items: baseline;
      margin-bottom: 8px;
    }}

    .timeline {{ position: relative; }}
    .timeline::before {{
      content: ''; position: absolute; left: 19px; top: 0; bottom: 0;
      width: 2px; background: var(--border);
    }}
    .timeline-item {{ position: relative; padding-left: 56px; margin-bottom: 32px; }}
    .timeline-dot {{
      position: absolute; left: 12px; top: 24px;
      width: 16px; height: 16px; border-radius: 50%;
      background: var(--bg-card); border: 3px solid var(--accent-dim);
    }}

    .edu-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; }}
    .edu-header {{ display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }}
    .badge {{
      display: inline-block; margin: 8px 0 16px; padding: 4px 12px;
      background: rgba(251, 191, 36, 0.1); color: var(--pending);
      border: 1px solid rgba(251, 191, 36, 0.2);
      border-radius: 99px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
    }}

    .research-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }}
    @media (max-width: 768px) {{ .research-grid {{ grid-template-columns: 1fr; }} }}

    .projects-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }}
    .project-card {{ display: flex; flex-direction: column; }}
    .project-card p {{ flex-grow: 1; }}

    .tags {{ display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }}
    .tag {{
      padding: 2px 10px; background: rgba(129, 140, 248, 0.1);
      color: var(--accent); border: 1px solid rgba(129, 140, 248, 0.2);
      border-radius: 99px; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;
    }}
    .links {{ display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }}
    .link-btn {{
      display: inline-flex; align-items: center; gap: 4px;
      padding: 6px 14px; background: rgba(129, 140, 248, 0.1);
      border: 1px solid rgba(129, 140, 248, 0.2); border-radius: 6px;
      font-size: 0.8rem; font-weight: 500; color: var(--accent);
    }}
    .link-btn:hover {{ background: rgba(129, 140, 248, 0.2); text-decoration: none; }}

    .pub-item {{
      padding: 20px; border-left: 3px solid var(--accent-dim);
      background: var(--bg-card); border-radius: 0 var(--radius) var(--radius) 0;
      margin-bottom: 16px;
    }}
    .pub-top {{ display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 4px; }}
    .pub-top h4 {{ font-size: 0.95rem; font-weight: 600; }}
    .pub-top h4 a {{ color: var(--text); }}
    .pub-top h4 a:hover {{ color: var(--accent); }}
    .authors {{ color: var(--text-muted); font-size: 0.85rem; margin-bottom: 8px; }}
    .pub-bottom {{ display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid var(--border); }}
    .venue {{ color: var(--accent); font-size: 0.8rem; font-weight: 500; }}
    .status {{
      padding: 2px 10px; border-radius: 99px; font-size: 0.7rem;
      font-weight: 600; text-transform: uppercase; white-space: nowrap;
    }}
    .status.published {{ background: rgba(52, 211, 153, 0.1); color: var(--success); }}
    .status.pending {{ background: rgba(251, 191, 36, 0.1); color: var(--pending); }}

    .skills-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 32px; }}
    .skill-group h3 {{ font-size: 1rem; font-weight: 600; color: var(--text-muted); margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }}
    .skills {{ display: flex; flex-wrap: wrap; gap: 8px; }}
    .skill {{
      padding: 6px 14px; background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 8px; font-size: 0.85rem; color: var(--text);
    }}

    footer {{ padding: 40px 0; border-top: 1px solid var(--border); text-align: center; color: var(--text-dim); font-size: 0.85rem; }}

    @media (max-width: 640px) {{
      #hero h1 {{ font-size: 2rem; }}
      nav .links {{ gap: 16px; }}
      nav .links a {{ font-size: 0.8rem; }}
      section {{ padding: 60px 0; }}
      .timeline::before {{ left: 9px; }}
      .timeline-item {{ padding-left: 36px; }}
      .timeline-dot {{ left: 2px; width: 14px; height: 14px; }}
    }}
  </style>
</head>
<body>

<nav>
  <div class="container">
    <a href="#hero" class="logo">{p['name']}</a>
    <div class="links">
      <a href="#experience">Experience</a>
      <a href="#education">Education</a>
      <a href="#research">Research</a>
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
    </div>
  </div>
</nav>

<section id="hero">
  <div class="container">
    <h1>{p['name']}</h1>
    <p class="subtitle">{p['title']}<br>{p['tagline']}</p>
    <div class="cta">
      <a href="mailto:{p['email']}" class="btn btn-primary">Email Me</a>
      <a href="{p['linkedin']}" class="btn btn-outline" target="_blank" rel="noopener">LinkedIn</a>
      <a href="{p['github']}" class="btn btn-outline" target="_blank" rel="noopener">GitHub</a>
    </div>
  </div>
</section>

<section id="experience">
  <div class="container">
    <h2 class="section-title">Experience</h2>
    <div class="timeline">{exp_items}</div>
  </div>
</section>

<section id="education">
  <div class="container">
    <h2 class="section-title">Education</h2>
    <div class="edu-grid">{edu_items}</div>
  </div>
</section>

<section id="research">
  <div class="container">
    <h2 class="section-title">Research & Publications</h2>
    <div class="research-grid">
      <div>
        <h3 style="color:var(--text-muted);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:20px;">Publications</h3>
        {pub_items}
      </div>
      <div>
        <h3 style="color:var(--text-muted);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:20px;">Research Projects</h3>
        {research_items}
      </div>
    </div>
  </div>
</section>

<section id="projects">
  <div class="container">
    <h2 class="section-title">Personal Projects</h2>
    <div class="projects-grid">{proj_items}</div>
  </div>
</section>

<section id="skills">
  <div class="container">
    <h2 class="section-title">Technical Skills</h2>
    <div class="skills-grid">{skill_sections}</div>
  </div>
</section>

<footer>
  <div class="container">
    <p>© {p['name']} · Built from <a href="https://github.com/wd7512/home/blob/main/content/">Markdown content</a></p>
  </div>
</footer>

</body>
</html>"""


def build():
    html = build_html()
    DIST_DIR.mkdir(exist_ok=True)
    out = DIST_DIR / "index.html"
    out.write_text(html)
    print(f"Built {out}")
    return out


def main():
    parser = argparse.ArgumentParser(description="Build static portfolio from Markdown content")
    parser.add_argument("--serve", action="store_true", help="Build and open in browser")
    args = parser.parse_args()
    build()
    if args.serve:
        import webbrowser
        out = DIST_DIR / "index.html"
        webbrowser.open(f"file://{out.resolve()}")


if __name__ == "__main__":
    main()
