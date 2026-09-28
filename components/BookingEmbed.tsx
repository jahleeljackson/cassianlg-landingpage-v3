"use client";

import Script from "next/script";
import { useId } from "react";
import { site } from "@/lib/site";

const BOOKING_WIDGET_ID = "BX691Gj3uOHrHsrogaDh";

export function BookingEmbed() {
  const reactId = useId().replace(/:/g, "");
  const iframeId = `${BOOKING_WIDGET_ID}_${reactId}`;

  return (
    <>
      <iframe
        src={site.bookingUrl}
        id={iframeId}
        title="Book a Revenue Recovery Review with Cassian AI"
        allow="payment"
        scrolling="no"
        style={{
          width: "100%",
          minHeight: 780,
          border: "none",
          overflow: "hidden",
          display: "block",
        }}
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
