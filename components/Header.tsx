import { Badge } from "./ui/Badge";

export function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge tone="gold">REAL-TIME INTELLIGENCE</Badge>
            <Badge>SESSION ONLY</Badge>
          </div>
          <h1 className="font-display text-4xl font-bold leading-none text-white sm:text-5xl">
            DealMind
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
            Paste negotiation material and get strategic leverage analysis, response options,
            pricing guidance, and a full game plan.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-dim)]">
          <span>Analyze</span>
          <span>Respond</span>
          <span>Pricing</span>
          <span>Playbook</span>
          <span>Risk</span>
          <span>Leverage</span>
        </div>
      </div>
    </header>
  );
}
