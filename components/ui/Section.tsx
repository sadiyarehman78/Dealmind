import type { ReactNode } from "react";

export function Section({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section className={className}>
      <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
        {title}
      </h2>
      {children}
    </section>
  );
}
