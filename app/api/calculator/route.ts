import { NextResponse } from "next/server";
import { calculateRecovery, parseCalculatorPayload } from "@/lib/calculator";
import { syncCalculatorLead } from "@/lib/ghl";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = parseCalculatorPayload(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const result = calculateRecovery(parsed);
  const ghl = await syncCalculatorLead(parsed, result);

  return NextResponse.json({
    reportName: "Revenue Recovery Opportunity Report",
    result,
    ghl: {
      skipped: ghl.skipped,
      synced: ghl.synced,
    },
  });
}
