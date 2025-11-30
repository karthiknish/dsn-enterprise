import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateBlogContent(topic, keywords = []) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are an expert technical content writer specializing in precision engineering, industrial gauges, and metrology. Write a comprehensive, SEO-optimized blog post about "${topic}" for DSN Enterprises, a leading manufacturer of precision gauges in India.

${keywords.length > 0 ? `Target Keywords to include naturally: ${keywords.join(', ')}` : ''}

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
10. Add internal linking suggestions marked as [INTERNAL LINK: page-name]

Write the blog post content now:`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return {
      success: true,
      content: response.text(),
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function generateBlogMetadata(title, content) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

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
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up the response to extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return {
        success: true,
        metadata: JSON.parse(jsonMatch[0]),
      };
    }
    throw new Error('Invalid JSON response');
  } catch (error) {
    console.error('Gemini Metadata Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function generateBlogIdeas(category = 'precision gauges') {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

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
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return {
        success: true,
        ideas: JSON.parse(jsonMatch[0]),
      };
    }
    throw new Error('Invalid JSON response');
  } catch (error) {
    console.error('Gemini Ideas Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function improveContent(content, instruction) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `Improve the following content based on this instruction: "${instruction}"

Original content:
${content}

Provide the improved content only, maintaining the same format and structure:`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return {
      success: true,
      content: response.text(),
    };
  } catch (error) {
    console.error('Gemini Improve Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}
