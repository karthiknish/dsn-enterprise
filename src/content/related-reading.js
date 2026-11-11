/**
 * Curated further-reading links for the product pages.
 *
 * Why these exist: the 11 Nov 2026 Search Console coverage audit found five
 * URLs Google had never crawled. Every one of them was technically clean
 * (200, index:follow, self-canonical, 2,100-3,300 words), so the cause was
 * crawl priority rather than anything wrong with the page. Four of the five
 * had the sitemap as their only referring URL: the blog's own link graph ran
 * through /blog's pagination, and nothing on the commercial side of the site
 * linked into it at all.
 *
 * The product pages are the ones Google fetches most often. A descriptive
 * in-text or card link from a product page is therefore worth more as a crawl
 * signal than another link from a listing page buried at ?page=6, and it is
 * also the link a buyer would actually want.
 *
 * Entries are explicit rather than computed so the pairing stays editorial:
 * each note says why that article belongs next to that product. Keep the list
 * short and the relevance real; a page that links everything signals nothing.
 */
export const RELATED_READING = {
	"thread-gauges": [
		{
			href: "/blog/thread-plug-vs-ring-gauges-building-the-right-inspection-pair",
			title: "Thread plug vs ring gauges",
			note: "Why a tapped hole and a stud need two different gauges, and how to buy the pair without covering the same limit twice.",
		},
		{
			href: "/blog/what-a-go-no-go-gauge-actually-proves",
			title: "What a go / no-go gauge actually proves",
			note: "The functional check, stated plainly: what a GO and a NO-GO member each confirm, and what neither one can tell you.",
		},
		{
			href: "/blog/metric-thread-pitch-chart-m6-to-m16",
			title: "Metric thread pitch chart, M6 to M16",
			note: "Coarse and fine pitch by size with the pitch diameter each one produces, for reading the callout before the gauge is ordered.",
		},
	],
	"plain-gauges": [
		{
			href: "/blog/what-a-go-no-go-gauge-actually-proves",
			title: "What a go / no-go gauge actually proves",
			note: "A plain gauge answers whether the part fits, not how big it is. Worth reading before a drawing tolerance is translated into a gauge.",
		},
		{
			href: "/blog/guard-banding-making-go-no-go-calls-you-can-defend",
			title: "Guard banding go / no-go calls",
			note: "How measurement uncertainty changes what a pass means, and the guard band that keeps an inspection decision defensible.",
		},
		{
			href: "/blog/stopping-gauge-corrosion-through-a-monsoon",
			title: "Stopping gauge corrosion through a monsoon",
			note: "Storage and handling practice for the humid months, which is where most plain gauge wear and scrap actually starts.",
		},
	],
	"special-gauges": [
		{
			href: "/blog/outer-profile-gauges-when-a-template-beats-measuring-every-part",
			title: "Outer profile gauges: when a template wins",
			note: "For a form that is checked a thousand times a shift, a profile gauge beats measuring every part. How to decide and what to send.",
		},
		{
			href: "/blog/custom-gauges-solving-specific-measurement-challenges",
			title: "Custom gauges for specific measurement problems",
			note: "The cases where no catalogue gauge fits, and the drawing information that turns a problem into a workable special.",
		},
		{
			href: "/blog/pcd-gauges-checking-a-bolt-circle-on-the-shop-floor",
			title: "PCD gauges: checking a bolt circle",
			note: "A pitch circle diameter has no centre you can touch. One placement with a fixed gauge replaces a stack of vernier readings.",
		},
	],
	"snap-gauges": [
		{
			href: "/blog/adjustable-or-fixed-snap-gauge-how-to-choose",
			title: "Adjustable or fixed snap gauge?",
			note: "Jobbing shop or production line: the answer changes the setting routine, the wear allowance and the price.",
		},
		{
			href: "/blog/snap-gauge-vs-ring-gauge-pick-by-the-form-error-not-the-habit",
			title: "Snap gauge vs ring gauge",
			note: "Both check a shaft. Which one belongs on a given feature follows from the form error the process actually produces.",
		},
		{
			href: "/blog/ring-gauge-wear-limits-when-to-recalibrate-vs-replace",
			title: "Wear limits: recalibrate or replace",
			note: "Contact gauges wear at the flanks. The measurement that tells you whether a worn gauge can be reset or has to be retired.",
		},
	],
	"api-gauges": [
		{
			href: "/blog/api-5b-and-api-72-gauges-what-inspection-teams-should-check-before-recalibration",
			title: "API 5B and 7-2 before recalibration",
			note: "What to verify on a line-pipe gauge set before it goes out for calibration, so it comes back usable rather than merely certified.",
		},
		{
			href: "/blog/taper-thread-gauges-why-npt-and-bspt-inspection-trips-up-shops-that-handle-them-occasionally",
			title: "Taper thread gauges and occasional use",
			note: "NPT and BSPT fail in ways parallel threads do not. Where occasional handlers go wrong on the gauging plane and standoff.",
		},
		{
			href: "/blog/api-gauges-essential-for-the-oil-gas-industry",
			title: "API gauges in oil and gas",
			note: "The gauge families behind a threaded connection on a wellhead, and why the standard, not the size, decides the tool.",
		},
	],
};
