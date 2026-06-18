# RenewKit — Product Requirements Document

**Status:** Scope locked for MVP  
**Version:** 1.0  
**Date:** 18 June 2026  
**Owner:** Furkan  
**Target launch:** 7 days after development starts

---

## 1. Product summary

RenewKit is a renewal control center for indie hackers, freelancers, agencies, and small startup teams. It keeps SaaS subscriptions, domains, hosting, cloud services, licenses, taxes, and other recurring obligations in one place and warns the owner before money is charged or an asset expires.

**Primary promise**

> Never lose money on forgotten renewals.

**Supporting description**

> Track every SaaS subscription, domain, cloud bill, and renewal in one place.

RenewKit is not a broad budgeting app. It does not connect to bank accounts in the MVP. It is a focused, privacy-friendly tool for costs and deadlines that users already know they need to control.

---

## 2. Problem

Founders and small digital businesses accumulate recurring expenses across many vendors. Renewal dates live in inboxes, dashboards, calendars, spreadsheets, and memory.

This creates three expensive failure modes:

1. An unwanted service renews before it can be cancelled.
2. A critical asset such as a domain or license expires.
3. The owner cannot see the true monthly and annual cost of the tools being used.

Existing alternatives are often:

- consumer finance products requiring bank access;
- mobile-only subscription lists;
- spreadsheets that do not send dependable reminders;
- broader spend-management systems built for larger companies;
- trackers that treat every recurring payment alike and do not prioritize domains, infrastructure, and business-critical renewals.

---

## 3. Target customer

### Primary ICP

An English-speaking solo founder, indie hacker, freelancer, or small agency owner who:

- pays for at least 8 recurring digital services;
- owns one or more domains;
- uses SaaS, hosting, cloud, or software licenses for work;
- currently tracks renewals in memory, email, a calendar, or a spreadsheet;
- has previously paid for something they meant to cancel or nearly missed an expiry;
- can buy a low-cost productivity tool without procurement approval.

### Secondary ICP

Startup teams of 2–10 people that need a shared view of recurring tools but are not ready for enterprise spend management.

### Not the initial customer

- consumers looking for full personal budgeting;
- large finance/procurement teams;
- users expecting automatic bank transaction discovery;
- users primarily tracking household utilities;
- companies needing accounting, invoicing, or tax compliance.

---

## 4. Jobs to be done

### Functional

- When I buy a recurring service, I want to record it quickly so I do not have to remember its renewal.
- Before a charge or expiry, I want enough warning to decide whether to keep, cancel, or renew it.
- When planning expenses, I want to know my normalized monthly and annual recurring spend.
- When reviewing tools, I want a direct link to the vendor’s billing or cancellation page.

### Emotional

- I want confidence that no renewal is silently approaching.
- I want to feel in control without sharing my bank credentials.
- I want a lightweight system, not another finance project to maintain.

---

## 5. Positioning

### Category

Renewal management for digital businesses.

### Positioning statement

For indie hackers and small digital teams who lose money or take risks through forgotten renewals, RenewKit is a focused renewal control center that tracks subscriptions and critical expirations, sends actionable reminders, and reveals true recurring spend—without requiring access to a bank account.

### Differentiation

1. **Business-critical renewals, not only subscriptions:** domains, hosting, cloud, licenses, and taxes are first-class categories.
2. **Actionable deadlines:** every item can include a billing/cancellation URL and a reminder schedule.
3. **Privacy-friendly setup:** manual entry and CSV import; no banking credentials.
4. **Built for desktop workflows:** web app first, Chrome extension as a fast companion.
5. **Fast time to value:** sample item or first real renewal added during onboarding in under two minutes.

### Messaging hierarchy

**Hero**

> Decide before it renews.

**Subheadline**

> RenewKit keeps reminding you until every SaaS, domain, hosting, cloud, and license renewal is kept, cancelled, or updated.

**Primary CTA:** Protect my renewals  
**Secondary CTA:** See how it works

---

## 6. Business model

RenewKit launches as a freemium SaaS. Users should receive real value before paying, while the paid plan gates ongoing risk protection rather than basic data entry.

### Launch pricing

| Plan | Price | Intended user |
|---|---:|---|
| Free | $0 | Trying the workflow or tracking a small number of renewals |
| Pro Monthly | $3.99/month | Solo founders and freelancers |
| Pro Annual | $29/year | Default and best-value paid option |
| Founding Lifetime | $49 once | First 100 customers only; launch acquisition tool |

Annual pricing is presented as the default paid option. The lifetime offer is capped by customer count, not an artificial countdown.

### Free plan

- up to 5 active renewal items;
- dashboard totals;
- one email reminder per item, 1 day before;
- standard categories;
- billing/cancellation link;
- web app access;
- CSV export.

### Pro plan

- unlimited active renewal items;
- multiple reminders per item: 30, 14, 7, 3, and 1 day before;
- Google Calendar sync;
- CSV import;
- Chrome extension;
- custom categories and tags;
- multi-currency display with one reporting currency;
- renewal history;
- priority support.

### Later team plan — not in MVP

Potential price: $12/month for 3 seats, then $4 per additional seat. This plan must not be implemented until at least five paying customers explicitly request shared access.

### Paywall moments

Show an upgrade prompt when a user:

- attempts to add a sixth active item;
- enables Google Calendar sync;
- selects more than one reminder;
- starts CSV import;
- signs into the Chrome extension;
- tries to create a custom category.

The dashboard itself is never blurred or held hostage. Upgrade messaging must explain the avoided risk or saved time.

### Refund policy

14-day, no-argument refund for first-time Pro purchases. Cancellation stops future renewals and preserves Pro access through the paid period.

---

## 7. MVP scope

### P0 — required to launch and charge money

#### 7.1 Authentication and onboarding

- Google OAuth.
- Terms and Privacy acceptance.
- Onboarding asks for:
  - preferred currency;
  - timezone;
  - first renewal item.
- A user reaches the populated dashboard immediately after adding the first item.
- Empty state includes a realistic example and a single “Add renewal” CTA.

#### 7.2 Renewal item management

Required fields:

- name;
- category;
- amount;
- currency;
- next renewal date;
- frequency.

Optional fields:

- vendor URL;
- billing/cancellation URL;
- notes;
- reminder schedule;
- status.

Supported frequencies:

- weekly;
- monthly;
- quarterly;
- every 6 months;
- yearly;
- custom interval;
- one-time expiry.

Statuses:

- active;
- decision_due;
- snoozed;
- cancelled;
- expired;
- archived.

Default categories:

- SaaS;
- Domains;
- Hosting;
- Cloud;
- Licenses;
- Bills;
- Taxes;
- Other.

Acceptance criteria:

- create, edit, archive, and delete an item;
- renewal date is stored independently from the user’s display timezone;
- after a renewal passes, the next date advances according to frequency;
- a cancelled or archived item is excluded from active spend;
- amount supports two decimal places and cannot be negative;
- custom intervals cannot be shorter than one day.

#### 7.3 Renewal decision workflow

Every renewal entering its configured decision window becomes an unresolved item in the Renewal Inbox. It remains there until the user records an outcome:

- Keep;
- Cancel;
- Renewed manually;
- Snooze until a specific date.

Acceptance criteria:

- the user can act from the dashboard or a secure reminder link;
- Keep advances the next date and may update the amount;
- Cancel removes future normalized spend while preserving history;
- Renewed manually advances an expiry/renewal and records the decision;
- Snooze requires an explicit date before the renewal;
- unresolved Pro items continue receiving configured follow-ups;
- every outcome records decision type, timestamp, previous date, previous amount, and resulting date;
- estimated avoided spend is shown only after a cancellation and is labelled as an estimate.

#### 7.4 Dashboard

Display:

- Renewal Inbox grouped into overdue, decide today, decide this week, and safe for now;
- normalized monthly spend;
- normalized annual spend;
- spend by category;
- next 30 days’ renewal total;
- upcoming renewal list ordered by date;
- overdue items;
- active item count.

Each upcoming row shows:

- name and category;
- amount and currency;
- human-readable time remaining;
- exact renewal date;
- quick link to billing/cancellation page;
- edit action.

Calculations must be deterministic and documented. One-time expiries appear in upcoming totals but not normalized recurring spend.

#### 7.5 Email reminders

- Free: one reminder 1 day before.
- Pro: selectable reminders at 30, 14, 7, 3, and 1 day before.
- Pro follow-ups continue for unresolved decisions according to notification settings.
- Reminder includes item, amount, exact date, days remaining, and billing/cancellation CTA.
- Reminder includes secure Keep, Cancel, and Snooze actions.
- Reminder job is idempotent and records delivery attempts.
- Failed deliveries are retried.
- Every email includes unsubscribe and notification settings links.

#### 7.6 Google Calendar sync

- Pro only.
- User connects Google Calendar with the minimum required OAuth scope.
- RenewKit creates or updates a calendar event for each selected active item.
- Event includes amount, category, RenewKit item link, and vendor billing link.
- Disconnecting Calendar stops future sync; the UI clearly states whether existing events will remain.
- Duplicate events must not be created when an item is edited.

#### 7.7 Chrome extension

Manifest V3 popup with:

- next five upcoming renewals;
- days remaining;
- amount;
- Keep, Cancel, and Snooze actions for due items;
- “Open dashboard” button;
- “Add renewal” shortcut.

The extension reads from the same authenticated API. No background scraping, browsing-history access, or automatic subscription detection in MVP.

#### 7.8 Billing

- Stripe Checkout for Pro Monthly, Pro Annual, and Founding Lifetime.
- Stripe Customer Portal for card updates and cancellation.
- Webhook-driven entitlement state.
- Billing state is never trusted from the client.
- Failed payment produces a grace state before downgrade.
- Founding Lifetime quantity is enforced server-side and displayed accurately.

#### 7.9 Marketing website

Required pages:

- landing page;
- pricing;
- privacy;
- terms;
- contact/support;
- login/sign-up.

Landing page sections:

1. hero and product screenshot;
2. problem/pain;
3. three-step workflow;
4. use cases: SaaS, domains, cloud, licenses;
5. dashboard and reminder proof;
6. privacy/no-bank-access statement;
7. pricing;
8. FAQ;
9. final CTA.

Marketing claims must be factual. Do not display fake customer counts, fake logos, invented testimonials, or fabricated savings.

#### 7.10 Product analytics

Track privacy-conscious product events:

- landing_viewed;
- signup_started;
- signup_completed;
- onboarding_completed;
- renewal_created;
- second_renewal_created;
- reminder_configured;
- renewal_decision_due;
- renewal_kept;
- renewal_cancelled;
- renewal_snoozed;
- renewal_manually_renewed;
- calendar_connected;
- extension_connected;
- paywall_viewed;
- checkout_started;
- purchase_completed;
- subscription_cancelled;
- renewal_archived;
- csv_import_completed.

Analytics must exclude renewal names, notes, URLs, and other user-entered sensitive content.

#### 7.11 Operational basics

- error monitoring;
- structured application logs;
- database backups;
- support email;
- admin view for user, plan, billing status, and reminder delivery diagnosis;
- rate limiting on public and authenticated endpoints;
- deletion workflow for user data;
- basic accessibility and responsive layouts.

### P1 — first four weeks after launch

Only prioritize these from user evidence:

- CSV import with downloadable template;
- renewal history and “mark as renewed”;
- custom categories/tags;
- multi-currency conversion using a documented exchange-rate source;
- snooze reminder;
- duplicate item;
- weekly digest;
- public cancellation-link directory;
- referral tracking.

### Explicitly out of scope

The following are prohibited during MVP unless the PRD is formally revised:

- bank or credit-card connections;
- AI receipt/email scanning;
- automatic Gmail detection;
- mobile applications;
- team workspaces and permissions;
- accounting integrations;
- invoice management;
- budgeting;
- net worth tracking;
- automated cancellation performed by RenewKit;
- affiliate marketplace;
- browser scraping;
- Slack, Zapier, or API platform;
- localization beyond English;
- tax calculations;
- price-increase detection;
- “AI assistant” features.

New ideas go into the backlog. They do not interrupt the seven-day build.

---

## 8. Core user journeys

### Journey A — first value

1. Visitor lands from Product Hunt, X, or an SEO page.
2. Clicks “Protect my renewals.”
3. Signs in with Google.
4. Selects currency and timezone.
5. Adds first renewal.
6. Sees monthly/annual totals and next renewal.
7. Adds a second item.

**Activation event:** two active renewal items created within the first session.

### Journey B — conversion

1. Activated user adds items.
2. Attempts to add the sixth item or enable advanced reminders.
3. Sees contextual paywall with annual plan highlighted.
4. Starts Stripe Checkout.
5. Payment webhook grants Pro.
6. User returns to the exact blocked action and completes it.

### Journey C — renewal action

1. User receives reminder.
2. Opens RenewKit item.
3. Visits billing/cancellation URL.
4. Chooses:
   - keep and mark renewed;
   - cancel;
   - edit date/amount;
   - archive.
5. Dashboard updates spend and next-renewal totals.

---

## 9. UX principles

- Calm, compact, and operational—not gamified.
- Exact dates accompany relative labels such as “tomorrow.”
- Money values always show currency.
- Risk is prioritized: overdue, tomorrow, this week, later.
- Adding an item requires minimal typing.
- Destructive actions require confirmation or undo.
- Paid features are visible but not disruptive.
- No dark patterns in checkout or cancellation.
- Desktop is primary; mobile web remains usable.

---

## 10. Data model

The implementation may refine names, but it must preserve these concepts:

### users

- id
- email
- display_name
- avatar_url
- timezone
- reporting_currency
- onboarding_completed_at
- created_at
- deleted_at

### renewal_items

- id
- user_id
- name
- category_id
- amount_minor
- currency
- next_renewal_date
- frequency_type
- interval_count
- interval_unit
- vendor_url
- management_url
- notes
- status
- created_at
- updated_at
- archived_at

### categories

- id
- user_id nullable for system categories
- name
- color
- icon

### reminder_rules

- id
- renewal_item_id
- channel
- days_before
- enabled

### reminder_deliveries

- id
- reminder_rule_id
- renewal_item_id
- scheduled_for
- attempted_at
- delivered_at
- status
- provider_message_id
- failure_code

Unique constraint must prevent duplicate delivery for the same item, rule, and renewal occurrence.

### renewal_decisions

- id
- renewal_item_id
- user_id
- decision_type
- previous_amount_minor
- previous_renewal_date
- resulting_renewal_date
- snoozed_until nullable
- estimated_avoided_amount_minor nullable
- decided_at

Decision history is append-only from the user interface.

### calendar_connections

- id
- user_id
- provider
- encrypted_access_data
- calendar_id
- status
- connected_at
- disconnected_at

### calendar_events

- id
- renewal_item_id
- connection_id
- provider_event_id
- last_synced_at
- sync_status

### billing_customers

- user_id
- stripe_customer_id
- plan
- entitlement_status
- billing_interval
- current_period_end
- lifetime_access
- updated_at

### product_events

- id
- user_id nullable
- anonymous_id nullable
- event_name
- safe_properties
- occurred_at

All user-owned tables require row-level security.

---

## 11. Technical direction

### Web

- React
- TypeScript
- Vite
- Tailwind CSS

### Backend

- Supabase Postgres
- Supabase Auth with Google OAuth
- Row-level security
- server-side functions for billing, reminders, and calendar sync

### Payments

- Stripe Checkout
- Stripe Customer Portal
- Stripe webhooks

### Email

- Resend or Postmark; choose one before implementation and keep provider code behind a small adapter.

### Extension

- Chrome Manifest V3
- shared TypeScript API client and domain types where practical

### Deployment

- Vercel for the web application;
- scheduled/server functions appropriate for reminder delivery;
- separate production and development environments.

### Security requirements

- minimum OAuth scopes;
- encrypted provider tokens;
- secrets never exposed to the client;
- server-side authorization for every mutation;
- row-level security tests;
- Stripe webhook signature verification;
- sanitized URLs and user input;
- audit logs for billing entitlement changes;
- account deletion removes or anonymizes data according to legal requirements.

---

## 12. Metrics

### North-star metric

**Protected renewals:** active renewal occurrences covered by at least one successfully configured reminder in the next 90 days.

This measures real risk protection rather than raw account creation.

### Funnel

- landing → signup started;
- signup started → signup completed;
- signup completed → activated;
- activated → paywall viewed;
- paywall viewed → checkout started;
- checkout started → paid;
- paid → retained at 30 and 90 days.

### Initial targets

These are hypotheses, not promises:

- landing-to-signup: ≥ 8%;
- signup-to-activation: ≥ 55%;
- activated-to-paid within 30 days: ≥ 5%;
- annual share of new subscriptions: ≥ 60%;
- first-session time to first item: < 2 minutes;
- reminder delivery success: ≥ 99%;
- 30-day activated-user retention: ≥ 35%;
- first 30 days: 20 paying customers or 10 high-quality customer interviews.

### Revenue milestone

First validation target: **$500 MRR-equivalent**, excluding one-time lifetime revenue. Lifetime purchases fund launch but do not prove recurring retention.

---

## 13. Go-to-market

### Launch audience

- indie hackers;
- developers with multiple projects;
- freelancers;
- small agencies;
- bootstrapped founders.

### Primary channels

1. Product Hunt launch.
2. Founder-led X/Twitter build-and-launch content.
3. Indie Hackers launch post and progress update.
4. Relevant Reddit communities, following each community’s self-promotion rules.
5. SEO pages around high-intent renewal problems.

### Pre-launch assets

- live landing page with working signup;
- 20–30 second product GIF;
- three polished screenshots;
- transparent pricing;
- founder story;
- waitlist or immediate early-access CTA;
- Product Hunt gallery and maker comment;
- launch email;
- short demo video;
- privacy and security FAQ.

### Launch narrative

> We kept paying for SaaS we meant to cancel—and nearly let important domains expire. Spreadsheets knew the dates but did not protect us. So we built RenewKit: one calm place for every SaaS, domain, hosting, cloud, and license renewal, with reminders before the damage is done.

### Launch offer

- Free plan remains permanently available.
- First 100 customers may purchase Founding Lifetime for $49.
- Founding customers receive all solo Pro features, not future team features.
- Counter must reflect completed purchases.

### SEO seed pages

Create useful, non-programmatic pages after the product is functional:

- SaaS subscription tracker for indie hackers;
- domain renewal tracker;
- software license renewal tracker;
- hosting renewal reminder;
- subscription spreadsheet alternative;
- how to calculate annual SaaS spend.

Every page should include an actual template, calculator, checklist, or example—not thin keyword text.

### Trust strategy

Before testimonials exist:

- show the real product;
- explain that bank access is not required;
- publish the founder’s own anonymized dashboard example;
- state what data is stored;
- make export and deletion easy.

After launch, request a testimonial only after a user has received a reminder or completed a renewal action.

---

## 14. Seven-day execution plan

### Day 1 — foundation

- finalize visual direction and design tokens;
- create application shell;
- configure Supabase, authentication, environments, and core schema;
- implement landing-page skeleton and analytics;
- configure Stripe products/prices in test mode.

### Day 2 — core renewal workflow

- create/edit/archive renewal items;
- categories and frequency calculations;
- validation and row-level security;
- onboarding and empty states.

### Day 3 — dashboard

- spend normalization;
- upcoming and overdue views;
- category summary;
- responsive dashboard;
- calculation tests.

### Day 4 — monetization

- plan limits;
- contextual paywalls;
- Stripe Checkout, Portal, and webhooks;
- entitlement tests;
- pricing page.

### Day 5 — protection layer

- email reminder scheduler and delivery;
- reminder settings;
- Google Calendar connection and sync;
- failure/retry handling.

### Day 6 — extension and marketing

- Chrome extension popup;
- product screenshots and demo GIF;
- landing page completion;
- Privacy, Terms, FAQ, and support flow.

### Day 7 — launch readiness

- end-to-end QA;
- production billing test;
- analytics verification;
- reminder and calendar tests;
- accessibility and mobile-web pass;
- Product Hunt assets and launch copy;
- production deployment;
- first-user onboarding.

If the schedule slips, cut Chrome extension polish first, then Calendar sync. Do not cut billing, reminders, analytics, onboarding, security, or the marketing site.

---

## 15. Launch gates

RenewKit is ready to launch only when:

- a new user can sign up and create two renewals;
- dashboard totals are verified against test fixtures;
- a Free user encounters and understands plan limits;
- monthly and annual purchases correctly grant Pro;
- cancellation and failed payment states are handled;
- at least one real email reminder has arrived at the correct time;
- Calendar sync creates no duplicates;
- extension displays live production data;
- analytics events appear without sensitive content;
- privacy, terms, support, export, and deletion paths exist;
- no critical or high-severity errors remain;
- production is usable on current Chrome, Safari, and mobile web.

---

## 16. Decision rules and scope control

This section exists to stop idea-hopping.

1. The MVP scope is locked for seven development days.
2. New ideas are recorded under `Backlog`; they are not implemented immediately.
3. A feature may enter active work only if it:
   - helps activation, paid conversion, reminder reliability, or retention;
   - is requested by at least five target users, or fixes a measured funnel problem;
   - does not weaken the primary positioning.
4. No rebrand before 100 activated users or a verified legal conflict.
5. No pricing change before 20 purchases, unless checkout data shows a technical or obvious packaging failure. The launch baseline is $3.99 monthly, $29 annual, and $49 Founding Lifetime.
6. No new platform before the web experience converts and retains users.
7. Weekly review asks:
   - What shipped?
   - What did users do?
   - Where did the funnel break?
   - What is the single highest-leverage fix?

### Backlog parking lot

- email/Gmail subscription discovery;
- bank connection;
- team workspaces;
- Slack reminders;
- API and Zapier;
- mobile apps;
- automated cancellation;
- renewal price history;
- vendor intelligence;
- affiliate offers.

Parking an idea is not rejecting it. It protects the current product long enough to learn whether it deserves to exist.

---

## 17. Key risks

| Risk | Mitigation |
|---|---|
| Manual entry feels like work | Under-two-minute onboarding, smart defaults, sample items, later CSV import |
| Free tier is sufficient for most users | Five-item cap; paid value tied to multiple reminders, Calendar, import, extension |
| Users do not trust a financial-adjacent product | No bank access, clear privacy copy, export/delete controls, minimal scopes |
| Reminder failure destroys trust | Idempotent jobs, retries, delivery logs, monitoring, operational dashboard |
| Lifetime deal harms recurring revenue | Cap at 100, separate from MRR reporting, exclude future team features |
| Product becomes generic | Maintain focus on digital-business renewals and actionable billing links |
| Multi-currency totals mislead users | MVP clearly separates currencies or uses user-entered reporting values until conversion is implemented |

---

## 18. Open implementation decisions

These do not change product scope and should be resolved on Day 1:

- Resend vs Postmark for transactional email;
- exact scheduler/function provider for reminder jobs;
- Stripe tax handling and merchant business details;
- analytics provider, with PostHog preferred if configured for privacy-conscious collection;
- whether MVP totals group currencies separately or require a reporting amount for foreign-currency items.

---

## 19. Competitive references

The launch packaging was informed by publicly available product pages checked on 18 June 2026:

- TrackMySubs offers a free tier for up to 10 subscriptions and a $10/month unlimited plan: https://trackmysubs.com/
- Rocket Money offers free subscription tracking and a broader Premium finance bundle, typically priced at $7–14/month: https://www.rocketmoney.com/learn/personal-finance/how-much-does-rocket-money-cost
- Subby positions itself as a free Android subscription manager: https://subby.online/
- Bobby focuses on simple mobile subscription tracking: https://apps.apple.com/au/app/bobby-track-subscriptions/id1059152023

RenewKit should not try to outbuild broad personal-finance products. Its opportunity is a narrower desktop-first workflow for business-critical digital renewals, transparent pricing, and no bank connection.
