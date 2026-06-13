import { GoogleGenAI } from "@google/genai";
import { prompts } from "@/lib/prompts";
import type { Mode } from "@/lib/types";
import { validateModeResult } from "@/lib/validators";

const modes: Mode[] = ["Analyze", "Respond", "Pricing", "Playbook"];
const geminiModel = "gemini-2.5-flash-lite";
const geminiFallbackModel = "gemini-2.5-flash";
const systemPrompt =
  "You are an elite negotiation strategist. Always respond with valid JSON only. No markdown, no explanation, no preamble.";

const responseSchemas = {
  Analyze: {
    type: "object",
    properties: {
      powerScore: { type: "number", minimum: 0, maximum: 10 },
      urgencySignals: { type: "array", items: { type: "string" } },
      weaknessIndicators: { type: "array", items: { type: "string" } },
      leveragePoints: { type: "array", items: { type: "string" } },
      tactics: { type: "array", items: { type: "string" } },
      riskLevel: { type: "string", enum: ["Low", "Medium", "High"] },
      summary: { type: "string" },
      verdict: { type: "string" },
    },
    required: [
      "powerScore",
      "urgencySignals",
      "weaknessIndicators",
      "leveragePoints",
      "tactics",
      "riskLevel",
      "summary",
      "verdict",
    ],
    additionalProperties: false,
  },
  Respond: {
    type: "object",
    properties: {
      responses: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: {
          type: "object",
          properties: {
            label: { type: "string" },
            tone: { type: "string" },
            strategy: { type: "string" },
            message: { type: "string" },
          },
          required: ["label", "tone", "strategy", "message"],
          additionalProperties: false,
        },
      },
    },
    required: ["responses"],
    additionalProperties: false,
  },
  Pricing: {
    type: "object",
    properties: {
      anchorBias: { type: "string" },
      trueMarketRange: { type: "string" },
      recommendedAsk: { type: "string" },
      concessionStrategy: { type: "string" },
      valueFraming: { type: "string" },
      redLines: { type: "array", items: { type: "string" } },
      bundleOpportunities: { type: "array", items: { type: "string" } },
      bottomLine: { type: "string" },
    },
    required: [
      "anchorBias",
      "trueMarketRange",
      "recommendedAsk",
      "concessionStrategy",
      "valueFraming",
      "redLines",
      "bundleOpportunities",
      "bottomLine",
    ],
    additionalProperties: false,
  },
  Playbook: {
    type: "object",
    properties: {
      situationType: { type: "string" },
      theirGoal: { type: "string" },
      yourGoal: { type: "string" },
      openingMove: { type: "string" },
      ifTheyPushBack: { type: "string" },
      ifTheyGhost: { type: "string" },
      closingTrigger: { type: "string" },
      neverDo: { type: "array", items: { type: "string" } },
      powerPhrases: { type: "array", minItems: 3, maxItems: 3, items: { type: "string" } },
      winCondition: { type: "string" },
    },
    required: [
      "situationType",
      "theirGoal",
      "yourGoal",
      "openingMove",
      "ifTheyPushBack",
      "ifTheyGhost",
      "closingTrigger",
      "neverDo",
      "powerPhrases",
      "winCondition",
    ],
    additionalProperties: false,
  },
} as const;

function extractText(response: { text?: string }) {
  const text = response.text?.trim();
  if (!text) throw new Error("Gemini returned an empty response.");
  return text;
}

function parseJsonResponse(content: string) {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("Gemini returned an empty response.");

  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fencedMatch) return JSON.parse(fencedMatch[1].trim()) as unknown;

    const objectStart = trimmed.indexOf("{");
    const objectEnd = trimmed.lastIndexOf("}");
    if (objectStart !== -1 && objectEnd !== -1 && objectEnd > objectStart) {
      return JSON.parse(trimmed.slice(objectStart, objectEnd + 1)) as unknown;
    }

    const arrayStart = trimmed.indexOf("[");
    const arrayEnd = trimmed.lastIndexOf("]");
    if (arrayStart !== -1 && arrayEnd !== -1 && arrayEnd > arrayStart) {
      return JSON.parse(trimmed.slice(arrayStart, arrayEnd + 1)) as unknown;
    }

    throw new Error("Gemini returned invalid JSON.");
  }
}

async function repairJsonResponse(ai: GoogleGenAI, mode: Mode, content: string) {
  const repairPrompt = [
    "Convert the following text into valid JSON only.",
    "Return a JSON value that matches the required schema exactly.",
    "Do not add markdown, commentary, or code fences.",
    "",
    content,
  ].join("\n");

  const repaired = await ai.models.generateContent({
    model: geminiModel,
    contents: repairPrompt,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseJsonSchema: responseSchemas[mode],
      temperature: 0,
      maxOutputTokens: 512,
    },
  });

  return parseJsonResponse(extractText(repaired));
}

function shouldFallbackToLite(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("503") || message.includes("429") || message.includes("UNAVAILABLE");
}

async function generateModeContent(ai: GoogleGenAI, mode: Mode, input: string) {
  const config = {
    systemInstruction: systemPrompt,
    responseMimeType: "application/json",
    responseJsonSchema: responseSchemas[mode],
    temperature: 0.2,
    maxOutputTokens: 512,
  } as const;

  try {
    return await ai.models.generateContent({
      model: geminiModel,
      contents: prompts[mode](input),
      config,
    });
  } catch (error) {
    if (!shouldFallbackToLite(error)) throw error;
    return ai.models.generateContent({
      model: geminiFallbackModel,
      contents: prompts[mode](input),
      config,
    });
  }
}

export async function POST(request: Request) {
  let body: { mode?: Mode; input?: string };

  try {
    body = (await request.json()) as { mode?: Mode; input?: string };
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { mode, input } = body;

  if (!mode || !modes.includes(mode) || !input?.trim()) {
    return Response.json(
      { error: "Missing or invalid fields. Expected { mode, input }." },
      { status: 400 },
    );
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ error: "GEMINI_API_KEY is not configured." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const completion = await generateModeContent(ai, mode, input);
    const content = extractText(completion);

    let result: unknown;
    try {
      result = parseJsonResponse(content);
    } catch {
      try {
        result = await repairJsonResponse(ai, mode, content);
      } catch {
        return Response.json({ error: "Gemini returned invalid JSON." }, { status: 500 });
      }
    }

    // Keep result as-is — validator expects { responses: [...] } for Respond mode
    const validated = validateModeResult(mode, result);
    if (!validated.success) {
      return Response.json(
        { error: `Invalid response shape: ${validated.error}`, raw: result },
        { status: 500 },
      );
    }

    return Response.json(validated.data);
  } catch (err) {
    console.error("/api/analyze error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return Response.json(
      { error: process.env.NODE_ENV === "production" ? "Analysis failed." : `Gemini error: ${message}` },
      { status: 500 },
    );
  }
}