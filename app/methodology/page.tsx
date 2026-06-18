import Link from "next/link";
import EasterEgg from "@/app/components/easter-egg";

export default function MethodologyPage() {
  return (
    <main className="methodology-page">
      <nav className="nav">
        <Link className="brand" href="/">UNHIRED<span>.FUN</span></Link>
        <Link className="nav-cta" href="/">Calculate your score ↗</Link>
      </nav>
      <article>
        <p className="eyebrow">THE OFFICIAL UNOFFICIAL METHODOLOGY</p>
        <h1>A serious scoring system for an unserious job market.</h1>
        <p className="lede">
          Your score combines how the search began, how long it has lasted,
          application effort, rejection outcomes, interview depth and a small
          difficulty multiplier.
        </p>
        <pre>{`score = (
  origin
  + duration
  + applications
  + outcomes
  + interviews
) × difficulty multiplier`}</pre>
        <h2>What earns points?</h2>
        <div className="method-grid">
          <section><b>Duration</b><p>Long searches matter, with diminishing returns so time alone cannot dominate.</p></section>
          <section><b>Applications</b><p>The first applications count most. Sending 1,000 low-effort applications cannot break the game.</p></section>
          <section><b>Ghosting</b><p>No response after 30 days earns more than a normal rejection. Silence has a price.</p></section>
          <section><b>Interviews</b><p>Final rounds, unpaid assignments and finish-line ghosting carry the heaviest weight.</p></section>
        </div>
        <h2>What never affects your score?</h2>
        <p>
          Race, ethnicity, religion, gender, sexuality, age, marital status,
          disability status and school prestige are never scoring inputs.
        </p>
        <p className="method-note">
          Version 1.0 · Scientifically questionable. Emotionally accurate.{" "}
          <EasterEgg>
            We don&apos;t use analytics. The dev checks Netlify dashboard once a week and says &quot;wow 12 visitors&quot;.
          </EasterEgg>
        </p>
      </article>
    </main>
  );
}
