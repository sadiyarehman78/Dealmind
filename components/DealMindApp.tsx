"use client";

import { useState } from "react";
import { useAnalysis } from "@/hooks/useAnalysis";
import type { Mode } from "@/lib/types";
import { InputPanel } from "./InputPanel";
import { ResultPanel } from "./ResultPanel";

export function DealMindApp() {
  const [input, setInput] = useState("");
  const [activeMode, setActiveMode] = useState<Mode>("Analyze");
  const analysis = useAnalysis();

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 pb-8 pt-4 sm:px-6 lg:grid-cols-[420px_1fr] lg:px-8">
      <InputPanel
        activeMode={activeMode}
        error={analysis.error}
        input={input}
        loading={analysis.loading}
        onInputChange={setInput}
        onModeChange={setActiveMode}
        onRun={() => analysis.runAnalysis(activeMode, input)}
      />
      <ResultPanel
        activeMode={activeMode}
        loading={analysis.loading}
        results={analysis.results}
        onModeChange={setActiveMode}
      />
    </div>
  );
}
