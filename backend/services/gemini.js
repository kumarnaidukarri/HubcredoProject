const { GoogleGenerativeAI } = require("@google/generative-ai");
const {
  ANALYSIS_PROMPT_TEMPLATE,
  SOCIAL_POST_PROMPT_TEMPLATE,
} = require("../utils/prompts");

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    });
  }

  async analyzeCompany(scrapedData) {
    try {
      console.log("🤖 Analyzing company with Gemini AI...");

      const prompt = ANALYSIS_PROMPT_TEMPLATE(
        scrapedData.url,
        scrapedData.title,
        scrapedData.description,
        scrapedData.content
      );

      const result = await this.model.generateContent(prompt);
      const response = result.response.text();

      // Clean and extract JSON
      const cleanResponse = response.replace(/```json\n?|\n?```/g, "").trim();
      const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        try {
          const analysis = JSON.parse(jsonMatch[0]);
          return {
            success: true,
            data: analysis,
          };
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError);
        }
      }

      throw new Error("Failed to parse AI response");
    } catch (error) {
      console.error("Gemini AI Error:", error.message);
      return {
        success: false,
        error: error.message,
        data: {
          companyName: scrapedData.title || "Unknown",
          industry: "Unknown",
          companySize: "Unknown",
          location: "Unknown",
          services: [],
          painPoints: [],
          targetAudience: "Unknown",
          valueProposition: "Unknown",
          techStack: [],
          keyFeatures: [],
          summary: "", // Empty summary on failure to avoid ugly UI
        },
      };
    }
  }

  async generateColdEmail(companyData, leadData) {
    try {
      console.log("📝 Generating social posts (LinkedIn & Twitter)...");
      console.log("📊 Company Data:", {
        name: companyData.companyName,
        industry: companyData.industry,
        services: companyData.services?.length || 0,
        painPoints: companyData.painPoints?.length || 0,
      });

      const prompt = SOCIAL_POST_PROMPT_TEMPLATE(
        companyData,
        leadData?.tone || "professional"
      );

      console.log("📤 Sending prompt to Gemini (length:", prompt.length, "chars)");

      const result = await this.model.generateContent(prompt);
      const response = result.response.text();

      console.log("📥 Received response from Gemini (length:", response.length, "chars)");
      console.log("📄 Response preview:", response.substring(0, 200) + "...");

      // Clean and extract JSON
      const cleanResponse = response.replace(/```json\n?|\n?```/g, "").trim();
      const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        try {
          const posts = JSON.parse(jsonMatch[0]);
          console.log("✅ Successfully parsed LinkedIn post (length:", posts.linkedin?.length || 0, "chars)");
          console.log("✅ Successfully parsed Twitter post (length:", posts.twitter?.length || 0, "chars)");
          return {
            success: true,
            data: posts,
          };
        } catch (parseError) {
          console.error("❌ Social Post JSON Parse Error:", parseError);
          console.error("Failed to parse:", jsonMatch[0].substring(0, 500));
        }
      }

      throw new Error("Failed to parse social post response");
    } catch (error) {
      console.error("❌ Social Post Generation Error:", error.message);
      return {
        success: false,
        data: {
          linkedin: `Insights about ${companyData.companyName}: ${companyData.summary}`,
          twitter: `About ${companyData.companyName}: ${companyData.summary}`,
        },
      };
    }
  }

  calculateLeadScore(companyData, contacts) {
    // Simple lead scoring algorithm
    let score = 5; // Base score

    // Company size scoring
    if (
      companyData.companySize.includes("50-200") ||
      companyData.companySize.includes("200+")
    ) {
      score += 2;
    } else if (companyData.companySize.includes("10-50")) {
      score += 1;
    }

    // Contact information scoring
    if (contacts.emails && contacts.emails.length > 0) score += 1;
    if (contacts.phones && contacts.phones.length > 0) score += 0.5;
    if (contacts.socialLinks && contacts.socialLinks.length > 0) score += 0.5;

    // Services/features scoring
    if (companyData.services && companyData.services.length >= 3) score += 1;
    if (companyData.keyFeatures && companyData.keyFeatures.length >= 3)
      score += 0.5;

    // Tech stack scoring (shows they're tech-savvy)
    if (companyData.techStack && companyData.techStack.length >= 2)
      score += 0.5;

    // Cap at 10
    return Math.min(Math.round(score * 10) / 10, 10);
  }
}

module.exports = new GeminiService();
