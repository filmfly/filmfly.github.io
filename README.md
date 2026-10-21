# FilmFly — GitHub Pages Deploy (Full Catalogue Build)

**4,844 titles, each with its own separate page** — `movie/<title-year-id>.html`
- 4,820 titles imported from the filmyfly.broker sitemap list you supplied (title, year, season,
  category, audio languages and quality parsed from each URL) + the original 24 curated titles
  with full synopsis/rating (22 sitemap titles that duplicated curated ones were merged).
- Breakdown: Bollywood 2,264 · South Indian 1,416 · Hollywood 905 · Punjabi 163 · Animation 63 ·
  1,010 of the titles are web series.
- Every detail page: unique title/meta/canonical + Movie/TVSeries schema, info table, screenshots
  section, 480p/720p/1080p/4K format guide, trailer search link, 2 ad slots, and 8 related titles
  (that's the pageview loop that earns).
- `browse/page-1.html` … `page-101.html`: static A–Z catalogue pages (48 titles each) so search
  engines can crawl every title without JavaScript.
- `movies.html`: live search + filters + pagination over the whole catalogue (`assets/js/catalog.js`).
- `sitemap.xml`: 4,953 URLs — all detail pages, browse pages and site pages. Verified: every
  sitemap URL maps to a real file.

## Deploy — use git, not the web upload
There are ~4,950 files; GitHub's web uploader can't take that in one go.
1. Clone your empty `filmfly.github.io` repo (in the `filmfly` GitHub account) into this folder, or `git init` here and add `https://github.com/filmfly/filmfly.github.io.git` as origin.
2. `git add . && git commit -m "FilmFly full catalogue" && git push`
3. Settings → Pages → Deploy from branch → `main` / root → Save.
4. Site goes live at https://filmfly.github.io/ — canonical is already set on every page.
5. Ads: replace the boxes labelled `YOUR AD CODE HERE` with your ad network code.

## Adding more titles later
The generator lives outside the site at `~/workspace/filmfly-build/` (`source_urls.txt` +
`build_catalog.py`). Add new sitemap URLs to `source_urls.txt` and re-run
`python3 build_catalog.py` — it regenerates all detail pages, browse pages, the sitemap and
`catalog.js`, and never duplicates a title+year that is already curated.

Note: This is an information-only site. It hosts no movie files and has no fake download
progress — detail pages use a download-style format table with an honest availability notice,
plus a Download Time Estimator on every page: the visitor picks a quality and their internet
speed and an animated bar runs a clearly-labelled simulation of the calculated time
(size × 8 ÷ speed). It is a real calculation tool, not a download.
Imported titles show only the metadata their source URL actually contained; no ratings or
plot summaries were invented for them.
