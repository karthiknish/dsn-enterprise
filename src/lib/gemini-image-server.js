/**
 * Gemini featured-image generation (server-only).
 *
 * Uses the Nano Banana 2 family via the Gemini API:
 *   - gemini-3.1-flash-image  (Nano Banana 2 Lite — default, fast, 512/1K/2K/4K)
 *   - gemini-3-pro-image      (Nano Banana 2 — fallback for asset-grade output)
 *
 * Two-pass pipeline:
 *   1. Art direction pass (text model) turns the blog content into a concrete,
 *      specific photographic brief. This is the single biggest lever against
 *      "AI slop": generic prompts produce generic images.
 *   2. Image pass renders that brief at blog-hero dimensions (16:9, 2K).
 *
 * If the art-direction pass fails we fall back to a locally built brief so the
 * feature still works with one API call.
 */

const API_BASE = "https://generativelanguage.googleapis.com/v1beta";

const IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image";
const IMAGE_MODEL_FALLBACK =
	process.env.GEMINI_IMAGE_MODEL_FALLBACK || "gemini-3-pro-image";
const TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || "gemini-3.6-flash";

export const IMAGE_STYLES = {
	editorial: {
		label: "Editorial photo",
		direction:
			"Documentary editorial photograph, as shot for a trade magazine feature. Real location, real equipment, available light shaped with a single large softbox or window light. Shallow-to-moderate depth of field, 35mm or 50mm prime look.",
	},
	macro: {
		label: "Macro detail",
		direction:
			"Tight macro product photograph on a real surface. 100mm macro lens, f/8, focus stacking sharpness on the primary edge, gentle falloff into a dark neutral background. Visible machining marks, brushed metal grain, faint handling patina.",
	},
	workshop: {
		label: "Workshop scene",
		direction:
			"Wide environmental shot inside a working metrology lab or machine shop. Human hands or a partial operator figure at work, out-of-focus machinery behind. Mixed daylight and overhead fluorescent, honest colour, mild grain.",
	},
	technical: {
		label: "Technical illustration",
		direction:
			"Precise technical illustration in the style of a printed engineering manual: clean line work, restrained 2-3 colour palette on an off-white ground, subtle halftone texture, orthographic or cutaway view. No photorealism, no gradients-on-everything.",
	},
	abstract: {
		label: "Abstract material study",
		direction:
			"Minimal abstract composition built from real materials and shadow — steel, anodised aluminium, ground glass, paper. Strong directional light, large areas of calm negative space, single restrained accent colour.",
	},
};

export const DEFAULT_STYLE = "editorial";

// Blog hero: 16:9 at 2K reads sharply on retina and downscales cleanly.
// Total wall-clock allowance for one generation, retries included. Sits under
// the route's 60s maxDuration.
const GENERATION_BUDGET_MS = Number(
	process.env.GEMINI_IMAGE_BUDGET_MS || 45_000,
);

const DEFAULT_ASPECT_RATIO = "16:9";
const DEFAULT_IMAGE_SIZE = "2K";

const ALLOWED_ASPECT_RATIOS = new Set([
	"1:1",
	"2:3",
	"3:2",
	"3:4",
	"4:3",
	"4:5",
	"5:4",
	"9:16",
	"16:9",
	"21:9",
]);

const ALLOWED_IMAGE_SIZES = new Set(["512", "1K", "2K", "4K"]);

/**
 * Rules that kill the usual generative-AI tells. Applied to every prompt.
 */
const ANTI_SLOP_RULES = [
	"Photographic realism with real-world physics: correct optics, correct reflections, correct shadow direction from one dominant light source.",
	"Absolutely no text, lettering, numerals, captions, watermarks, logos, UI chrome, or brand marks anywhere in the frame.",
	"No holograms, no glowing blue neon, no floating translucent dashboards, no circuit-board motifs, no digital-particle swirls, no 'futuristic AI' iconography.",
	"No lens flare, no bloom, no HDR halos, no heavy vignette, no over-sharpened micro-contrast, no plastic over-smoothed surfaces.",
	"No perfect symmetry and no dead-centre subject: compose off-centre with intentional negative space in the upper-left third so a headline can be overlaid.",
	"Restrained, believable colour grading — muted industrial neutrals with at most one accent colour. Avoid teal-and-orange, avoid oversaturated gradients.",
	"Include honest material imperfection: fine scratches, dust, tool marks, uneven wear, slightly imperfect alignment.",
	"If people appear, show hands or partial figures at work rather than posed faces looking at camera; real workwear, no stock-photo smiling.",
	"Single clear subject. Do not collage multiple concepts into one frame.",
];

function stripHtml(html = "") {
	return html
		.replace(/<style[\s\S]*?<\/style>/gi, " ")
		.replace(/<script[\s\S]*?<\/script>/gi, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/\s+/g, " ")
		.trim();
}

function resolveStyle(style) {
	return IMAGE_STYLES[style] ? style : DEFAULT_STYLE;
}

function summariseContent(content = "", limit = 2500) {
	const text = stripHtml(content);
	return text.length > limit ? `${text.slice(0, limit)}…` : text;
}

function getApiKey() {
	const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
	if (!key) throw new Error("GEMINI_API_KEY is not configured");
	return key;
}

// Transient conditions worth waiting out. 429 is the per-minute regional
// quota, which clears on its own; 5xx are Google-side blips.
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);
const MAX_RETRIES = 3;
const BASE_BACKOFF_MS = 2000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Pull the useful parts out of a Google API error body: the human message,
 * the machine reason (RATE_LIMIT_EXCEEDED etc), and the server's own advice on
 * how long to wait.
 */
function parseGeminiError(bodyText) {
	const result = {
		message: bodyText.slice(0, 300),
		reason: null,
		retryAfterMs: null,
	};
	try {
		const parsed = JSON.parse(bodyText);
		result.message = parsed?.error?.message || result.message;
		for (const detail of parsed?.error?.details || []) {
			const type = detail["@type"] || "";
			if (type.includes("ErrorInfo") && detail.reason) {
				result.reason = detail.reason;
			}
			if (type.includes("RetryInfo") && detail.retryDelay) {
				const seconds = Number.parseFloat(String(detail.retryDelay));
				if (Number.isFinite(seconds)) {
					result.retryAfterMs = Math.ceil(seconds * 1000);
				}
			}
		}
	} catch {
		// Non-JSON body; the raw text is the best message available.
	}
	return result;
}

/**
 * @param {string} model
 * @param {object} body
 * @param {{deadlineAt?: number}} [options] Wall-clock limit for retries, so a
 *   backoff never runs past the serverless request budget.
 */
async function geminiFetch(
	model,
	body,
	{ deadlineAt = Number.POSITIVE_INFINITY } = {},
) {
	for (let attempt = 0; ; attempt += 1) {
		const response = await fetch(
			`${API_BASE}/models/${model}:generateContent`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-goog-api-key": getApiKey(),
				},
				body: JSON.stringify(body),
				cache: "no-store",
			},
		);

		if (response.ok) return response.json();

		const detail = await response.text().catch(() => "");
		const { message, reason, retryAfterMs } = parseGeminiError(detail);

		const error = new Error(`Gemini ${model} (${response.status}): ${message}`);
		error.status = response.status;
		error.reason = reason;
		error.model = model;
		error.rateLimited = response.status === 429;

		const canRetry =
			RETRYABLE_STATUSES.has(response.status) && attempt < MAX_RETRIES;
		if (!canRetry) throw error;

		// Respect the server's RetryInfo when it gives one, else back off.
		const waitMs = retryAfterMs ?? BASE_BACKOFF_MS * 2 ** attempt;
		if (Date.now() + waitMs > deadlineAt) {
			error.deadlineExceeded = true;
			throw error;
		}

		console.warn(
			`${model}: ${response.status} ${reason || ""} — retrying in ${waitMs}ms (attempt ${attempt + 1}/${MAX_RETRIES})`,
		);
		await sleep(waitMs);
	}
}

/**
 * A different model is only worth trying when this one is unavailable to us.
 * Rate limits are counted per project, so retrying a 429 on the pricier Pro
 * model just burns the same quota and costs more.
 */
function shouldTryFallbackModel(error) {
	if (!error) return true;
	if (error.rateLimited) return false;
	if (error.status === 401 || error.status === 403) return false;
	return true;
}

/**
 * Locally built brief. Used when the art-direction pass is unavailable.
 */
export function buildFallbackBrief({ title, excerpt, content }) {
	const summary = summariseContent(content, 600);
	return [
		`Subject: a real, physical scene that literally represents "${title}".`,
		excerpt ? `Context: ${stripHtml(excerpt)}` : null,
		summary ? `Article covers: ${summary}` : null,
		"Show the actual tools, parts, materials or workplace the article is about — not a metaphor, not an abstract concept.",
	]
		.filter(Boolean)
		.join("\n");
}

/**
 * Pass 1 — turn blog content into a concrete photographic brief.
 */
export async function generateArtDirection({
	title,
	excerpt,
	content,
	style,
	instructions,
	deadlineAt,
}) {
	const styleKey = resolveStyle(style);
	const styleDirection = IMAGE_STYLES[styleKey].direction;

	const prompt = `You are an art director commissioning the hero image for a B2B industrial blog post about precision gauges and metrology.

BLOG TITLE: ${title}
BLOG EXCERPT: ${stripHtml(excerpt || "")}
BLOG BODY (truncated): ${summariseContent(content, 2500)}

TARGET LOOK: ${styleDirection}
${instructions ? `EDITOR NOTES (must be respected): ${instructions}` : ""}

Write a single-paragraph image brief (90-140 words) describing ONE specific, literal, physically real scene that illustrates this article. Requirements:
- Name the actual objects, materials, and setting. Be concrete ("a hardened steel plug gauge resting on a granite surface plate beside a dial indicator"), never conceptual ("innovation", "technology", "the future").
- Specify camera position, focal length, aperture, and the direction and quality of the light.
- Specify the palette in plain material terms.
- Describe where the empty space sits in the frame.
- Do not mention text, signage, logos, or screens.
Return only the paragraph, no preamble, no quotes, no markdown.`;

	const data = await geminiFetch(
		TEXT_MODEL,
		{
			contents: [{ parts: [{ text: prompt }] }],
			generationConfig: { temperature: 0.9, maxOutputTokens: 600 },
		},
		{ deadlineAt },
	);

	const brief = (data?.candidates?.[0]?.content?.parts || [])
		.map((part) => part.text || "")
		.join(" ")
		.trim();

	if (!brief) throw new Error("Empty art direction response");
	return brief;
}

/**
 * Assemble the final image prompt from a brief + style + anti-slop rules.
 */
export function composeImagePrompt({ brief, style, instructions }) {
	const styleKey = resolveStyle(style);
	return [
		brief,
		"",
		`Rendering style: ${IMAGE_STYLES[styleKey].direction}`,
		instructions ? `Additional direction: ${instructions}` : null,
		"",
		"Hard constraints:",
		...ANTI_SLOP_RULES.map((rule) => `- ${rule}`),
		"",
		"Output: a finished, print-quality editorial hero image with a wide 16:9 crop, natural grain, and no post-processing gimmicks.",
	]
		.filter((line) => line !== null)
		.join("\n");
}

function extractInlineImage(data) {
	const parts = data?.candidates?.[0]?.content?.parts || [];
	for (const part of parts) {
		const inline = part.inlineData || part.inline_data;
		if (inline?.data) {
			return {
				base64: inline.data,
				mimeType: inline.mimeType || inline.mime_type || "image/png",
			};
		}
	}
	return null;
}

function imageBody(prompt, imageConfig) {
	return {
		contents: [{ parts: [{ text: prompt }] }],
		generationConfig: {
			responseModalities: ["IMAGE"],
			imageConfig,
		},
	};
}

/**
 * `imageSize` is only accepted on API surfaces/projects with high-resolution
 * output enabled; elsewhere the request is rejected outright. Try the
 * high-res request first, then degrade to aspect-ratio-only so the feature
 * keeps working (and upgrades itself automatically once 2K/4K is available).
 */
async function requestImage({
	model,
	prompt,
	aspectRatio,
	imageSize,
	deadlineAt,
}) {
	if (imageSize) {
		try {
			return extractInlineImage(
				await geminiFetch(
					model,
					imageBody(prompt, { aspectRatio, imageSize }),
					{
						deadlineAt,
					},
				),
			);
		} catch (error) {
			// A rate limit says nothing about imageSize; do not burn another call.
			if (error.rateLimited || error.deadlineExceeded) throw error;
			console.warn(
				`${model}: imageSize=${imageSize} rejected (${error.message}), retrying at default resolution`,
			);
		}
	}

	return extractInlineImage(
		await geminiFetch(model, imageBody(prompt, { aspectRatio }), {
			deadlineAt,
		}),
	);
}

/**
 * Full pipeline: content -> brief -> image.
 *
 * @returns {Promise<{dataUrl:string, mimeType:string, prompt:string, brief:string, model:string, artDirected:boolean}>}
 */
export async function generateFeaturedImage({
	title,
	excerpt = "",
	content = "",
	style = DEFAULT_STYLE,
	instructions = "",
	aspectRatio = DEFAULT_ASPECT_RATIO,
	imageSize = DEFAULT_IMAGE_SIZE,
}) {
	if (!title) throw new Error("Title is required");

	// Leave headroom under the 60s function limit so a retry backoff cannot
	// run past it; better to fail with a clear message than be killed.
	const deadlineAt = Date.now() + GENERATION_BUDGET_MS;

	const ratio = ALLOWED_ASPECT_RATIOS.has(aspectRatio)
		? aspectRatio
		: DEFAULT_ASPECT_RATIO;
	const size = ALLOWED_IMAGE_SIZES.has(imageSize)
		? imageSize
		: DEFAULT_IMAGE_SIZE;

	let brief;
	let artDirected = true;
	try {
		brief = await generateArtDirection({
			title,
			excerpt,
			content,
			style,
			instructions,
			deadlineAt,
		});
	} catch (error) {
		// The image call shares this quota, so a rate limit here means the whole
		// attempt is doomed. Surface it instead of spending the call to confirm.
		if (error.rateLimited) throw error;
		console.warn("Art direction pass failed, using fallback brief:", error);
		brief = buildFallbackBrief({ title, excerpt, content });
		artDirected = false;
	}

	const prompt = composeImagePrompt({ brief, style, instructions });

	let image = null;
	let usedModel = IMAGE_MODEL;
	let primaryError = null;
	try {
		image = await requestImage({
			model: IMAGE_MODEL,
			prompt,
			aspectRatio: ratio,
			imageSize: size,
			deadlineAt,
		});
	} catch (error) {
		primaryError = error;
		console.warn(`${IMAGE_MODEL} failed:`, error.message);
	}

	const fallbackWorthTrying =
		!image &&
		IMAGE_MODEL_FALLBACK &&
		IMAGE_MODEL_FALLBACK !== IMAGE_MODEL &&
		shouldTryFallbackModel(primaryError) &&
		Date.now() < deadlineAt;

	if (fallbackWorthTrying) {
		try {
			image = await requestImage({
				model: IMAGE_MODEL_FALLBACK,
				prompt,
				aspectRatio: ratio,
				imageSize: size,
				deadlineAt,
			});
			usedModel = IMAGE_MODEL_FALLBACK;
		} catch (error) {
			// Report whichever failure the operator can actually act on.
			throw primaryError || error;
		}
	}

	if (!image) throw primaryError || new Error("Gemini returned no image data");

	return {
		dataUrl: `data:${image.mimeType};base64,${image.base64}`,
		mimeType: image.mimeType,
		prompt,
		brief,
		model: usedModel,
		aspectRatio: ratio,
		imageSize: size,
		artDirected,
	};
}
