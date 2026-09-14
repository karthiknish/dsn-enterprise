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

## 2F. Round four — 3 Sep 2026 Search Console pass

Figures are the Search Console API for the 90 days ending 2026-09-03,
compared with the 21 Aug 2026 pass in section 2D.

### What changed since round three

| Metric | 21 Aug (90d) | 3 Sep (90d) |
|---|---|---|
| Clicks | 92 | **111** |
| Impressions | 4,007 | **5,016** |
| CTR | 2.30% | 2.21% |
| Last 28d clicks / impressions | 69 | **80 / 3,239 (+300% / +117% vs prior 28d)** |
| Non-branded share of impressions | 46% | **56%** |

The IS 3455 post grew again (825 → **1,338 impr, 42 clicks, pos 6.4**).
City-intent demand is still **0.1%** (3 impr). First trickle on the new
location URLs: `air-gauges-coimbatore` 21 impr, `thread-plug-coimbatore`
13 impr. Bangalore/Hyderabad location URLs are in the sitemap and build.

### What this pass changed

Product metadata/body gaps flagged by `npm run seo:keywords`, plus
over-long Firestore meta descriptions. No new URLs. IS 3455 title left
alone — only two weeks since the 2D retitle, too soon to re-judge.

| Page | Evidence | Change |
|---|---|---|
| `/products/plain-gauges` | "plain snap gauges manufacturer" 10 impr, term in neither body nor desc; "plain gauge" pos 3.4, 0 clicks | Title now **Plain Gauge Manufacturer – Plug, Ring & Snap Gauges** (51 chars, renders without brand suffix — see note). Desc carries both exact phrases (142 chars). Body gains exact-phrase sentence + snap card rewritten around "We manufacture plain snap gauges". |
| `/products/thread-gauges` | "npt thread gauges manufacturer" absent everywhere; "pipe thread gauge(s)" in body/desc but not title | Title now **NPT Thread Gauges Manufacturer – BSP, Metric, Pipe** (50 chars). Body gains in-house NPT/NPTF manufacturing paragraph. Exporter wording deliberately avoided (unverified claim). |
| `/products/api-gauges` | Bare "api gauges" in neither desc nor H1; blog outranks product 7.8 vs 23.1 | Desc now leads with exact **API gauges** + keeps the not-pressure-gauges disambiguation (119 chars). Title/H1 keep "Thread" — the blog already owns bare "api gauges" with an exact-anchor link to the product page (verified in Firestore content). |
| Special-gauges intro | "custom gauge supplier" pos 7.0 | Intro now says "design, make, and supply" — supplier synonym without new claims. Page already states "custom gauges manufacturer". |
| 4 Firestore posts | metaDesc 170–181 chars, all truncating; parent zero-CTR pages (113/114 impr, 0 clicks) | Rewrites ≤153 chars via `scripts/seo-round4.mjs` (backup in `scripts/.blog-backups/`): gauge-usage mistakes, calibration frequency, precision-measurement QC, aerospace measurement. Guard-banding metaTitle unified with H1. |

### Note: product pages render without the brand suffix

Verified in `.next/server/app/products/plain-gauges.html`: `<title>` has
no `| DSN Enterprises` — layout and page both export the same metadata
object, so the root `title.template` does not append. Budget titles
against 60 chars raw, not 60-minus-brand. `/about` (layout-only metadata)
does get the suffix. Do not "fix" this by appending the brand manually —
the current behaviour is what keeps product titles within budget.

### Deliberately not done

**IS 3455/IS 919 title untouched.** "is 919" CTR is still 0.9%
(116 impr, 1 click @ 7.9) but the 2D retitle is two weeks old; re-judge
next pass. **Remaining `seo:keywords` title flags** ("plain gauges",
"pipe thread gauge(s)", "api certified gauges", "api 5b") are strict-
substring artefacts — a 60-char title cannot hold every permutation, and
each is covered in body/desc/H1. **Brand cannibalisation** (`/about`
643 impr @ 0.5%, `dsn` 376 impr 0 clicks) and **host duplication**
(~142 impr stranded on `http://` + apex) are unchanged; the host fix needs
the DNS/host layer, not code.

### Re-measure

- "plain snap gauges manufacturer" CTR/position (was 0% @ 18.6)
- "plain gauge" CTR (was 0% @ pos 3.4)
- NPT/manufacturer query positions (were 22–35)
- IS 919 CTR (was 0.9%) — re-judge 2D title then
- Bangalore/Hyderabad location URL coverage (`seo:coverage` single-URL checks; full sample times out on API quota)

---

## 2G. Round five — 7 Sep 2026 Search Console pass

Figures are the Search Console API for the 90 days ending 2026-09-07,
compared with the 3 Sep 2026 pass in section 2F.

### What changed since round four

| Metric | 3 Sep (90d) | 7 Sep (90d) |
|---|---|---|
| Clicks | 111 | **125** |
| Impressions | 5,016 | **5,369** |
| CTR | 2.21% | **2.33%** |
| Last 28d clicks / impressions | 80 / 3,239 | **84 / 2,906 (+171% clicks vs prior 28d)** |

City-intent demand still **0.2%** (4 impr). `/industries` newly flagged:
100 impr @ 7.7, 0 clicks.

### What this pass changed

Firestore (via `scripts/seo-round5.mjs`, backup in `scripts/.blog-backups/`,
all titles ≤60 / descs ≤158, script asserts budgets before writing):

| Post | Evidence | Change |
|---|---|---|
| taper-thread | title 93 / metaTitle 68 / metaDesc 163, all truncating; "tapered thread" 11 impr not in title; "taper thread ring gauge" @ 2.0, 0 clicks | Title/metaTitle now **Tapered Thread Gauges: NPT & BSPT Guide** (39); desc leads with the exact ring-gauge phrase (139) |
| guard-banding | 117 impr, 0 clicks; desc contained neither "guard banding" nor "guardbanding" (queries split 7/6) | Desc leads with both forms (127); title kept — it already has the two-word form |
| common-mistakes | 140 impr, 0 clicks; "gauge error" 7 impr @ 8.0, term in neither title nor desc | Desc now leads **Gauge errors…** (145) |
| precision-QC | 89 impr, 0 clicks; "precision in quality control" 4 impr @ 7.3 | Desc takes the exact query form (137); title keeps "Precision Measurement…" |
| aerospace | 74 impr, 0 clicks; "aerospace measuring instruments" 7 impr @ 9.7 | Desc front-loads the exact phrase (135) |
| IS 3455 post | "is 919" 130 impr @ 8.0, **0.8% CTR** — 2D retitle now 3 weeks old, re-judged | Desc flipped to lead **IS 919:2014 = ISO 286** (133); title still leads IS 3455, so each half keeps a lead slot |

Code (verified in `.next/server/app/*.html` after `npm run build`):

| Page | Evidence | Change |
|---|---|---|
| `/industries` | 100 impr @ 7.7, 0 clicks; title used "Auto, Aero" abbreviations answering no query; desc led with city names (0.2% demand) | Title **Automotive, Aerospace, Oil & Gas Gauges** (39 raw → 58 rendered with brand suffix — this route gets the suffix, unlike product pages); desc demand-led (150) |
| `/products/plain-gauges` | "plain gauges" 7 impr @ 10.3 in body+H1 but not desc | Desc now plural-led (138); H1 **Plain Gauge Manufacturer** (was "Plain Gauges") |
| `/products/thread-gauges` | "pipe thread gauge(s)" in body+desc but not H1/title, pos 24–29 | H1 **Thread Gauge Manufacturer – NPT, BSP, Metric, Pipe** |
| `/products/api-gauges` | "api certified gauges" 5 impr @ 6.0, 0 clicks, term in body only | Desc leads **Certified…** (118). Title/H1 keep "Thread" — the blog owns bare "api gauges" (7.8 vs 30.1) and links here |

### Deliberately not done

**custom-gauges blog** ("custom gauges manufacturer" pos 4.8, 0 clicks):
title/meta already exact — this is intent mismatch (blog ranks, buyers want
the hub), not snippet. Fix is hub relevance + links. **calibration-
-frequency** (115 impr, 0 clicks @ pos 11–27): snippet already exact;
positional problem needing depth + internal links. **Brand
cannibalisation** (`/about` 621 impr @ 0.5%, `dsn` 377 impr 0 clicks):
branded clicks convert wherever they land — left alone. **City pages,
second IS URL, BIS tables, host rows**: unchanged per rules 1–6.

### Re-measure

- taper/guard-banding/mistakes/precision-QC/aerospace CTR (all were 0%)
- "is 919" CTR (was 0.8%) — if still flat, the page may need an IS-919-led H2, not more snippet work
- `/industries` CTR (was 0% @ 7.7) and plain-gauge CTR (was 0% @ pos 3–13)
- NPT/pipe positions (were 22–35; H1 alone rarely moves pos 30)

---

## 2H. Round six — 11 Sep 2026: the programmatic axis changed

Rounds one to five all tuned *content* on a fixed set of URLs. This round
changed *what the programmatic layer varies*, and is the first round in three
where the answer to "what is worth generating?" changed rather than the copy
on what already existed.

### The measurement that forced it

Pulled live from the Search Console API for the 90 days ending 2026-09-11
(`npm run seo:opportunity` plus ad-hoc scripts, since deleted):

| | 90 days | last 28 days |
|---|---|---|
| Location-page impressions | 99 | 57 |
| Location-page clicks | **2** (1.47% CTR) | **1** |
| Location URLs that ever earned an impression | 4 of 52 | 4 of 52 |

Fifty-two live URLs, two clicks in a quarter. Section 2F's "0/36" was stale —
the count had reached 52 when `LOCATION_TIER_LIMIT` was raised to 2 in round
2E. Independently, Keyword Planner volume for the city axis came back at
~130/month across 15 probes, with **11 of 15 probes returning zero**.

Against that, the standard-reference cluster — the IS 3455 / IS 919 / ISO 286
queries the blog post owns — measured 15 queries, 752 impressions, 25 clicks at
position 7.0. One URL in the whole site (`/blog/using-is-919-and-is-3455…`)
generates 37 of the last 28 days' 68 clicks.

**Conclusion: the location axis is not commercially relevant demand. It was
never a content-quality problem that more cities would fix — the queries are
not being typed.** The machinery built for it (tiering, sitemap segments,
redirects, uniqueness gating) is sound; only the variable was wrong.

### What was changed

**1. `LOCATION_TIER_LIMIT` 2 → 1.** Live city URLs **52 → 16** (Coimbatore and
Chennai only). Coimbatore stays for local/NAP relevance and Chennai for the one
city with measured volume. The 308 machinery in `src/app/products/[slug]/page.js`
and `src/app/services/[slug]/page.js` already redirects newly out-of-scope
combinations, so any accumulated signal is preserved rather than 404'd. The
change is reversible via `NEXT_PUBLIC_LOCATION_TIER_LIMIT`.

**2. A new programmatic axis: specification lookup, not geography.** The
variable is now a real engineering datum. Tier 1 ships **10 URLs**:

| URL | What it answers |
|---|---|
| `/threads` | Hub: the systems, and why they are not interchangeable |
| `/threads/metric` | Full ISO metric coarse + fine chart |
| `/threads/npt` | ASME B1.20.1 taper pipe |
| `/threads/unc` | ASME B1.1 coarse |
| `/threads/metric/m6…m20` (6) | One size: coarse card, fine pitches, spanner, gauging |

Tier 2 (`THREAD_TIER_LIMIT`) adds `/threads/unf`, `/threads/bsp` and the
remaining metric sizes. Data lives in `src/lib/thread-specs.js`, URL/tier logic
in `src/lib/thread-pages.config.js`.

### Why thread dimensions and not tolerance tables

The obvious next axis was fits and tolerances (IS 919 / ISO 286), because that
is the cluster already producing clicks. It was **not** built, and the reason is
recorded in `src/lib/thread-specs.js` because it will be asked again:

> Transcribing ISO 286-2's published limits does not reproduce from the IT
> formula. Measured across 104 cells of ISO 286-1 the formula disagreed with
> the published table **50 times (48%)** — IT6 for 3–6 mm computes 7 where the
> table says 8; IT11 for 18–30 mm computes 131 where the table says 130. The
> published values are a rounded preferred-number series (~10^0.2), not a
> function of `i`.

So the tolerance layer stays blocked on a decision, not on effort: transcribe
IS 919/ISO 286 with attribution, publish a calculator instead of tables, or
skip it. Thread dimensions have no such problem — 60° profile geometry is
reproducible from the standard's own definition and republished everywhere —
which is why the thread layer shipped first.

### What the new pages actually contain

The layer avoids the round-one failure mode by construction. Measured on the
built HTML (5-word shingles, same method as `npm run seo:uniqueness`):

| | exclusive content | worst pairwise similarity |
|---|---|---|
| City pages (round one baseline) | ~10% | very high |
| Thread size pages | **28–31%** | 54% |
| Thread system pages | **65–86%** | 19% |

The size pages share a gauging section and a CTA, which is where the residual
54% comes from — but every table cell differs, and the numbers are the page's
reason to exist. `/threads/metric` is 1,447 words of full chart and shares
10.7% with `/threads/npt`.

### Two data-integrity bugs caught before shipping

1. **A hardcoded comparison table stated a wrong pitch diameter.** The hub's
   "three threads that are not interchangeable" table had `11.345` for 1/2-13
   UNC. The correct basic pitch diameter is `0.4500 in = 11.430 mm` — verified
   against efunda (3A min PD = 0.4500 = basic; 2A max = 0.4485 = basic minus
   the 0.0015 allowance) and Machining Doctor. The table is now **derived** from
   the same helpers that build the size and system tables, so the hub cannot
   state a figure the reference tables do not. The NPT row likewise moved from
   a remembered `18.321` to `e1 × 25.4 = 19.772` — the pitch diameter at the
   hand-tight gauge plane, which is the only plane at which a taper thread has
   one.
2. **Minor diameter vs permitted limit.** Fastener catalogues quote ASME B1.1
   limits; this layer publishes basic-profile values. For 1/2-13 UNC the 3A
   minor limit (0.4084 in) sits *above* the basic figure (0.4056 in), which
   reads as an error without a qualifier. Both the UNC and UNF pages now share
   one `UNIFIED_NOTE` that says so explicitly. Same class of bug as the `/about`
   "Since 1998" in rule 5.

### Crawl path and tooling

- Sitemap: 10 new URLs in `sitemap-main.xml`, `lastmod` pinned to a constant
  (`THREAD_PAGES_LASTMOD`) because these are standards data, not per-deploy
  changes — the same reasoning as `CITY_PAGES_LASTMOD`.
- Internal links: footer (site-wide), `/products/thread-gauges` (a contextual
  block after the thread-forms grid), and `/llms.txt`, which now enumerates the
  size pages with their actual dimensions.
- `/resources` was considered and **rejected** as a link target — its card grid
  is file-download oriented (`href="/contact?request=download"`) and forcing an
  HTML page into it would have meant a misleading "Excel 2.5 MB" badge. The one
  card that described a thread table now points at the live equivalent.
- `/threads` added to `EXACT`, `/threads/` to `PREFIXES` in
  `src/lib/known-paths.js` so the proxy passes the segment through to the page,
  which is what decides 200 / 308 / 404.

### Verified

- `npm run build`: 10 thread routes prerendered; city sitemap 16 URLs (was 52).
- Live smoke test against `next start`: all 10 thread URLs 200. That same run
  showed the retired and unknown slugs were answering with the wrong status
  codes — see the next section.
- Every number on the hub cross-checked against `src/lib/thread-specs.js`.

### Two status-code bugs found while smoke-testing, both fixed

Nothing in this round caused either of these, but this round's routes inherited
both, so they were fixed here rather than left for later.

**1. A missing slug was a soft 404.** Every dynamic route's `notFound()` served
the not-found page with **HTTP 200** — `/products/<unknown>`, `/services/<unknown>`,
`/blog/<unknown>` and `/threads/<unknown>`. Confirmed on cache MISS, so not an
ISR artifact, and reproduced in `next dev` as well.

**2. A retired slug was a soft redirect.** `permanentRedirect()` from a page did
not produce a 308 either. `/threads/unf` answered **HTTP 200** with the title
`Page Not Found`, an RSC `NEXT_REDIRECT;replace;/threads;308;` payload and a
`<meta http-equiv="refresh">` — and because Next prerenders that result on
demand, it was then cached `s-maxage=31536000`. This is the worse of the two:
these are exactly the URLs holding accumulated ranking signal, and they were
being served as a year-long "Page Not Found".

**Why.** By the time a page component calls `notFound()` or
`permanentRedirect()`, the response has already begun, so the status cannot be
set. That is documented behaviour, and the documented remedy is the same for
both — `loading.md` puts it plainly: "You can run this check in `proxy`."

**The fix.** `src/lib/dynamic-route-guard.js` classifies one URL as
`render` / `redirect` / `missing`, and both `src/proxy.js` and the four page
components consume it, so the proxy cannot disagree with the pages about which
slugs exist. The proxy answers `missing` with `negotiatedErrorResponse` (404)
and `redirect` with a real 308; the pages keep their own calls as a fallback.
Two details were deliberate:

- The guard returns `null` — "not my family" — for every shape it does not
  recognise, never `missing`. A false `missing` would take a working page
offline, so "unrecognised" must never mean "refuse".
- The 308 carries the query string across. These redirects exist to move signal
  onto a page that still serves the content, and campaign parameters have to
  survive that move for the contact-form attribution above to name the channel
  that earned the enquiry.

**Verified** in a production build, then `next dev`, then a real browser:

| Case | Before | After |
| --- | --- | --- |
| `/products/zzz-nope`, `/threads/bogus`, `/threads/metric/m9999` | 200 | 404 |
| `/threads/unf`, `/threads/bsp` | 200 + meta refresh | 308 → `/threads` |
| `/threads/metric/m24` | 200 + meta refresh | 308 → `/threads/metric` |
| `/threads/metric/M12`, `/threads/metric/m6x1` | 200 + meta refresh | 308 → canonical size URL |
| `/products/plain-plug-gauges-bangalore` (retired combo) | 200 + meta refresh | 308 → `/products/plain-gauges` |
| All 80 sitemap URLs | 200 | 200 (unchanged) |
| `/products/plain-gauges`, `/threads`, `/threads/metric/m12` | 200 | 200 (unchanged) |

The 404 now answers `Cache-Control: private, no-store` instead of being cached
as a 200 for a year, and it still negotiates — `Accept: application/json` gets
the structured error, a browser gets the HTML page. Client-side navigation was
checked in a real browser: a `fetch` carrying the router's `RSC: 1` header comes
back `redirected: true` at `/threads`, so the router follows the 308 natively.
Every redirect resolves in a single hop — a size under a system that is itself
only a redirect goes straight to the hub.

**Not fixed in this round — `/blog/<unknown>`.** Blog slugs live in Firestore,
and reading them in the proxy would put a database query on the path of every
request, so `/blog` kept its soft 404 and relied on the `noindex` Next injects.
The right fix is to make the blog's slugs statically known at build time rather
than to add a proxy read — that is §2I.

### Re-measure

- Are the 10 thread URLs indexed at all? (`npm run seo:coverage`)
- Do `/threads` and the size pages earn impressions for `m12 thread pitch`,
  `npt thread dimensions`, `unc thread chart` — the ~2,800/month cluster?
- Does the city sitemap shrinking 52 → 16 move crawl frequency on the pages
  that remain?
- Keyword Planner balance is exhausted (`insufficient_balance`); volume
  questions need a top-up or a different provider.

---

## 2I. Round six follow-up — `/blog/<unknown>` gets a real 404 (11 Sep 2026)

§2H left the blog as the one route family still answering a soft 404. This round
closes it with the approach §2H named — a build-time slug list feeding
`generateStaticParams` — and deliberately does **not** use the proxy.

### Why the proxy is the wrong tool here

`/products`, `/services` and `/threads` are safe to classify in the proxy
because their slug sets are constants in `src/lib/`. Blog slugs are documents
in Firestore that appear when somebody publishes. Checking them in the proxy
puts a database read in front of every request on the site, including static
assets and unrelated routes — and a read that can fail means the proxy can take
the whole site down, not just the blog. A cached set only moves the problem: it
still has to be populated from somewhere, and in a serverless runtime "cached"
means "per instance, after a cold start".

### What was tried first, and does not work

Before accepting a build-time list I tried to get the status out of the page
itself. Four shapes, each against a production build and a missing slug:

| Route shape | `/blog/<unknown>` |
| --- | --- |
| `notFound()` in the page component (what shipped) | 200 |
| `notFound()` in `generateMetadata` instead of returning `noindex` metadata | 200 |
| both, with `src/app/blog/[slug]/loading.js` deleted to stop streaming | 200, still `Transfer-Encoding: chunked` |
| a throwaway route: no loading boundary, no `Suspense`, no `revalidate`, `notFound()` in both | 200 |

That last row matters, because it means §2H's streaming explanation was
incomplete: in Next 16.3.3 `notFound()` in a dynamic route **never** sets the
status, streaming or not. `loading.md` says as much — "If you need a 404 status
... ensure the resource exists before the response body is streamed" — and the
only lever is whether the *router* was ever told the parameter exists.

A fifth shape does work:

```js
export async function generateStaticParams() { return slugs.map((slug) => ({ slug })); }
export const dynamicParams = false;
```

A probe route with that shape answered `/probe-e/real` **200** and
`/probe-e/nope` **404** with `Cache-Control: private, no-cache, no-store` — a
routing-level 404, decided before the route renders, with no proxy involved.

### What was changed

- **`src/lib/blog-queries.js` gained `getPublishedPosts()`** — the single source
  of published slugs. It returns `ok` alongside the list so a caller can tell
  "the read failed" apart from "there are no posts yet"; `getRecentPosts` in the
  same file can afford to conflate the two, this cannot.
- **`src/app/blog/[slug]/page.js`** now exports `generateStaticParams()` from
  that list plus `dynamicParams = false`. `revalidate = 3600` is unchanged, so
  an edit to an existing post still lands within the hour.
- **`src/lib/sitemap-entries.js`** reads the same `getPublishedPosts()` instead
  of running its own near-identical query, so the sitemap and the router cannot
  hold different opinions about which blog URLs exist.
- **`src/app/sitemap-main.xml/route.js`** lost `revalidate = 3600`. A sitemap
  that still revalidated hourly would list a post published after the build and
  advertise a URL the router now refuses — trading a soft 404 for a "Submitted
  URL not found (404)" in Search Console, which is worse. Dropping `revalidate`
  alone was not enough: Route Handlers are uncached by default, so the file went
  from ISR to `ƒ (Dynamic)`, re-reading Firestore per request and re-creating
  the drift. `export const dynamic = "force-static"` is the documented opt-in for
  a cached `GET`, and the build now records it as static with
  `initialRevalidateSeconds: false` — it is never regenerated at runtime, so the
  URL set it publishes is the one the build froze.

### What this costs, stated plainly

Publishing a post no longer makes it reachable on its own. `dynamicParams = false`
freezes the URL set at build time, so a post created in `/admin/blog` goes live
when the site is next built and deployed — the page and its sitemap entry arrive
together, which is the point. Before this change a new post was served by the
runtime Firestore query within the hour with no deploy. Anyone publishing should
expect to redeploy; if that becomes a nuisance the fix is a publish-time deploy
hook, not a return to the soft 404.

**Unpublishing is still a soft 404.** `dynamicParams = false` governs slugs the
router never learned about. A post that existed at build time and was unpublished
later keeps its route: it serves the ISR cache until `revalidate` passes, then
`getPostBySlug` returns `null` and `notFound()` renders the 200 page §2H
describes. That is bounded — one URL, self-inflicted, already carrying
`noindex` — and the alternative is the proxy read this section argues against.
Deleting a post and redeploying remains the clean way to retire one.

### The guard, and why an empty list is fatal

The sitemap can shrug off a failed Firestore read — the blog just drops out of
one file. The route cannot: with `dynamicParams = false` an empty slug list 404s
**every** post, so the failure modes are "one section of a sitemap is thin" and
"the entire blog is gone". `generateStaticParams` therefore refuses to build on
a failed read or an empty list:

- production: `throw`, so the build fails with `Blog: refusing to build — the
  published-post query failed...` and no blog route is emitted;
- `next dev`: `console.warn` and carry on, so a laptop with no network access is
  not bricked by a page it is not working on.

**Verified** by forcing the read to fail and building: exit code `1`, the guard
message above, and `0` `/blog/` routes prerendered. In dev the same forced
failure logged the warning once, kept the server up, and a real post still
rendered — which is the intended asymmetry, not an accident.

### Verified

| Case | Before | After |
| --- | --- | --- |
| `/blog/nope-nope`, `/blog/does-not-exist` | 200 + `noindex` | **404**, `Cache-Control: private, no-store` |
| A published post, `/blog` index | 200 | 200 (unchanged) |
| All 39 blog URLs in `sitemap-main.xml` | 200 | 200 — sitemap advertises nothing that 404s |
| All 80 sitemap URLs across the four files | 200 | 200 (unchanged) |
| `/products`, `/services`, `/threads` matrix (33 cases) | — | unchanged: 200 / 308 / 404 |
| `npm run build` | — | `● (SSG)` blog routes at `1h`, `○ /sitemap-main.xml` static |
| `next dev` | 200 | 404 for a missing slug, 200 for a real one |

### Re-measure

- Watch Search Console for "Submitted URL not found (404)" after the next
  publish. There should be none: a post enters the sitemap and the route set in
  the same build.
- If a post is ever published and not deployed, the symptom is a 404 on a URL
  the admin UI says is live. That is this trade-off, not a bug.
- Confirm the blog's `● (SSG)` routes still pick up edits within the hour
  (`revalidate = 3600`).

---

## 2J. Round six follow-up — an orphaned blog URL and a future-dated `lastmod` (11 Sep 2026)

Both came out of the indexing audit behind §2I. Neither is a ranking problem in
itself; both destroy signal silently, which is why they are fixed rather than
merely noted.

### An edited slug orphans the URL Google already ranked

The audit found `/blog/snap-gauge-vs-ring-gauge-pick-by-the-form-error,-not-the-habit`
returning a hard 404 — while the post itself is live, at the same slug with the
comma removed. The rename happened in the admin UI, which writes the slug to
Firestore, and the public URL is derived from that slug, so the old address
simply stopped existing. Nothing reported it: no build error, no sitemap entry
(the retired URL was never in the sitemap), and no 404 anyone was reading. It
surfaced only because every live URL was being inspected by hand.

That is the whole failure mode, and it is a *class* of bug rather than one
mistake. A slug edit is free in this stack, and the cost lands on a URL Google
has already crawled and indexed: whatever signal it earned has no redirect
to carry it to the new address.

**The fix** is `src/lib/blog-legacy-slugs.js` — a `Map` from retired slug to
current slug, consulted by `resolveDynamicPath` for two-segment `/blog/` paths.
It costs a path comparison and no I/O, which is what makes it acceptable in the
proxy. The proxy still cannot classify a *live* slug, because that needs a
Firestore read (§2I), so an unrecognised blog slug returns `null` and is refused
by the router via `dynamicParams = false`.

**The limit, stated plainly:** this map is only correct while it is maintained.
The next slug edit made without adding an entry here reproduces the original bug
exactly, with the same silence. It is a convention, not a mechanism — hence
rule 11.

### A `lastmod` in the future is discarded, not clamped

The audit's `lastmod` pass found the ten `/threads` URLs dated `2026-09-12` —
*tomorrow* — because `THREAD_PAGES_LASTMOD` had been pinned to the day after the
layer was written. Google does not error on a `lastmod` it cannot believe; it
ignores it. So the ten newest pages, the ones whose freshness claim the pin
existed to make, were advertising a date that bought them nothing.

**The fix** has two parts: the constant is now the real go-live date
(2026-09-11), and `pinnedLastModified()` clamps any pinned date to the build
time so the class cannot recur. A clamp rather than a warning comment, because
the failure is invisible — the sitemap still validates, Search Console still
reports no error, and the only symptom is a page that keeps the stale crawl the
pin was added to avoid.

### Verified

| Case | Before | After |
| --- | --- | --- |
| `/blog/…error,-not-the-habit` (comma — the form Google has indexed) | 404 | **308** → `/blog/…error-not-the-habit` |
| The same path with the comma percent-encoded (`%2C`) | 404 | **308**, same target |
| Query string on either form | — | preserved (`?utm_source=…`) |
| The current slug, `/blog` index | 200 | 200 |
| `/blog/<unknown>`, `/blog/__proto__`, `/blog/constructor`, `/blog/toString` | 404 | 404 — a `Map`, not an object literal, so no inherited key can match a slug |
| `/products`, `/services`, `/threads` matrix (18 cases) | 200 / 308 / 404 | unchanged |
| Pinned `lastmod`, all four sitemaps (162 entries) | 10 future-dated | **0** future-dated |
| `npm run build` | — | 107/107 static pages, no errors |

The `%2C` row was initially mis-tested and looked like a failure; the encoded
test URL was missing the hyphen that follows the comma. Recorded because the
false alarm cost a round trip and the real conclusion is the useful part:
`decodeURIComponent` runs over the whole path, so a retired slug containing a
space or a bracket resolves when encoded too.

### Re-measure

- The comma URL should settle in Search Console as a redirect rather than "Not
  found (404)". The 404 already recorded stays in the report until a recrawl.
- `/threads` URLs are still unknown to Google (§2I). A corrected `lastmod` does
  not create a crawl — it removes an obstacle. Validation still needs Request
  Indexing or an internal-link nudge.
- **When a post is renamed, add the entry.** If that is forgotten the symptom is
  exactly what opened this section, and the way it was found the first time was
  a manual URL-by-URL sweep.

---

## §2K. Round seven — retiring thirteen of sixteen city pages

### The measurement that forced it

§2A–§2C established that the location axis does not bring relevant traffic and
cut the matrix from 80 URLs to 16. That was not far enough, and the reason is
crawl budget rather than relevance. A URL Inspection sweep of all 16 pages
separated them cleanly:

| Page | Last crawl | 90-day impressions | Position |
|---|---|---|---|
| `/products/air-gauges-coimbatore` | 2026-07-13 | 31 | 8.5 |
| `/products/calibration-services-coimbatore` | 2026-07-13 | 18 | 9.9 |
| `/products/thread-plug-gauges-coimbatore` | 2026-07-13 | 15 | 8.3 |
| the other 13 | **never** | 0 | — |

"Never crawled" is the operative number. These are not pages Google rejected;
they are pages Google has not fetched — and they were reachable from the
strongest internal-link sources the site controls, with `/products/plain-gauges`
alone pointing at five of them. Thirteen URLs that nothing crawls are pure
queue, and they sit in front of `/products/special-gauges`, which has never been
crawled either.

### What was changed

The prune is expressed as a **page-level allowlist**, not a city tier:

```js
export const LIVE_CITY_PAGES = new Set([
	"/products/air-gauges-coimbatore",
	"/products/calibration-services-coimbatore",
	"/products/thread-plug-gauges-coimbatore",
]);
```

A tier could not express this outcome. All three survivors are Coimbatore, and
every one of Chennai's seven combinations is in the uncrawled group — pruning by
city would have taken the winners down with the dead weight.

`LOCATION_TIER_LIMIT` is kept rather than deleted, so widening coverage still
takes two deliberate acts: raise the tier *and* name the page. Rule 9 asks for a
measured query cluster before a new programmatic axis ships; the two-gate
arrangement now enforces a version of that in code.

### No new redirect code was needed

`dynamic-route-guard.js` already answers any combination that belongs to a
product or service family but is not currently generated — and it answers with a
308 to that family's hub, not a 404. Removing an allowlist entry therefore
retires the URL in one hop with no further change:

| Retired | 308 target |
|---|---|
| `air-gauges-chennai`, `plain-plug-gauges-{chennai,coimbatore}`, `snap-gauges-coimbatore` | `/products/plain-gauges` |
| `thread-plug-gauges-chennai`, `thread-ring-gauges-{chennai,coimbatore}` | `/products/thread-gauges` |
| `calibration-services-chennai`, `gauge-calibration-{chennai,coimbatore}` | `/calibration` |
| `custom-gauge-manufacturing-{chennai,coimbatore}` | `/products/special-gauges` |
| `gauge-repair-and-reconditioning-coimbatore` | `/services` |

### The link source was derived, not left parallel

`citiesForProduct()` / `citiesForService()` used to re-derive the answer from
`activeCities()` and the relevance table. Two derivations of one fact drift, and
the failure mode here is specific: a hub links into a URL that 308s, spending
crawl budget to arrive at a page the hub already points to. Both now read the
generator, so links and routes cannot disagree.

The effect on the internal-link graph:

| Page | City links before | after |
|---|---|---|
| `/products/plain-gauges` | 5 | 1 |
| `/products/thread-gauges` | 4 | 1 |
| `/products/special-gauges` | 2 | 0 |
| `/services` | 5 | 0 |
| `/calibration` | 2 | 1 |
| `/products`, `/` | 0 | 0 |

Five `<CityLinks>` call sites were also deleted rather than left in place —
three on `/services`, one on `/products/special-gauges`, and one on
`/products/api-gauges` that had been dead since before this round.
`citiesForService()` now returns empty for every slug, so a `type="service"`
block at those sites renders nothing, and a call that can never produce output
is worse than a missing line: it reads as a feature.

### The prune orphaned one of its own survivors

`/calibration` asked for `type="service" categorySlug="gauge-calibration"`. That
is the *service* family, and every page in it is retired. The page that survives
is a *product* — `/products/calibration-services-coimbatore` — so the block
rendered nothing and the page it was meant to support finished the prune with
**zero inbound internal links**: a survivor the site had orphaned.

It now reads `type="product" categorySlug="calibration-services"`. Measured
against the local build, each survivor has exactly one inbound internal link,
from its own hub:

| Survivor | Inbound from |
|---|---|
| `/products/air-gauges-coimbatore` | `/products/plain-gauges` |
| `/products/calibration-services-coimbatore` | `/calibration` |
| `/products/thread-plug-gauges-coimbatore` | `/products/thread-gauges` |

The check that caught it is worth keeping: **count inbound internal links for
every page the site intends to keep**, not only for the pages it intends to
drop.

### A measurement bug worth recording

The first inbound-link count said the calibration survivor had zero and the other
two had one — which happened to look like a plausible result, so it survived a
reading. It was wrong. The script read `<loc>` values out of the sitemap and
curled them directly, and those are absolute production URLs: the sweep was
measuring the deployed site, which still had sixteen city pages, while the build
under test was being verified on `localhost`. The port being wrong is loud and
the origin being wrong is silent — the same class of error as the `%2C` false
alarm in §2J.

Anything that starts from a sitemap must rewrite the **origin**, then the path.
The numbers above are from the corrected run.

### Verified

| Check | Result |
|---|---|
| `npm run build` | 94/94 static pages (107 − 13), no errors |
| 67 sitemap URLs | 67 × 200 |
| 3 survivors | 200 |
| 13 retired | 308, single hop, correct hub, query string preserved |
| never-existed combos (`air-gauges-kochi`, `api-gauges-coimbatore`, …) | 404 |
| §2H / §2J regression matrix | 18/18 unchanged |
| legacy blog slug, raw and `%2C`-encoded | 308 → live post |
| `sitemap-cities.xml` | 3 entries |
| Lint (`biome check src scripts`) | 16 diagnostics before, 16 after — none new |

### Re-measure

- `/products/special-gauges` is now the page carrying the freed budget and has
  still never been crawled. Request Indexing, then check whether it moves within
  a fortnight. If it does not, internal links were not the constraint.
- The three survivors should keep their impressions. If one decays after the
  prune, the hub link is the first thing to look at.
- The 13 retired URLs should settle as redirects over the next recrawl; residual
  "Not found (404)" rows are historical.
- If the freed budget produces nothing, the next thing to cut is blog pagination
  depth (§3). Crawl budget is the hypothesis this round tests.

---

## 2L. Round eight — 14 Sep 2026: the plateau, and the layer that never got crawled

Figures are the Search Console API for the 90 days ending 2026-09-14, compared
with the 7 Sep pass in §2G. Coverage is the first complete URL Inspection sweep
since §2K (`node scripts/gsc-index-coverage.mjs --sample 40`).

### What the aggregate hid

| Metric | 7 Sep (90d) | 14 Sep (90d) |
|---|---|---|
| Clicks | 125 | **137** |
| Impressions | 5,369 | **5,824** |
| CTR | 2.33% | **2.35%** |
| Average position | — | 10.0 |

The 90-day window still reads as growth. The weekly shape does not:

| Week | Clicks | Impressions |
|---|---|---|
| Aug 2–8 | 17 | 1,049 |
| Aug 9–15 | **36** | **1,069** |
| Aug 16–22 | 19 | 762 |
| Aug 23–29 | 14 | 672 |
| Aug 30–Sep 5 | 18 | 563 |
| Sep 6–12 | **12** | **547** |

Last 28d vs prior 28d: **62 clicks / 2,483 impressions** against 64 / 2,935
(−3% / −15%). The February-to-August growth was substantially one spike — the
§2A IS 3455 rewrite — and that spike is now decaying to its equilibrium.

It is worth being precise about what the 28-day dip is *not*. Decomposed by
page and by query, most of the impression loss is noise leaving:

| Lost | | Gained | |
|---|---|---|---|
| `dsn` 275→21 | bare acronym, **0 clicks in 378 impr/90d** | IS 3455 post +233 impr, +8 clicks | |
| m20 post 268→20 | 287 impr/90d, so 93% was one window | common-mistakes +157 | |
| custom-gauges blog 109→2 | | taper-thread +106 | |
| `/about` 248→97 | the §2D cannibalisation fix working | wringing-blocks +57 | |

**Non-branded demand is flat-to-up; the headline fall is junk impressions
rolling off.** The real problem is concentration: the IS 3455 post is 55 of 137
clicks across 90 days (40%) and **33 of 62 in the last 28 (53%)**. There is one
acquisition channel and it is a single URL.

### Coverage: 80% indexed, and a quarter of URLs have no inbound links

| | |
|---|---|
| Indexed | **32/40 (80%)** |
| Never crawled | 7/40 |
| Canonical mismatch | 0/40 |
| **Zero referring URLs** | **10/40** |

The 10/40 is the new number and the useful one: it is a measurement of
internal-link starvation, not of content quality. Pages Google has no route to
are pages it will not recrawl.

`/products/special-gauges` is still **"URL is unknown to Google"** with
`lastCrawl: never` — exactly the open item §2K said to re-measure, unchanged.
Four blog posts are also unindexed (`thread-plug-vs-ring-gauges`,
`the-importance-of-thread-gauges`, `when-the-go-gauge-will-not-enter`,
`what-a-go-no-go-gauge-actually-proves`).

### The thread layer is half-crawled and has earned nothing

Shipped 11 Sep (§2H). Checked by URL Inspection:

| Indexed | Not indexed |
|---|---|
| `/threads/metric`, `/threads/metric/m6`–`m12` | `/threads`, `/threads/npt`, `/threads/unc`, `/threads/metric/m16`, `m20` |

Zero impressions for the entire cluster — no `m12 thread pitch`, no
`npt thread dimensions`, no `unc thread chart`. The whole §2H bet is still
unmeasured, and the hub, which is the crawl path to the systems, is the page
Google has not fetched.

### The link profile, measured once

A DataForSEO link-velocity call (14 Sep) returned **14 new referring domains /
7 new main domains, 0 lost** in the window. Small, but the domain is gaining
rather than losing links, which is better than the content-only read of the last
seven rounds would suggest. The endpoint was catalogued as free and was charged
at **$0.024**; the promotional balance now stands at $0.0146, so volume
research needs a top-up.

### What this round changed

**1. The blog's structured data now joins the single entity graph.** §2C states
that Product, Service, FAQPage and ContactPage all reference the canonical
`#organization` / `#website` nodes. Blog posts never did: each one redeclared an
anonymous Organization as author and publisher. `buildBlogPostingSchema()` now
emits `@id` references and adds `mainEntityOfPage`, `inLanguage` and `keywords`.

**2. FAQ markup for the posts that carry search demand, not the posts that
happen to ask questions.** Across all 39 posts there are **10 question→answer
pairs, seven of them on a buyer's guide with no measured demand**; the
highest-traffic article had one, which is below the threshold at which a derived
FAQPage is worth emitting. So the post route now prefers a hand-written `faq`
field and falls back to question headings (`extractFaqPairsFromHtml`,
`resolvePostFaqs`). Three posts got authored Q&A via `scripts/seo-round6.mjs`
(dry-run, assertion-checked, backup in `scripts/.blog-backups/`):

| Post | Q&A | Source of every answer |
|---|---|---|
| IS 3455 / IS 919 | 7 | the article's own body |
| API 5B / 7-2 oilfield | 5 | the article's own body |
| M20×1.5-6H thread callout | 4 | the article's own body |

The same array renders a visible `<details>` Q&A section **and** the FAQPage
JSON-LD, so the markup cannot state a question the page does not show. No new
figure, date or certification enters the corpus — rule 5.

> A caveat for the next editor: `/admin/blog`'s save path names its fields
> explicitly, so a normal admin save **preserves** `faq` rather than clearing it.
> But rewriting a post's body can leave an authored answer stale, and nothing
> detects that. If the body changes, re-read the `faq` entries against it.

**3. Internal links aimed at the uncrawled thread pages.** Two new blocks, both
fed by the generator the routes and sitemap read, so neither can point at a page
that does not exist:

- `ReferenceLinks` at the foot of **every blog post** — the most frequently
  recrawled URLs on the site — linking `/threads`, each active system page,
  `/fits` and `/faq`.
- `ThreadSystemLinks` on **every metric size page** (`m6`–`m12`, the indexed
  ones) linking the hub and the other systems.

Before this, a size page linked only to sibling sizes and back to
`/threads/metric`; nothing indexed pointed at `/threads/npt` or `/threads/unc`.

**4. `/fits` — the §3.5 option-1 explainer, shipped.** One page covering what IT
grades are, how the deviation letter positions a zone, hole-basis versus
shaft-basis, and the clearance / transition / interference families, with a
visible Q&A and FAQPage markup. It prints **no limit values and no formula
coefficients**, which is the point: §3.5's option 1 is the only route that needs
no transcription decision, and the page says so in its own section rather than
quietly omitting the numbers.

Registered in `known-paths.js`, both sitemaps (`/sitemap-main.xml` and the
legacy `/sitemap.xml`), the footer, and `/llms.txt`. It adds **one** URL, not a
programmatic axis — rule 9 is not engaged.

### Deliberately not done

**`THREAD_TIER_LIMIT` stays at 1.** Tier 2 is BSP, UNF and the remaining metric
sizes. Adding them before tier 1 is measurably indexed is the city matrix again
with different nouns.

**No second IS 3455 / IS 919 URL** (§2D), **no BIS tables** (§2D, rule 8), **no
computed tolerance values** (rule 8), **no location pages** (§2K).

**No artificial freshness.** Roughly half the blog was last edited 12 or 29 Jul,
and AI-citation research favours content updated within 30 days. Bumping
`updatedAt` without changing anything would corrupt the one signal that is
supposed to mean "this was revisited"; real edits are an editorial task, not a
script.

**No `seo:keywords` follow-up.** The remaining title-substring flags were
identified in §2F as artefacts and remain so.

### Verified (production build, then `next start`)

| Check | Result |
|---|---|
| `npm run build` | ✓ compiled; `/fits` `○ (Static)`; 40 blog routes; thread routes unchanged |
| `/fits`, `/threads`, `/threads/npt`, `/threads/unc`, `/threads/metric/m12` | all **200** |
| `/blog/<unknown>`, `/products/<unknown>` | still **404** (proxy regression guard) |
| `/fits` `<title>` | `Limits and Fits: IT Grades & H7/g6 \| DSN Enterprises` (58) |
| JSON-LD `@type` on `/fits` | `FAQPage` (6 × Question), `BreadcrumbList` |
| FAQPage on IS 3455 / API post / buyer's guide | 7 / 5 / 7 questions |
| BlogPosting author + publisher | `{"@id": ".../#organization"}`, not inline |
| HTML entities inside JSON-LD | **0** across the sampled posts |
| `/fits` in `sitemap-main.xml` and `sitemap.xml` | 1 each |
| `m12` outbound links | `/threads`, `/threads/npt`, `/threads/unc`, `/fits` present |
| `biome check` on every changed file | clean |

### Re-measure

- **Request Indexing** by hand in Search Console for `/threads`,
  `/threads/npt`, `/threads/unc`, `/threads/metric/m16`, `/threads/metric/m20`
  and `/products/special-gauges`. The API cannot do this and the links are only
  a nudge; the pages have sat in "discovered" since 11 Sep.
- Does the **zero-referring-URL count** fall from 10/40? If it does not, the
  blog footer block is not being read and the problem is elsewhere.
- Does the **thread cluster earn its first impressions**? §2H measured ~2,800/mo
  of demand for it. A month with zero is a layer problem, not a ranking problem.
- **IS 919 CTR** (0.7% on 136 impr @ 7.9) after the §2G description flip. If it
  is still flat, the answer is an IS-919-led section, not more snippet work.
- **Mobile CTR** (1.82% at position 7.6 versus desktop 2.75% at 11.9). Better
  position, two-thirds the CTR, is anomalous and unexamined.
- **`leakgall`** — 224 impressions at 8.8 with zero clicks, growing, on the API
  post. Adult-category noise that inflates impressions and drags CTR; decide
  whether to keep absorbing it.

---

## 2M. Round eight follow-up — the sitemap cron gets a memory (14 Sep 2026)

Not a content round. This closes an observability gap found while checking
whether the daily Search Console cron was actually running.

### The gap

`/api/cron/sitemap` (`0 4 * * *`, added 29 Jul) submits the sitemaps and reads
them back, and does both correctly. What it never did was **keep a record of
having run**. Everything it knew came from Google's own `lastSubmitted` /
`lastDownloaded`, and `lastSubmitted` is *overwritten* on every submit. So the
system could answer "did it run recently?" but never "has it been running?" —
a cron that failed Mon–Wed and succeeded Thu left exactly the same trace as one
that ran every day. Vercel cannot close that either: `vercel logs` streams the
last five minutes only, and past executions are not retrievable.

The `/api/health` sitemap check made it worse by looking healthy in exactly the
case that mattered: with a 14-day `lastDownloaded` staleness threshold, a cron
that had stopped firing would read "Operational" for a fortnight.

### What changed

**1. A run log.** `src/lib/sitemap-run-log.js` writes one Firestore document per
**UTC day** to `ops_sitemap_runs`, so a re-run updates that day's row instead of
appending a duplicate and a gap becomes readable. Reached through the Admin SDK
(`getAdminDb`), which bypasses security rules — correct for a server-only
operational log. The collection has no `allow` clause in `firestore.rules`, so
client access is denied by default and only the Admin SDK can touch it. Rows
older than 90 days are pruned on each write.

**2. The cron records every run.** `recordRun` flattens the result into a row,
and a **thrown run is recorded too** — otherwise a day the cron ran and failed
would show as a clean gap. The write is wrapped so a Firestore outage logs an
error and still returns the cron's own result: a logging failure must not be
reported as a Search Console failure. The Vercel scheduler's user agent
(`vercel-cron/1.0`) is recorded as the trigger, so a hand-triggered run cannot
be misread as evidence the schedule fired.

**3. `/api/health` asks both questions.** `assessSitemapRunHistory` adds two
problems the Google-side check could not see: **no run for 50h** (the schedule
is daily with up to an hour of jitter, so a healthy gap is ≤ ~25h) and
**two or more consecutive unhealthy runs**. An empty history is deliberately
`known: false` and therefore healthy — before the first run after this shipped
there is nothing to judge, and flipping the site red on deploy would be wrong.

**4. `/admin/status` shows it.** The sitemap row now carries the last-run age,
the trigger, and how many runs are on record.

### What this does not change

The cron still does not make Google index anything faster, and nothing here
pretends otherwise. A submit prompts Google to re-read the **sitemap file**
almost immediately — measured again on 14 Sep: `lastSubmitted 05:14:33.335Z` →
`lastDownloaded 05:14:33.915Z`, 0.6s. Indexing the URLs inside it is governed by
`lastmod`, internal links and Google's scheduling, which is why §2L spent its
effort on internal links and Request Indexing rather than on submitting more
often.

### Verified

| Check | Result |
|---|---|
| Cron run (authorised, local production server) | 200, `healthy: true`, `logged.recorded: true`, `trigger: "manual"` (curl UA, correctly not `cron`) |
| Cron run, unauthorised | 401 |
| Health, after one run | `runsOnRecord: 1`, `lastRunAgeHours: 0`, `consecutiveUnhealthy: 0`, overall `healthy` |
| Health, with the only run 60h old | `unhealthy`: "the sitemap check has not run for 60h; it is scheduled daily" |
| Health, with 2 consecutive unhealthy runs | `unhealthy`: "2 consecutive sitemap check(s) reported problems" |
| Health, with 0 runs recorded (the post-deploy state) | `healthy`, `runsOnRecord: 0` — no false alarm on deploy |
| `npm run build` | ✓ compiled |
| `biome check` on every changed file | clean |

All seeded test rows were deleted after verification; the collection is empty so
the history begins with the first real cron run.

### Re-measure

- `/api/health` should report `runsOnRecord` climbing by one per day with
  `consecutiveUnhealthy: 0`. **Any day missing from the sequence is now a
  visible fact** rather than an inference from a single overwritten timestamp.
- If a gap appears, the cause is Vercel-side (cron skipped or the invocation
  401'd), not Google-side — the two are now distinguishable, which they were not.

---

## 3. Open items — not yet done

These are ranked by expected value.

### 1. Multi-host duplication — redirect verified live, residual GSC rows only

Verified 3 Sep 2026 via Vercel CLI (`vercel domains inspect`) plus curl:

- DNS is on Vercel nameservers (`ns1/ns2.vercel-dns.com` ✔) and both
  `www.dsnenterprises.in` and `dsnenterprises.in` are assigned to the
  `dsn-enterprise` project — so this was never a DNS misconfiguration.
- The apex → www 301 lives in `next.config.js` `redirects()` (host-based,
  in place since Mar 2026) and is serving correctly:
  `https://dsnenterprises.in/products/plain-gauges` → 301 → www equivalent,
  path and query preserved. `http://` → 308 → `https://` is Vercel's
  automatic edge upgrade.
- Full chains resolve: `http://apex` → 308 → `https://apex` → 301 →
  `https://www...` → 200.

The `http://` and apex rows still appearing in Search Console (142 impr,
0 clicks) are residual: the 90-day window includes history from before the
redirects, and Google keeps re-probing previously known URLs. No CLI or DNS
change can remove them — only time and the permanent redirects, which are
already in place. Re-check next pass: the rows should decay to ~0 as the
window rolls past the fix. The two-hop `http apex` chain (308 then 301) is
unavoidable on Vercel (scheme upgrade precedes app redirects) and within
Google's 5-hop budget — not worth working around.

### 2. Convert remaining standards CTR (in progress, see 2D)

The 29 Jul zero-CTR problem is no longer zero — the IS 3455 post now earns 29
clicks. Remaining gaps on that URL are IS 919 CTR, "latest edition", ISO-vs-IS
confusion, and PDF intent. Those are the 2D title/body changes. **Do not
create a second standards URL.**

### 3. `/products` and `/products/special-gauges` indexing

`/products/special-gauges` still had **zero** Search Console impressions on
21 Aug, and the URL Inspection sweep in §2K showed why: its `lastCrawl` is
`never`. It is not a thin-content problem — it is a queue problem, and it is the
page §2K freed budget for. The hub copy and title already match "custom gauges
manufacturer", which the custom-gauges *blog* ranks for at position 4.8. Request
Indexing now that the thirteen city pages are out of the way, and do not add
more custom-gauge URLs until this one is indexed.

### 4. FAQ was thin — addressed in 2D

The Standards category is the content that searchers were already asking the
IS 3455 post for. `/contact` and `/thank-you` word counts are not a ranking
problem.

### 5. Fits and tolerance (H7/g6, IT grades) — blocked on a decision, not on effort

This is the largest unclaimed cluster measured so far — roughly 8,000 searches a
month against essentially no competition, and precisely the question the
existing traffic already arrives with. It is blocked on rule 8, and the block is
not technical.

The numbers cannot be computed. Checked against ISO 286-1's published table, the
IT formula disagrees in **50 of 104 cells (48%)**. A generated table would
therefore be wrong about half the time on a page whose entire value is its
numbers — and the cost of a wrong tolerance limit is not a lost ranking, it is
scrapped parts or a rejected batch at a customer's works.

Three ways forward. Only the first is available without a decision:

1. **Explain the system, publish no limits.** A `/fits` explainer covering what
   IT grades mean, how to read `H7/g6`, hole-basis versus shaft-basis, and how a
   fit is chosen — with no numeric limit table anywhere on it. Lawful, useful,
   and squarely inside rule 8. It reaches the conceptual queries, not the
   value-seeking ones that make up most of the 8,000.
2. **Transcribe the tables.** Requires that the client holds, or obtains, the
   right to reproduce IS 919 / ISO 286 limit tables — and then a second pair of
   eyes checking every cell against the standard. This is the only route that
   claims the value-seeking traffic, and it is a legal and editorial commitment
   rather than a coding task.
3. **Link out instead of hosting.** Send readers to the standard's own source.
   Costs the ranking, keeps the page lawful, and is worth doing as a fallback
   inside option 1 regardless.

Keyword volumes here are Google Ads buckets, so read them as relative rather
than absolute (§2D). **Option 1 shipped on 14 Sep 2026 as `/fits`** — see §2L.
It prints no limit values and no formula coefficients. The crawl-budget
question §2K raised has not been answered (the thread layer is still half
crawled), so only one URL was added, and `/fits` was linked from the footer,
every blog post and every metric size page rather than left to the sitemap
alone. Options 2 and 3 remain open.

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

1. **Do not restore the product × city matrix.** It has now been measured three
   times. The second measurement (section 2H, 52 live URLs over 90 days)
   returned **2 clicks** and 99 impressions, with only 4 location URLs ever
   earning an impression. The reason is that the queries are not being typed —
   not that the content was thin, which is what round one assumed. The third
   (section 2K) found that of the 16 URLs left after the second cut, 13 had
   `lastCrawl: never`, and cut the segment to 3. Adding cities back without a
   measured city query to answer will reproduce the same outcome.
2. **A city page needs both gates *and* evidence to ship.** Raise
   `LOCATION_TIER_LIMIT` **and** add the page to `LIVE_CITY_PAGES`; neither
   alone emits anything, deliberately. Run `npm run seo:coverage` and confirm
   the pages already live are actually indexed first. Bangalore and Hyderabad
   were added at tier 2 with full profiles (section 2E); that is not a licence
   to turn the tier-3 Tamil Nadu cities on, or to add more metros.
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
7. **Derive a number, do not retype it.** Section 2H records a hardcoded 1/2-13
   UNC pitch diameter that was wrong by 0.085 mm and would have shipped on a
   page whose entire value is its numbers. If a helper in `src/lib/` already
   computes a dimension, the component must call it. A literal is only
   acceptable for data transcribed from a standard, and then the source goes in
   a comment beside it.
8. **Tolerance limits are a transcription decision, not a calculation.** IS 919
   / ISO 286 published values disagree with the IT formula in 48% of measured
   cells, and ISO 965 / IS 4218 behave the same way. Do not "compute" a 6g or
   H7 limit, and do not let a page imply a limit figure it did not transcribe
   from the standard. This is why `/threads` states basic dimensions only and
   describes GO/NO-GO practice without quoting IS 4218 limits.
9. **New programmatic axes need a proven query cluster first.** The thread layer
   exists because the standards cluster measured 752 impressions at position
   7.0; the location layer was retired because it measured 99 impressions and 2
   clicks. Run `npm run seo:opportunity` and name the cluster before generating
   the next family of URLs.
10. **A status code must be decided before the response begins — in the proxy or
    by the router, never by the page.** A page component calling `notFound()` or
    `permanentRedirect()` cannot set the HTTP status: the response has already
    begun, so it emits a 200 carrying either the not-found UI or a client-side
    redirect, and Next then caches that 200 for a year. Section 2H records both
    bugs. Which fix applies depends on where the URL set comes from:
    - **Known at build time** (the blog): give the route `generateStaticParams`
      and `dynamicParams = false` and let the router refuse anything else. No
      proxy, no per-request read. Section 2I.
    - **Not known at build time** (products, services, threads): add the
      missing/redirect cases to `src/lib/dynamic-route-guard.js` and let
      `src/proxy.js` answer them, keeping the page's own call as a fallback.
    Never put a database read in the proxy, and when you freeze a URL set at
    build time, make the sitemap read the same list — otherwise the sitemap
    advertises URLs the router refuses. The guard must return "unrecognised"
    rather than "missing" for any input it does not fully understand, because a
    false 404 takes a live page offline.
11. **Two ways to quietly lose a page that already ranks: rename its slug, or
    date its `lastmod` in the future.** Both are silent, neither appears in a
    log or a Search Console error, and both are repaired by one line. Rename a
    published slug and you must add the retired slug to
    `src/lib/blog-legacy-slugs.js` in the same change — the URL is derived from
    the slug on the Firestore document, so the rename orphans whatever the old
    address had earned, with no redirect to carry it. Pin a `lastmod` and it
    must be a date that has already happened; Google discards a future date
    rather than clamping it, which costs the freshness signal the pin was added
    to send. `pinnedLastModified()` enforces the second in code; the first is on
    you. Section 2J.
12. **Pruning a family is not finished until every survivor has an inbound
    internal link.** Section 2K retired thirteen city pages and, in doing so,
    orphaned one of the three it kept: `/calibration` asked `CityLinks` for the
    *service* slug while the surviving page is a *product* page, so the block
    rendered nothing and the page finished the round with zero inbound links —
    and it was the second-best of the sixteen. Count inbound links for the pages
    you are keeping, not only for the pages you are dropping, and derive a hub's
    links from the same generator that produces the routes so the two cannot
    disagree.
13. **A sitemap is an output, not an input.** Crawling your own sitemap inside a
    verification script measures production, because `<loc>` holds absolute URLs
    and production is what DNS resolves. Section 2K's first inbound-link count
    was silently wrong for exactly this reason and read as a plausible result,
    which is the dangerous kind. When verifying a local build, rewrite the
    origin before the path.
