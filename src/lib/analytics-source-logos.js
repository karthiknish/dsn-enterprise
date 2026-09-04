/**
 * Maps a GA4 `sessionSource` value to a logo SVG downloaded from svgl.app
 * (stored in /public/logos/sources). Sources without a matching logo simply
 * render without one — no fallbacks that could look broken.
 *
 * GA4 is inconsistent about the source shape: sometimes a bare name
 * ("google"), sometimes a full host ("chatgpt.com", "gemini.google.com"),
 * sometimes a redirect prefix ("l.facebook.com"). `getSourceLogo` therefore
 * tries, in order: the cleaned source as-is, known special hosts, then the
 * registrable domain (last two labels).
 */
const SOURCE_LOGOS = {
	// Bare source names, as GA4 sends them when it strips the TLD.
	google: "/logos/sources/google.svg",
	bing: "/logos/sources/bing.svg",
	duckduckgo: "/logos/sources/duckduckgo.svg",
	brave: "/logos/sources/brave.svg",
	perplexity: "/logos/sources/perplexity.svg",
	claude: "/logos/sources/claude-ai.svg",
	anthropic: "/logos/sources/claude-ai.svg",
	chatgpt: "/logos/sources/openai.svg",
	openai: "/logos/sources/openai.svg",
	gemini: "/logos/sources/gemini.svg",
	copilot: "/logos/sources/copilot.svg",
	"microsoft-copilot": "/logos/sources/copilot.svg",
	mistral: "/logos/sources/mistral-ai.svg",
	deepseek: "/logos/sources/deepseek.svg",
	grok: "/logos/sources/grok.svg",
	facebook: "/logos/sources/facebook.svg",
	instagram: "/logos/sources/instagram.svg",
	linkedin: "/logos/sources/linkedin.svg",
	reddit: "/logos/sources/reddit.svg",
	youtube: "/logos/sources/youtube.svg",
	pinterest: "/logos/sources/pinterest.svg",
	wordpress: "/logos/sources/wordpress.svg",
	whatsapp: "/logos/sources/whatsapp.svg",
	twitter: "/logos/sources/twitter.svg",
	x: "/logos/sources/twitter.svg",
	threads: "/logos/sources/threads.svg",
	tiktok: "/logos/sources/tiktok.svg",
	github: "/logos/sources/github.svg",

	// Full hosts GA4 keeps intact, including subdomains that would otherwise
	// collapse to the wrong registrable domain (gemini.google.com -> google).
	"chatgpt.com": "/logos/sources/openai.svg",
	"claude.ai": "/logos/sources/claude-ai.svg",
	"perplexity.ai": "/logos/sources/perplexity.svg",
	"gemini.google.com": "/logos/sources/gemini.svg",
	"aistudio.google.com": "/logos/sources/gemini.svg",
	"search.brave.com": "/logos/sources/brave.svg",
	"brave.com": "/logos/sources/brave.svg",
	"deepseek.com": "/logos/sources/deepseek.svg",
	"mistral.ai": "/logos/sources/mistral-ai.svg",
	"github.com": "/logos/sources/github.svg",
	"openai.com": "/logos/sources/openai.svg",
	"x.com": "/logos/sources/twitter.svg",
	"t.co": "/logos/sources/twitter.svg",
	"threads.net": "/logos/sources/threads.svg",
	"wa.me": "/logos/sources/whatsapp.svg",
	"google.com": "/logos/sources/google.svg",
	"google.co.in": "/logos/sources/google.svg",
	"bing.com": "/logos/sources/bing.svg",
	"duckduckgo.com": "/logos/sources/duckduckgo.svg",
	"facebook.com": "/logos/sources/facebook.svg",
	"instagram.com": "/logos/sources/instagram.svg",
	"linkedin.com": "/logos/sources/linkedin.svg",
	"reddit.com": "/logos/sources/reddit.svg",
	"youtube.com": "/logos/sources/youtube.svg",
	"tiktok.com": "/logos/sources/tiktok.svg",
	"pinterest.com": "/logos/sources/pinterest.svg",
	"whatsapp.com": "/logos/sources/whatsapp.svg",
	"wordpress.com": "/logos/sources/wordpress.svg",
};

/** Sources that mean "no referrer data" rather than a real origin. */
const NON_SOURCES = new Set([
	"(direct)",
	"(none)",
	"(not set)",
	"(data not available)",
]);

/**
 * The registrable domain — last two labels, so "l.facebook.com" and
 * "m.facebook.com" both collapse to "facebook.com". "google.co.in"-style
 * two-part TLDs are handled explicitly in the host map above.
 */
function registrableDomain(host) {
	const parts = host.split(".").filter(Boolean);
	return parts.length >= 2 ? parts.slice(-2).join(".") : parts[0] || "";
}

/**
 * Extracts the logo for a "source / medium" label like "google / organic".
 * Returns the public URL of an SVG, or null when the source has no logo.
 */
export function getSourceLogo(label) {
	const raw = (label || "").split("/")[0].trim().toLowerCase();
	if (!raw || NON_SOURCES.has(raw)) return null;

	if (SOURCE_LOGOS[raw]) return SOURCE_LOGOS[raw];

	// Strip redirect/portal prefixes: l., lm., m., www., web.
	const stripped = raw.replace(/^(l|lm|m|www|web)\./, "");
	if (SOURCE_LOGOS[stripped]) return SOURCE_LOGOS[stripped];

	const domain = registrableDomain(stripped);
	if (SOURCE_LOGOS[domain]) return SOURCE_LOGOS[domain];

	return null;
}
