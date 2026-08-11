# portfolio-home

George Willis's portfolio — geodata, spatial statistics and applied
machine learning.

Repo: `github.com/gcwillis14-coder/portfolio-home`. Because the repo
isn't named `<username>.github.io`, GitHub Pages will serve this as a
**project site** at `https://gcwillis14-coder.github.io/portfolio-home/`
once Pages is enabled (Settings → Pages → Deploy from a branch → `main`
/ root). All links in the site are relative, so it works fine at that
subpath — no changes needed. Point a custom domain at it later by adding
a `CNAME` file if you'd rather it live at a bare domain.

## Structure

Plain HTML/CSS/JS, no build step, no framework — deploys as-is to GitHub
Pages.

```
index.html            Home
portfolio/index.html  Full project index (filterable: maps / data studies)
about/index.html      Bio
publications/index.html  Peer-reviewed publications
writing/index.html    Long-form notes (empty state — see comment in file
                       for how to add a post)
assets/style.css       Design system (colour, type, layout tokens at the top)
assets/main.js         Mobile nav + portfolio filter, no dependencies

portfolio/R/            Kept R Markdown project reports
portfolio/python-notebooks/  Kept Python/ArcPy project report
portfolio/misc/         Kept misc R Markdown reports
portfolio/maps/          Two kept Leaflet/QGIS maps
maps/ri-history-compare/ Third kept map (historical swipe compare)

vendor/, css/creative.css   Left in place only because portfolio/R/Animated_NTL.html
                             (a self-contained R Markdown export) still links to them.
                             Nothing else in the site depends on them.
```

## Editorial curation

Eleven projects are kept: three interactive maps plus one map/data hybrid
(house prices), and seven statistical studies in R/Python. Everything
still branded "SmirkyGraphs" (the template this site was originally
forked from — five infographics, a Tableau embed, one screenshot page)
has been removed, along with a duplicate file and unused build tooling.

## Adding a new project

Duplicate one of the existing `portfolio/*/*.html` reports, or add a new
row to the `index-list` in `portfolio/index.html` pointing at wherever
the new report/map lives. Give it `data-cat="map"` or `data-cat="data"`
so the filter picks it up, and it's optional but nice to add a small
duotone preview image or inline SVG mark following the existing pattern.

## Adding a post to Writing

See the HTML comment at the top of `writing/index.html` — duplicate the
file, write the piece, add one row to the index list. No CMS, no build.

## Notes / things to check before publishing

- `gcwillis14@gmail.com` and `github.com/gcwillis14` are used as the
  contact links in the footer of every page — update these if either
  has changed.
- The About page background line ("PhD researcher, University of
  Birmingham") is carried over from the previous site's copy — update
  if your current role has changed.
- No CNAME file is included, so this deploys to the default
  `gcwillis14.github.io` URL. Add a `CNAME` file at the repo root if you
  point a custom domain at it later.
