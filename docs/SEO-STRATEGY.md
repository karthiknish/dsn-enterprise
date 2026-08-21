# SEO strategy — dsnenterprises.in

This document records what the Search Console data actually said, what was
changed in response, and what to do next. It exists so the next person does not
re-derive the same conclusions or undo the changes by accident.

All figures in section 1 come from the Search Console API for the 90 days ending
2026-07-29. Section 2D is the 90 days ending 2026-08-21. Reproduce with
`npm run seo:audit` and `npm run seo:opportunity`.

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

## 2C. AEO (answer engine optimization)

Aimed at being **cited inside AI answers** (ChatGPT, Perplexity, Claude, Google AI
Overviews), not just ranked as a blue link.

### What was implemented, and why each item earns its place

**1. Explicit AI crawler policy in `robots.txt`.** Permissive, explicit bot
access is the highest-impact technical AEO lever — an answer engine cannot cite
a page it was never allowed to fetch. `src/app/robots.js` now names three
crawler classes separately, because they do different jobs:

| Class | Agents | Effect of blocking |
|---|---|---|
| Search / index | `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Amazonbot` | **Removed from AI answers** |
| User fetch | `ChatGPT-User`, `Claude-User`, `Perplexity-User`, `MistralAI-User` | "Summarise this page" breaks |
| Training | `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `Meta-ExternalAgent`, `CCBot`, `cohere-ai` | No citation impact; only future model knowledge |

All three are currently allowed. To stop model training while staying citable,
move `TRAINING_CRAWLERS` to the disallow branch. **Do not block the search or
user-fetch agents** unless the intent is to disappear from AI answers.

**2. `/llms.txt`** — generated at `src/app/llms.txt/route.js` from the same
config that drives the sitemap, so it cannot drift when the location tier limit
changes. Verified against the llmstxt.org spec: H1, single blockquote summary,
free-form sections without headings, then H2 file-list sections (5 sections,
54 link items, no H3+).

> Set expectations honestly: **there is no published evidence that llms.txt
> improves citation rates.** It is worth having because Google's Lighthouse
> agentic-readiness audit checks for it, agents have been observed fetching it
> for technical queries, and it gives them a reliable entry point. It is agent
> documentation, not a marketing surface — padding it with sales copy is the
> documented failure mode.

**3. Structured data: one entity graph instead of scattered copies.**
Stable `@id` nodes (`#organization`, `#website`) are defined once in
`src/lib/seo-schema.js`. Product `manufacturer`, Service `provider`, FAQPage
`about`, and ContactPage `mainEntity` now all reference `ORG_ID` rather than
redeclaring anonymous duplicates. The contact page previously declared a
*second* standalone `LocalBusiness` for the same company with a different phone
format — that is now a `ContactPage` pointing at the canonical node.

The Organization node also carries `knowsAbout` (the standards and gauge types
this business is authoritative on) and `hasCredential` (ISO 9001:2015, NABL /
ISO-IEC 17025, API 5B and 7-2). Every claim is sourced from `src/content/faq.js`
— the site's own copy. **Do not add certifications, founding dates, or figures
that are not already stated on the site.**

> Also set expectations here: evidence suggests LLMs read structured data as
> plain text rather than as a special ranking signal. It is implemented because
> traditional search still benefits measurably — not because schema is an AI
> breakthrough.

**4. JSON-LD emission bug fixed.** Blocks were rendered as
`<script>{JSON.stringify(x)}</script>`. React escapes text children, so an `&`
in a title became `&amp;` *inside the JSON string value* — the block still
parsed, but the machine-readable payload carried HTML entities into the one
audience that cannot decode them. All blocks now use `jsonLdProps()`, which
uses `dangerouslySetInnerHTML` and escapes `<` to prevent `</script>` breakout.

### Verified

| Check | Result |
|---|---|
| JSON-LD blocks across 58 public pages | **240**, all parse |
| Blocks containing HTML entities | **0** |
| Dangling `@id` references | **none** |
| Duplicate business entities | resolved (was 2, now 1) |
| llms.txt spec violations | **0** |

`@type` coverage: `Organization+LocalBusiness` 59, `WebSite` 59,
`BreadcrumbList` 47, `FAQPage` 37, `Product` 24, `Service` 12, `ContactPage` 1,
`ItemList` 1.

### Deliberately NOT done

**Markdown mirrors of pages** (`/page.md` for bots). The evidence runs against
it: Profound's markdown-vs-HTML test found marginally more bot traffic but no
improvement in citation rate or accuracy, and Google's John Mueller called
bots-only markdown "a stupid idea". HTML carries context that markdown strips.
The narrow exception is very long single-purpose documentation at risk of token
truncation, which does not apply here.

### How to measure this

AI crawlers **do not execute JavaScript**, so GA4 will never show them. Their
traffic only appears in server or CDN logs. On Vercel, check the log drain or
firewall/bot dashboards for the user agents listed above. Do not expect the
admin analytics dashboard to report AI crawler activity — it structurally
cannot.

---

## 2D. Round three — 21 Aug 2026 Search Console pass

Figures below are the Search Console API for the 90 days ending 2026-08-21,
compared with the 29 Jul 2026 baseline in section 1.

### What changed since round two

| Metric | 29 Jul (90d) | 21 Aug (90d) |
|---|---|---|
| Clicks | 27 | **92** |
| Impressions | 1,349 | **4,007** |
| CTR | 2.00% | 2.30% |
| Last 28d clicks | 7 (then falling) | **69** |
| Last 28d vs prior 28d | impr +34%, clicks −56% | impr **+492%**, clicks **+667%** |

The IS 3455 / IS 919 rewrite in 2A is the cause. That URL went from 105
impressions / 0 clicks / pos 9.3 to **825 / 29 / pos 6.6**. "is 3455 standard"
now clicks at 11.7% from position 5.6. City-intent demand is still 1 impression.

Non-branded share of impressions rose from ~16% standards-only to **46% of all
demand** (805 of 1,737 classified queries). Branded is no longer 78% of the pie.

### What this pass actually changed

Aimed at remaining zero-CTR queries on pages that already rank, plus
query→page mismatches. No new URLs. No location pages. `leakgall` (118
impressions, 0 clicks on the API blog) was ignored — it is adult-content
navigational noise, not a metrology term.

| Page | Evidence | Change |
|---|---|---|
| IS 3455 blog | "is 919" 79 impr @ 7.9, **1.3% CTR**; "is 3455 latest edition" 14 @ 5.6, 0 clicks; "iso 3455 standards" 14 @ 9.3, 0 clicks; PDF queries ~26 impr | Title now leads with **IS 3455:1971 latest edition and IS 919:2014**. New H2s: latest edition, IS vs ISO 3455 (ISO 3455:2021 is hydrometry), where to get the PDF. We still do not host the BIS file. |
| `/products/plain-gauges` | "plain gauge" **pos 3.4, 12 impr, 0 clicks** | Title/desc/body now say manufacturer and name snap gauges. Position 3 with zero CTR is a snippet problem, not a ranking problem. |
| `/products/api-gauges` vs API blog | "api gauges" split: blog pos 9.3 / product pos 26.4; "api pressure gauges" 9 impr @ 19.3 (wrong intent) | Product H1/title is now **API Thread Gauges**. Blog title no longer leads with generic "API Gauges". Both pages state these are thread gauges, not pressure gauges. |
| Custom-gauges blog | "custom gauges manufacturer" pos **4.8**, 8 impr, 0 clicks. `/products/special-gauges` still has **0 impressions**. | Blog title/desc now say manufacturer. Special-gauges H1/title do too, so the hub can inherit the query once Google indexes it. |
| `/products/thread-gauges` | Ranking for NPT/pipe-thread terms at pos 22–37 | Title leads with NPT, BSP, Metric. Body names NPT/NPTF as manufactured products. |
| `/blog/...thread-callout...` | "metric tapped hole callout" 11 impr @ 27.9 | Title/desc name tapped holes; 6H section now says a capital letter is the tapped-hole class. |
| `/about` | 677 impr, **0.4% CTR**, ranking for "dsn enterprises" @ 6.7 — cannibalising the homepage | Title/H1 no longer "About DSN Enterprises". Snippet is plant/process, so branded queries should return to `/`. |
| `/faq` | Was 210 words and only ranked for the brand | New Standards category: latest edition, PDF, IS 3455 vs IS 919, IS vs ISO 3455, 6H, NPT. |

### Deliberately not done

**Do not add a competing `/resources/is-3455-…` URL.** Section 3.2 previously
recommended a reference page. That URL would split the 29 clicks the blog post
is now earning. Keep one ranking URL; point FAQ and product pages at it.

**Do not reproduce BIS tolerance tables.** Still copyright. The PDF section
sends readers to BIS e-Sale.

**Do not raise `LOCATION_TIER_LIMIT`.** City queries remain ~0% of demand.

### Re-measure

After this deploy, wait 4–6 weeks and compare:

- IS 919 CTR (was 1.3%) and "is 3455 latest edition" clicks
- `/products/plain-gauges` CTR on "plain gauge" (was 0% at pos 3.4)
- `/about` impressions for "dsn enterprises" (should fall; `/` should rise)
- whether `/products/special-gauges` has any impressions at all

---

## 2E. Bangalore and Hyderabad (21 Aug 2026)

Search Console still shows ~0 city-intent queries for the Tamil Nadu
location pages. That is why Madurai/Thoothukudi stay at tier 3, and why
this is **not** a return to the 80-URL product × city matrix.

Bangalore and Hyderabad were added anyway, as a deliberate bid for two
metros that actually have aerospace, automotive, defence, and machine-tool
demand. They are **tier 2** (they emit under the current
`LOCATION_TIER_LIMIT` of 2) with relevance gates, not a full catalogue dump.

| City | Products | Services | Why these, not others |
|---|---|---|---|
| Bangalore | plain plug, thread plug, thread ring, snap, air, calibration | calibration, custom, repair | Peenya machine tools, Bidadi–Hosur auto, Jigani electronics, Devanahalli aerospace. No API — there is no OCTG cluster. |
| Hyderabad | plain plug, thread plug, thread ring, snap, calibration | calibration, custom | Adibatla/HAL defence-aerospace, Jeedimetla engineering, BHEL Ramachandrapuram energy. No air gauges (thin-wall electronics is a Bengaluru problem). No API. |

Each city has a full `CITY_PROFILES` entry (estates, corridor, distance,
tolerance focus, local proof, buying pattern) plus handwritten
`CITY_PRODUCT_NOTES` / `CITY_SERVICE_NOTES`. URL slug is `bangalore` (the
query people type); body copy also says Bengaluru.

Hub pages that Google already crawls — `/`, `/about`, `/faq`, `/industries`,
`/products`, `/calibration`, `/contact` — now name both cities. That is the
higher-probability index path. The new location URLs are the cluster-specific
landing pages, internally linked from those hubs via `CityLinks`.

**Do not** add Pune, Ahmedabad, or a second wave of cities until
`npm run seo:coverage` shows the Bangalore/Hyderabad URLs are actually
crawled. **Do not** add API gauge pages for these two cities.

---

## 3. Open items — not yet done

These are ranked by expected value.

### 1. Fix the multi-host duplication (infrastructure, not code)

Still live as of 21 Aug 2026:

```
https://www.dsnenterprises.in   (canonical)
http://dsnenterprises.in        74 impr, 0 clicks, pos 5.5
https://dsnenterprises.in       65 impr, 0 clicks, pos 9.5
```

~139 impressions and their link equity are stranded on hosts that should
redirect. Fix at the DNS/hosting layer: `http://` and apex non-www must both
301 to `https://www.`. This cannot be fixed in Next.js config alone.

### 2. Convert remaining standards CTR (in progress, see 2D)

The 29 Jul zero-CTR problem is no longer zero — the IS 3455 post now earns 29
clicks. Remaining gaps on that URL are IS 919 CTR, "latest edition", ISO-vs-IS
confusion, and PDF intent. Those are the 2D title/body changes. **Do not
create a second standards URL.**

### 3. `/products` and `/products/special-gauges` indexing

`/products/special-gauges` still had **zero** Search Console impressions on
21 Aug. The hub copy and title now match "custom gauges manufacturer", which
the custom-gauges *blog* already ranks for at position 4.8. Worth a coverage
check with `npm run seo:coverage` after this deploy; do not add more custom-
gauge URLs until this one is indexed.

### 4. FAQ was thin — addressed in 2D

The Standards category is the content that searchers were already asking the
IS 3455 post for. `/contact` and `/thank-you` word counts are not a ranking
problem.

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
   and confirm the current tier is actually indexed first. Bangalore and
   Hyderabad were added at tier 2 with full profiles (section 2E); that is not
   a licence to turn the tier-3 Tamil Nadu cities on, or to add more metros.
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
6. **Do not add a second IS 3455 / IS 919 URL.** The blog post is now the ranking
   page (29 clicks). A `/resources/` duplicate would split that. Point FAQ and
   product pages at the existing slug. Do not host BIS PDFs.
