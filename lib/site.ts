const DEFAULT_BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/booking/BX691Gj3uOHrHsrogaDh";
const DEFAULT_FORM_URL =
  "https://api.leadconnectorhq.com/widget/form/Rjoge8cVnOWJVFQN5AmC";

export const site = {
  name: "Cassian AI",
  legalName: "Cassian Consulting LLC",
  dba: "Cassian AI",
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || DEFAULT_BOOKING_URL,
  formUrl: process.env.NEXT_PUBLIC_FORM_URL?.trim() || DEFAULT_FORM_URL,
  headline:
    "Recover the revenue already sitting in missed calls, estimates, and stale leads.",
  subheadline:
    "Automated systems that help service businesses capture, follow up with, and convert more of the opportunities they already generate.",
  description:
    "Cassian AI builds revenue recovery systems for service businesses: instant follow-up, appointment booking, and conversion of missed calls, estimates, and stale opportunities.",
  positioning:
    "Never let a missed call, web inquiry, estimate, or stale opportunity become a lost customer.",
  calculatorHeadline:
    "How Much Revenue Could Your Business Recover From Existing Leads?",
  calculatorSubheadline:
    "Answer a few questions about your calls, inquiries, estimates, and follow-up process. We’ll estimate where revenue may be leaking and show you what recovering those opportunities could be worth.",
  calculatorCta: "Calculate My Revenue Recovery Potential",
  reportName: "Revenue Recovery Opportunity Report",
  primaryCta: "Calculate My Revenue Recovery Potential",
  secondaryCta: "Book a Revenue Recovery Review",
};

export const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#offer", label: "Offer" },
  { href: "#calculator", label: "Calculator" },
  { href: "#faqs", label: "FAQs" },
  { href: "#book", label: "Book a call" },
] as const;

export const problems = [
  {
    title: "No time to follow up with inbound leads",
    body: "A new inquiry comes in while you are on a job, in a truck, or putting out another fire. By the time you call back, they have already booked with someone else.",
  },
  {
    title: "Revenue lost due to other fires",
    body: "Operations always win the day. Sales wait. Missed calls, unanswered forms, and untouched estimates quietly become lost jobs.",
  },
  {
    title: "No time to immediately convert inbound leads into revenue",
    body: "Speed is the conversion. If you cannot text, email, qualify, and book in the first minutes, most of the demand you already paid to generate leaks out of the business.",
  },
] as const;

export const hbrStudy = {
  title: "The Short Life of Online Sales Leads",
  publication: "Harvard Business Review",
  date: "March 2011",
  href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
  body: "Harvard Business Review’s widely cited analysis, “The Short Life of Online Sales Leads,” examined approximately 3.5 million online leads across 2,241 companies. The study found that companies attempting to contact a potential customer within one hour of an inquiry were nearly seven times more likely to qualify the lead than companies that waited an additional hour. Companies that waited 24 hours or longer were substantially less likely to qualify the lead—HBR reported that the faster-responding companies were more than 60 times as likely to qualify the lead as those waiting at least a day.",
};

export const speedStats = [
  {
    stat: "391%",
    label: "The 1-Minute Boost",
    body: "Contacting a prospect within 60 seconds can increase conversion or sales rates by up to 391%.",
  },
  {
    stat: "78%",
    label: "The First Responder Advantage",
    body: "About 78% of customers buy from the first company that responds.",
  },
  {
    stat: "8×–21×",
    label: "Drop-off After 5 Minutes",
    body: "Your odds of qualifying a lead drop sharply—up to 8× to 21× lower—if you miss the 5-minute window and wait even a short while or hours.",
  },
] as const;

export const industryBenchmarks = [
  {
    stat: "42–47 hrs",
    label: "Average Response Time",
    body: "Most B2B and inside-sales companies take between 42 to 47 hours to reply to a new lead.",
  },
  {
    stat: "23–38%",
    label: "Failure to Reply",
    body: "Roughly 23% to 38% (and up to 63.5% in broader mystery-shopper audits) of companies never respond to inbound leads at all.",
  },
  {
    stat: "7–23%",
    label: "5-Minute Compliance",
    body: "Only 7% to 23% of businesses actually manage to hit the 5-minute benchmark consistently.",
  },
] as const;

export const problemSources = [
  {
    label: "Harvard Business Review, “The Short Life of Online Sales Leads,” March 2011",
    href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
  },
  {
    label: "InsideSales",
    href: "https://www.insidesales.com/response-time-matters/",
  },
  {
    label: "LinkedIn / Cold Email Chris",
    href: "https://www.linkedin.com/posts/coldemailchris_harvard-business-review-ran-a-study-on-speed-activity-7402757679984881665-1wm2",
  },
  {
    label: "CallSetter",
    href: "https://callsetter.ai/blog/speed-to-lead",
  },
  {
    label: "Teamgate",
    href: "https://www.teamgate.com/blog/lead-response-time-study-speed-impacts-revenue/",
  },
  {
    label: "Perspective",
    href: "https://getperspective.ai/blog/lead-response-time-2026-benchmarks-and-what-actually-converts",
  },
  {
    label: "Casey Response",
    href: "https://caseyresponse.com/blog/lead-response-time-statistics",
  },
  {
    label: "Chili Piper",
    href: "https://www.chilipiper.com/article/speed-to-lead-statistics",
  },
] as const;

export const offerTiers = [
  {
    id: "lead-recovery",
    name: "Lead Recovery",
    setup: 997,
    monthly: 197,
    term: "3 months",
    bestFor: "Faster response and consistent follow-up",
    recommended: false,
    features: [
      "Instant lead response via SMS and email",
      "Automated follow-up sequences",
      "Missed-call recovery",
      "CRM pipeline setup",
      "Internal notifications",
      "Basic monitoring, maintenance, and reporting",
    ],
  },
  {
    id: "lead-to-appointment",
    name: "Lead → Appointment",
    setup: 1497,
    monthly: 297,
    term: "3 months",
    bestFor: "Turning inquiries into booked appointments",
    recommended: true,
    intro: "Everything in Lead Recovery, plus:",
    features: [
      "Automated appointment booking",
      "Lead qualification and routing",
      "Appointment confirmations and reminders",
      "No-show recovery",
      "Monthly optimization",
    ],
  },
  {
    id: "revenue-recovery",
    name: "Revenue Recovery",
    setup: 2497,
    monthly: 497,
    term: "3 months",
    bestFor: "Recovering opportunities across the sales pipeline",
    recommended: false,
    intro: "Everything in Lead → Appointment, plus:",
    features: [
      "Estimate and quote follow-up",
      "Stale lead reactivation",
      "Past-customer reactivation",
      "Review automation",
      "Revenue opportunity alerts",
      "Enhanced reporting and optimization",
    ],
  },
] as const;

export const faqs = [
  {
    question: "What is a Revenue Recovery System?",
    answer:
      "It is an automated system that captures inbound demand, follows up immediately, and converts more of the calls, forms, estimates, and stale opportunities you already generate. You are buying a revenue-conversion system—not a generic CRM subscription.",
  },
  {
    question: "Which package should I start with?",
    answer:
      "Most service businesses start with Lead → Appointment ($1,497 setup + $297/month). It is the recommended default: instant response plus booking, reminders, and no-show recovery. Choose Lead Recovery if you only need faster follow-up, or Revenue Recovery if you also want estimate, stale-lead, and past-customer reactivation.",
  },
  {
    question: "What does the monthly fee include?",
    answer:
      "Software infrastructure, workflow monitoring, maintenance, troubleshooting, and ongoing optimization. It is not a bare software seat.",
  },
  {
    question: "Is there a minimum term?",
    answer:
      "Yes. Every tier has a three-month minimum so the system has time to run, get optimized, and produce a fair read on recovered opportunities.",
  },
  {
    question: "Is the calculator a guarantee of recovered revenue?",
    answer:
      "No. The Revenue Recovery Opportunity Report is an estimate based on the numbers you enter and transparent recovery-rate assumptions (5%, 10%, and 15%). It is not a promise of results. We show a range and list the assumptions used.",
  },
  {
    question: "Who is this for?",
    answer:
      "Service businesses that already generate inbound calls, web inquiries, or estimates and lose work because follow-up is slow or inconsistent—home services, contractors, restoration, agencies, and similar operators.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Typical onboarding for Lead → Appointment starts after a Revenue Recovery Review. Exact timing depends on your current phone, forms, calendar, and CRM setup, which we map on the call.",
  },
  {
    question: "Do I need a CRM already?",
    answer:
      "No. If you already use a platform, we work with what you have where it makes sense. If you do not, the system includes CRM pipeline setup as part of Lead Recovery and above.",
  },
  {
    question: "What happens on the Revenue Recovery Review?",
    answer:
      "We walk through your report, where revenue is leaking, and which Revenue Recovery package is the right next step. We do not install the system on that call.",
  },
] as const;

export const calculatorSteps = [
  { id: 1, label: "Lead volume" },
  { id: 2, label: "Sales economics" },
  { id: 3, label: "Follow-up" },
  { id: 4, label: "Readiness" },
  { id: 5, label: "Your details" },
] as const;

export const industries = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Restoration",
  "Landscaping",
  "Cleaning",
  "Home services",
  "Insurance",
  "Agency",
  "Consulting",
  "Other",
] as const;

export const responseTimeOptions = [
  { value: "under_5_minutes", label: "Under 5 minutes" },
  { value: "under_1_hour", label: "Under 1 hour" },
  { value: "same_day", label: "Same day" },
  { value: "24_hours", label: "About 24 hours" },
  { value: "2_3_days", label: "2–3 days" },
  { value: "a_week_or_more", label: "A week or more" },
  { value: "often_none", label: "We often do not respond" },
] as const;

export const timelineOptions = [
  { value: "now", label: "As soon as possible" },
  { value: "this_month", label: "This month" },
  { value: "this_quarter", label: "This quarter" },
  { value: "later", label: "Later this year" },
  { value: "just_looking", label: "Just exploring" },
] as const;

export const crmOptions = [
  "None",
  "GoHighLevel",
  "HubSpot",
  "Salesforce",
  "Jobber",
  "ServiceTitan",
  "Housecall Pro",
  "Spreadsheet",
  "Other",
] as const;

export const QUALIFIED_REVENUE_THRESHOLD = 2000;
export const QUALIFIED_TIMELINES = ["now", "this_month", "this_quarter"] as const;

export function bookingHref() {
  return "#book";
}

export function isBookingConfigured() {
  return site.bookingUrl.length > 0;
}

export function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}
