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

        <div className="mt-14 grid border border-gray-line sm:grid-cols-2">
          {offerTiers.map((tier, index) => (
            <div
              key={tier.id}
              className={`px-8 py-10 ${
                index === 0 ? "border-b border-gray-line sm:border-b-0 sm:border-r" : ""
              }`}
            >
              <p className="font-serif text-2xl text-navy">{tier.name}</p>
              <p className="mt-8 font-serif text-5xl leading-none tracking-tight text-navy">
                {formatUsd(tier.setup)}
              </p>
              <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-gray">
                Setup
              </p>
              <p className="mt-8 text-lg text-navy">
                {formatUsd(tier.monthly)}
                <span className="text-gray"> / month</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {offerTiers.map((tier) => (
            <article key={tier.id} className="border border-gray-line p-6">
              <h3 className="font-serif text-2xl text-navy">{tier.name}</h3>
              {tier.intro ? (
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
        <BookingButton className="mt-8">
          Book a Revenue Recovery Review
        </BookingButton>
      </div>
    </section>
  );
}
