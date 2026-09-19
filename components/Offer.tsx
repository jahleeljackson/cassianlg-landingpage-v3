import { BookingButton } from "@/components/BookingButton";
import { formatUsd, offerTiers, site } from "@/lib/site";

export function Offer() {
  return (
    <section id="offer" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-gray">
          The offer
        </p>
        <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight text-navy sm:text-5xl">
          Revenue Recovery Systems
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray">
          Automated systems that help service businesses capture, follow up
          with, and convert more of the opportunities they already generate.
        </p>
        <blockquote className="mt-8 max-w-2xl border-l-2 border-navy pl-5 font-serif text-2xl leading-snug text-navy">
          {site.positioning}
        </blockquote>

        <div className="mt-14 overflow-x-auto border border-gray-line">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gray-soft">
                <th className="w-36 border-b border-r border-gray-line px-4 py-3 font-semibold text-gray">
                  <span className="sr-only">Plan detail</span>
                </th>
                {offerTiers.map((tier) => (
                  <th
                    key={tier.id}
                    className={`border-b border-r border-gray-line px-4 py-3 last:border-r-0 ${
                      tier.recommended ? "bg-navy text-cream" : "text-navy"
                    }`}
                  >
                    {tier.recommended ? (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/70">
                        Recommended
                      </p>
                    ) : null}
                    <p className="font-serif text-xl font-normal">{tier.name}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border-b border-r border-gray-line px-4 py-3 font-semibold text-gray">
                  Setup
                </th>
                {offerTiers.map((tier) => (
                  <td
                    key={`${tier.id}-setup`}
                    className={`border-b border-r border-gray-line px-4 py-3 last:border-r-0 ${
                      tier.recommended ? "bg-navy/5 font-semibold" : ""
                    }`}
                  >
                    {formatUsd(tier.setup)}
                  </td>
                ))}
              </tr>
              <tr>
                <th className="border-b border-r border-gray-line px-4 py-3 font-semibold text-gray">
                  Monthly
                </th>
                {offerTiers.map((tier) => (
                  <td
                    key={`${tier.id}-monthly`}
                    className={`border-b border-r border-gray-line px-4 py-3 last:border-r-0 ${
                      tier.recommended ? "bg-navy/5 font-semibold" : ""
                    }`}
                  >
                    {formatUsd(tier.monthly)}/mo
                  </td>
                ))}
              </tr>
              <tr>
                <th className="border-b border-r border-gray-line px-4 py-3 font-semibold text-gray">
                  Minimum term
                </th>
                {offerTiers.map((tier) => (
                  <td
                    key={`${tier.id}-term`}
                    className={`border-b border-r border-gray-line px-4 py-3 last:border-r-0 ${
                      tier.recommended ? "bg-navy/5" : ""
                    }`}
                  >
                    {tier.term}
                  </td>
                ))}
              </tr>
              <tr>
                <th className="border-r border-gray-line px-4 py-3 font-semibold text-gray">
                  Best for
                </th>
                {offerTiers.map((tier) => (
                  <td
                    key={`${tier.id}-best`}
                    className={`border-r border-gray-line px-4 py-3 text-gray last:border-r-0 ${
                      tier.recommended ? "bg-navy/5 text-navy" : ""
                    }`}
                  >
                    {tier.bestFor}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {offerTiers.map((tier) => (
            <article
              key={tier.id}
              className={`border p-6 ${
                tier.recommended ? "border-navy" : "border-gray-line"
              }`}
            >
              {tier.recommended ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray">
                  Recommended default
                </p>
              ) : null}
              <h3 className="mt-2 font-serif text-2xl text-navy">{tier.name}</h3>
              <p className="mt-2 text-sm text-gray">
                {formatUsd(tier.setup)} setup · {formatUsd(tier.monthly)}/mo
              </p>
              {"intro" in tier && tier.intro ? (
                <p className="mt-5 text-sm font-semibold text-navy">{tier.intro}</p>
              ) : null}
              <ul className="mt-4 space-y-2 text-sm leading-6 text-gray">
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-12 max-w-2xl text-sm leading-7 text-gray">
          The monthly subscription includes software infrastructure, workflow
          monitoring, maintenance, troubleshooting, and ongoing optimization.
          Clients pay for a revenue-conversion system—not a generic CRM
          subscription.
        </p>
        <p className="mt-4 text-sm font-semibold text-navy">
          Recommended default: Lead → Appointment at $1,497 setup + $297/month.
        </p>
        <BookingButton className="mt-8">
          Book a Revenue Recovery Review
        </BookingButton>
      </div>
    </section>
  );
}
