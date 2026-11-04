const METRIKA_ID = 107082729;

export type Goal =
  | "request_open"
  | "contact_telegram"
  | "contact_whatsapp"
  | "contact_email"
  | "contact_phone";

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGoal(goal: Goal, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.ym?.(METRIKA_ID, "reachGoal", goal, params);
  window.gtag?.("event", goal, params);
}
