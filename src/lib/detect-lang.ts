// Detects whether a chat message is written in Albanian or English, so the AI chatbot
// demo can answer in the visitor's language and switch when they switch.

export type Lang = "sq" | "en";

const SQ_WORDS = new Set([
  "përshëndetje", "pershendetje", "tung", "mirëdita", "mirdita", "mirëmbrëma", "mirmbrema",
  "faleminderit", "flm", "rrofsh", "ckemi", "çkemi", "si", "jeni", "je", "jam", "jemi", "dua",
  "duam", "kam", "kemi", "keni", "ka", "çfarë", "cfare", "çka", "cka", "sa", "kushton", "kushtojnë",
  "ku", "kur", "pse", "për", "per", "një", "nje", "dhe", "në", "ne", "nga", "të", "te", "është",
  "eshte", "janë", "jane", "po", "jo", "ju", "juaj", "juve", "ime", "im", "imi", "orari", "orar",
  "hapur", "mbyllur", "termin", "rezervoj", "rezervim", "shtunën", "shtunen", "nesër", "neser",
  "sot", "ndodheni", "çmimi", "cmimi", "çmim", "mund", "ndihmë", "ndihme", "lutem", "mirë", "mire",
  "edhe", "apo", "ose", "kjo", "ky", "atë",
]);

const EN_WORDS = new Set([
  "the", "is", "are", "what", "how", "much", "does", "you", "your", "i", "i'm", "im", "want",
  "need", "can", "could", "would", "hello", "hi", "hey", "thanks", "thank", "price", "prices",
  "cost", "costs", "help", "please", "my", "we", "our", "and", "for", "with", "about", "to", "of",
  "have", "has", "yes", "which", "who", "where", "when", "why", "open", "book", "booking",
  "appointment", "tomorrow", "today", "saturday", "time", "like", "this", "that", "it", "an",
  "there", "good", "morning", "evening",
]);

/**
 * Which language a message is written in. Albanian letters (ë, ç) count double.
 * Short or ambiguous messages ("ok", "👍", "15") return the fallback, so the
 * conversation keeps its current language.
 */
export function detectLang(text: string, fallback: Lang): Lang {
  const lower = text.toLowerCase();
  const words = lower.match(/[a-zëç']+/g) ?? [];
  let sq = /[ëç]/.test(lower) ? 2 : 0;
  let en = 0;
  for (const w of words) {
    if (SQ_WORDS.has(w)) sq++;
    if (EN_WORDS.has(w)) en++;
  }
  if (sq > en) return "sq";
  if (en > sq) return "en";
  return fallback;
}
