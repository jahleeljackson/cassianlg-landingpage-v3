import { BookingButton } from "@/components/BookingButton";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl border-t border-gray-line pt-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-serif text-2xl text-navy">{site.name}</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-gray">
              {site.legalName} / DBA {site.dba}. We help service businesses
              recover revenue from missed calls, estimates, and stale
              opportunities.
            </p>
          </div>
          <BookingButton variant="line">
            Book a Revenue Recovery Review
          </BookingButton>
        </div>
      </div>
    </footer>
  );
}
