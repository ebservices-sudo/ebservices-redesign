// Offline replies for the static GitHub Pages demo, where there is no server to call the AI.
// It answers the common questions (hours, location, prices, booking) from the same sample data
// the real AI uses, so the demo still feels alive. The live site uses the real AI instead.
import { getDemoBusiness, type DemoBusinessId } from "./demo-businesses";

export const IS_STATIC_DEMO = import.meta.env.VITE_STATIC_DEMO === "true";

const has = (text: string, words: string[]) => words.some((w) => text.includes(w));

/** First few "- item: price" lines from the business's offer text. */
function topItems(offer: string, n = 4) {
  return offer
    .split("\n")
    .filter((l) => l.trim().startsWith("- ") && l.includes("€"))
    .slice(0, n)
    .map((l) => "• " + l.trim().slice(2))
    .join("\n");
}

export function offlineReply(businessId: DemoBusinessId, message: string, turn: number): string {
  const b = getDemoBusiness(businessId);
  const t = message.toLowerCase();

  if (has(t, ["hour", "open", "close", "when", "orar", "hapur", "mbyll", "kur "])) {
    return `We're open ${b.hoursText}. Would you like to book a time?`;
  }
  if (has(t, ["where", "location", "address", "ku ", "lokacion", "adres"])) {
    return `You'll find us in ${b.location}. Can I help you with a booking?`;
  }
  if (has(t, ["price", "cost", "how much", "€", "euro", "çmim", "sa kushton", "menu", "service"])) {
    return `Here are some of our prices:\n${topItems(b.offer)}\nExact prices are confirmed in person. What are you interested in?`;
  }
  if (has(t, ["book", "appointment", "reserve", "table", "termin", "rezerv", "tomorrow", "today", "nesër", "sot"])) {
    return "Happy to book that for you! What day and time suit you, and what name should I put it under?";
  }
  if (has(t, ["hi", "hello", "hey", "pershendetje", "përshëndetje", "tung", "mirëdita", "mirdita"])) {
    return `Hi! 👋 Welcome to ${b.name}. I can help with opening hours, prices and bookings. What can I do for you?`;
  }
  if (turn >= 2) {
    return "This is a preview of the chatbot. The full AI version answers anything about your business in any language — book a free demo with the button above to see it live.";
  }
  return `Thanks for your message! I can tell you about our opening hours, prices or book an appointment at ${b.name}. What would you like?`;
}
