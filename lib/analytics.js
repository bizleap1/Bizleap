/**
 * Safe client-side analytics dispatcher for GA4 (gtag), GTM (dataLayer), and Meta Pixel (fbq).
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
  } catch {
    // Ignore analytics errors
  }

  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
    }
  } catch {
    // Ignore analytics errors
  }

  try {
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, params);
    }
  } catch {
    // Ignore analytics errors
  }
}
