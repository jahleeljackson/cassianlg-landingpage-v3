# GoHighLevel setup for the Revenue Recovery Calculator

The landing page calculator upserts a contact, writes a report note, applies tags, and (when IDs are present) creates a pipeline opportunity. Email and SMS sequences are sent by HighLevel workflows, not by the Next.js app.

Copy `.env.example` to `.env.local` and fill in values as you create them.

## 1. Private Integration Token

In HighLevel: **Settings → Integrations → Private Integrations**.

Create a token with:

- Contacts: read/write
- Opportunities: read/write
- Locations: read (if prompted)

Put the token in `GHL_API_KEY` and the sub-account Location ID in `GHL_LOCATION_ID`.

API calls use `https://services.leadconnectorhq.com` with header `Version: 2021-07-28`.

## 2. Calendar

Create a calendar named **Revenue Recovery Review**.

Copy the booking widget / embed URL (typically a `leadconnectorhq.com` or `msgsndr.com` widget link) into:

```bash
NEXT_PUBLIC_BOOKING_URL=https://...
```

The landing page iframe in `#book` uses this URL as-is.

## 3. Tags

Create these exact tag names (the app sends these strings on upsert):

| Tag | When it is applied |
| --- | --- |
| `source-calculator` | Every calculator submission |
| `report-requested` | Every calculator submission |
| `offer-lead-to-appointment` | Every calculator submission (recommended default offer) |
| `qualified` | Expected monthly recovered revenue ≥ $2,000 **and** timeline is now / this month / this quarter **and** someone can handle appointments |
| `nurture` | Submissions that do not meet the qualified rule |
| `sms-opt-in` | SMS consent checked |
| `sms-opt-out` | SMS consent not checked |

Do **not** send SMS from a workflow unless the contact has `sms-opt-in`.

## 4. Pipeline

Create a pipeline named **Revenue Recovery** with stages:

1. Report Delivered
2. Qualified Review
3. Nurture
4. Review Booked

Then set:

```bash
GHL_PIPELINE_ID=
GHL_STAGE_REPORT_DELIVERED=
GHL_STAGE_QUALIFIED=
GHL_STAGE_NURTURE=
```

The app creates an opportunity named `{Business} — Revenue Recovery` with monetary value equal to **expected monthly recovered revenue**. Qualified contacts go to `GHL_STAGE_QUALIFIED` (falling back to Report Delivered). Others go to `GHL_STAGE_NURTURE` (falling back to Report Delivered).

Move contacts to **Review Booked** from a calendar-booking workflow (the app does not do this itself).

## 5. Custom fields (optional)

If these env vars are empty, calculator outputs are still saved as a **contact note**. Custom fields make merge tags in emails easier.

Create contact custom fields and paste each field ID:

| Env var | Suggested field name |
| --- | --- |
| `GHL_FIELD_MONTHLY_INQUIRIES` | Monthly Inquiries |
| `GHL_FIELD_MONTHLY_CALLS` | Monthly Calls |
| `GHL_FIELD_MISSED_CALLS` | Missed Calls |
| `GHL_FIELD_MONTHLY_ESTIMATES` | Monthly Estimates |
| `GHL_FIELD_STALE_OPPORTUNITIES` | Stale Opportunities |
| `GHL_FIELD_ACV` | Average Customer Value |
| `GHL_FIELD_CLOSE_RATE` | Close Rate |
| `GHL_FIELD_GROSS_MARGIN` | Gross Margin |
| `GHL_FIELD_RESPONSE_TIME` | First Response Time |
| `GHL_FIELD_FOLLOW_UP_ATTEMPTS` | Follow-up Attempts |
| `GHL_FIELD_MISSED_CALL_SMS` | Missed-call Auto Text |
| `GHL_FIELD_ESTIMATE_FOLLOWUP` | Estimate Auto Follow-up |
| `GHL_FIELD_CURRENT_CRM` | Current CRM |
| `GHL_FIELD_TIMELINE` | Implementation Timeline |
| `GHL_FIELD_CAN_HANDLE_APPOINTMENTS` | Can Handle Appointments |
| `GHL_FIELD_RECOVERABLE` | Recoverable Opportunities |
| `GHL_FIELD_REVENUE_CONSERVATIVE` | Recovered Revenue Conservative |
| `GHL_FIELD_REVENUE_EXPECTED` | Recovered Revenue Expected |
| `GHL_FIELD_REVENUE_OPTIMISTIC` | Recovered Revenue Optimistic |
| `GHL_FIELD_QUALIFIED` | Calculator Qualified |

## 6. Workflows

### Workflow A — Report email

**Trigger:** tag added `report-requested`

**Action:** send email

- Subject: `Your Revenue Recovery Opportunity Report`
- Body outline:
  - Thank them by first name and business name
  - State that this is an **estimate**, not a guarantee
  - Conservative / expected / optimistic monthly recovered **revenue** (custom values or “see the note on your contact”)
  - CTA button: Book a Revenue Recovery Review (`NEXT_PUBLIC_BOOKING_URL`)
  - Mention Lead → Appointment as the usual next package ($1,497 + $297/mo)

### Workflow B — Qualified nudge

**Trigger:** tag added `qualified`

**Actions:**

- Email: short note that the numbers suggest a Review is worth 20 minutes
- SMS **only if** tag `sms-opt-in` is present: one message with the booking link
- Wait 1–2 days; if no appointment, one follow-up email

### Workflow C — Review booked

**Trigger:** appointment booked on Revenue Recovery Review calendar

**Actions:**

- Move opportunity to **Review Booked**
- Internal notification to you
- Optional: remove from nurture wait steps

## 7. Qualification rule (mirrors the app)

Qualified when **all** are true:

1. Expected monthly recovered revenue ≥ **$2,000** (10% recovery rate × close rate × ACV × recoverable opportunities)
2. Timeline is `now`, `this_month`, or `this_quarter`
3. Someone is available to handle booked appointments

## 8. Smoke test

1. Leave GHL env vars empty → submit the calculator → report still appears; server logs `Skipping CRM sync`.
2. Fill `GHL_API_KEY` and `GHL_LOCATION_ID` → submit again → contact appears with tags and a report note.
3. Add pipeline IDs → opportunity appears in the correct stage.
4. Add custom field IDs → merge fields populate for Workflow A.

Until step 2, the website is safe to launch. The calculator and on-page report do not depend on HighLevel being live.
