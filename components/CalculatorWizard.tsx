"use client";

import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import { BookingButton } from "@/components/BookingButton";
import {
  type CalculatorPayload,
  type CalculatorResult,
  type TimelineValue,
  calculateRecovery,
} from "@/lib/calculator";
import {
  calculatorSteps,
  crmOptions,
  formatUsd,
  industries,
  responseTimeOptions,
  site,
  timelineOptions,
} from "@/lib/site";

type YesNo = "yes" | "no";

type FormState = {
  monthlyInquiries: string;
  monthlyCalls: string;
  missedCalls: string;
  monthlyEstimates: string;
  staleOpportunities: string;
  categoriesOverlap: YesNo;
  averageCustomerValue: string;
  closeRate: string;
  grossMargin: string;
  firstResponseTime: string;
  followUpAttempts: string;
  missedCallAutoText: YesNo;
  estimateAutoFollowUp: YesNo;
  currentCrm: string;
  timeline: string;
  canHandleAppointments: YesNo;
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

const emptyForm: FormState = {
  monthlyInquiries: "",
  monthlyCalls: "",
  missedCalls: "",
  monthlyEstimates: "",
  staleOpportunities: "",
  categoriesOverlap: "no",
  averageCustomerValue: "",
  closeRate: "",
  grossMargin: "",
  firstResponseTime: "",
  followUpAttempts: "",
  missedCallAutoText: "no",
  estimateAutoFollowUp: "no",
  currentCrm: "",
  timeline: "",
  canHandleAppointments: "yes",
  firstName: "",
  lastName: "",
  businessName: "",
  email: "",
  phone: "",
  industry: "",
  website: "",
  location: "",
  emailConsent: false,
  smsConsent: false,
};

const fieldClass =
  "mt-1.5 w-full border border-gray-line bg-cream px-3 py-2.5 text-navy outline-none transition focus:border-navy";

function toNumber(value: string) {
  if (value.trim() === "") {
    return 0;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function optionalNumber(value: string) {
  if (value.trim() === "") {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function toPayload(form: FormState): CalculatorPayload {
  return {
    monthlyInquiries: toNumber(form.monthlyInquiries),
    monthlyCalls: toNumber(form.monthlyCalls),
    missedCalls: toNumber(form.missedCalls),
    monthlyEstimates: toNumber(form.monthlyEstimates),
    staleOpportunities: toNumber(form.staleOpportunities),
    categoriesOverlap: form.categoriesOverlap === "yes",
    averageCustomerValue: toNumber(form.averageCustomerValue),
    closeRate: toNumber(form.closeRate),
    grossMargin: optionalNumber(form.grossMargin),
    firstResponseTime: form.firstResponseTime,
    followUpAttempts: toNumber(form.followUpAttempts),
    missedCallAutoText: form.missedCallAutoText === "yes",
    estimateAutoFollowUp: form.estimateAutoFollowUp === "yes",
    currentCrm: form.currentCrm,
    timeline: form.timeline as TimelineValue,
    canHandleAppointments: form.canHandleAppointments === "yes",
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    businessName: form.businessName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    industry: form.industry,
    website: form.website.trim(),
    location: form.location.trim(),
    emailConsent: form.emailConsent,
    smsConsent: form.smsConsent,
  };
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs leading-5 text-gray">{hint}</span> : null}
    </label>
  );
}

function YesNo({
  name,
  value,
  onChange,
  yesLabel = "Yes",
  noLabel = "No",
}: {
  name: string;
  value: YesNo;
  onChange: (value: YesNo) => void;
  yesLabel?: string;
  noLabel?: string;
}) {
  return (
    <div className="mt-1.5 flex gap-3">
      {(
        [
          ["yes", yesLabel],
          ["no", noLabel],
        ] as const
      ).map(([option, label]) => (
        <label
          key={option}
          className={`flex flex-1 cursor-pointer items-center justify-center border px-3 py-2.5 text-sm ${
            value === option
              ? "border-navy bg-navy text-cream"
              : "border-gray-line text-navy"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="sr-only"
          />
          {label}
        </label>
      ))}
    </div>
  );
}

function StepFields({
  step,
  form,
  setForm,
}: {
  step: number;
  form: FormState;
  setForm: (next: FormState) => void;
}) {
  const update = (patch: Partial<FormState>) => setForm({ ...form, ...patch });

  if (step === 1) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Monthly inbound inquiries">
          <input
            type="number"
            min={0}
            inputMode="numeric"
            className={fieldClass}
            value={form.monthlyInquiries}
            onChange={(event) => update({ monthlyInquiries: event.target.value })}
          />
        </Field>
        <Field label="Monthly inbound phone calls">
          <input
            type="number"
            min={0}
            inputMode="numeric"
            className={fieldClass}
            value={form.monthlyCalls}
            onChange={(event) => update({ monthlyCalls: event.target.value })}
          />
        </Field>
        <Field label="Average missed calls per month" hint="Required for the estimate.">
          <input
            required
            type="number"
            min={0}
            inputMode="numeric"
            className={fieldClass}
            value={form.missedCalls}
            onChange={(event) => update({ missedCalls: event.target.value })}
          />
        </Field>
        <Field label="Monthly estimates or quotes" hint="Required for the estimate.">
          <input
            required
            type="number"
            min={0}
            inputMode="numeric"
            className={fieldClass}
            value={form.monthlyEstimates}
            onChange={(event) => update({ monthlyEstimates: event.target.value })}
          />
        </Field>
        <Field
          label="Stale or inactive opportunities"
          hint="Leads or jobs that went quiet."
        >
          <input
            required
            type="number"
            min={0}
            inputMode="numeric"
            className={fieldClass}
            value={form.staleOpportunities}
            onChange={(event) => update({ staleOpportunities: event.target.value })}
          />
        </Field>
        <div>
          <p className="text-sm font-semibold text-navy">
            Do these counts overlap (the same jobs counted more than once)?
          </p>
          <YesNo
            name="categoriesOverlap"
            value={form.categoriesOverlap}
            onChange={(value) => update({ categoriesOverlap: value })}
          />
          <p className="mt-1 text-xs leading-5 text-gray">
            If yes, we use the larger category so we do not double-count. If no,
            we add missed calls, unworked estimates, and stale opportunities.
          </p>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Average customer value ($)" hint="What a typical won job is worth.">
          <input
            required
            type="number"
            min={0}
            step="1"
            inputMode="decimal"
            className={fieldClass}
            value={form.averageCustomerValue}
            onChange={(event) => update({ averageCustomerValue: event.target.value })}
          />
        </Field>
        <Field
          label="Approximate lead-to-customer close rate (%)"
          hint="If 1 in 5 quotes become customers, enter 20."
        >
          <input
            required
            type="number"
            min={0}
            max={100}
            step="1"
            inputMode="decimal"
            className={fieldClass}
            value={form.closeRate}
            onChange={(event) => update({ closeRate: event.target.value })}
          />
        </Field>
        <Field
          label="Gross margin % (optional)"
          hint="If provided, we will also show estimated gross profit. Otherwise we only show revenue."
        >
          <input
            type="number"
            min={0}
            max={100}
            step="1"
            inputMode="decimal"
            className={fieldClass}
            value={form.grossMargin}
            onChange={(event) => update({ grossMargin: event.target.value })}
          />
        </Field>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Typical first-response time">
          <select
            required
            className={fieldClass}
            value={form.firstResponseTime}
            onChange={(event) => update({ firstResponseTime: event.target.value })}
          >
            <option value="">Select one</option>
            {responseTimeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Number of follow-up attempts">
          <input
            type="number"
            min={0}
            inputMode="numeric"
            className={fieldClass}
            value={form.followUpAttempts}
            onChange={(event) => update({ followUpAttempts: event.target.value })}
          />
        </Field>
        <div>
          <p className="text-sm font-semibold text-navy">
            Do missed calls receive an automatic text?
          </p>
          <YesNo
            name="missedCallAutoText"
            value={form.missedCallAutoText}
            onChange={(value) => update({ missedCallAutoText: value })}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-navy">
            Do estimates or quotes receive automated follow-up?
          </p>
          <YesNo
            name="estimateAutoFollowUp"
            value={form.estimateAutoFollowUp}
            onChange={(value) => update({ estimateAutoFollowUp: value })}
          />
        </div>
        <Field label="Current CRM or automation platform">
          <select
            className={fieldClass}
            value={form.currentCrm}
            onChange={(event) => update({ currentCrm: event.target.value })}
          >
            <option value="">Select one</option>
            {crmOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Desired implementation timeline">
          <select
            required
            className={fieldClass}
            value={form.timeline}
            onChange={(event) => update({ timeline: event.target.value })}
          >
            <option value="">Select one</option>
            {timelineOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <div>
          <p className="text-sm font-semibold text-navy">
            Is someone available to answer or handle booked appointments?
          </p>
          <YesNo
            name="canHandleAppointments"
            value={form.canHandleAppointments}
            onChange={(value) => update({ canHandleAppointments: value })}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="First name">
        <input
          required
          autoComplete="given-name"
          className={fieldClass}
          value={form.firstName}
          onChange={(event) => update({ firstName: event.target.value })}
        />
      </Field>
      <Field label="Last name">
        <input
          required
          autoComplete="family-name"
          className={fieldClass}
          value={form.lastName}
          onChange={(event) => update({ lastName: event.target.value })}
        />
      </Field>
      <Field label="Business name">
        <input
          required
          autoComplete="organization"
          className={fieldClass}
          value={form.businessName}
          onChange={(event) => update({ businessName: event.target.value })}
        />
      </Field>
      <Field label="Work email">
        <input
          required
          type="email"
          autoComplete="email"
          className={fieldClass}
          value={form.email}
          onChange={(event) => update({ email: event.target.value })}
        />
      </Field>
      <Field label="Phone number">
        <input
          required
          type="tel"
          autoComplete="tel"
          className={fieldClass}
          value={form.phone}
          onChange={(event) => update({ phone: event.target.value })}
        />
      </Field>
      <Field label="Industry">
        <select
          className={fieldClass}
          value={form.industry}
          onChange={(event) => update({ industry: event.target.value })}
        >
          <option value="">Select one</option>
          {industries.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Website">
        <input
          type="url"
          autoComplete="url"
          placeholder="https://"
          className={fieldClass}
          value={form.website}
          onChange={(event) => update({ website: event.target.value })}
        />
      </Field>
      <Field label="Service area or location">
        <input
          autoComplete="address-level2"
          className={fieldClass}
          value={form.location}
          onChange={(event) => update({ location: event.target.value })}
        />
      </Field>
      <label className="sm:col-span-2 flex items-start gap-3 text-sm leading-6 text-gray">
        <input
          required
          type="checkbox"
          className="mt-1"
          checked={form.emailConsent}
          onChange={(event) => update({ emailConsent: event.target.checked })}
        />
        <span>
          I agree to receive the {site.reportName} and relevant follow-up from{" "}
          {site.legalName}.
        </span>
      </label>
      <label className="sm:col-span-2 flex items-start gap-3 text-sm leading-6 text-gray">
        <input
          type="checkbox"
          className="mt-1"
          checked={form.smsConsent}
          onChange={(event) => update({ smsConsent: event.target.checked })}
        />
        <span>
          Optional: I consent to receive text messages about this report and a
          Revenue Recovery Review. Message and data rates may apply. Reply STOP
          to opt out.
        </span>
      </label>
    </div>
  );
}

function Report({ result }: { result: CalculatorResult }) {
  return (
    <div className="border border-navy bg-cream px-6 py-8 sm:px-10">
      <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-gray">
        {site.reportName}
      </p>
      <h3 className="mt-4 font-serif text-3xl leading-tight text-navy sm:text-4xl">
        Estimated monthly recovered revenue
      </h3>
      <p className="mt-6 font-serif text-5xl tracking-tight text-navy">
        {formatUsd(result.expected.recoveredRevenue)}
      </p>
      <p className="mt-3 text-sm text-gray">Expected scenario (10% recovery rate)</p>
      <p className="mt-6 text-lg text-navy">
        Range: {formatUsd(result.conservative.recoveredRevenue)} –{" "}
        {formatUsd(result.optimistic.recoveredRevenue)}
        <span className="block text-sm text-gray">
          Conservative 5% to optimistic 15%. This is estimated revenue, not a
          guarantee.
        </span>
      </p>

      {result.grossMargin !== null && result.expected.recoveredProfit !== null ? (
        <div className="mt-8 border-t border-gray-line pt-6">
          <p className="text-sm font-semibold text-navy">Estimated monthly gross profit</p>
          <p className="mt-2 font-serif text-3xl text-navy">
            {formatUsd(result.expected.recoveredProfit)}
          </p>
          <p className="mt-2 text-sm text-gray">
            Range: {formatUsd(result.conservative.recoveredProfit ?? 0)} –{" "}
            {formatUsd(result.optimistic.recoveredProfit ?? 0)}, using the margin
            you provided. Profit is shown separately from revenue.
          </p>
        </div>
      ) : null}

      <dl className="mt-8 grid gap-4 border-t border-gray-line pt-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-gray">
            Recoverable opportunities
          </dt>
          <dd className="mt-1 text-lg text-navy">{result.recoverableOpportunities}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-gray">
            Count method
          </dt>
          <dd className="mt-1 text-lg text-navy">
            {result.opportunityBreakdown.method === "sum"
              ? "Added separately"
              : "Largest category only"}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-gray">Missed calls</dt>
          <dd className="mt-1 text-lg text-navy">
            {result.opportunityBreakdown.missedCalls}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-gray">
            Unworked estimates
          </dt>
          <dd className="mt-1 text-lg text-navy">
            {result.opportunityBreakdown.unworkedEstimates}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-gray">
            Stale opportunities
          </dt>
          <dd className="mt-1 text-lg text-navy">
            {result.opportunityBreakdown.staleOpportunities}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-gray">
            Close rate × ACV
          </dt>
          <dd className="mt-1 text-lg text-navy">
            {(result.closeRate * 100).toFixed(0)}% × {formatUsd(result.averageCustomerValue)}
          </dd>
        </div>
      </dl>

      <div className="mt-8 border-t border-gray-line pt-6">
        <p className="text-sm font-semibold text-navy">Assumptions used</p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-gray">
          {result.assumptions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-base leading-7 text-navy">
        The next step is a Revenue Recovery Review to map the leak and choose
        the right package.
      </p>
      <BookingButton className="mt-6">Book a Revenue Recovery Review</BookingButton>
    </div>
  );
}

export function CalculatorWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  useEffect(() => {
    if (!result) {
      return;
    }
    document.getElementById("calculator")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [result]);

  function validateStep(current: number) {
    if (current === 1) {
      if (form.missedCalls === "" || form.monthlyEstimates === "" || form.staleOpportunities === "") {
        return "Enter missed calls, monthly estimates, and stale opportunities. Zero is fine.";
      }
    }
    if (current === 2) {
      if (!form.averageCustomerValue || Number(form.averageCustomerValue) <= 0) {
        return "Average customer value is required.";
      }
      if (!form.closeRate || Number(form.closeRate) <= 0) {
        return "Close rate is required.";
      }
    }
    if (current === 3 && !form.firstResponseTime) {
      return "Select a typical first-response time.";
    }
    if (current === 4 && !form.timeline) {
      return "Select an implementation timeline.";
    }
    if (current === 5) {
      if (!form.firstName.trim() || !form.lastName.trim()) {
        return "First and last name are required.";
      }
      if (!form.businessName.trim()) {
        return "Business name is required.";
      }
      if (!form.email.trim() || !form.email.includes("@")) {
        return "A valid work email is required.";
      }
      if (!form.phone.trim()) {
        return "Phone number is required.";
      }
      if (!form.emailConsent) {
        return "Consent is required to see the report.";
      }
    }
    return "";
  }

  function goNext() {
    const message = validateStep(step);
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setStep((value) => Math.min(5, value + 1));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 5) {
      goNext();
      return;
    }

    const message = validateStep(5);
    if (message) {
      setError(message);
      return;
    }

    const payload = toPayload(form);
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        error?: string;
        result?: CalculatorResult;
      };

      if (!response.ok || !data.result) {
        setError(data.error || "We could not generate the report. Please try again.");
        return;
      }

      setResult(data.result);
    } catch {
      setResult(calculateRecovery(payload));
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return <Report result={result} />;
  }

  return (
    <form onSubmit={onSubmit} className="border border-gray-line bg-cream">
      <div className="border-b border-gray-line px-6 py-4 sm:px-8">
        <ol className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray">
          {calculatorSteps.map((item) => (
            <li
              key={item.id}
              className={item.id === step ? "text-navy" : item.id < step ? "text-navy/60" : ""}
            >
              {item.id}. {item.label}
            </li>
          ))}
        </ol>
        <div className="mt-3 h-px bg-gray-line">
          <div
            className="h-px bg-navy transition-all"
            style={{ width: `${(step / calculatorSteps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-6 py-8 sm:px-8">
        <h3 className="font-serif text-2xl text-navy">
          {calculatorSteps[step - 1].label}
        </h3>
        <p className="mt-2 text-sm text-gray">
          {step < 5
            ? "Required fields are the ones we need for a useful estimate."
            : "Results stay gated until we have contact details and consent."}
        </p>
        <div className="mt-8">
          <StepFields step={step} form={form} setForm={setForm} />
        </div>
        {error ? <p className="mt-6 text-sm text-navy">{error}</p> : null}
        <div className="mt-8 flex flex-wrap gap-3">
          {step > 1 ? (
            <button
              type="button"
              className="inline-flex items-center justify-center border border-navy px-6 py-3 text-sm font-semibold text-navy transition hover:bg-navy hover:text-cream"
              onClick={() => {
                setError("");
                setStep((value) => value - 1);
              }}
            >
              Back
            </button>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center bg-navy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-navy/90 disabled:opacity-60"
          >
            {step < 5
              ? "Continue"
              : submitting
                ? "Calculating…"
                : site.calculatorCta}
          </button>
        </div>
      </div>
    </form>
  );
}
