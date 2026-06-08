"""Tests for build.py."""

from pathlib import Path

import pytest

from build import build_html, load_section, parse_md


def test_parse_md_valid_frontmatter(tmp_path: Path) -> None:
    f = tmp_path / "test.md"
    f.write_text("---\ntitle: Hello\nslug: test\n---\n\nBody content here.")
    meta, body = parse_md(f)
    assert meta == {"title": "Hello", "slug": "test"}
    assert body == "Body content here."


def test_parse_md_missing_closing(tmp_path: Path) -> None:
    f = tmp_path / "test.md"
    f.write_text("---\ntitle: Hello\nslug: test\n\nBody content here.")
    meta, body = parse_md(f)
    assert meta == {}
    assert body == f.read_text().strip()


def test_parse_md_no_frontmatter(tmp_path: Path) -> None:
    f = tmp_path / "test.md"
    f.write_text("Just body text.")
    meta, body = parse_md(f)
    assert meta == {}
    assert body == "Just body text."


def test_parse_md_empty_frontmatter(tmp_path: Path) -> None:
    f = tmp_path / "test.md"
    f.write_text("---\n---\n\nBody.")
    meta, body = parse_md(f)
    assert meta == {}
    # Regex needs content between the --- delimiters, so falls to else branch
    assert body == f.read_text().strip()


def test_load_section_empty(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr("build.CONTENT_DIR", tmp_path)
    section = load_section("empty_dir")
    assert section == []


def test_load_section_populated(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr("build.CONTENT_DIR", tmp_path)
    d = tmp_path / "projects"
    d.mkdir()
    (d / "a.md").write_text("---\ntitle: A\n---\n\nBody A")
    (d / "b.md").write_text("---\ntitle: B\n---\n\nBody B")
    section = load_section("projects")
    assert len(section) == 2
    assert section[0][0]["title"] == "A"
    assert section[1][0]["title"] == "B"


@pytest.fixture
def all_enabled(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr("build.CONFIG", {
        "experience": True,
        "education": True,
        "research": True,
        "personal_projects": True,
        "skills": True,
    })


def test_build_html_contains_sections(all_enabled: None) -> None:
    html = build_html()
    assert "<title>" in html
    assert 'id="experience"' in html
    assert 'id="education"' in html
    assert 'id="research"' in html
    assert 'id="projects"' in html
    assert 'id="skills"' in html
    assert "section-title" in html


def test_projects_without_links_included(all_enabled: None, monkeypatch: pytest.MonkeyPatch) -> None:
    from build import CONTENT_DIR

    real_projects = list((CONTENT_DIR / "projects").glob("*.md"))
    signal_q = CONTENT_DIR / "projects" / "signal-quality.md"
    assert signal_q.exists(), "signal-quality.md must exist"
    assert signal_q in real_projects

    html = build_html()
    assert "signal quality" in html.lower() or "Signal Quality" in html
