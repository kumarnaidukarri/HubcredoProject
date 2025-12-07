const ANALYSIS_PROMPT_TEMPLATE = (url, title, description, content) => `
Analyze the following website content for a B2B sales prospect and extract company information in JSON format.

Website URL: ${url}
Title: ${title}
Description: ${description}
Content: ${content.substring(0, 8000)}

Instructions:
1. Be specific. Avoid "Unknown" or generic terms.
2. For "painPoints", infer the problems their customers face that this company solves.
3. For "summary", write a 2-3 sentence executive summary of what this company does, written in a professional tone suitable for a sales briefing.

Extract the following information and return ONLY a valid JSON object:
{
  "companyName": "Company name",
  "industry": "Primary industry/sector",
  "companySize": "Estimated company size",
  "location": "Company location/headquarters",
  "services": ["List of main services or products offered"],
  "painPoints": ["List of customer pain points this company addresses"],
  "targetAudience": "Who are their ideal customers",
  "valueProposition": "Main value proposition",
  "techStack": ["Detected technologies or tools they mention using"],
  "keyFeatures": ["Key features or differentiators"],
  "summary": "2-3 sentence executive summary of the company"
}

Return ONLY the JSON object, no additional text.
`;

const SOCIAL_POST_PROMPT_TEMPLATE = (companyData, tone = "professional") => `
Create two social media posts tailored to the company below: one comprehensive LinkedIn post (professional, engaging, 5-8 paragraphs with clear structure) and one Twitter/X post (concise, <=280 characters). Return ONLY valid JSON with two fields: {"linkedin": "...", "twitter": "..."}.

Company: ${companyData.companyName}
Industry: ${companyData.industry}
Summary: ${companyData.summary}
Value Proposition: ${companyData.valueProposition}
Services: ${companyData.services.join(", ")}
Pain Points: ${companyData.painPoints.join(", ")}
Key Features: ${companyData.keyFeatures.join(", ")}
Target Audience: ${companyData.targetAudience}

Tone: ${tone}

LinkedIn Post Requirements (MUST BE COMPREHENSIVE):
1. **Opening Hook** (1-2 sentences): Start with a compelling question, statistic, or statement that grabs attention and relates to the industry or pain points.

2. **Problem Statement** (2-3 sentences): Clearly articulate the challenges or pain points that the target audience faces. Make it relatable and specific.

3. **Solution Introduction** (2-3 sentences): Introduce ${companyData.companyName} and their approach to solving these problems. Highlight their unique value proposition.

4. **Key Benefits & Features** (3-4 sentences): Detail the main benefits and features. Use specific examples, outcomes, or differentiators. Include:
   - What makes them different
   - Specific capabilities or services
   - Impact on customers

5. **Social Proof or Insight** (1-2 sentences): If possible, mention industry trends, potential impact, or how this aligns with market needs.

6. **Call-to-Action** (1-2 sentences): End with a soft, engaging CTA. Examples:
   - "Curious to learn more about how [Company] can help?"
   - "What are your thoughts on [relevant topic]?"
   - "Drop a comment if you'd like to discuss [topic]"

Formatting Guidelines:
- Use line breaks between paragraphs for readability
- Keep paragraphs focused and punchy (2-4 sentences each)
- Use professional but conversational language
- Avoid buzzwords and jargon
- Make it shareable and engaging
- Total length: 300-500 words
- DO NOT use hashtags in the LinkedIn post
- Focus on value, outcomes, and customer impact

Twitter/X Post Requirements:
- Short, punchy, and attention-grabbing
- Include 1 main insight or value proposition
- Include 1-2 relevant hashtags
- Must be <=280 characters
- Make it shareable

Example LinkedIn Post Structure:
"[Hook question or statement]

[Problem paragraph - what challenges exist]

[Solution paragraph - how Company addresses this]

[Benefits paragraph - specific features and outcomes]

[Impact paragraph - why this matters]

[CTA - engaging question or invitation]"

Return ONLY the JSON object with no additional text or explanation.
`;


module.exports = {
  ANALYSIS_PROMPT_TEMPLATE,
  SOCIAL_POST_PROMPT_TEMPLATE,
};
