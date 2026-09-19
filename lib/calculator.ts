import { QUALIFIED_REVENUE_THRESHOLD, QUALIFIED_TIMELINES } from "@/lib/site";

export const RECOVERY_RATES = {
  conservative: 0.05,
  expected: 0.1,
  optimistic: 0.15,
} as const;

export type RecoveryScenario = keyof typeof RECOVERY_RATES;

export type TimelineValue =
  | "now"
  | "this_month"
  | "this_quarter"
  | "later"
  | "just_looking";

export type CalculatorInputs = {
  monthlyInquiries: number;
  monthlyCalls: number;
  missedCalls: number;
  monthlyEstimates: number;
  staleOpportunities: number;
  categoriesOverlap: boolean;
  averageCustomerValue: number;
  closeRate: number;
  grossMargin: number | null;
  firstResponseTime: string;
  followUpAttempts: number;
  missedCallAutoText: boolean;
  estimateAutoFollowUp: boolean;
  currentCrm: string;
  timeline: TimelineValue;
  canHandleAppointments: boolean;
};

export type ContactInfo = {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  industry: string;
  website: string;
  location: string;
  emailConsent: boolean;
  smsConsent: boolean;
};

export type CalculatorPayload = CalculatorInputs & ContactInfo;

export type ScenarioResult = {
  recoveryRate: number;
  recoveredRevenue: number;
  recoveredProfit: number | null;
};

export type CalculatorResult = {
  recoverableOpportunities: number;
  unworkedEstimates: number;
  opportunityBreakdown: {
    missedCalls: number;
    staleOpportunities: number;
    unworkedEstimates: number;
    method: "sum" | "max";
  };
  closeRate: number;
  averageCustomerValue: number;
  grossMargin: number | null;
  conservative: ScenarioResult;
  expected: ScenarioResult;
  optimistic: ScenarioResult;
  qualified: boolean;
  assumptions: string[];
};

function asFiniteNumber(value: unknown, fallback = 0) {
  const parsed =
    typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asBoolean(value: unknown) {
  return value === true || value === "true" || value === "yes";
}

function clampPercent(value: number) {
  if (value > 1 && value <= 100) {
    return value / 100;
  }
  if (value < 0) {
    return 0;
  }
  if (value > 1) {
    return 1;
  }
  return value;
}

export function unworkedEstimatesFrom(input: Pick<CalculatorInputs, "monthlyEstimates" | "estimateAutoFollowUp">) {
  return input.estimateAutoFollowUp ? 0 : Math.max(0, input.monthlyEstimates);
}

export function recoverableOpportunitiesFrom(input: CalculatorInputs) {
  const unworkedEstimates = unworkedEstimatesFrom(input);
  const missedCalls = Math.max(0, input.missedCalls);
  const staleOpportunities = Math.max(0, input.staleOpportunities);

  if (input.categoriesOverlap) {
    return {
      recoverableOpportunities: Math.max(missedCalls, staleOpportunities, unworkedEstimates),
      unworkedEstimates,
      method: "max" as const,
      missedCalls,
      staleOpportunities,
    };
  }

  return {
    recoverableOpportunities: missedCalls + staleOpportunities + unworkedEstimates,
    unworkedEstimates,
    method: "sum" as const,
    missedCalls,
    staleOpportunities,
  };
}

function scenarioResult(
  opportunities: number,
  recoveryRate: number,
  closeRate: number,
  averageCustomerValue: number,
  grossMargin: number | null,
): ScenarioResult {
  const recoveredRevenue = opportunities * recoveryRate * closeRate * averageCustomerValue;
  return {
    recoveryRate,
    recoveredRevenue,
    recoveredProfit:
      grossMargin === null ? null : recoveredRevenue * grossMargin,
  };
}

export function calculateRecovery(input: CalculatorInputs): CalculatorResult {
  const breakdown = recoverableOpportunitiesFrom(input);
  const closeRate = clampPercent(input.closeRate);
  const averageCustomerValue = Math.max(0, input.averageCustomerValue);
  const grossMargin =
    input.grossMargin === null || input.grossMargin === undefined
      ? null
      : clampPercent(input.grossMargin);

  const conservative = scenarioResult(
    breakdown.recoverableOpportunities,
    RECOVERY_RATES.conservative,
    closeRate,
    averageCustomerValue,
    grossMargin,
  );
  const expected = scenarioResult(
    breakdown.recoverableOpportunities,
    RECOVERY_RATES.expected,
    closeRate,
    averageCustomerValue,
    grossMargin,
  );
  const optimistic = scenarioResult(
    breakdown.recoverableOpportunities,
    RECOVERY_RATES.optimistic,
    closeRate,
    averageCustomerValue,
    grossMargin,
  );

  const timelineQualified = (QUALIFIED_TIMELINES as readonly string[]).includes(
    input.timeline,
  );
  const qualified =
    expected.recoveredRevenue >= QUALIFIED_REVENUE_THRESHOLD &&
    timelineQualified &&
    input.canHandleAppointments;

  const assumptions = [
    `Recoverable opportunities ${breakdown.method === "sum" ? "are the sum of" : "use the larger of"} missed calls (${breakdown.missedCalls}), stale opportunities (${breakdown.staleOpportunities}), and unworked estimates (${breakdown.unworkedEstimates}).`,
    input.estimateAutoFollowUp
      ? "Estimates are treated as already followed up, so monthly estimates are not added as unworked estimates."
      : "Estimates do not receive automated follow-up, so monthly estimates are counted as unworked estimates.",
    "Recovery rates are assumptions, not promises: conservative 5%, expected 10%, optimistic 15%.",
    `Close rate used: ${(closeRate * 100).toFixed(0)}%. Average customer value: $${Math.round(averageCustomerValue).toLocaleString("en-US")}.`,
    "Results are estimated monthly recovered revenue, not guaranteed returns.",
  ];

  if (grossMargin !== null) {
    assumptions.push(
      `Estimated gross profit uses the ${Math.round(grossMargin * 100)}% margin you provided and is shown separately from revenue.`,
    );
  }

  return {
    recoverableOpportunities: breakdown.recoverableOpportunities,
    unworkedEstimates: breakdown.unworkedEstimates,
    opportunityBreakdown: {
      missedCalls: breakdown.missedCalls,
      staleOpportunities: breakdown.staleOpportunities,
      unworkedEstimates: breakdown.unworkedEstimates,
      method: breakdown.method,
    },
    closeRate,
    averageCustomerValue,
    grossMargin,
    conservative,
    expected,
    optimistic,
    qualified,
    assumptions,
  };
}

export function parseCalculatorPayload(body: unknown): CalculatorPayload | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request." };
  }

  const data = body as Record<string, unknown>;
  const firstName = String(data.firstName ?? "").trim();
  const lastName = String(data.lastName ?? "").trim();
  const businessName = String(data.businessName ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const emailConsent = asBoolean(data.emailConsent);

  if (!firstName || !lastName) {
    return { error: "First and last name are required." };
  }
  if (!businessName) {
    return { error: "Business name is required." };
  }
  if (!email || !email.includes("@")) {
    return { error: "A valid work email is required." };
  }
  if (!phone) {
    return { error: "Phone number is required." };
  }
  if (!emailConsent) {
    return { error: "Consent to receive the report is required." };
  }

  const missedCalls = asFiniteNumber(data.missedCalls);
  const monthlyEstimates = asFiniteNumber(data.monthlyEstimates);
  const staleOpportunities = asFiniteNumber(data.staleOpportunities);
  const averageCustomerValue = asFiniteNumber(data.averageCustomerValue);
  const closeRate = asFiniteNumber(data.closeRate);

  if (missedCalls < 0 || monthlyEstimates < 0 || staleOpportunities < 0) {
    return { error: "Lead-volume numbers cannot be negative." };
  }
  if (averageCustomerValue <= 0) {
    return { error: "Average customer value is required." };
  }
  if (closeRate <= 0) {
    return { error: "Lead-to-customer close rate is required." };
  }

  const rawMargin = data.grossMargin;
  const grossMargin =
    rawMargin === null || rawMargin === undefined || rawMargin === ""
      ? null
      : asFiniteNumber(rawMargin, NaN);
  if (grossMargin !== null && !Number.isFinite(grossMargin)) {
    return { error: "Gross margin must be a number." };
  }

  const timeline = String(data.timeline ?? "") as TimelineValue;
  if (!timeline) {
    return { error: "Implementation timeline is required." };
  }

  const firstResponseTime = String(data.firstResponseTime ?? "").trim();
  if (!firstResponseTime) {
    return { error: "Typical first-response time is required." };
  }

  return {
    monthlyInquiries: Math.max(0, asFiniteNumber(data.monthlyInquiries)),
    monthlyCalls: Math.max(0, asFiniteNumber(data.monthlyCalls)),
    missedCalls,
    monthlyEstimates,
    staleOpportunities,
    categoriesOverlap: asBoolean(data.categoriesOverlap),
    averageCustomerValue,
    closeRate,
    grossMargin,
    firstResponseTime,
    followUpAttempts: Math.max(0, asFiniteNumber(data.followUpAttempts)),
    missedCallAutoText: asBoolean(data.missedCallAutoText),
    estimateAutoFollowUp: asBoolean(data.estimateAutoFollowUp),
    currentCrm: String(data.currentCrm ?? "").trim(),
    timeline,
    canHandleAppointments: asBoolean(data.canHandleAppointments),
    firstName,
    lastName,
    businessName,
    email,
    phone,
    industry: String(data.industry ?? "").trim(),
    website: String(data.website ?? "").trim(),
    location: String(data.location ?? "").trim(),
    emailConsent,
    smsConsent: asBoolean(data.smsConsent),
  };
}

export function formatReportNote(payload: CalculatorPayload, result: CalculatorResult) {
  const lines = [
    "Revenue Recovery Opportunity Report",
    `Business: ${payload.businessName}`,
    `Industry: ${payload.industry || "—"}`,
    `Location: ${payload.location || "—"}`,
    `Website: ${payload.website || "—"}`,
    "",
    `Monthly inquiries: ${payload.monthlyInquiries}`,
    `Monthly calls: ${payload.monthlyCalls}`,
    `Missed calls: ${payload.missedCalls}`,
    `Monthly estimates: ${payload.monthlyEstimates}`,
    `Stale opportunities: ${payload.staleOpportunities}`,
    `Categories overlap: ${payload.categoriesOverlap ? "yes" : "no"}`,
    `Recoverable opportunities: ${result.recoverableOpportunities}`,
    "",
    `ACV: ${payload.averageCustomerValue}`,
    `Close rate: ${payload.closeRate}`,
    `Gross margin: ${payload.grossMargin ?? "—"}`,
    "",
    `Conservative monthly revenue: ${Math.round(result.conservative.recoveredRevenue)}`,
    `Expected monthly revenue: ${Math.round(result.expected.recoveredRevenue)}`,
    `Optimistic monthly revenue: ${Math.round(result.optimistic.recoveredRevenue)}`,
    `Qualified: ${result.qualified ? "yes" : "no"}`,
    "",
    `First response: ${payload.firstResponseTime}`,
    `Follow-up attempts: ${payload.followUpAttempts}`,
    `Missed-call auto text: ${payload.missedCallAutoText ? "yes" : "no"}`,
    `Estimate auto follow-up: ${payload.estimateAutoFollowUp ? "yes" : "no"}`,
    `CRM: ${payload.currentCrm || "—"}`,
    `Timeline: ${payload.timeline}`,
    `Can handle appointments: ${payload.canHandleAppointments ? "yes" : "no"}`,
    `SMS consent: ${payload.smsConsent ? "yes" : "no"}`,
  ];

  return lines.join("\n");
}
