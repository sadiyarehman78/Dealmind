"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#f4c95d",
          colorBackground: "#0f1115",
          colorInputBackground: "#13141a",
          colorInputText: "#e6eef8",
          colorText: "#e6eef8",
          colorTextSecondary: "#9aa6b2",
        },
        elements: {
          card: "border border-[var(--border)] bg-[var(--surface)] shadow-none",
          headerTitle: "text-white",
          headerSubtitle: "text-[var(--text-muted)]",
          formButtonPrimary: "bg-[var(--gold)] text-black hover:bg-[#ffd86f] shadow-none",
          socialButtonsBlockButton:
            "border border-[var(--border-2)] bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--surface)]",
          formFieldInput:
            "border border-[var(--border-2)] bg-[var(--surface-2)] text-[var(--text)]",
          footerActionLink: "text-[var(--gold)] hover:text-[#ffd86f]",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}