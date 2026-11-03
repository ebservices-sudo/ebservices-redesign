import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, RotateCcw, Send, Sparkles } from "lucide-react";
import { Logo } from "@/components/site/Header";
import { WhatsAppIcon } from "@/components/site/WhatsApp";
import { chatWithAssistant } from "@/lib/assistant.functions";
import {
  DEMO_BUSINESSES,
  DEMO_SUGGESTIONS,
  getDemoBusiness,
  type DemoBusinessId,
} from "@/lib/demo-businesses";
import { MESSAGES, waLink } from "@/lib/site";

const TITLE = "Try the AI Chatbot — Live Demo | EB Services";
const DESCRIPTION =
  "Chat live with the AI chatbot EB Services sets up for businesses on WhatsApp. Ask about opening hours, prices and bookings.";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://ebservicesks.com/assistant" }],
  }),
  component: AssistantPage,
});

type Msg = { role: "user" | "bot"; text: string };

const ERROR_MSG = "Sorry, something went wrong on our side. Please try again.";

function BookDemoButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={waLink(MESSAGES.demo)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-[#0F4789] transition whitespace-nowrap ${
        compact ? "h-10 px-4 text-[13px]" : "h-14 px-7 text-[15px]"
      }`}
    >
      <WhatsAppIcon className={compact ? "size-3.5" : "size-4"} />
      {compact ? (
        <>
          <span className="sm:hidden">Free demo</span>
          <span className="hidden sm:inline">Book a free demo</span>
        </>
      ) : (
        "Book a free 15-minute demo"
      )}
    </a>
  );
}

function AssistantPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [business, setBusiness] = useState<DemoBusinessId>("dental");
  const scrollRef = useRef<HTMLDivElement>(null);
  const chat = useServerFn(chatWithAssistant);
  const current = getDemoBusiness(business);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = async (text: string) => {
    if (!text.trim() || typing) return;
    const next: Msg[] = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setTyping(true);
    try {
      const history = next.map((m) => ({
        role: m.role === "user" ? ("user" as const) : ("assistant" as const),
        content: m.text,
      }));
      const { reply } = await chat({ data: { messages: history, business } });
      setMessages((m) => [...m, { role: "bot", text: reply || ERROR_MSG }]);
    } catch (e) {
      console.error(e);
      setMessages((m) => [...m, { role: "bot", text: ERROR_MSG }]);
    } finally {
      setTyping(false);
    }
  };

  const reset = () => setMessages([]);
  const pickBusiness = (id: DemoBusinessId) => {
    if (id === business) return;
    setBusiness(id);
    setMessages([]);
  };

  return (
    <div className="h-dvh flex flex-col">
      <header className="shrink-0 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-5 min-w-0">
            <Link
              to="/"
              aria-label="Back to home"
              className="grid place-items-center size-10 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-surface transition-colors shrink-0"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <Link to="/" className="min-w-0">
              <Logo small />
            </Link>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {messages.length > 0 && (
              <button
                onClick={reset}
                aria-label="New chat"
                className="flex items-center gap-2 h-10 px-3 sm:px-4 rounded-full border border-border text-[13px] font-medium hover:bg-surface transition-colors"
              >
                <RotateCcw className="size-3.5" />{" "}
                <span className="hidden sm:inline">New chat</span>
              </button>
            )}
            <BookDemoButton compact />
          </div>
        </div>
      </header>

      <main className="flex-1 min-h-0 flex flex-col">
        <div className="shrink-0 border-b border-border bg-surface">
          <div className="mx-auto max-w-3xl px-4 sm:px-8 py-3 flex items-center gap-3 overflow-x-auto">
            <span className="label-eyebrow text-[9px] shrink-0">Demo business</span>
            <div role="radiogroup" aria-label="Demo business" className="flex gap-1.5">
              {DEMO_BUSINESSES.map((b) => (
                <button
                  key={b.id}
                  role="radio"
                  aria-checked={business === b.id}
                  onClick={() => pickBusiness(b.id)}
                  className={`h-9 px-4 rounded-full border text-[13px] font-medium transition whitespace-nowrap ${
                    business === b.id
                      ? "border-primary bg-[#E3EBF7] text-primary"
                      : "border-border bg-background hover:bg-card"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="flex-1 overflow-y-auto">
            <div className="min-h-full flex flex-col items-center justify-center px-4 sm:px-8 py-12 text-center">
              <div className="flex items-center gap-3">
                <Sparkles className="size-3.5 text-primary" />
                <span className="label-eyebrow">Live AI chatbot demo</span>
              </div>
              <h1 className="mt-5 text-[2.75rem] md:text-[4.5rem] leading-[0.98] tracking-[-0.045em]">
                Try the <span className="accent-serif text-primary">chatbot.</span>
              </h1>
              <p className="mt-5 text-muted-foreground max-w-xl leading-relaxed">
                This is the AI chatbot we set up for businesses on WhatsApp. You're chatting with{" "}
                <span className="text-foreground font-medium">{current.name}</span> — ask about
                opening hours, prices or bookings, just like a customer would.
              </p>
              <div className="mt-10 grid sm:grid-cols-2 gap-3 w-full max-w-2xl text-left">
                {DEMO_SUGGESTIONS.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-2xl bg-card border border-border px-5 py-4 text-[15px] hover:border-primary hover:text-primary transition-colors flex items-start gap-3"
                  >
                    <span className="label-eyebrow text-[10px] mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s}
                  </button>
                ))}
              </div>
              <div className="mt-10 flex flex-col items-center gap-3">
                <BookDemoButton />
                <span className="text-xs text-muted-foreground">
                  Free, 15 minutes, on WhatsApp or a call.
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div ref={scrollRef} className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-3xl px-4 sm:px-8 py-8 space-y-4">
              <div className="text-center">
                <span className="inline-block label-eyebrow text-[10px] px-3 py-1.5 border border-border rounded-full">
                  Chatting with {current.name}
                </span>
              </div>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed whitespace-pre-line ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface border border-border"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start" aria-label="Typing">
                  <div className="px-4 py-3.5 rounded-2xl bg-surface border border-border flex gap-1.5">
                    <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <span className="size-1.5 rounded-full bg-primary animate-bounce" />
                  </div>
                </div>
              )}
              {messages.length >= 4 && !typing && (
                <div className="pt-4 flex justify-center">
                  <div className="panel rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-center sm:text-left">
                    <span className="text-sm">Want this for your business?</span>
                    <BookDemoButton compact />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="shrink-0 border-t border-border bg-background/85 backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="mx-auto max-w-3xl px-4 sm:px-8 pt-4 pb-3 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              aria-label="Your message"
              maxLength={2000}
              className="flex-1 min-w-0 h-12 rounded-full bg-card border border-border px-5 text-base sm:text-sm outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={typing || !input.trim()}
              className="size-12 shrink-0 rounded-full bg-primary grid place-items-center text-primary-foreground hover:opacity-90 disabled:opacity-50 transition"
            >
              <Send className="size-4" />
            </button>
          </form>
          <p className="text-center text-[11px] text-muted-foreground pb-4 px-4 leading-relaxed">
            Live demo with a sample business — names, prices and hours are made up. We set the
            chatbot up with your real information.
          </p>
        </div>
      </main>
    </div>
  );
}
