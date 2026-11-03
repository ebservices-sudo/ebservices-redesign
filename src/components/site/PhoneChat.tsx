import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "./WhatsApp";

export type ChatMsg = { from: "user" | "bot"; text: string };

/** Plays a conversation message by message while visible, then loops. Without JS it shows the whole chat. */
function useChatLoop(count: number, ref: React.RefObject<HTMLElement | null>) {
  const [step, setStep] = useState(count);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timers: number[] = [];
    let running = false;
    const clear = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
    const play = () => {
      clear();
      setStep(0);
      setTyping(false);
      let t = 600;
      for (let i = 0; i < count; i++) {
        const isBot = i % 2 === 1;
        if (isBot) {
          timers.push(window.setTimeout(() => setTyping(true), t));
          t += 1000;
        }
        timers.push(
          window.setTimeout(() => {
            setTyping(false);
            setStep(i + 1);
          }, t),
        );
        t += isBot ? 1500 : 1200;
      }
      timers.push(window.setTimeout(() => running && play(), t + 5000));
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          play();
        } else if (!e.isIntersecting && running) {
          running = false;
          clear();
          setStep(count);
          setTyping(false);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
  }, [count, ref]);
  return { step, typing };
}

function ChatUI({
  messages,
  name,
  initials,
  step,
  typing,
  typingLabel,
  placeholder,
  bodyClass,
}: {
  messages: ChatMsg[];
  name: string;
  initials: string;
  step: number;
  typing: boolean;
  typingLabel: string;
  placeholder: string;
  bodyClass: string;
}) {
  return (
    <>
      <div className="flex items-center gap-3 px-4 py-3 bg-[#075E54] text-white">
        <div className="size-9 rounded-full bg-white/20 grid place-items-center text-[12px] font-semibold">
          {initials}
        </div>
        <div className="leading-tight flex-1 min-w-0">
          <div className="font-semibold text-[14px] truncate">{name}</div>
          <div className="text-[11px] text-white/75">{typing ? typingLabel : "online"}</div>
        </div>
        <WhatsAppIcon className="size-4 text-white/80" />
      </div>
      <div
        className={`px-3.5 py-4 space-y-2 bg-[#EFEAE2] flex flex-col justify-end overflow-hidden ${bodyClass}`}
      >
        {messages.slice(0, step).map((m, i) => (
          <div
            key={i}
            className={`flex chat-pop ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[82%] px-3 py-2 text-[13.5px] leading-snug rounded-xl shadow-sm text-[#111B21] ${
                m.from === "user" ? "bg-[#D9FDD3] rounded-tr-sm" : "bg-white rounded-tl-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex chat-pop">
            <div className="px-3 py-2.5 rounded-xl rounded-tl-sm bg-white shadow-sm flex gap-1">
              <span className="size-1.5 rounded-full bg-[#8696a0] animate-pulse" />
              <span className="size-1.5 rounded-full bg-[#8696a0] animate-pulse [animation-delay:150ms]" />
              <span className="size-1.5 rounded-full bg-[#8696a0] animate-pulse [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>
      <div className="px-3 py-2.5 bg-[#F0F2F5] flex items-center gap-2">
        <span className="flex-1 h-9 rounded-full bg-white px-4 text-[13px] text-[#8696a0] flex items-center">
          {placeholder}
        </span>
        <span className="size-9 rounded-full bg-[#00A884] grid place-items-center text-white">
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
        </span>
      </div>
    </>
  );
}

/** WhatsApp-style chat that plays message by message, shown as a card or inside a phone frame. */
export function PhoneChat({
  messages,
  name = "Your Business",
  initials = "YB",
  typingLabel = "typing…",
  placeholder = "Message",
  phone = false,
  className = "",
  bodyHeight = "h-[280px]",
}: {
  messages: ChatMsg[];
  name?: string;
  initials?: string;
  typingLabel?: string;
  placeholder?: string;
  phone?: boolean;
  className?: string;
  bodyHeight?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { step, typing } = useChatLoop(messages.length, ref);
  const ui = { messages, name, initials, step, typing, typingLabel, placeholder };

  if (!phone) {
    return (
      <div
        ref={ref}
        className={`rounded-[22px] bg-white overflow-hidden shadow-[0_24px_60px_-30px_rgba(10,26,58,.45)] ${className}`}
      >
        <ChatUI {...ui} bodyClass={bodyHeight} />
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative mx-auto w-[300px] sm:w-[330px] ${className}`}>
      {/* side buttons */}
      <span
        className="absolute -left-[3px] top-[120px] h-12 w-[3px] rounded-l bg-[#2A2E35]"
        aria-hidden
      />
      <span
        className="absolute -left-[3px] top-[180px] h-16 w-[3px] rounded-l bg-[#2A2E35]"
        aria-hidden
      />
      <span
        className="absolute -right-[3px] top-[150px] h-20 w-[3px] rounded-r bg-[#2A2E35]"
        aria-hidden
      />
      <div className="rounded-[50px] bg-[#16181D] p-[10px] shadow-[0_40px_80px_-40px_rgba(10,26,58,.6)] ring-1 ring-black/40">
        <div className="relative rounded-[40px] overflow-hidden bg-[#075E54] h-[600px] sm:h-[660px] flex flex-col">
          <div className="relative h-11 shrink-0 flex items-center justify-between px-7 text-white text-[13px] font-semibold">
            <span>9:41</span>
            <span
              className="absolute left-1/2 -translate-x-1/2 top-2.5 h-[26px] w-[96px] rounded-full bg-black"
              aria-hidden
            />
            <span className="flex items-center gap-1.5" aria-hidden>
              <svg viewBox="0 0 18 12" className="h-2.5" fill="currentColor">
                <rect x="0" y="8" width="3" height="4" rx="1" />
                <rect x="5" y="5" width="3" height="7" rx="1" />
                <rect x="10" y="2" width="3" height="10" rx="1" />
                <rect x="15" y="0" width="3" height="12" rx="1" />
              </svg>
              <svg viewBox="0 0 26 12" className="h-3" fill="none" stroke="currentColor">
                <rect x="0.5" y="0.5" width="22" height="11" rx="3" />
                <rect x="2.5" y="2.5" width="16" height="7" rx="1.5" fill="currentColor" />
                <rect x="24" y="4" width="1.5" height="4" rx=".75" fill="currentColor" />
              </svg>
            </span>
          </div>
          <div className="flex-1 min-h-0 flex flex-col bg-[#EFEAE2] [&>div:nth-child(2)]:flex-1">
            <ChatUI {...ui} bodyClass="" />
          </div>
          <div className="h-6 shrink-0 bg-[#F0F2F5] grid place-items-center" aria-hidden>
            <span className="h-1 w-28 rounded-full bg-black/80" />
          </div>
        </div>
      </div>
    </div>
  );
}
