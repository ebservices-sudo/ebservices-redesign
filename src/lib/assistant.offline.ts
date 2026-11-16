// Offline replies for the static GitHub Pages demo, where there is no server to call the AI.
// It answers the common questions (hours, location, prices, booking) from the same sample data
// the real AI uses, so the demo still feels alive. The live site uses the real AI instead.
// Bilingual: it replies in the language the customer writes in (Albanian or English).
import { getDemoBusiness, type DemoBusinessId } from "./demo-businesses";
import type { Lang } from "./detect-lang";

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

export function offlineReply(
  businessId: DemoBusinessId,
  message: string,
  turn: number,
  lang: Lang = "en",
): string {
  const b = getDemoBusiness(businessId);
  const t = message.toLowerCase();
  const sq = lang === "sq";

  if (has(t, ["hour", "open", "close", "when", "orar", "hapur", "mbyll", "kur "])) {
    return sq
      ? `Jemi të hapur ${b.sq.hoursText}. Dëshironi të rezervoni një orar?`
      : `We're open ${b.hoursText}. Would you like to book a time?`;
  }
  if (has(t, ["where", "location", "address", "ku ", "ku?", "ndodh", "lokacion", "adres"])) {
    return sq
      ? `Na gjeni në ${b.sq.location}. A mund t'ju ndihmoj me një rezervim?`
      : `You'll find us in ${b.location}. Can I help you with a booking?`;
  }
  if (has(t, ["price", "cost", "how much", "€", "euro", "çmim", "cmim", "kushton", "menu", "service", "shërbim"])) {
    return sq
      ? `Ja disa nga çmimet tona:\n${b.sq.top.map((l) => "• " + l).join("\n")}\nÇmimi i saktë konfirmohet në vend. Për çfarë jeni të interesuar?`
      : `Here are some of our prices:\n${topItems(b.offer)}\nExact prices are confirmed in person. What are you interested in?`;
  }
  if (has(t, ["book", "appointment", "reserve", "table", "termin", "rezerv", "tomorrow", "today", "nesër", "neser", "sot", "shtun"])) {
    return sq
      ? "Me kënaqësi! Cila ditë dhe orë ju përshtatet, dhe në cilin emër ta bëj rezervimin?"
      : "Happy to book that for you! What day and time suit you, and what name should I put it under?";
  }
  if (has(t, ["hi", "hello", "hey", "pershendetje", "përshëndetje", "tung", "mirëdita", "mirdita"])) {
    return sq
      ? `Përshëndetje! 👋 Mirë se vini te ${b.name}. Mund t'ju ndihmoj me orarin, çmimet dhe rezervimet. Si mund t'ju ndihmoj?`
      : `Hi! 👋 Welcome to ${b.name}. I can help with opening hours, prices and bookings. What can I do for you?`;
  }
  if (turn >= 2) {
    return sq
      ? "Ky është një version paraprak i chatbot-it. Versioni i plotë me AI i përgjigjet çdo pyetjeje për biznesin tuaj, në shqip dhe anglisht. Rezervoni një demo falas me butonin lart për ta parë live."
      : "This is a preview of the chatbot. The full AI version answers anything about your business in Albanian and English — book a free demo with the button above to see it live.";
  }
  return sq
    ? `Faleminderit për mesazhin! Mund t'ju tregoj për orarin, çmimet ose t'ju rezervoj një termin te ${b.name}. Çfarë dëshironi?`
    : `Thanks for your message! I can tell you about our opening hours, prices or book an appointment at ${b.name}. What would you like?`;
}
