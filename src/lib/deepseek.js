const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

async function callDeepSeek(prompt) {
	const response = await fetch(DEEPSEEK_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY || ""}`,
		},
		body: JSON.stringify({
			model: "deepseek-chat",
			messages: [{ role: "user", content: prompt }],
			temperature: 0.7,
		}),
	});

	if (!response.ok) {
		const errorBody = await response.text().catch(() => "");
		throw new Error(
			`DeepSeek API error (${response.status}): ${errorBody || response.statusText}`,
		);
	}

	const data = await response.json();
	const text = data?.choices?.[0]?.message?.content;
	if (!text) {
		throw new Error("DeepSeek API returned an empty response");
	}
	return text;
}

export async function generateBlogContent(topic, keywords = []) {
	const prompt = `You are an expert technical content writer specializing in precision engineering, industrial gauges, and metrology. Write a comprehensive, SEO-optimized blog post about "${topic}" for DSN Enterprises, a leading manufacturer of precision gauges in India.

${keywords.length > 0 ? `Target Keywords to include naturally: ${keywords.join(", ")}` : ""}

Requirements:
1. Write in a professional yet accessible tone
2. Include relevant technical information that demonstrates expertise
3. Structure with clear H2 and H3 headings (use ## and ### markdown)
4. Include an engaging introduction that hooks the reader
5. Add practical insights and industry applications
6. Include a conclusion with a call-to-action mentioning DSN Enterprises
7. Optimize for SEO with natural keyword placement
8. Length: 1000-1500 words
9. Include bullet points and numbered lists where appropriate
10. Add 2-3 internal links using proper HTML anchor tags with these available pages:
    - Products: <a href="/products">our precision gauges</a>
    - Services: <a href="/services">our services</a>
    - About: <a href="/about">about DSN Enterprises</a>
    - Contact: <a href="/contact">contact us</a>
    Use natural anchor text that fits the context. DO NOT use placeholder formats like [INTERNAL LINK: ...].

Write the blog post content now:`;

	try {
		const text = await callDeepSeek(prompt);
		return { success: true, content: text };
	} catch (error) {
		console.error("DeepSeek API Error:", error);
		return { success: false, error: error.message };
	}
}

export async function generateBlogMetadata(title, content) {
	const prompt = `Based on this blog title and content, generate SEO metadata.

Title: ${title}

Content excerpt: ${content.substring(0, 1500)}...

Generate a JSON response with:
1. metaTitle: SEO-optimized title (50-60 characters)
2. metaDescription: Compelling meta description (150-160 characters)
3. keywords: Array of 8-10 relevant SEO keywords
4. excerpt: A 2-3 sentence summary for blog listings (under 200 characters)
5. suggestedSlug: URL-friendly slug

Respond ONLY with valid JSON, no markdown or explanation:`;

	try {
		const text = await callDeepSeek(prompt);
		const jsonMatch = text.match(/\{[\s\S]*\}/);
		if (jsonMatch) {
			return { success: true, metadata: JSON.parse(jsonMatch[0]) };
		}
		throw new Error("Invalid JSON response");
	} catch (error) {
		console.error("DeepSeek Metadata Error:", error);
		return { success: false, error: error.message };
	}
}

export async function generateBlogIdeas(category = "precision gauges") {
	const prompt = `Generate 10 SEO-optimized blog post ideas for DSN Enterprises, a precision gauge manufacturer in India.

Category focus: ${category}

For each idea, provide:
1. title: Engaging, SEO-friendly blog title
2. keywords: 3-4 target keywords
3. targetAudience: Who this article is for
4. estimatedSearchVolume: low/medium/high

Topics should cover:
- Technical guides and how-tos
- Industry trends and news
- Product comparisons and buying guides
- Best practices and tips
- Case studies and applications

Respond ONLY with a valid JSON array:`;

	try {
		const text = await callDeepSeek(prompt);
		const jsonMatch = text.match(/\[[\s\S]*\]/);
		if (jsonMatch) {
			return { success: true, ideas: JSON.parse(jsonMatch[0]) };
		}
		throw new Error("Invalid JSON response");
	} catch (error) {
		console.error("DeepSeek Ideas Error:", error);
		return { success: false, error: error.message };
	}
}

export async function improveContent(content, instruction) {
	const prompt = `Improve the following content based on this instruction: "${instruction}"

Original content:
${content}

Provide the improved content only, maintaining the same format and structure:`;

	try {
		const text = await callDeepSeek(prompt);
		return { success: true, content: text };
	} catch (error) {
		console.error("DeepSeek Improve Error:", error);
		return { success: false, error: error.message };
	}
}

export async function generateTitle(topic) {
	const prompt = `Generate 5 SEO-optimized blog post titles for a precision gauge manufacturing company (DSN Enterprises) about this topic: "${topic}"

Requirements:
- Each title should be engaging and click-worthy
- Include relevant keywords naturally
- Keep titles under 60 characters when possible
- Mix of how-to, listicle, and informational styles

Respond ONLY with a valid JSON array of strings, no explanation:`;

	try {
		const text = await callDeepSeek(prompt);
		const jsonMatch = text.match(/\[[\s\S]*\]/);
		if (jsonMatch) {
			return { success: true, titles: JSON.parse(jsonMatch[0]) };
		}
		throw new Error("Invalid JSON response");
	} catch (error) {
		console.error("DeepSeek Title Error:", error);
		return { success: false, error: error.message };
	}
}

export async function generateExcerpt(title, content) {
	const prompt = `Generate a compelling blog excerpt/summary for SEO and social sharing.

Title: ${title}
${content ? `Content preview: ${content.substring(0, 500)}...` : ""}

Requirements:
- 150-200 characters maximum
- Engaging and informative
- Include a hook to encourage reading
- SEO-friendly

Respond with ONLY the excerpt text, no quotes or explanation:`;

	try {
		const text = await callDeepSeek(prompt);
		return {
			success: true,
			excerpt: text.trim().replace(/^"|"$/g, ""),
		};
	} catch (error) {
		console.error("DeepSeek Excerpt Error:", error);
		return { success: false, error: error.message };
	}
}
