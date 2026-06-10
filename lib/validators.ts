import { z } from "zod";
import type {
  AnalyzeData,
  RespondItem,
  PricingData,
  PlaybookData,
} from "./types";

export const AnalyzeDataSchema = z.object({
  powerScore: z.number().min(0).max(10),
  urgencySignals: z.array(z.string()),
  weaknessIndicators: z.array(z.string()),
  leveragePoints: z.array(z.string()),
  tactics: z.array(z.string()),
  riskLevel: z.union([z.literal("Low"), z.literal("Medium"), z.literal("High")]),
  summary: z.string(),
  verdict: z.string(),
});

export const RespondItemSchema = z.object({
  label: z.string(),
  tone: z.string(),
  strategy: z.string(),
  message: z.string(),
});

export const PricingDataSchema = z.object({
  anchorBias: z.string(),
  trueMarketRange: z.string(),
  recommendedAsk: z.string(),
  concessionStrategy: z.string(),
  valueFraming: z.string(),
  redLines: z.array(z.string()),
  bundleOpportunities: z.array(z.string()),
  bottomLine: z.string(),
});

export const PlaybookDataSchema = z.object({
  situationType: z.string(),
  theirGoal: z.string(),
  yourGoal: z.string(),
  openingMove: z.string(),
  ifTheyPushBack: z.string(),
  ifTheyGhost: z.string(),
  closingTrigger: z.string(),
  neverDo: z.array(z.string()),
  powerPhrases: z.array(z.string()),
  winCondition: z.string(),
});

export const AnalysisResultSchemas = {
  Analyze: AnalyzeDataSchema,
  Respond: z.array(RespondItemSchema),
  Pricing: PricingDataSchema,
  Playbook: PlaybookDataSchema,
} as const;

export type ParseResult<T extends z.ZodTypeAny> = z.infer<T>;

export function validateModeResult<T extends keyof typeof AnalysisResultSchemas>(
  mode: T,
  data: unknown,
): { success: true; data: ParseResult<typeof AnalysisResultSchemas[T]> } | { success: false; error: string } {
  const schema = AnalysisResultSchemas[mode];
  const parsed = schema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.message };
  return { success: true, data: parsed.data as ParseResult<typeof schema> };
}

export type AnalyzeDataValidated = z.infer<typeof AnalyzeDataSchema>;
export type RespondItemValidated = z.infer<typeof RespondItemSchema>[];
export type PricingDataValidated = z.infer<typeof PricingDataSchema>;
export type PlaybookDataValidated = z.infer<typeof PlaybookDataSchema>;
