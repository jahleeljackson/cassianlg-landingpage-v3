import {
  type CalculatorPayload,
  type CalculatorResult,
  formatReportNote,
} from "@/lib/calculator";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

export function isGhlConfigured() {
  return Boolean(process.env.GHL_API_KEY?.trim() && process.env.GHL_LOCATION_ID?.trim());
}

function ghlHeaders() {
  return {
    Authorization: `Bearer ${process.env.GHL_API_KEY?.trim()}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

function optionalEnv(name: string) {
  return process.env[name]?.trim() || "";
}

function customFieldsFrom(payload: CalculatorPayload, result: CalculatorResult) {
  const mapping: Array<[string, string | number]> = [
    ["GHL_FIELD_MONTHLY_INQUIRIES", payload.monthlyInquiries],
    ["GHL_FIELD_MONTHLY_CALLS", payload.monthlyCalls],
    ["GHL_FIELD_MISSED_CALLS", payload.missedCalls],
    ["GHL_FIELD_MONTHLY_ESTIMATES", payload.monthlyEstimates],
    ["GHL_FIELD_STALE_OPPORTUNITIES", payload.staleOpportunities],
    ["GHL_FIELD_ACV", payload.averageCustomerValue],
    ["GHL_FIELD_CLOSE_RATE", payload.closeRate],
    ["GHL_FIELD_GROSS_MARGIN", payload.grossMargin ?? ""],
    ["GHL_FIELD_RESPONSE_TIME", payload.firstResponseTime],
    ["GHL_FIELD_FOLLOW_UP_ATTEMPTS", payload.followUpAttempts],
    ["GHL_FIELD_MISSED_CALL_SMS", payload.missedCallAutoText ? "yes" : "no"],
    ["GHL_FIELD_ESTIMATE_FOLLOWUP", payload.estimateAutoFollowUp ? "yes" : "no"],
    ["GHL_FIELD_CURRENT_CRM", payload.currentCrm],
    ["GHL_FIELD_TIMELINE", payload.timeline],
    ["GHL_FIELD_CAN_HANDLE_APPOINTMENTS", payload.canHandleAppointments ? "yes" : "no"],
    ["GHL_FIELD_RECOVERABLE", result.recoverableOpportunities],
    ["GHL_FIELD_REVENUE_CONSERVATIVE", Math.round(result.conservative.recoveredRevenue)],
    ["GHL_FIELD_REVENUE_EXPECTED", Math.round(result.expected.recoveredRevenue)],
    ["GHL_FIELD_REVENUE_OPTIMISTIC", Math.round(result.optimistic.recoveredRevenue)],
    ["GHL_FIELD_QUALIFIED", result.qualified ? "yes" : "no"],
  ];

  return mapping
    .map(([envName, value]) => {
      const id = optionalEnv(envName);
      if (!id) {
        return null;
      }
      return { id, field_value: value };
    })
    .filter((field): field is { id: string; field_value: string | number } => field !== null);
}

function tagsFrom(payload: CalculatorPayload, result: CalculatorResult) {
  const tags = [
    "source-calculator",
    "report-requested",
    "offer-lead-to-appointment",
    result.qualified ? "qualified" : "nurture",
    payload.smsConsent ? "sms-opt-in" : "sms-opt-out",
  ];
  return tags;
}

async function ghlFetch(path: string, init: RequestInit) {
  const response = await fetch(`${GHL_BASE}${path}`, {
    ...init,
    headers: {
      ...ghlHeaders(),
      ...(init.headers ?? {}),
    },
  });

  const text = await response.text();
  let json: unknown = null;
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }
  }

  if (!response.ok) {
    throw new Error(
      `GHL ${init.method ?? "GET"} ${path} failed (${response.status}): ${text.slice(0, 500)}`,
    );
  }

  return json as Record<string, unknown>;
}

async function upsertContact(payload: CalculatorPayload, result: CalculatorResult) {
  const locationId = process.env.GHL_LOCATION_ID?.trim();
  const customFields = customFieldsFrom(payload, result);
  const body: Record<string, unknown> = {
    locationId,
    firstName: payload.firstName,
    lastName: payload.lastName,
    name: `${payload.firstName} ${payload.lastName}`,
    email: payload.email,
    phone: payload.phone,
    companyName: payload.businessName,
    website: payload.website || undefined,
    source: "Revenue Recovery Calculator",
    tags: tagsFrom(payload, result),
  };

  if (payload.location) {
    body.address1 = payload.location;
  }
  if (customFields.length > 0) {
    body.customFields = customFields;
  }

  const json = await ghlFetch("/contacts/upsert", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const contact =
    (json.contact as Record<string, unknown> | undefined) ??
    (json as Record<string, unknown>);
  const contactId = String(contact.id ?? contact.contactId ?? "");

  if (!contactId) {
    throw new Error("GHL upsert succeeded but returned no contact id.");
  }

  return contactId;
}

async function addNote(contactId: string, body: string) {
  await ghlFetch(`/contacts/${contactId}/notes`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
}

async function createOpportunity(
  contactId: string,
  payload: CalculatorPayload,
  result: CalculatorResult,
) {
  const pipelineId = optionalEnv("GHL_PIPELINE_ID");
  if (!pipelineId) {
    return;
  }

  const qualifiedStage = optionalEnv("GHL_STAGE_QUALIFIED");
  const nurtureStage = optionalEnv("GHL_STAGE_NURTURE");
  const deliveredStage = optionalEnv("GHL_STAGE_REPORT_DELIVERED");
  const pipelineStageId = result.qualified
    ? qualifiedStage || deliveredStage
    : nurtureStage || deliveredStage;

  if (!pipelineStageId) {
    return;
  }

  await ghlFetch("/opportunities/", {
    method: "POST",
    body: JSON.stringify({
      pipelineId,
      locationId: process.env.GHL_LOCATION_ID?.trim(),
      name: `${payload.businessName} — Revenue Recovery`,
      pipelineStageId,
      status: "open",
      contactId,
      monetaryValue: Math.round(result.expected.recoveredRevenue),
      source: "Revenue Recovery Calculator",
    }),
  });
}

export type GhlSyncStatus = {
  attempted: boolean;
  synced: boolean;
  skipped: boolean;
  error?: string;
};

export async function syncCalculatorLead(
  payload: CalculatorPayload,
  result: CalculatorResult,
): Promise<GhlSyncStatus> {
  if (!isGhlConfigured()) {
    console.info("[ghl] Skipping CRM sync — GHL_API_KEY or GHL_LOCATION_ID is not set.");
    return { attempted: false, synced: false, skipped: true };
  }

  try {
    const contactId = await upsertContact(payload, result);
    await addNote(contactId, formatReportNote(payload, result));
    await createOpportunity(contactId, payload, result);
    return { attempted: true, synced: true, skipped: false };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown GHL error";
    console.error("[ghl] CRM sync failed:", message);
    return { attempted: true, synced: false, skipped: false, error: message };
  }
}
