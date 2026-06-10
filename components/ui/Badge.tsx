import type { ReactNode } from "react";

type Tone = "default" | "gold" | "green" | "red";

const toneClasses: Record<Tone, string> = {
  default: "border-[var(--border-2)] bg-[var(--surface-2)] text-[var(--text)]",
  gold: "border-[var(--gold)] bg-[var(--gold-bg)] text-[var(--gold)]",
  green: "border-[var(--green)] bg-[var(--green-bg)] text-[var(--green)]",
  red: "border-[var(--red)] bg-[var(--red-bg)] text-[var(--red)]",
};

export function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
