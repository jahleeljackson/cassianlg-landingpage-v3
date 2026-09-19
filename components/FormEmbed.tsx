import Script from "next/script";
import { site } from "@/lib/site";

const FORM_ID = "Rjoge8cVnOWJVFQN5AmC";
const IFRAME_ID = `inline-${FORM_ID}`;

export function FormEmbed() {
  return (
    <>
      <iframe
        src={site.formUrl}
        id={IFRAME_ID}
        title="Form 1"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Form 1"
        data-height="745"
        data-layout-iframe-id={IFRAME_ID}
        data-form-id={FORM_ID}
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        style={{
          width: "100%",
          height: 745,
          border: "none",
          borderRadius: 8,
        }}
        className="w-full bg-cream"
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="lazyOnload"
      />
    </>
  );
}
