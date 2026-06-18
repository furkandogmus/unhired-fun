import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { decodeResult } from "@/lib/scoring";
import ShareActions from "./share-actions";
import EasterEgg from "@/app/components/easter-egg";

interface Props {
  params: Promise<{ payload: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { payload } = await params;
  const result = decodeResult(payload);
  if (!result) return {};
  const title = `${result.n} scored ${result.s.toLocaleString()} on Unhired.fun`;
  const description = `${result.t} · ${result.d} days · ${result.a} applications · ${result.g} ghostings`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [`/api/og/${payload}`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og/${payload}`],
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const { payload } = await params;
  const result = decodeResult(payload);
  if (!result) notFound();

  return (
    <main className="result-page">
      <nav className="nav">
        <Link className="brand" href="/">UNHIRED<span>.FUN</span></Link>
        <Link className="nav-cta" href="/">Calculate yours ↗</Link>
      </nav>

      <section className="result-layout">
        <div className="result-copy">
          <p className="eyebrow">THE RESULTS ARE UNFORTUNATELY IN</p>
          <h1>{result.n}, you&apos;re officially a</h1>
          <h2>{result.t}.</h2>
          <p>
            You scored higher than approximately <strong>{result.p}%</strong> of
            applicants in our emotionally accurate universe.
          </p>
          <div className="result-ranking">
            <span>YOUR LEAGUE</span>
            <b>{result.l}</b>
            <EasterEgg>
              Leagues are fair in the way a 3-round interview for an unpaid internship is fair.
            </EasterEgg>
          </div>
          <ShareActions
            text={`I scored ${result.s.toLocaleString()} on Unhired.fun and earned “${result.t}”. Can you beat my job-market misery?`}
          />
          <Link className="text-link" href="/">← Calculate another score</Link>
        </div>

        <div className="result-card">
          <div className="card-topline">
            <span>UNHIRED.FUN</span>
            <span>v1.0</span>
          </div>
          <p>UNHIRED SCORE</p>
          <div className="score-row">
            <strong className="result-score">{result.s.toLocaleString()}</strong>
            <EasterEgg>
              We didn&apos;t set up Firebase. What if 10k people show up? Who&apos;s paying that bill?
            </EasterEgg>
          </div>
          <h3>{result.t}</h3>
          <div className="result-stat-grid">
            <div><b>{result.d}</b><span>days searching</span></div>
            <div><b>{result.a}</b><span>applications</span></div>
            <div><b>{result.g}</b><span>ghostings</span></div>
            <div><b>{result.f}</b><span>final rounds</span></div>
          </div>
          <div className="sample-badge">
            <span>BADGE UNLOCKED</span>
            <b>{result.b}</b>
          </div>
          <div className="card-footer">
            <span>TOP {Math.max(1, 100 - result.p)}%</span>
            <span>SCIENTIFICALLY QUESTIONABLE</span>
          </div>
        </div>
      </section>

      <aside className="sponsor-slot">
        <span>SPONSOR SLOT</span>
        <p>
          Your tasteful, job-seeker-friendly ad could live here.{" "}
          <EasterEgg>
            Couldn&apos;t open a Google Ads account. No budget for a domain, remember?
          </EasterEgg>
        </p>
      </aside>
    </main>
  );
}
