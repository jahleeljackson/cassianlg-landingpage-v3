import { BookingButton } from "@/components/BookingButton";
import { BookingEmbed } from "@/components/BookingEmbed";
import { isBookingConfigured } from "@/lib/site";

export function Cta() {
  return (
    <section id="book" className="bg-navy px-5 py-20 text-cream sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-cream/60">
          Book a call
        </p>
        <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
          Book a Revenue Recovery Review.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-cream/75">
          We will walk through where revenue may be leaking and which Revenue
          Recovery package is the right next step. We do not install the system
          on this call.
        </p>
        <BookingButton variant="inverse" className="mt-8">
          Book a Revenue Recovery Review
        </BookingButton>

        <div className="mt-12 bg-cream text-navy">
          {isBookingConfigured() ? (
            <BookingEmbed />
          ) : (
            <div className="flex min-h-[20rem] flex-col items-start justify-center px-8 py-16 sm:px-12">
              <p className="font-serif text-3xl">Calendar coming soon</p>
              <p className="mt-3 max-w-md text-sm leading-7 text-gray">
                The booking calendar will sit here. Until then, use the button
                and we will get you a time.
              </p>
              <BookingButton className="mt-8">
                Book a Revenue Recovery Review
              </BookingButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
