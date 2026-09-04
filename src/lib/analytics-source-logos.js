/**
 * Maps a GA4 `sessionSource` value to a logo SVG downloaded from svgl.app
 * (stored in /public/logos/sources). Sources without a matching logo simply
 * render without one — no fallbacks that could look broken.
 *
 * Keys match the bare source GA4 sends ("google", "bing", "(direct)") and a
 * few host-style variants ("x.com", "l.facebook.com"), since GA4 is not
 * consistent about whether it strips the TLD.
 */
const SOURCE_LOGOS = {
	google: "/logos/sources/google.svg",
	bing: "/logos/sources/bing.svg",
	duckduckgo: "/logos/sources/duckduckgo.svg",
	"duckduckgo.com": "/logos/sources/duckduckgo.svg",
	brave: "/logos/sources/brave.svg",
	"search.brave.com": "/logos/sources/brave.svg",
	perplexity: "/logos/sources/perplexity.svg",
	"perplexity.ai": "/logos/sources/perplexity.svg",
	claude: "/logos/sources/claude-ai.svg",
	"claude.ai": "/logos/sources/claude-ai.svg",
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
	"l.facebook.com": "/logos/sources/facebook.svg",
	instagram: "/logos/sources/instagram.svg",
	"l.instagram.com": "/logos/sources/instagram.svg",
	linkedin: "/logos/sources/linkedin.svg",
	"www.linkedin.com": "/logos/sources/linkedin.svg",
	reddit: "/logos/sources/reddit.svg",
	"www.reddit.com": "/logos/sources/reddit.svg",
	youtube: "/logos/sources/youtube.svg",
	"www.youtube.com": "/logos/sources/youtube.svg",
	"m.youtube.com": "/logos/sources/youtube.svg",
	pinterest: "/logos/sources/pinterest.svg",
	wordpress: "/logos/sources/wordpress.svg",
	whatsapp: "/logos/sources/whatsapp.svg",
	"whatsapp.com": "/logos/sources/whatsapp.svg",
	"l.whatsapp.com": "/logos/sources/whatsapp.svg",
	"wa.me": "/logos/sources/whatsapp.svg",
	twitter: "/logos/sources/twitter.svg",
	"t.co": "/logos/sources/twitter.svg",
	x: "/logos/sources/twitter.svg",
	"x.com": "/logos/sources/twitter.svg",
	threads: "/logos/sources/threads.svg",
	tiktok: "/logos/sources/tiktok.svg",
	github: "/logos/sources/github.svg",
	"github.com": "/logos/sources/github.svg",
};

/**
 * Extracts the logo for a "source / medium" label like "google / organic".
 * Returns the public URL of an SVG, or null when the source has no logo.
 */
export function getSourceLogo(label) {
	const source = (label || "").split("/")[0].trim().toLowerCase();
	if (!source || source === "(direct)" || source === "(none)") return null;
	return SOURCE_LOGOS[source] || null;
}
