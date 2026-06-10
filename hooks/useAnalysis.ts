"use client";

import { useState } from "react";
import type { AnalysisResult, Mode } from "@/lib/types";

export function useAnalysis() {
  const [results, setResults] = useState<Partial<Record<Mode, AnalysisResult>>>({});
  const [loading, setLoading] = useState<Partial<Record<Mode, boolean>>>({});
  const [error, setError] = useState<string | null>(null);

  async function runAnalysis(mode: Mode, input: string) {
    const trimmed = input.trim();

    if (!trimmed) {
      setError("Paste an email, message, contract clause, or negotiation note first.");
      return;
    }

    setError(null);
    setLoading((current) => ({ ...current, [mode]: true }));

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, input: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data && typeof data === "object" && "error" in data && typeof data.error === "string" ? data.error : "Analysis failed.";
        throw new Error(message);
      }

      if (!data) {
        throw new Error("The server returned an empty response.");
      }

      setResults((current) => ({ ...current, [mode]: data as AnalysisResult }));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Network error. Try again.");
    } finally {
      setLoading((current) => ({ ...current, [mode]: false }));
    }
  }

  return { results, loading, error, runAnalysis };
}
