import { BookingButton } from "@/components/BookingButton";
import { FormEmbed } from "@/components/FormEmbed";
import { isFormConfigured, site } from "@/lib/site";

export function LeadResponseDemo() {
  return (
    <section id="demo" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-gray">
          {site.demoEyebrow}
        </p>
        <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight text-navy sm:text-5xl">
          {site.demoHeadline}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray">
          {site.demoSubheadline}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray">
          {site.demoNote}
        </p>

        <div className="mt-12 min-h-[1100px] bg-cream">
          {isFormConfigured() ? (
            <FormEmbed />
          ) : (
            <div className="flex min-h-[24rem] flex-col items-start justify-center px-8 py-16 sm:px-12">
              <p className="font-serif text-3xl text-navy">
                Demo form coming soon
              </p>
              <p className="mt-3 max-w-md text-sm leading-7 text-gray">
                The HighLevel qualification form will sit here. After you
                submit, you will get an immediate email and text so you can
                feel the response speed firsthand.
              </p>
            </div>
          )}
        </div>

        <p className="mt-8 max-w-xl text-sm leading-7 text-gray">
          After you see the follow-up, the next step is a Revenue Review Call.
          We will map the same response system onto your inbound calls, forms,
          and estimates.
        </p>
        <BookingButton className="mt-6">{site.demoCta}</BookingButton>
      </div>
    </section>
  );
}
