import type { Mode } from "./types";

export const prompts: Record<Mode, (input: string) => string> = {
  Analyze: (input) => `
Analyze this negotiation material and return ONLY JSON with:
{"powerScore":number,"urgencySignals":string[],"weaknessIndicators":string[],"leveragePoints":string[],"tactics":string[],"riskLevel":"Low"|"Medium"|"High","summary":string,"verdict":string}

Rules: powerScore 1-10; tactics must use "Name: short description"; summary 2 sentences max; verdict one blunt bottom line; no markdown, no extra keys.

Material:
${input}
`,

  Respond: (input) => `
Create 3 strategic replies for this negotiation material and return ONLY JSON with:
{"responses":[{"label":string,"tone":string,"strategy":string,"message":string}]}

Rules: exactly 3 items; labels should be action-oriented; tone should be short; strategy one sentence; message 3-4 sentences; no markdown, no extra keys.

Material:
${input}
`,

  Pricing: (input) => `
Evaluate pricing for this negotiation material and return ONLY JSON with:
{"anchorBias":string,"trueMarketRange":string,"recommendedAsk":string,"concessionStrategy":string,"valueFraming":string,"redLines":string[],"bundleOpportunities":string[],"bottomLine":string}

Rules: be concrete and commercial; redLines are hard boundaries; bundleOpportunities should increase value without discounting; no markdown, no extra keys.

Material:
${input}
`,

  Playbook: (input) => `
Build a negotiation playbook for this material and return ONLY JSON with:
{"situationType":string,"theirGoal":string,"yourGoal":string,"openingMove":string,"ifTheyPushBack":string,"ifTheyGhost":string,"closingTrigger":string,"neverDo":string[],"powerPhrases":string[],"winCondition":string}

Rules: powerPhrases must contain exactly 3 items; neverDo should list tactical mistakes; winCondition should be decision-grade; no markdown, no extra keys.

Material:
${input}
`,
};
