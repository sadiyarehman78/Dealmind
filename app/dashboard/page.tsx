import { DealMindApp } from "@/components/DealMindApp";
import { Section } from "@/components/ui/Section";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
        <div className="mb-5">
          <Section title="NEW ANALYSIS" />
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            Run fresh negotiation analysis across all 4 intelligence modes.
          </p>
        </div>
        <DealMindApp />
      </section>
    </div>
  );
}