import Script from "next/script";

const CHAT_WIDGET_ID = "6aaef0e208a179ce387ca0d7";

export function ChatWidget() {
  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      strategy="afterInteractive"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={CHAT_WIDGET_ID}
      data-source="WEB_USER"
    />
  );
}
