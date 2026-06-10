import { Header } from "@/components/Header";
import { DealMindApp } from "@/components/DealMindApp";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <DealMindApp />
    </main>
  );
}
