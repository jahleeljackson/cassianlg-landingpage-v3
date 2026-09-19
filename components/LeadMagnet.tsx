import { FormEmbed } from "@/components/FormEmbed";
import { site } from "@/lib/site";

export function LeadMagnet() {
  return (
    <section id="calculator" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-gray">
          Lead magnet
        </p>
        <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight text-navy sm:text-5xl">
          {site.calculatorHeadline}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray">
          {site.calculatorSubheadline}
        </p>
        <p className="mt-4 text-sm text-gray">
          You will receive a {site.reportName}—an estimate based on transparent
          assumptions, not a promised return.
        </p>
        <div className="mt-12 min-h-[745px] bg-cream">
          <FormEmbed />
        </div>
      </div>
    </section>
  );
}
