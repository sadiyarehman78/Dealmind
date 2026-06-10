export type Mode = "Analyze" | "Respond" | "Pricing" | "Playbook";

export interface AnalyzeData {
  powerScore: number;
  urgencySignals: string[];
  weaknessIndicators: string[];
  leveragePoints: string[];
  tactics: string[];
  riskLevel: "Low" | "Medium" | "High";
  summary: string;
  verdict: string;
}

export interface RespondItem {
  label: string;
  tone: string;
  strategy: string;
  message: string;
}

export interface PricingData {
  anchorBias: string;
  trueMarketRange: string;
  recommendedAsk: string;
  concessionStrategy: string;
  valueFraming: string;
  redLines: string[];
  bundleOpportunities: string[];
  bottomLine: string;
}

export interface PlaybookData {
  situationType: string;
  theirGoal: string;
  yourGoal: string;
  openingMove: string;
  ifTheyPushBack: string;
  ifTheyGhost: string;
  closingTrigger: string;
  neverDo: string[];
  powerPhrases: string[];
  winCondition: string;
}

export type AnalysisResult = AnalyzeData | RespondItem[] | PricingData | PlaybookData;
