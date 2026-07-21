import HeroScrollAnimation from "./components/Hero/HeroScrollAnimation";

export default function App() {
  return (
    <>
      <HeroScrollAnimation />

      {/* Next section — build this one next */}
      <section className="flex min-h-[60vh] items-center justify-center border-t border-white/[0.07] font-mono text-xs uppercase tracking-[0.08em] text-muted">
        Next section goes here!
      </section>
    </>
  );
}
