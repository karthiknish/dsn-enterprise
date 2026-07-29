# SEO strategy — dsnenterprises.in

This document records what the Search Console data actually said, what was
changed in response, and what to do next. It exists so the next person does not
re-derive the same conclusions or undo the changes by accident.

All figures below come from the Search Console API for the 90 days ending
2026-07-29. Reproduce them with `npm run seo:audit` and `npm run seo:opportunity`.

---

## 1. What the data said

### Baseline
| Metric | Value |
|---|---|
| Clicks | 27 |
| Impressions | 1,349 |
| CTR | 2.00% |
| Average position | 8.2 |
| URLs submitted in sitemap | 123 |

### The three findings that mattered

**a) The location pages were not being crawled.**

A URL Inspection sample of 24 location pages returned:

| Coverage state | Share |
|---|---|
| Discovered – currently not indexed | 71% |
| URL is unknown to Google | 25% |
| Submitted and indexed | 4% |

23 of 24 had **never been crawled**. "Discovered – currently not indexed" means
Google saw the URL in the sitemap, evaluated it as not worth the crawl budget,
and skipped it. That is a quality judgement, not a technical fault.

**b) The pages deserved that judgement.**

The generator produced a blind 7 products × 8 cities matrix (56 pages) plus
3 services × 8 cities (24 pages) = 80 URLs, which was 65% of the entire sitemap.
Measured on the rendered HTML:

- average page: 565 words
- only ~67 words per page were city-specific (~12%)
- sibling pages (same product, different city) were **48% identical**
- same city, different product: **58% identical**
- content unique to a single page: **3.2%**

**c) There was no city-search demand to capture in the first place.**

Across all 90 days of query data:

| Query type | Impressions | Share |
|---|---|---|
| City / "near me" / Tamil Nadu terms | **0** | 0.0% |
| Standards & spec terms (IS 3455, IS 919, API, tolerances) | 114 | 16.1% |
| Branded ("dsn ...") | ~1,100 | ~78% |

Zero. The 80 location pages were 65% of the sitemap and targeted a query class
that produced no impressions at all, while `/blog/using-is-919-and-is-3455-to-make-better-plain-gauges`
alone pulled 131 impressions at position 9.

**Conclusion: effort was allocated almost exactly inversely to demand.**

---

## 2. What was changed

### 2.1 Location pages: 80 → 36, gated on relevance and tier

`src/lib/seo-pages.config.js` no longer emits a full matrix. Two gates apply:

1. **`PRODUCT_CITY_RELEVANCE` / `SERVICE_CITY_RELEVANCE`** — a product only gets
   a city page where that city's industrial base actually buys it. API master
   gauges belong in Thoothukudi (port, oil and gas) and Tiruchirappalli (energy
   fabrication), not in the Tiruppur knitwear belt.

2. **`LOCATION_TIER_LIMIT`** — cities carry a `tier`. Only cities at or below the
   limit emit pages. Default is `2`, which activates Coimbatore and Chennai
   (tier 1) and Tiruppur, Erode, Salem, Tiruchirappalli (tier 2). Madurai and
   Thoothukudi are tier 3 and currently dormant.

   Override with `NEXT_PUBLIC_LOCATION_TIER_LIMIT`.

**Do not raise the tier limit until the current tier is measurably indexed.**
Check with `npm run seo:coverage` before widening.

### 2.2 Retired URLs redirect instead of 404

The ~44 removed combinations are already in Google's index. Both
`src/app/products/[slug]/page.js` and `src/app/services/[slug]/page.js` issue a
**308 to the relevant hub page** for any known product/service whose city page no
longer exists. Verified:

```
/products/api-master-gauges-chennai      308 -> /products/api-gauges
/products/thread-plug-gauges-salem       308 -> /products/thread-gauges
/services/gauge-calibration-thoothukudi  308 -> /calibration
```

### 2.3 Each surviving page got real city-specific substance

`src/lib/seo-location-data.js` gained per-city fields that are genuinely local
rather than restated marketing copy:

- `distanceKm`, `transit`, `corridor` — real road distance and highway
- `nearbyTowns` — the actual satellite industrial towns
- `sector`, `transitPhrase` — used in metadata
- `toleranceFocus` — the gauging problem that dominates in that cluster
- `localProof` — a concrete shop-floor observation
- `buyingPattern` — how that cluster actually purchases

Plus `CITY_PRODUCT_NOTES` and `CITY_SERVICE_NOTES`: a specific paragraph about
what goes wrong with *this product* in *this city* (salt-air corrosion on API
gauges in Thoothukudi; abrasive GO-member wear in the Salem steel cluster;
extended-reach plugs for BHEL-linked suppliers in Trichy). Combinations without
a hand-written note fall back to a composed sentence built from the city profile,
so no page is ever generic.

### 2.4 Metadata was truncating in the SERP

Location descriptions averaged ~320 characters against Google's ~160 limit, so
every one was cut mid-sentence on pages already ranking at positions 8–10.
Titles ran to 78 chars against a ~60 limit, and several core pages carried the
brand twice (own suffix plus the root `title.template`), e.g.
`"... - DSN Enterprises | DSN Enterprises"` at 90 characters.

`buildProductTitle` / `buildProductDescription` and their service equivalents now
pick the first candidate string that fits a hard budget (`TITLE_MAX = 60`,
`DESC_MAX = 158`) rather than truncating mid-word.

### 2.5 Internal linking no longer points at pages that do not exist

`CityLinks`, `ProductCityBottomSections`, and `ServiceCityLanding` previously
iterated all 8 cities regardless of whether a page existed. They now use
`citiesForProduct()` / `citiesForService()`. Cross-links also use descriptive
anchors ("Thread Plug Gauges in Chennai") instead of a bare city name.

### 2.6 Sitemap priority reflects intent

Priority was a flat `0.5` for all 80 location URLs. It is now derived from city
tier and the product's rank within that city (0.5–0.7), so the crawler is
pointed at the pages most likely to rank.

### 2.7 Results

| Metric | Before | After |
|---|---|---|
| Public prerendered pages | 97 | 51 |
| Location pages | 80 | 36 |
| Sitemap URLs | 123 | 79 |
| Avg words per location page | 565 | 837 |
| Avg pairwise similarity | 48–58% | **18.8%** |
| Content unique to one page | 3.2% | **10.2%** |
| Titles over 60 chars | 88 | **0** |
| Descriptions over 160 chars | 82 | **0** |
| Duplicate titles / descriptions | 7 / 0 | **0 / 0** |

---

## 2A. Round two — keyword-driven content changes to indexed pages

Driven by `npm run seo:keywords`, which cross-references every page's actual
ranking queries against what that page's title, description, H1, and body say.

### The finding

The single highest-value page on the site is a blog post, and it was broken in
three independent ways at once.

`/blog/using-is-919-and-is-3455-to-make-better-plain-gauging-decisions`
— 105 impressions, **0 clicks**, average position 9.3.

| Query | Impressions | Position | Clicks |
|---|---|---|---|
| is 3455 | 40 | 9.7 | 0 |
| is3455 | 31 | 8.0 | 0 |
| is 3455 standard | 20 | 10.0 | 0 |
| is 919 | 11 | 10.4 | 0 |
| is919 | 3 | 8.3 | 0 |

**Defect 1 — two `<h1>` elements on every blog post.** `src/app/blog/loading.js`
rendered a full `PageHero` with `<h1>Our Blog</h1>`. Next.js streams that
fallback into the initial HTML for the whole `/blog` subtree, so the served
markup of **all 28 posts** had `Our Blog` as the *first* H1, ahead of the
article's own title. Reproduced locally, so this was live, not a stale deploy.

**Defect 2 — duplicated brand in the title.** Stored `metaTitle` values already
ended in `| DSN Enterprises`, and the root `title.template` appended it again:
`IS 919 and IS 3455 for Plain Gauging | DSN Enterprises | DSN Enterprises`
(72 chars, truncated in the SERP). `/blog` itself had the same problem.

**Defect 3 — the content did not answer the query.** 369 words, `IS 3455`
mentioned once, and **zero** occurrences of the things a person searching
"is 3455" is actually looking for: the Taylor principle, the wear limit, the
20 °C reference temperature, or the 500 mm scope boundary.

### What was changed

| | Before | After |
|---|---|---|
| `<h1>` per post | 2 (`Our Blog` first) | **1** (article title) |
| Post title | 72 chars, brand ×2 | **50 chars**, keyword-led |
| Body | 369 words | **1,965 words** |
| "IS 3455" in body | 1 | 14 |
| "IS 919" in body | 1 | 16 |
| Taylor / wear limit / 500 mm / ISO 286 | 0 / 0 / 0 / 0 | 4 / 7 / 3 / 5 |

The slug was **not** changed, so the existing position-9 ranking is preserved.

### Sourcing — this part matters

The rewritten article states what IS 3455 and IS 919 contain. Every factual
claim was verified against primary sources on 2026-07-29:

- **IS 3455:1971**, "Gauging Practice for Plain Workpieces" (First Revision),
  committee PGD 25, reaffirmed 2020, Fifth Reprint Nov 1996 incl. Amendments 1–4.
  Full text read from `law.resource.org/pub/in/bis/S01/is.3455.1971.pdf`.
  Verified directly: the *"dimensions less than 500 mm"* scope wording, clause
  2.1 (limit gauges as the recognised acceptance method), clause 3.1–3.3 (20 °C
  reference temperature and the same/different expansion-coefficient cases),
  section 4 (Taylor principle wording for holes and shafts, 4.1.1 and 4.2), and
  section 10.1–10.2.1 (the H / H\_s / H\_1 / H\_p, Y / Y\_1, Z / Z\_1 symbol set
  and the placement of GO and NO GO tolerance zones, including the 160 mm and
  180 mm size breaks).
- **IS 3455 (Part 1):1985**, indicating-instrument inspection, PGD 25,
  reaffirmed 2020 — BIS e-Sale catalogue.
- **IS 919 (Part 1):2014** = ISO 286-1:2010, retitled into the GPS framework,
  Third Revision, reaffirmed 2019, PGD 20. **IS 919 (Part 2):2014** =
  ISO 286-2:2010, Second Revision, reaffirmed 2019, PGD 37 — BIS e-Sale.
  These supersede the 1993 parts (= ISO 286:1988) and the 1963 edition that
  IS 3455:1971 itself still references.

**No numeric tolerance values from either standard are reproduced.** The H/Y/Z
*framework* is explained because that is what buyers get wrong; the tables
themselves are BIS copyright and readers are pointed to the e-Sale portal.
Do not "helpfully" add tolerance numbers to this page later — the risk of an
engineer working from a wrong value is not worth the extra word count.

A genuinely useful angle fell out of the sourcing: **IS 3455:1971 internally
cites IS 919-1963**, which is three revisions out of date. Drawings and quality
plans across the region still cite superseded IS 919 editions. The article now
says so.

### Tooling added

- `npm run seo:keywords` — per-page query alignment; flags "ranks for a term the
  title never mentions" and lists zero-CTR pages with real impressions.
- `node scripts/blog-inspect.mjs [slug]` — read-only Firestore post inspection.
- `node scripts/blog-seo-update.mjs [--dry]` — applies keyed content rewrites,
  writes a timestamped backup of every field it touches to
  `scripts/.blog-backups/`, and supports `--restore <file>`.

---

## 2B. Hindi layer (built, gated OFF by default)

### Read this before enabling

The capability is built and works. Whether to switch it on is a business call,
and the data does not currently support it:

- **Zero Devanagari-script queries in 180 days.** Not few — zero, across all 47
  distinct queries the site received.
- **Zero Tamil-script queries either.** This audience searches in English, which
  is normal for Indian industrial B2B: drawings, standards, and RFQs are in
  English, so buyers search in English even when they speak Hindi at work.
- **Google is already rationing crawl budget on this domain.** 71% of English
  pages sat at "Discovered — currently not indexed". Section 2 cut 80 location
  pages to 36 precisely to stop competing with ourselves for crawl attention.
  Adding a second language multiplies URLs again, in the opposite direction.
- **Hindi is not the local market language.** The business is in Coimbatore and
  the named target cities are all Tamil Nadu. If the goal is regional-language
  reach in the existing market, Tamil is the relevant language, not Hindi.
  Hindi makes sense only as a deliberate bid for North/Central India — a new
  market, with new logistics and competitors, not an easy extension of this one.

The honest counter-argument: you cannot rank for Hindi queries with no Hindi
pages, so zero demand is partly self-inflicted. That is fair. The response is to
test small — which is exactly what the gate is for — not to publish a full
mirror on day one.

### How it works

| | |
|---|---|
| URL shape | `/hi/...` subdirectory. **English URLs are untouched.** |
| Master switch | `NEXT_PUBLIC_HINDI_ENABLED=true` |
| Default | **off** — pages build and are reviewable, but are `noindex` and absent from `sitemap.xml` |
| Coverage | 6 curated pages, not the whole site (see below) |
| Config | `src/lib/i18n/config.js` |
| Content | `src/content/hi/pages.js` |
| Route | `src/app/hi/[[...slug]]/page.js` |

Currently translated: `/`, `/products`, `/products/plain-gauges`,
`/products/thread-gauges`, `/calibration`, `/contact`.

Verified behaviour:

| | Gated off (default) | `NEXT_PUBLIC_HINDI_ENABLED=true` |
|---|---|---|
| `/hi` robots | `noindex, nofollow` | `index, follow` |
| hreflang on `/hi` | 0 tags | 3 (`en-IN`, `hi-IN`, `x-default`) |
| hreflang on English pages | 0 tags | 3, reciprocal |
| Sitemap URLs | 79 | 85 (6 Hindi) |
| Sitemap `xhtml:link` alternates | 0 | 24 |

### Design decisions worth keeping

**No machine-translation fallback, by design.** A page is emitted in Hindi only
if a human-written entry exists in `src/content/hi/pages.js`. A machine-
translated near-duplicate of a page Google already declined to crawl is strictly
worse than no page. Do not add an auto-translate path.

**hreflang never points at a noindex URL.** While gated off, neither side emits
alternates. Google discards an entire language cluster when the return link is
missing or points somewhere non-indexable, so the tags appear only once the
layer is genuinely published.

**Translation register.** Indian shop-floor and QA staff read technical Hindi
with English loanwords — "प्लग गेज", "कैलिब्रेशन", "टॉलरेंस", "GO/NO-GO".
Sanskritised coinages ("मापनी", "अंशांकन") read as machine output to this
audience and nobody searches for them. Standards designations (IS 919, IS 3455,
ISO 286, API 5B), grade codes (H7, g6), and units stay in Latin script — that is
correct usage and keeps the pages matchable for the mixed-script queries these
buyers actually type.

**Known limitation.** Next.js only allows `<html>` in the root layout, so `/hi`
pages inherit `lang="en"` from `src/app/layout.js`. The content wrapper carries
`lang="hi"` for assistive tech, and hreflang plus `og:locale` carry the targeting
signal. Google determines page language from visible content and documents that
it ignores `lang` attributes, so this is safe at current scale. **If the Hindi
layer is ever widened to the whole site, migrate to `app/[locale]/` with two root
layouts and do it properly** — that refactor was not worth the risk to 30-odd
indexed English URLs for 6 pages.

### If you enable it

1. Set `NEXT_PUBLIC_HINDI_ENABLED=true` and deploy.
2. Resubmit `sitemap.xml` in Search Console.
3. **Have a Hindi-speaking engineer proofread `src/content/hi/pages.js` first.**
   The copy was written to be technically accurate and idiomatic, but it has not
   been reviewed by a native speaker in this domain.
4. Wait 8–12 weeks, then run `npm run seo:coverage` and check whether the Hindi
   URLs get crawled *and* whether English indexing degraded. If English coverage
   drops, the crawl-budget concern was real — turn it back off.
5. Only widen coverage if step 4 is clean.

---

## 3. Open items — not yet done

These are ranked by expected value. Items 1 and 2 are worth more than everything
in section 2 combined, because they address demand that already exists.

### 1. Fix the multi-host duplication (infrastructure, not code)

Three hosts currently serve indexed content:

```
https://www.dsnenterprises.in   30 urls   1,615 impr   28 clicks
http://dsnenterprises.in         1 url       95 impr    0 clicks
https://dsnenterprises.in        1 url       10 impr    0 clicks
```

105 impressions and their link equity are stranded on hosts that should redirect.
Fix at the DNS/hosting layer: `http://` and apex non-www must both 301 to
`https://www.`. This cannot be fixed in Next.js config alone.

### 2. Convert the standards traffic that already ranks

`/blog/using-is-919-and-is-3455-to-make-better-plain-gauges` earns 131
impressions at position 9.0 with a **0% CTR**. Related queries:

| Query | Impressions | Position | Clicks |
|---|---|---|---|
| is 3455 | 40 | 9.7 | 0 |
| is3455 | 31 | 8.0 | 0 |
| is 3455 standard | 20 | 10.0 | 0 |
| is 919 | 11 | 10.4 | 0 |

This is proven, non-branded, commercially-adjacent demand that the site already
ranks for and converts at zero. Two actions:

- Rewrite that post's title and meta description for click appeal — someone
  searching "is 3455" wants the tolerance tables, so say that in the title.
- Build a proper `/resources/is-3455-plain-gauge-tolerances` reference page with
  the actual tolerance tables. A reference page will out-rank a blog post for a
  standards lookup, and it can link directly to the plain-gauge product pages.

**Standards content out-earns location content 114 impressions to 0.** Weight
future effort accordingly.

### 3. Thin core pages

Rendered word counts: `/faq` 210, `/contact` 284, `/thank-you` 175.
`/faq` is the one that matters — it should absorb the standards and lead-time
questions people actually search for.

### 4. `/products` and `/products/special-gauges` are not indexed

Both return "Discovered/Crawled – currently not indexed" despite being hub
pages. They are the strongest internal-link sources on the site. Worth
investigating separately once the location-page churn has settled.

### 5. Trend warning

Last 28 days vs prior 28 days: impressions +34%, **clicks −56%** (16 → 7).
Rising impressions with falling clicks is a CTR problem, which is consistent
with the metadata truncation fixed in 2.4. Re-measure after this deploys.

---

## 4. Tooling

| Command | Purpose |
|---|---|
| `npm run seo:audit` | Overall performance, top queries/pages, device, country |
| `npm run seo:coverage` | Indexing coverage via URL Inspection; appends to `scripts/.gsc-history.jsonl` |
| `npm run seo:opportunity` | Branded vs non-branded split, striking distance, query→page mapping, city vs standards demand |
| `npm run seo:uniqueness` | Offline duplicate-content measurement on generated pages |
| `npm run seo:keywords` | Per-page query→content alignment; finds title/body keyword gaps |

> **`/scripts/` is gitignored** (`.gitignore` line 46), so none of these tools —
> nor the pre-existing `sync-blogs.js` that `package.json` already referenced —
> are in version control. The `scripts/.blog-backups/` restore files are
> likewise local-only. If the tooling should survive a fresh clone, add
> negations after the `/scripts/` rule:
>
> ```gitignore
> !/scripts/
> /scripts/.blog-backups/
> ```
>
> This is a policy decision, so it has deliberately not been made here.

Useful flags for `seo:coverage`: `--local` (audit the local build instead of the
live sitemap), `--sample N`, `--all`.

Auth uses `search-console-service-account-key.json` at the repo root
(`search-console-access@gen-lang-client-0880380710.iam.gserviceaccount.com`).
That service account must stay added as a user on the Search Console property.

The key file is correctly listed in `.gitignore` and is **not** tracked in git
(verified: 0 commits touch it). It exists only on developer machines. Anyone
setting up a new environment needs a copy out of band — it is not in the repo.

---

## 5. Rules for whoever works on this next

1. **Do not restore the full product × city matrix.** It was measured, it did not
   get crawled, and the reason was content quality. Adding cities back without
   adding genuinely city-specific content will reproduce the same outcome.
2. **Raise `LOCATION_TIER_LIMIT` only on evidence.** Run `npm run seo:coverage`
   and confirm the current tier is actually indexed first.
3. **A new city needs a full `CITY_PROFILES` entry** — distance, corridor, nearby
   towns, tolerance focus, local proof, buying pattern — plus at least one
   `CITY_PRODUCT_NOTES` entry. A city added with only a name and a description
   is a thin page by construction.
4. **Respect the metadata budgets.** 60 chars for titles, 158 for descriptions,
   and do not repeat the brand when the root `title.template` already appends it.
5. **Never invent verifiable facts** in metadata or copy — founding years,
   certifications, client names, accreditation numbers. An earlier draft of the
   `/about` title claimed "Since 1998"; nothing in the codebase supported it and
   it was removed. Confirm with the client before making claims of that kind.
