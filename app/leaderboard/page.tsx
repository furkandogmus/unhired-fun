"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ScoreResult } from "@/lib/scoring";
import EasterEgg from "@/app/components/easter-egg";

const sampleRows = [
  { nickname: "StillOptimistic", score: 6842, title: "Legendary Talent in Waiting", league: "Layoff League", days: 612 },
  { nickname: "CV_Final_v27", score: 5930, title: "Grandmaster of Ghosting", league: "New Graduate League", days: 488 },
  { nickname: "OpenToAnything", score: 4721, title: "Chief Unemployment Officer", league: "Career Switcher League", days: 391 },
  { nickname: "CoffeeRunFinalist", score: 3988, title: "Chief Unemployment Officer", league: "Internship League", days: 274 },
  { nickname: "SynergySurvivor", score: 3510, title: "VP of Unanswered Applications", league: "Layoff League", days: 219 },
  { nickname: "AnonymousApplicant", score: 2894, title: "VP of Unanswered Applications", league: "Open Unemployment League", days: 201 },
];

const TAB_LEAGUE_MAP: Record<string, string | null> = {
  Global: null,
  Internships: "Internship League",
  "New Graduates": "New Graduate League",
  Layoffs: "Layoff League",
};

export default function LeaderboardPage() {
  const [localRows, setLocalRows] = useState<typeof sampleRows>([]);
  const [activeTab, setActiveTab] = useState("Global");

  useEffect(() => {
    let frame = 0;
    try {
      const stored = JSON.parse(localStorage.getItem("unhired-results") || "[]") as ScoreResult[];
      frame = requestAnimationFrame(() => {
        setLocalRows(stored.map((result) => ({
          nickname: result.input.nickname,
          score: result.score,
          title: result.title,
          league: result.league,
          days: result.input.days,
        })));
      });
    } catch {
      frame = requestAnimationFrame(() => setLocalRows([]));
    }
    return () => cancelAnimationFrame(frame);
  }, []);

  const leagueFilter = TAB_LEAGUE_MAP[activeTab];
  const rows = [...localRows, ...sampleRows]
    .filter((row) => leagueFilter === null || row.league === leagueFilter)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  return (
    <main className="leaderboard-page">
      <nav className="nav">
        <Link className="brand" href="/">UNHIRED<span>.FUN</span></Link>
        <Link className="nav-cta" href="/">Join the league ↗</Link>
      </nav>
      <section className="leaderboard-shell">
        <p className="eyebrow">GLOBAL LEADERBOARD · PRESEASON</p>
        <div className="leaderboard-heading">
          <h1>The only leaderboard nobody wants to top.</h1>
          <p>
            Global rankings are running with preseason applicants while the
            anonymous backend is being prepared. Your scores appear locally.{" "}
            <EasterEgg>
              &ldquo;Backend is being prepared&rdquo; = the dev might build it someday. For now, it&apos;s localStorage.
            </EasterEgg>
          </p>
        </div>
        <div className="league-tabs">
          {Object.keys(TAB_LEAGUE_MAP).map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : undefined}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="leaderboard-table">
          <div className="leaderboard-row leaderboard-header">
            <span>RANK</span><span>PLAYER</span><span>LEAGUE</span><span>DAYS</span><span>SCORE</span>
          </div>
          {rows.map((row, index) => (
            <div className="leaderboard-row" key={`${row.nickname}-${index}`}>
              <b>#{String(index + 1).padStart(2, "0")}</b>
              <div><strong>{row.nickname}</strong><small>{row.title}</small></div>
              <span>{row.league}</span>
              <span>{row.days}</span>
              <strong>{row.score.toLocaleString()}</strong>
            </div>
          ))}
        </div>
        <p className="leaderboard-note">
          Scores are self-reported. Glory is temporary. Ghosting is forever.
        </p>
      </section>
    </main>
  );
}
