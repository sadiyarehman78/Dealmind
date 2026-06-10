"use client";

import type { AnalysisResult, AnalyzeData, Mode, PlaybookData, PricingData, RespondItem } from "@/lib/types";
import { Badge } from "./ui/Badge";
import { Section } from "./ui/Section";

type Props = {
  activeMode: Mode;
  loading: Partial<Record<Mode, boolean>>;
  results: Partial<Record<Mode, AnalysisResult>>;
  onModeChange: (mode: Mode) => void;
};

const modes: Mode[] = ["Analyze", "Respond", "Pricing", "Playbook"];

export function ResultPanel({ activeMode, loading, results, onModeChange }: Props) {
  const result = results[activeMode];

  return (
    <section className="rounded border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Section title="RESULT INTELLIGENCE" />
        <div className="flex flex-wrap gap-2">
          {modes.map((mode) => (
            <button
              className={`rounded border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition ${
                activeMode === mode
                  ? "border-[var(--gold)] bg-[var(--gold-bg)] text-[var(--gold)]"
                  : "border-[var(--border-2)] bg-[var(--surface-2)] text-[var(--text-muted)] hover:border-[var(--gold-dark)] hover:text-[var(--gold)]"
              }`}
              key={mode}
              onClick={() => onModeChange(mode)}
              type="button"
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {loading[activeMode] ? (
        <LoadingState />
      ) : result ? (
        <div className="space-y-4 animate-[fadeIn_0.4s_ease]">
          {activeMode === "Analyze" && <AnalyzeResult result={result as AnalyzeData} />}
          {activeMode === "Respond" && <RespondResult result={result as RespondItem[]} />}
          {activeMode === "Pricing" && <PricingResult result={result as PricingData} />}
          {activeMode === "Playbook" && <PlaybookResult result={result as PlaybookData} />}
        </div>
      ) : (
        <EmptyState mode={activeMode} />
      )}
    </section>
  );
}

function AnalyzeResult({ result }: { result: AnalyzeData }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <PowerMeter value={result.powerScore} />
        <Badge tone={riskTone(result.riskLevel)}>{result.riskLevel} Risk</Badge>
      </div>

      <Quote>{result.verdict}</Quote>
      <p className="text-sm leading-6 text-[var(--text)]">{result.summary}</p>

      <Grid title="Urgency Signals" items={result.urgencySignals} />
      <Grid title="Weakness Indicators" items={result.weaknessIndicators} tone="red" />
      <Grid title="Leverage Points" items={result.leveragePoints} tone="green" />

      <Section title="TACTICS">
        <div className="space-y-2">
          {result.tactics.map((item) => (
            <div key={item} className="rounded border border-[var(--border-2)] bg-[var(--surface-2)] px-3 py-2 text-sm leading-6 text-[var(--text)]">
              {item}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function RespondResult({ result }: { result: RespondItem[] }) {
  return (
    <div className="space-y-4">
      {result.map((item) => (
        <article key={item.label} className="rounded border border-[var(--border-2)] bg-[var(--surface-2)] p-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge tone="gold">{item.label}</Badge>
            <Badge>{item.tone}</Badge>
          </div>
          <p className="mb-3 text-sm leading-6 text-[var(--text-muted)]">{item.strategy}</p>
          <p className="text-sm leading-6 text-[var(--text)]">{item.message}</p>
        </article>
      ))}
    </div>
  );
}

function PricingResult({ result }: { result: PricingData }) {
  return (
    <div className="space-y-4">
      <Quote>{result.bottomLine}</Quote>
      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard title="Anchor Bias" value={result.anchorBias} />
        <InfoCard title="True Market Range" value={result.trueMarketRange} />
        <InfoCard title="Recommended Ask" value={result.recommendedAsk} />
        <InfoCard title="Concession Strategy" value={result.concessionStrategy} />
      </div>
      <Section title="VALUE FRAMING">
        <p className="text-sm leading-6 text-[var(--text)]">{result.valueFraming}</p>
      </Section>
      <Grid title="Red Lines" items={result.redLines} tone="red" />
      <Grid title="Bundle Opportunities" items={result.bundleOpportunities} tone="green" />
    </div>
  );
}

function PlaybookResult({ result }: { result: PlaybookData }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard title="Situation Type" value={result.situationType} />
        <InfoCard title="Their Goal" value={result.theirGoal} />
        <InfoCard title="Your Goal" value={result.yourGoal} />
        <InfoCard title="Closing Trigger" value={result.closingTrigger} />
      </div>
      <Quote>{result.winCondition}</Quote>
      <InfoCard title="Opening Move" value={result.openingMove} />
      <InfoCard title="If They Push Back" value={result.ifTheyPushBack} />
      <InfoCard title="If They Ghost" value={result.ifTheyGhost} />
      <Grid title="Never Do" items={result.neverDo} tone="red" />
      <Section title="POWER PHRASES">
        <div className="grid gap-2">
          {result.powerPhrases.map((phrase) => (
            <div key={phrase} className="rounded border border-[var(--border-2)] bg-[var(--surface-2)] px-3 py-2 font-mono text-xs leading-6 text-[var(--text)]">
              {phrase}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Grid({
  title,
  items,
  tone = "gold",
}: {
  title: string;
  items: string[];
  tone?: "gold" | "red" | "green";
}) {
  return (
    <Section title={title}>
      <div className="grid gap-2">
        {items.map((item) => (
          <div
            key={item}
            className={`rounded border px-3 py-2 text-sm leading-6 ${
              tone === "red"
                ? "border-[var(--red)] bg-[var(--red-bg)] text-[var(--text)]"
                : tone === "green"
                  ? "border-[var(--green)] bg-[var(--green-bg)] text-[var(--text)]"
                  : "border-[var(--border-2)] bg-[var(--surface-2)] text-[var(--text)]"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </Section>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded border border-[var(--border-2)] bg-[var(--surface-2)] p-3">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
        {title}
      </p>
      <p className="text-sm leading-6 text-[var(--text)]">{value}</p>
    </div>
  );
}

function Quote({ children }: { children: string }) {
  return (
    <div className="border-l-2 border-[var(--gold)] pl-4 font-display text-[15px] italic leading-7 text-white">
      {children}
    </div>
  );
}

function PowerMeter({ value }: { value: number }) {
  const percent = Math.max(10, Math.min(100, value * 10));

  return (
    <div className="flex items-center gap-3 rounded border border-[var(--border-2)] bg-[var(--surface-2)] px-3 py-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
        Power
      </span>
      <div className="h-2 w-28 overflow-hidden rounded-full bg-[var(--border)]">
        <div className="h-full rounded-full bg-[var(--gold)]" style={{ width: `${percent}%` }} />
      </div>
      <span className="font-mono text-xs text-[var(--gold)]">{value}/10</span>
    </div>
  );
}

function EmptyState({ mode }: { mode: Mode }) {
  return (
    <div className="rounded border border-dashed border-[var(--border-2)] bg-[var(--surface-2)] p-8 text-sm leading-7 text-[var(--text-muted)]">
      Run <span className="text-[var(--gold)]">{mode}</span> on the left to populate this panel.
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4 animate-[fadeIn_0.4s_ease]">
      <div className="h-4 w-1/3 rounded bg-[var(--border-2)]" />
      <div className="h-24 rounded bg-[var(--surface-2)]" />
      <div className="grid gap-3 md:grid-cols-2">
        <div className="h-20 rounded bg-[var(--surface-2)]" />
        <div className="h-20 rounded bg-[var(--surface-2)]" />
      </div>
    </div>
  );
}

function riskTone(risk: AnalyzeData["riskLevel"]) {
  if (risk === "High") return "red";
  if (risk === "Medium") return "gold";
  return "green";
}
