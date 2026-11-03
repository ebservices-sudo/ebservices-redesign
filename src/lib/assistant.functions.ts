import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDemoBusiness, type DemoBusiness, type DemoBusinessId } from "./demo-businesses";

const TIME_ZONE = "Europe/Belgrade"; // Kosovo local time (the server itself runs in UTC)
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const pad = (n: number) => String(n).padStart(2, "0");

function nowInKosovo() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { y: get("year"), m: get("month"), d: get("day"), hour: get("hour") % 24, minute: get("minute") };
}

function timeContext(b: DemoBusiness): string {
  const now = nowInKosovo();
  const today = new Date(Date.UTC(now.y, now.m - 1, now.d));
  const nowStr = `${pad(now.hour)}:${pad(now.minute)}`;

  const lines: string[] = [];
  for (let i = 0; i <= 14; i++) {
    const d = new Date(today.getTime() + i * 86400000);
    const wd = d.getUTCDay();
    const h = b.hours[wd];
    const iso = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
    const label = `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()} (${DAYS[wd]})`;
    lines.push(`${iso} = ${label} ${h ? `open ${h[0]}–${h[1]}` : "[CLOSED]"}${i === 0 ? " ← TODAY" : ""}`);
  }

  const todayHours = b.hours[today.getUTCDay()];
  const status = !todayHours
    ? "The business is closed today."
    : nowStr >= todayHours[0] && nowStr < todayHours[1]
      ? `The business is open right now, until ${todayHours[1]}.`
      : "The business is closed right now (outside opening hours).";

  return `Current local time: ${DAYS[today.getUTCDay()]} ${now.d} ${MONTHS[now.m - 1]} ${now.y}, ${nowStr}.
${status}

CALENDAR (next 14 days):
${lines.join("\n")}`;
}

const SYSTEM_PROMPT = (b: DemoBusiness) => `You are the friendly WhatsApp chatbot for "${b.name}", ${b.kind} in Kosovo.
This is a live demo on the EB Services website: all business details below are sample data.

LANGUAGE:
- Reply in the language the customer writes in. Default to English.
- Keep replies short and natural, like a real WhatsApp message (1–3 sentences, an emoji at most once in a while).

BUSINESS INFORMATION:
- Name: ${b.name}
- Opening hours: ${b.hoursText}
- Location: ${b.location}

${b.offer}

${b.booking}

DATE & TIME:
${timeContext(b)}

DATE RULES:
- Always read the weekday from the calendar above. Never calculate it yourself.
- Never offer a date marked [CLOSED]; suggest the next open day instead.
- Never book a time in the past, or outside opening hours.
- You can book up to 14 days ahead.

HOW TO BEHAVE:
- If the customer asks a vague question (e.g. "How much does it cost?"), ask what they're interested in, or give a short overview of the main prices.
- Prices are approximate — say the exact price is confirmed in person.
- When booking, ask only for what's missing, one or two things at a time. When you have everything, confirm with a short summary.
- If you don't know something, or the request is complex (complaints, special requests, large groups, anything not covered above), say you'll pass it to a team member who will reply shortly. Never invent information.
- Only talk about this business. Politely decline unrelated topics.
- If someone asks who built you or how to get a chatbot like this, say it was set up by EB Services and they can book a free 15-minute demo via the "Book a free demo" button on this page.`;

const InputSchema = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(2000) }))
    .min(1),
  business: z.enum(["dental", "restaurant", "salon", "shop"]).default("dental"),
});

type ChatMessage = { role: "user" | "assistant"; content: string };

/** Keep the last few turns, always starting with a user message (required by the API). */
function trimHistory(messages: ChatMessage[]) {
  let recent = messages.slice(-9);
  while (recent.length > 1 && recent[0].role === "assistant") recent = recent.slice(1);
  return recent;
}

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");

    const business = getDemoBusiness(data.business as DemoBusinessId);

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 350,
        temperature: 0.4,
        system: SYSTEM_PROMPT(business),
        messages: trimHistory(data.messages),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Anthropic API error ${res.status}: ${text}`);
    }

    const json = (await res.json()) as { content?: { type: string; text?: string }[] };
    const reply =
      json.content
        ?.filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("")
        .trim() ?? "";

    return { reply };
  });
