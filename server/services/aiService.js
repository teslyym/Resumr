const Anthropic = require("@anthropic-ai/sdk");

let client = null;
function getClient() {
  if (!client) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not set in environment");
    }
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

const MODEL = "claude-haiku-4-5-20251001";

function cvToContext(cv) {
  const lines = [];
  if (cv.targetJobTitle) lines.push(`Target role: ${cv.targetJobTitle}`);
  if (cv.summary) lines.push(`Current summary: ${cv.summary}`);
  if (cv.skills?.length) lines.push(`Skills: ${cv.skills.join(", ")}`);
  if (cv.experience?.length) {
    lines.push("\nExperience:");
    cv.experience.forEach((e, i) => {
      lines.push(
        `${i + 1}. ${e.jobTitle || "Role"} at ${e.company || "Company"} (${e.startDate || ""} – ${e.endDate || ""})`,
      );
      e.responsibilities?.forEach((r) => {
        if (r.trim()) lines.push(`   - ${r}`);
      });
    });
  }
  return lines.join("\n");
}

async function enhanceCV(cv) {
  const context = cvToContext(cv);

  const systemPrompt = `You are an expert CV writer. You rewrite summaries and bullet points to be sharper, more concrete, and tailored to a target role. Rules:
- Use strong action verbs (Built, Led, Reduced, Designed, Shipped).
- Quantify impact when possible (percentages, scale, time saved).
- Keep each bullet to one line, ideally under 22 words.
- Match terminology to the target role.
- Preserve the user's actual achievements — never invent facts, numbers, or technologies.
- Output ONLY a JSON object, no prose, no markdown fences.`;

  const userPrompt = `Here is a CV:

${context}

Rewrite the summary and each bullet point under each role.

Respond with this exact JSON shape (no other text):
{
  "enhancedSummary": "string (or null if no original summary)",
  "enhancedExperience": [
    { "index": 0, "enhancedResponsibilities": ["...", "..."] },
    { "index": 1, "enhancedResponsibilities": ["..."] }
  ]
}

The "index" matches the position of each role in the original list. Only include roles that had at least one non-empty bullet.`;

  const message = await getClient().messages.create({
    model: MODEL,
    max_tokens: 2000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  // Extract the text content from the response
  const text = message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");

  const cleaned = text.replace(/```json\s*|\s*```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("AI returned non-JSON output:", text);
    throw new Error("AI returned an invalid response. Please try again.");
  }

  return {
    enhancedSummary: parsed.enhancedSummary ?? null,
    enhancedExperience: Array.isArray(parsed.enhancedExperience)
      ? parsed.enhancedExperience
      : [],
  };
}

module.exports = { enhanceCV };
