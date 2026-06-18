# Unhired.fun — Official Scoring System

**Version:** 1.0  
**Status:** MVP scoring specification  
**Tagline:** Still unemployed? At least get ranked.  
**Disclaimer:** Scientifically questionable. Emotionally accurate.

---

## 1. Scoring objective

The Unhired Score measures the accumulated absurdity of a job search. It rewards neither unemployment nor personal hardship. It converts duration, effort, rejection, ghosting, and unusually painful hiring events into a shareable game score.

The score must:

- produce the same result from the same answers;
- let new graduates, internship seekers, laid-off workers, and career switchers compete in relevant leagues;
- reward verified job-search effort more than passive unemployment;
- use diminishing returns so thousands of low-effort applications cannot dominate;
- avoid protected or sensitive personal characteristics;
- be difficult to manipulate with obviously impossible numbers;
- remain understandable enough to explain on a results page.

---

## 2. Final formula

```text
Unhired Score =
round(
  (Origin Score
   + Duration Score
   + Application Score
   + Outcome Score
   + Interview Score
   + Misfortune Score)
  × Search Difficulty Multiplier
  × Evidence Multiplier
)
```

The public score is capped at **9,999** for display. Internally, the uncapped score is preserved for tie-breaking.

No single section may contribute more than 45% of the score before multipliers. This prevents one extreme answer from deciding the entire ranking.

---

## 3. League assignment

Every player enters one primary league. They may also appear in country, industry, and special-event leaderboards.

| Situation | Primary league |
|---|---|
| Looking for a first internship | Internship League |
| Looking for an internship after previous internships | Experienced Intern League |
| Graduated within the last 24 months and has no full-time experience | New Graduate League |
| Lost a job in a layoff or redundancy | Layoff League |
| Resigned without another offer | Leap of Faith League |
| Fixed-term contract or internship ended | Contract Ended League |
| Switching profession or industry | Career Switcher League |
| Returning after a career break | Comeback League |
| Previously self-employed or a founder | Founder in the Wild League |
| None of the above | Open Unemployment League |

The global leaderboard remains available, but the primary league is emphasized so structurally different situations are not presented as equivalent.

---

## 4. Origin Score

The origin score represents how the search began. Only one origin may be selected.

| Search origin | Points |
|---|---:|
| Looking for first internship | 90 |
| Looking for another internship | 110 |
| New graduate seeking first full-time job | 140 |
| Returning after education | 100 |
| Fixed-term contract ended normally | 130 |
| Internship ended without a return offer | 170 |
| Resigned with savings and a plan | 80 |
| Resigned without another offer | 190 |
| Resigned because of burnout/toxic conditions | 150 |
| Fired for performance or fit | 160 |
| Laid off individually | 220 |
| Part of a company-wide layoff | 260 |
| Laid off from a widely recognized top-tier company | 300 |
| Employer shut down or became insolvent | 280 |
| Signed offer was withdrawn before starting | 360 |
| Started a job and was laid off within 90 days | 400 |
| Relocated for a job that disappeared | 450 |

“Top-tier company” never affects league eligibility and adds only a limited number of points. The product must not create an official prestige ranking of employers.

---

## 5. Duration Score

Duration is measured from the date the player began actively searching, not necessarily the date employment ended.

### Formula

```text
Duration Score = min(1,800, round(18 × days^0.72))
```

Examples:

| Active search duration | Duration points |
|---|---:|
| 7 days | 73 |
| 30 days | 208 |
| 90 days | 460 |
| 180 days | 757 |
| 365 days | 1,259 |
| 730+ days | 1,800 cap |

The nonlinear formula makes early months meaningful while preventing duration alone from overpowering active effort.

### Duration multiplier

After the section scores are added, duration also applies a modest multiplier:

| Duration | Multiplier |
|---|---:|
| 0–30 days | ×1.00 |
| 31–90 days | ×1.05 |
| 91–180 days | ×1.12 |
| 181–365 days | ×1.22 |
| 366–730 days | ×1.35 |
| 731+ days | ×1.50 |

This multiplier is part of the Search Difficulty Multiplier and is not applied twice.

---

## 6. Application Score

Applications use diminishing returns.

```text
Application Score =
  min(applications, 50) × 3
  + min(max(applications - 50, 0), 150) × 1.5
  + min(max(applications - 200, 0), 300) × 0.6
  + min(max(applications - 500, 0), 500) × 0.2
```

Maximum raw application score: **655 points**.

Examples:

| Applications | Points |
|---|---:|
| 10 | 30 |
| 50 | 150 |
| 100 | 225 |
| 200 | 375 |
| 500 | 555 |
| 1,000+ | 655 cap |

### Effort bonuses

These count per application but have section caps:

| Effort | Points | Cap |
|---|---:|---:|
| Customized CV/resume | +2 | 100 points |
| Customized cover letter | +3 | 120 points |
| Portfolio/sample prepared specifically | +6 | 120 points |
| Referral obtained | +8 | 120 points |
| Application form required retyping the entire CV | +3 | 90 points |
| Unpaid take-home assignment submitted | +25 | 150 points |

Total Application Score, including effort bonuses, is capped at **1,050**.

---

## 7. Outcome Score

Outcomes represent what happened after applying.

| Outcome | Points each | Count cap |
|---|---:|---:|
| No response after 30 days — ghosted | 5 | 150 |
| Automated rejection within 24 hours | 4 | 100 |
| Human-written rejection | 3 | 100 |
| Recruiter contacted player, then disappeared | 14 | 30 |
| Application viewed but never answered | 6 | 75 |
| Rejected because role was already filled | 12 | 20 |
| Position was cancelled/frozen | 20 | 15 |
| Job listing was reposted after rejection | 24 | 20 |
| Referral application still ghosted | 18 | 20 |
| Rejected for insufficient experience from an entry-level role | 30 | 15 |
| Rejected for being overqualified | 28 | 15 |

Outcome Score is capped at **1,500**.

Consistency checks:

- Total recorded outcomes cannot exceed total applications.
- Ghosted applications are those with no response after at least 30 days.
- An application may have one final outcome, plus applicable special-event bonuses.

---

## 8. Interview Score

Interview points represent time and emotional investment. A hiring process receives points for its deepest completed stage, plus explicit extras. Earlier stages are not added separately for the same process.

### Deepest stage reached

| Deepest completed stage | Points per process |
|---|---:|
| Recruiter screen | 12 |
| Hiring-manager interview | 25 |
| Technical/skills interview | 45 |
| Take-home/case presentation | 70 |
| Panel interview | 85 |
| Final round | 120 |
| Verbal offer followed by rejection | 220 |
| Written offer withdrawn | 350 |

### Interview extras

| Event | Additional points |
|---|---:|
| 4th interview round | +25 |
| Each round after the 4th | +20, maximum +100 |
| Unpaid assignment took 4–8 hours | +35 |
| Unpaid assignment took more than 8 hours | +70 |
| Prepared a presentation used by the company | +80 |
| Interviewer arrived 20+ minutes late | +12 |
| Interviewer did not attend | +35 |
| Salary was revealed only after interviews | +20 |
| Salary was below the published range | +40 |
| Final-round rejection with no feedback | +45 |
| Company ghosted after final round | +90 |
| Rejected, then asked to interview for the same role again | +60 |

Interview Score is capped at **2,000**.

---

## 9. Misfortune Score

These are rare, high-value badges. Each event may be counted only once unless stated otherwise.

| Event | Points |
|---|---:|
| “We will definitely get back to you Friday” — they did not | 20 |
| Interview invitation addressed to the wrong candidate | 35 |
| Rejection addressed to the wrong candidate | 45 |
| Asked expected salary; company refused to share its range | 25 |
| Job description changed materially during interviews | 55 |
| Role changed from remote to on-site during the process | 60 |
| Role changed from paid to unpaid/commission-only | 100 |
| Company requested free work unrelated to evaluation | 100 |
| Candidate paid travel costs and received no follow-up | 90 |
| Interview cancelled after arrival | 120 |
| Offer salary was materially below the agreed amount | 140 |
| Offer was rescinded after notice was given to prior employer | 300 |
| Fake job or recruitment scam verified/reported | 180 |
| Hired, but employer disappeared before the start date | 350 |

Misfortune Score is capped at **900**.

---

## 10. Search Difficulty Multiplier

Multipliers are additive around a base of 1.00, then capped.

```text
Difficulty Multiplier =
min(1.80, 1.00 + duration bonus + market bonus + search constraint bonuses)
```

### Duration bonus

| Active search duration | Added multiplier |
|---|---:|
| 0–30 days | +0.00 |
| 31–90 days | +0.05 |
| 91–180 days | +0.12 |
| 181–365 days | +0.22 |
| 366–730 days | +0.35 |
| 731+ days | +0.50 |

### Search constraints

| Constraint | Added multiplier |
|---|---:|
| First-ever job or internship | +0.06 |
| Career switch into a new field | +0.08 |
| Returning after a 2+ year career break | +0.08 |
| Requires visa sponsorship | +0.12 |
| Searching from a region with limited local opportunities | +0.06 |
| Seeking accessible workplace accommodations | +0.06 |
| Industry has experienced broad layoffs in the last 12 months | +0.06 |
| More than 7 years relevant experience without an offer | +0.05 |
| More than 12 years relevant experience without an offer | +0.08 instead of +0.05 |

Sensitive attributes such as race, ethnicity, religion, gender, sexuality, age, disability status, marital status, and school prestige never directly affect scoring.

Market bonuses should initially be self-reported and clearly labelled. Later they may use independently sourced labor-market data.

---

## 11. Evidence Multiplier

Verification is optional. Unverified players can participate, but verified records receive a small ranking advantage.

| Evidence level | Multiplier |
|---|---:|
| No evidence; self-reported | ×1.00 |
| Email or application screenshots for selected events | ×1.03 |
| Imported application history with personal data redacted | ×1.06 |
| Majority of high-value events verified | ×1.10 |

Verification must:

- be private by default;
- automatically redact names, email addresses, phone numbers, and company contacts;
- never make uploaded evidence publicly accessible;
- permit permanent deletion;
- avoid requiring access to a full email inbox in MVP.

For the first launch, verification may be disabled entirely. The multiplier remains in the specification for later use.

---

## 12. Score tiers

| Score | Rank title |
|---:|---|
| 0–249 | Open to Opportunities |
| 250–499 | Easy Apply Apprentice |
| 500–899 | Ghosted Professional |
| 900–1,399 | Senior Rejection Engineer |
| 1,400–1,999 | Principal Interview Survivor |
| 2,000–2,799 | Director of Open to Work |
| 2,800–3,799 | VP of Unanswered Applications |
| 3,800–4,999 | Chief Unemployment Officer |
| 5,000–6,499 | Grandmaster of Ghosting |
| 6,500–7,999 | Legendary Talent in Waiting |
| 8,000–9,998 | Unhireable Force of Nature |
| 9,999 | Final Boss of the Job Market |

Rank titles are comic labels, not assessments of employability.

---

## 13. Badges

Badges create more sharing variety than the numeric score alone.

### Internship badges

- **Internship Hunter:** 25 internship applications
- **Unpaid Experience Expert:** offered an unpaid internship
- **Entry-Level Intern:** internship requested prior professional experience
- **Return Offer Pending Since Forever:** internship ended without a decision
- **Coffee Run Finalist:** reached a final-round internship interview

### Application badges

- **Easy Apply Athlete:** 100 Easy Apply submissions
- **Form Repetition Specialist:** retyped CV 25 times
- **Cover Letter Novelist:** wrote 50 customized letters
- **Referral-Proof:** ghosted despite a referral
- **One Thousand Applications:** self-explanatory and slightly alarming

### Interview badges

- **Final-Round Regular:** 3 final rounds without an offer
- **Five-Stage Survivor:** completed a 5+ stage process
- **Free Consultant:** submitted 3 unpaid take-home assignments
- **The Interviewer Never Came:** interviewer no-show
- **Culture Fit Casualty:** received a culture-fit rejection

### Layoff badges

- **Top-Tier Alumni, Bottom-Tier Inbox**
- **Laid Off Before Onboarding Ended**
- **Survived the Reorg, Not the Next One**
- **Former Employee of the Month**

### Time badges

- **90-Day Streak**
- **Half-Year Hero**
- **One-Year Open-to-Work Anniversary**
- **LinkedIn Banner Veteran**

---

## 14. Tie-breaking

Leaderboard ties are resolved in this order:

1. Higher uncapped score
2. More final-round processes
3. More ghosted applications
4. Longer active search duration
5. Earlier score submission

The displayed score remains capped at 9,999 even when the internal score is higher.

---

## 15. Anti-cheat and plausibility rules

MVP does not need invasive identity verification, but obvious manipulation should be limited.

- Maximum 100 applications per active-search day without evidence.
- Outcomes cannot exceed applications.
- Interview processes cannot exceed applications.
- Final rounds cannot exceed interview processes.
- Offer withdrawals cannot exceed offers.
- Search start date cannot be in the future.
- Duration cannot exceed the user’s stated career timeline by an impossible amount.
- Edits that increase a score by more than 25% within 24 hours enter a temporary review state.
- Leaderboard uses a nickname; one active profile per browser/account.
- Reported profiles may be hidden pending review.

The personal result card should always work, even if a suspicious profile is excluded from public leaderboards.

---

## 16. Example calculations

### Example A — internship seeker

Profile:

- first internship;
- searching for 120 days;
- 75 applications;
- 48 ghostings;
- 20 automated rejections;
- 3 recruiter screens;
- 1 final round;
- one unpaid assignment;
- first-ever internship constraint.

```text
Origin                       90
Duration                    565
Applications                213
Outcomes                    320
Interviews                  156
Misfortune                    0
Subtotal                  1,344

Difficulty:
1.00 + 0.12 duration + 0.06 first opportunity = 1.18

Final score:
1,344 × 1.18 = 1,586
```

Result:

> Principal Interview Survivor  
> Top 8% of the Internship League

### Example B — top-company layoff

Profile:

- broad layoff at a recognized top-tier company;
- searching for 210 days;
- 220 applications;
- 130 ghostings;
- 40 automated rejections;
- 8 interview processes;
- 3 final rounds;
- one final-round ghosting;
- 8 years of experience;
- industry-wide layoff period.

Approximate calculation:

```text
Origin                      300
Duration                    846
Applications                387
Outcomes                    810
Interviews                  570
Misfortune                    0
Subtotal                  2,913

Difficulty:
1.00 + 0.22 duration + 0.06 market + 0.05 experience = 1.33

Final score:
2,913 × 1.33 = 3,874
```

Result:

> Chief Unemployment Officer  
> Badge: Top-Tier Alumni, Bottom-Tier Inbox

### Example C — resigned without an offer

Profile:

- resigned without another offer;
- searching for 45 days;
- 32 applications;
- 15 ghostings;
- 8 rejections;
- 2 recruiter screens;
- no unusual events.

```text
Origin                      190
Duration                    279
Applications                 96
Outcomes                     99
Interviews                   24
Misfortune                    0
Subtotal                    688

Difficulty:
1.00 + 0.05 duration = 1.05

Final score:
688 × 1.05 = 722
```

Result:

> Ghosted Professional

---

## 17. Result card

Every player receives a vertical and square share card:

```text
UNHIRED.FUN

SCORE 3,874
Chief Unemployment Officer

210 days searching
220 applications
130 ghostings
3 final-round rejections

#412 Global
#38 Layoff League

Scientifically questionable.
Emotionally accurate.
```

The player chooses whether country, industry, school, former employer, or experience appears. None is public by default.

---

## 18. MVP questionnaire

Keep the first scoring flow under three minutes.

1. What are you looking for?
   - Internship
   - First full-time job
   - Next full-time job
   - Career switch
   - Return after a break

2. How did this job search begin?

3. When did you start actively searching?

4. How many applications have you submitted?

5. How many were:
   - ghosted;
   - automatically rejected;
   - rejected by a person?

6. How many interview processes reached:
   - recruiter screen;
   - technical/skills stage;
   - final round?

7. Select any rare events that happened.

8. Optional context:
   - country;
   - industry;
   - relevant experience;
   - visa sponsorship requirement;
   - broad industry layoffs.

9. Choose a nickname and consent separately to public leaderboard inclusion.

Advanced effort and interview questions may appear after the initial score as:

> Add your hiring-process lore for a more accurate score.

This preserves fast completion while allowing dedicated players to improve their score.

---

## 19. Product rules

- The product is free.
- No login is required to calculate a score.
- Public leaderboard participation is opt-in.
- Deleting a profile must be simple.
- Ads never alter scoring.
- Employers cannot pay to remove negative aggregate statistics.
- Company-specific rankings require sufficient anonymous sample size.
- The game mocks hiring systems, not unemployed people.
- Crisis-support language should be available when user responses indicate distress, without pretending the game is a mental-health service.

---

## 20. Calibration plan

The initial coefficients are hypotheses. Before declaring the scale final:

1. Generate 100 synthetic profiles across every league.
2. Test the questionnaire with at least 20 real job seekers.
3. Examine median and 90th-percentile scores by league.
4. Adjust only section caps and coefficients—not individual users.
5. Publish scoring version on every result.
6. Preserve old scores or clearly mark recalculation when the scoring version changes.

Target launch distribution:

- Median active user: 800–1,400
- 90th percentile: 2,500–4,000
- 99th percentile: 5,500+
- 9,999: extremely rare

This keeps high ranks meaningful and prevents everyone from becoming the Final Boss in the first week.
