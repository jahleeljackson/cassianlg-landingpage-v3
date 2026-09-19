import Script from "next/script";
import { isBookingConfigured, site } from "@/lib/site";

const BOOKING_WIDGET_ID = "BX691Gj3uOHrHsrogaDh";

export function BookingEmbed() {
  if (!isBookingConfigured()) {
    return null;
  }

  return (
    <>
      <iframe
        id={BOOKING_WIDGET_ID}
        title="Book a Revenue Recovery Review with Cassian AI"
        src={site.bookingUrl}
        allow="payment"
        scrolling="no"
        className="min-h-[720px] w-full overflow-hidden border-0 bg-cream"
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="lazyOnload"
      />
    </>
  );
}
