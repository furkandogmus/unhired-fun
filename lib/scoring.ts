export type SearchOrigin =
  | "first-internship"
  | "another-internship"
  | "new-graduate"
  | "contract-ended"
  | "internship-ended"
  | "resigned"
  | "resigned-no-offer"
  | "laid-off"
  | "mass-layoff"
  | "top-company-layoff"
  | "company-closed"
  | "offer-withdrawn";

export type SearchGoal =
  | "internship"
  | "first-job"
  | "next-job"
  | "career-switch"
  | "comeback";

export interface ScoreInput {
  nickname: string;
  goal: SearchGoal;
  origin: SearchOrigin;
  days: number;
  applications: number;
  ghosted: number;
  autoRejected: number;
  humanRejected: number;
  recruiterScreens: number;
  technicalStages: number;
  finalRounds: number;
  unpaidAssignments: number;
  finalRoundGhosts: number;
  experienceYears: number;
  visaRequired: boolean;
  industryLayoffs: boolean;
  country?: string;
  industry?: string;
}

export interface ScoreBreakdown {
  origin: number;
  duration: number;
  applications: number;
  outcomes: number;
  interviews: number;
  multiplier: number;
}

export interface ScoreResult {
  input: ScoreInput;
  score: number;
  uncappedScore: number;
  title: string;
  league: string;
  badge: string;
  percentile: number;
  breakdown: ScoreBreakdown;
  version: "1.0";
}

const originPoints: Record<SearchOrigin, number> = {
  "first-internship": 90,
  "another-internship": 110,
  "new-graduate": 140,
  "contract-ended": 130,
  "internship-ended": 170,
  resigned: 80,
  "resigned-no-offer": 190,
  "laid-off": 220,
  "mass-layoff": 260,
  "top-company-layoff": 300,
  "company-closed": 280,
  "offer-withdrawn": 360,
};

export const originLabels: Record<SearchOrigin, string> = {
  "first-internship": "Looking for my first internship",
  "another-internship": "Looking for another internship",
  "new-graduate": "New graduate seeking a first full-time job",
  "contract-ended": "My contract ended",
  "internship-ended": "My internship ended without a return offer",
  resigned: "I resigned with a plan",
  "resigned-no-offer": "I resigned without another offer",
  "laid-off": "I was laid off",
  "mass-layoff": "I was part of a company-wide layoff",
  "top-company-layoff": "I was laid off from a top-tier company",
  "company-closed": "My employer shut down",
  "offer-withdrawn": "My signed offer was withdrawn",
};

export const goalLabels: Record<SearchGoal, string> = {
  internship: "An internship",
  "first-job": "My first full-time job",
  "next-job": "My next full-time job",
  "career-switch": "A job in a new career",
  comeback: "A return after a career break",
};

function applicationPoints(count: number) {
  return Math.min(
    655,
    Math.min(count, 50) * 3 +
      Math.min(Math.max(count - 50, 0), 150) * 1.5 +
      Math.min(Math.max(count - 200, 0), 300) * 0.6 +
      Math.min(Math.max(count - 500, 0), 500) * 0.2,
  );
}

function durationBonus(days: number) {
  if (days > 730) return 0.5;
  if (days > 365) return 0.35;
  if (days > 180) return 0.22;
  if (days > 90) return 0.12;
  if (days > 30) return 0.05;
  return 0;
}

function rankTitle(score: number) {
  if (score >= 9999) return "Final Boss of the Job Market";
  if (score >= 8000) return "Unhireable Force of Nature";
  if (score >= 6500) return "Legendary Talent in Waiting";
  if (score >= 5000) return "Grandmaster of Ghosting";
  if (score >= 3800) return "Chief Unemployment Officer";
  if (score >= 2800) return "VP of Unanswered Applications";
  if (score >= 2000) return "Director of Open to Work";
  if (score >= 1400) return "Principal Interview Survivor";
  if (score >= 900) return "Senior Rejection Engineer";
  if (score >= 500) return "Ghosted Professional";
  if (score >= 250) return "Easy Apply Apprentice";
  return "Open to Opportunities";
}

function primaryLeague(input: ScoreInput) {
  if (input.goal === "internship") {
    return input.origin === "another-internship"
      ? "Experienced Intern League"
      : "Internship League";
  }
  if (input.goal === "first-job") return "New Graduate League";
  if (
    ["laid-off", "mass-layoff", "top-company-layoff"].includes(input.origin)
  ) {
    return "Layoff League";
  }
  if (input.origin === "resigned-no-offer") return "Leap of Faith League";
  if (input.goal === "career-switch") return "Career Switcher League";
  if (input.goal === "comeback") return "Comeback League";
  return "Open Unemployment League";
}

function primaryBadge(input: ScoreInput) {
  if (input.origin === "top-company-layoff") {
    return "Top-Tier Alumni, Bottom-Tier Inbox";
  }
  if (input.finalRoundGhosts > 0) return "Ghosted at the Finish Line";
  if (input.finalRounds >= 3) return "Final-Round Regular";
  if (input.unpaidAssignments >= 3) return "Free Consultant";
  if (input.applications >= 1000) return "One Thousand Applications";
  if (input.goal === "internship" && input.applications >= 25) {
    return "Internship Hunter";
  }
  if (input.ghosted >= 100) return "Inbox Void Explorer";
  if (input.days >= 365) return "One-Year Open-to-Work Anniversary";
  if (input.applications >= 100) return "Easy Apply Athlete";
  return "Still Showing Up";
}

export function calculateScore(raw: ScoreInput): ScoreResult {
  const input: ScoreInput = {
    ...raw,
    nickname: raw.nickname.trim().slice(0, 24) || "Anonymous Applicant",
    days: Math.max(0, Math.min(3650, Math.round(raw.days))),
    applications: Math.max(0, Math.min(10000, Math.round(raw.applications))),
    ghosted: Math.max(0, Math.round(raw.ghosted)),
    autoRejected: Math.max(0, Math.round(raw.autoRejected)),
    humanRejected: Math.max(0, Math.round(raw.humanRejected)),
    recruiterScreens: Math.max(0, Math.round(raw.recruiterScreens)),
    technicalStages: Math.max(0, Math.round(raw.technicalStages)),
    finalRounds: Math.max(0, Math.round(raw.finalRounds)),
    unpaidAssignments: Math.max(0, Math.round(raw.unpaidAssignments)),
    finalRoundGhosts: Math.max(0, Math.round(raw.finalRoundGhosts)),
    experienceYears: Math.max(0, Math.min(50, Number(raw.experienceYears))),
  };

  const origin = originPoints[input.origin];
  const duration = Math.min(
    1800,
    Math.round(18 * Math.pow(input.days, 0.72)),
  );
  const applications = Math.round(applicationPoints(input.applications));
  const outcomes = Math.min(
    1500,
    input.ghosted * 5 +
      input.autoRejected * 4 +
      input.humanRejected * 3,
  );
  const interviews = Math.min(
    2000,
    input.recruiterScreens * 12 +
      input.technicalStages * 45 +
      input.finalRounds * 120 +
      input.unpaidAssignments * 35 +
      input.finalRoundGhosts * 90,
  );

  let multiplier = 1 + durationBonus(input.days);
  if (input.goal === "internship" || input.goal === "first-job") multiplier += 0.06;
  if (input.goal === "career-switch") multiplier += 0.08;
  if (input.goal === "comeback") multiplier += 0.08;
  if (input.visaRequired) multiplier += 0.12;
  if (input.industryLayoffs) multiplier += 0.06;
  if (input.experienceYears >= 12) multiplier += 0.08;
  else if (input.experienceYears >= 7) multiplier += 0.05;
  multiplier = Math.min(1.8, multiplier);

  const subtotal = origin + duration + applications + outcomes + interviews;
  const uncappedScore = Math.round(subtotal * multiplier);
  const score = Math.min(9999, uncappedScore);
  const percentile = Math.min(99, Math.max(1, Math.round(100 - 100 * Math.exp(-score / 1550))));

  return {
    input,
    score,
    uncappedScore,
    title: rankTitle(score),
    league: primaryLeague(input),
    badge: primaryBadge(input),
    percentile,
    breakdown: {
      origin,
      duration,
      applications,
      outcomes,
      interviews,
      multiplier: Number(multiplier.toFixed(2)),
    },
    version: "1.0",
  };
}

export function encodeResult(result: ScoreResult) {
  const compact = {
    n: result.input.nickname,
    s: result.score,
    t: result.title,
    l: result.league,
    b: result.badge,
    p: result.percentile,
    d: result.input.days,
    a: result.input.applications,
    g: result.input.ghosted,
    f: result.input.finalRounds,
  };
  const bytes = new TextEncoder().encode(JSON.stringify(compact));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export interface SharedResult {
  n: string;
  s: number;
  t: string;
  l: string;
  b: string;
  p: number;
  d: number;
  a: number;
  g: number;
  f: number;
}

export function decodeResult(payload: string): SharedResult | null {
  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as SharedResult;
    if (
      !parsed ||
      typeof parsed.s !== "number" ||
      typeof parsed.n !== "string" ||
      typeof parsed.t !== "string"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
