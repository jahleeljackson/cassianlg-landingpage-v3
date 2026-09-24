import Script from "next/script";
import { isFormConfigured, site } from "@/lib/site";

const FORM_ID = "uh1CKsDJc1h8KCZYEvJ8";
const IFRAME_ID = `inline-${FORM_ID}`;
const FORM_TITLE = '"Try It Out" Lead Magnet';

export function FormEmbed() {
  if (!isFormConfigured()) {
    return null;
  }

  return (
    <>
      <iframe
        src={site.formUrl}
        id={IFRAME_ID}
        title={FORM_TITLE}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={FORM_TITLE}
        data-height="1100"
        data-layout-iframe-id={IFRAME_ID}
        data-form-id={FORM_ID}
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        style={{
          width: "100%",
          height: 1100,
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
