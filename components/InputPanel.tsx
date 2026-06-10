"use client";

import type { Mode } from "@/lib/types";
import { LoadingDots } from "./ui/LoadingDots";
import { Section } from "./ui/Section";

const modes: Mode[] = ["Analyze", "Respond", "Pricing", "Playbook"];

const examples = [
  "Client says the budget is tight but wants the same scope.",
  "Prospect asks for a 30% discount before signing.",
  "Contract clause shifts payment to net 90 with no late fee.",
];

export function InputPanel({
  activeMode,
  error,
  input,
  loading,
  onInputChange,
  onModeChange,
  onRun,
}: {
  activeMode: Mode;
  error: string | null;
  input: string;
  loading: Partial<Record<Mode, boolean>>;
  onInputChange: (input: string) => void;
  onModeChange: (mode: Mode) => void;
  onRun: () => void;
}) {
  return (
    <section className="rounded border border-[var(--border)] bg-[var(--surface)] p-4 lg:sticky lg:top-4 lg:self-start">
        <Section title="INPUT SIGNAL">
          <textarea
            className="min-h-80 w-full resize-none rounded border border-[var(--border-2)] bg-[var(--surface-2)] p-4 text-sm leading-6 text-[var(--text)] outline-none transition placeholder:text-[var(--text-dim)] focus:border-[var(--gold-dark)] focus:ring-2 focus:ring-[var(--gold-bg)]"
            placeholder="Paste an email, DM, proposal note, pricing objection, contract term, or negotiation transcript..."
            value={input}
            onChange={(event) => onInputChange(event.target.value)}
          />
        </Section>

        <Section title="MODE" className="mt-5">
          <div className="grid grid-cols-2 gap-2">
            {modes.map((mode) => (
              <button
                className={`rounded border px-3 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition ${
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
        </Section>

        <button
          className="mt-5 flex h-12 w-full items-center justify-center rounded border border-[var(--gold)] bg-[var(--gold-bg)] font-mono text-xs font-medium uppercase tracking-[0.22em] text-[var(--gold)] transition hover:bg-[#2a230f] disabled:cursor-not-allowed disabled:border-[var(--border-2)] disabled:bg-[var(--surface-2)] disabled:text-[var(--text-dim)]"
          disabled={Boolean(loading[activeMode])}
          onClick={onRun}
          type="button"
        >
          {loading[activeMode] ? <LoadingDots /> : `Run ${activeMode}`}
        </button>

        {error ? (
          <p className="mt-4 border-l-2 border-[var(--red)] bg-[var(--red-bg)] px-3 py-2 text-sm text-[var(--text)]">
            {error}
          </p>
        ) : null}

        <Section title="FAST LOAD" className="mt-6">
          <div className="space-y-2">
            {examples.map((example) => (
              <button
                className="w-full rounded border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-left text-xs leading-5 text-[var(--text-muted)] transition hover:border-[var(--border-2)] hover:text-[var(--text)]"
                key={example}
                onClick={() => onInputChange(example)}
                type="button"
              >
                {example}
              </button>
            ))}
          </div>
        </Section>
      </section>
  );
}
