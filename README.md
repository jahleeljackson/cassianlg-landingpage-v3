# Cassian AI Revenue Recovery Landing Page

Marketing site for **Cassian AI** (Cassian Consulting LLC). The page sells Revenue Recovery Systems and gates a **Revenue Recovery Opportunity Report** calculator.

## Setup

```bash
npm install
cp .env.example .env.local
```

Public env:

- `NEXT_PUBLIC_BOOKING_URL` — GoHighLevel calendar embed URL for the Revenue Recovery Review

Server env (optional until HighLevel is ready):

- `GHL_API_KEY` — Private Integration Token
- `GHL_LOCATION_ID`
- `GHL_PIPELINE_ID`
- `GHL_STAGE_REPORT_DELIVERED`, `GHL_STAGE_QUALIFIED`, `GHL_STAGE_NURTURE`
- Optional `GHL_FIELD_*` custom field IDs

Until booking and GHL are set, the calculator still runs on-page. Booking buttons scroll to `#book` and the calendar shows a placeholder. CRM sync is skipped.

See [docs/ghl-setup.md](docs/ghl-setup.md) for tags, pipeline stages, custom fields, and workflows to create in HighLevel.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Vercel is the typical host. Add the public booking URL and server GHL secrets as project environment variables before going live.
