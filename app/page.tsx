"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  calculateScore,
  encodeResult,
  goalLabels,
  originLabels,
  type ScoreInput,
  type SearchGoal,
  type SearchOrigin,
} from "@/lib/scoring";
import EasterEgg from "@/app/components/easter-egg";

const initialInput: ScoreInput = {
  nickname: "",
  goal: "next-job",
  origin: "laid-off",
  days: 120,
  applications: 100,
  ghosted: 50,
  autoRejected: 20,
  humanRejected: 10,
  recruiterScreens: 4,
  technicalStages: 2,
  finalRounds: 1,
  unpaidAssignments: 0,
  finalRoundGhosts: 0,
  experienceYears: 3,
  visaRequired: false,
  industryLayoffs: false,
  country: "",
  industry: "",
};

const originOptions = Object.entries(originLabels) as [SearchOrigin, string][];
const goalOptions = Object.entries(goalLabels) as [SearchGoal, string][];

function NumberField({
  label,
  name,
  value,
  max = 10000,
  hint,
  onChange,
}: {
  label: string;
  name: keyof ScoreInput;
  value: number;
  max?: number;
  hint?: string;
  onChange: (name: keyof ScoreInput, value: number) => void;
}) {
  return (
    <label className="number-field">
      <span>{label}</span>
      {hint && <small>{hint}</small>}
      <input
        type="number"
        inputMode="numeric"
        min="0"
        max={max}
        value={value}
        onChange={(event) => onChange(name, Number(event.target.value || 0))}
      />
    </label>
  );
}

export default function Home() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState(initialInput);

  const liveResult = useMemo(() => calculateScore(input), [input]);

  useEffect(() => {
    if (!started) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [started, step]);

  function setNumber(name: keyof ScoreInput, value: number) {
    setInput((current) => ({ ...current, [name]: value }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const result = calculateScore(input);
    const encoded = encodeResult(result);
    try {
      const existing = JSON.parse(
        localStorage.getItem("unhired-results") || "[]",
      ) as unknown[];
      localStorage.setItem(
        "unhired-results",
        JSON.stringify([result, ...existing].slice(0, 10)),
      );
    } catch {
      // A result should still work if storage is unavailable.
    }
    router.push(`/r/${encoded}`);
  }

  const steps = [
    <section className="quiz-panel" key="beginning">
      <p className="step-label">01 — The beginning</p>
      <h2>How did your current job-search saga begin?</h2>
      <div className="field-stack">
        <label>
          <span>What are you looking for?</span>
          <select
            value={input.goal}
            onChange={(event) =>
              setInput((current) => ({
                ...current,
                goal: event.target.value as SearchGoal,
              }))
            }
          >
            {goalOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>What set this search in motion?</span>
          <select
            value={input.origin}
            onChange={(event) =>
              setInput((current) => ({
                ...current,
                origin: event.target.value as SearchOrigin,
              }))
            }
          >
            {originOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <NumberField
          label="How many days have you been actively searching?"
          name="days"
          value={input.days}
          max={3650}
          onChange={setNumber}
        />
      </div>
    </section>,
    <section className="quiz-panel" key="applications">
      <p className="step-label">02 — The application void</p>
      <h2>Tell us what happened after you clicked Apply.</h2>
      <div className="number-grid">
        <NumberField
          label="Applications sent"
          name="applications"
          value={input.applications}
          onChange={setNumber}
        />
        <NumberField
          label="Ghosted"
          name="ghosted"
          value={input.ghosted}
          hint="No answer after 30 days"
          onChange={setNumber}
        />
        <NumberField
          label="Automatic rejections"
          name="autoRejected"
          value={input.autoRejected}
          onChange={setNumber}
        />
        <NumberField
          label="Human rejections"
          name="humanRejected"
          value={input.humanRejected}
          onChange={setNumber}
        />
      </div>
    </section>,
    <section className="quiz-panel" key="interviews">
      <p className="step-label">03 — Interview lore</p>
      <h2>How deep into the hiring labyrinth did you get?</h2>
      <div className="number-grid">
        <NumberField
          label="Recruiter screens"
          name="recruiterScreens"
          value={input.recruiterScreens}
          onChange={setNumber}
        />
        <NumberField
          label="Technical / skills stages"
          name="technicalStages"
          value={input.technicalStages}
          onChange={setNumber}
        />
        <NumberField
          label="Final rounds"
          name="finalRounds"
          value={input.finalRounds}
          onChange={setNumber}
        />
        <NumberField
          label="Unpaid assignments"
          name="unpaidAssignments"
          value={input.unpaidAssignments}
          onChange={setNumber}
        />
        <NumberField
          label="Ghosted after a final round"
          name="finalRoundGhosts"
          value={input.finalRoundGhosts}
          onChange={setNumber}
        />
      </div>
    </section>,
    <section className="quiz-panel" key="context">
      <p className="step-label">04 — Difficulty modifiers</p>
      <h2>Give the score a little context.</h2>
      <div className="field-stack">
        <NumberField
          label="Years of relevant experience"
          name="experienceYears"
          value={input.experienceYears}
          max={50}
          onChange={setNumber}
        />
        <label className="check-field">
          <input
            type="checkbox"
            checked={input.visaRequired}
            onChange={(event) =>
              setInput((current) => ({
                ...current,
                visaRequired: event.target.checked,
              }))
            }
          />
          <span>I need visa sponsorship.</span>
        </label>
        <label className="check-field">
          <input
            type="checkbox"
            checked={input.industryLayoffs}
            onChange={(event) =>
              setInput((current) => ({
                ...current,
                industryLayoffs: event.target.checked,
              }))
            }
          />
          <span>My industry is currently a layoff-themed escape room.</span>
        </label>
      </div>
    </section>,
    <section className="quiz-panel" key="identity">
      <p className="step-label">05 — Enter the league</p>
      <h2>Choose the name history will barely remember.</h2>
      <div className="field-stack">
        <label>
          <span>Nickname</span>
          <input
            type="text"
            maxLength={24}
            placeholder="Anonymous Applicant"
            value={input.nickname}
            onChange={(event) =>
              setInput((current) => ({
                ...current,
                nickname: event.target.value,
              }))
            }
          />
        </label>
        <label>
          <span>Country (optional)</span>
          <input
            type="text"
            maxLength={40}
            placeholder="e.g. Germany"
            value={input.country}
            onChange={(event) =>
              setInput((current) => ({
                ...current,
                country: event.target.value,
              }))
            }
          />
        </label>
        <label>
          <span>Industry (optional)</span>
          <input
            type="text"
            maxLength={40}
            placeholder="e.g. Software"
            value={input.industry}
            onChange={(event) =>
              setInput((current) => ({
                ...current,
                industry: event.target.value,
              }))
            }
          />
        </label>
      </div>
      <div className="score-preview">
        <span>Unofficial preview</span>
        <strong>{liveResult.score.toLocaleString()}</strong>
        <em>{liveResult.title}</em>
      </div>
    </section>,
  ];

  return (
    <main>
      <nav className="nav">
        <Link className="brand" href="/">
          UNHIRED<span>.FUN</span>
        </Link>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#leagues">Leagues</a>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/methodology">Scoring</Link>
        </div>
      </nav>

      {!started ? (
        <>
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">THE JOB MARKET&apos;S LEAST PRESTIGIOUS LEAGUE</p>
              <h1>
                Still unemployed?
                <br />
                <span>At least get ranked.</span>
              </h1>
              <p className="hero-text">
                Turn the ghosting, automatic rejections and seven-stage
                interviews into the score they deserve.
              </p>
              <button className="primary-button" onClick={() => setStarted(true)}>
                Calculate my misery <span>↗</span>
              </button>
              <p className="microcopy">
                Free · Anonymous · Scientifically questionable
              </p>
            </div>

            <div className="hero-card-wrap">
              <div className="hero-card">
                <div className="card-topline">
                  <span>UNHIRED SCORE</span>
                  <span>GLOBAL</span>
                </div>
                <div className="score-row">
                  <strong className="giant-score">3,874</strong>
                  <EasterEgg>
                    This score is fictional. If we showed a real one, people would get depressed.
                  </EasterEgg>
                </div>
                <h3>Chief Unemployment Officer</h3>
                <div className="sample-stats">
                  <div>
                    <b>210</b>
                    <span>days searching</span>
                  </div>
                  <div>
                    <b>220</b>
                    <span>applications</span>
                  </div>
                  <div>
                    <b>130</b>
                    <span>ghostings</span>
                  </div>
                </div>
                <div className="sample-badge">
                  <span>BADGE UNLOCKED</span>
                  <b>Top-Tier Alumni, Bottom-Tier Inbox</b>
                </div>
              </div>
              <span className="sticker sticker-one">TOP 4%</span>
              <span className="sticker sticker-two">NO OFFER</span>
            </div>
          </section>

          <section className="ticker" aria-label="Unhired facts">
            <span>GHOSTED AGAIN</span><b>✦</b>
            <span>FINAL ROUND SURVIVOR</span><b>✦</b>
            <span>OPEN TO WORK SINCE FOREVER</span><b>✦</b>
            <span>ENTRY-LEVEL: 3 YEARS REQUIRED</span><b>✦</b>
          </section>

          <section className="how-section" id="how">
            <p className="section-kicker">HOW IT WORKS</p>
            <h2>Your suffering, finally quantified.</h2>
            <div className="how-grid">
              <article>
                <span>01</span>
                <h3>Confess</h3>
                <p>Tell us how long, how many applications, and how spectacularly they vanished.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Get ranked</h3>
                <p>Our deeply serious formula assigns your score, league, title and badges.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Share the pain</h3>
                <p>Post your card and discover which friend has suffered more professionally.</p>
              </article>
            </div>
          </section>

          <section className="league-section" id="leagues">
            <div>
              <p className="section-kicker">FAIRLY UNFAIR COMPETITION</p>
              <h2>There&apos;s a league for every career plot twist.</h2>
            </div>
            <div className="league-list">
              {[
                ["Internship League", "Coffee Run Finalists"],
                ["New Graduate League", "Experience: Required"],
                ["Layoff League", "Synergy Survivors"],
                ["Leap of Faith League", "Resigned Without a Net"],
                ["Career Switcher League", "Back to Level One"],
                ["Comeback League", "Career Gap Champions"],
              ].map(([name, sub], index) => (
                <article key={name}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{name}</h3><p>{sub}</p></div>
                  <b>↗</b>
                </article>
              ))}
            </div>
          </section>

          <footer>
            <span className="footer-brand">
              <Link className="brand" href="/">UNHIRED<span>.FUN</span></Link>
              <EasterEgg>
                unhired.fun domain? Couldn&apos;t afford it. We&apos;re unemployed.
              </EasterEgg>
            </span>
            <p>The game mocks hiring systems, not unemployed people.</p>
          </footer>
        </>
      ) : (
        <section className="quiz-shell">
          <div className="quiz-progress">
            <span>UNEMPLOYMENT ASSESSMENT</span>
            <div><i style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
            <b>{step + 1}/{steps.length}</b>
          </div>
          <form onSubmit={submit}>
            {steps[step]}
            <div className="quiz-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  if (step === 0) setStarted(false);
                  else setStep((current) => current - 1);
                }}
              >
                ← Back
              </button>
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => setStep((current) => current + 1)}
                >
                  Continue →
                </button>
              ) : (
                <button type="submit" className="primary-button">
                  Reveal my rank ↗
                </button>
              )}
            </div>
          </form>
        </section>
      )}
    </main>
  );
}
