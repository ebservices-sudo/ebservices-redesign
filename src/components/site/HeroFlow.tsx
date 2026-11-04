import { Check, Globe } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { BrandLogo } from "./Brands";
import { useSite } from "./SiteProvider";

const STEP_MS = 1600;
const HOLD_MS = 3400;

type Step = { icon: ReactNode; tile: string; title: string; tag: string; detail: ReactNode };

/**
 * Hero visual: how the four services connect, from an ad to a booked client.
 * Steps light up one by one and loop. Same visual language as the ad simulator.
 */
export function HeroFlow() {
  const { t } = useSite();
  const steps: Step[] = [
    {
      icon: <BrandLogo brand="meta" className="size-5" />,
      tile: "bg-white",
      title: t("Your ad reaches the right people", "Reklama arrin te njerëzit e duhur"),
      tag: t("Ads · Design", "Reklama · Dizajn"),
      detail: (
        <span className="inline-flex items-center gap-2 text-[13px] text-white/55">
          <BrandLogo brand="instagram" color="currentColor" className="size-3.5" />
          <BrandLogo brand="facebook" color="currentColor" className="size-3.5" />
          {t("Instagram and Facebook", "Instagram dhe Facebook")}
        </span>
      ),
    },
    {
      icon: <Globe className="size-5 text-primary" strokeWidth={2} />,
      tile: "bg-white",
      title: t("They visit your website", "E vizitojnë faqen tuaj"),
      tag: "Website",
      detail: (
        <span className="text-[13px] text-white/55">
          {t("Fast, mobile-first, one tap to message", "E shpejtë, për telefon, një prekje për mesazh")}
        </span>
      ),
    },
    {
      icon: <BrandLogo brand="whatsapp" className="size-5" />,
      tile: "bg-white",
      title: t("They send you a message", "Ju dërgojnë mesazh"),
      tag: "WhatsApp",
      detail: (
        <span className="inline-block rounded-2xl rounded-tl-md bg-white/[0.08] px-3 py-1.5 text-[13px] text-white/85">
          {t("Hi! Any free slot on Saturday?", "Përshëndetje! Keni termin të shtunën?")}
        </span>
      ),
    },
    {
      icon: <span className="text-[13px] font-semibold text-white">AI</span>,
      tile: "bg-primary",
      title: t("AI replies and books them in", "AI përgjigjet dhe i rezervon"),
      tag: t("AI Receptionist", "Recepsionist AI"),
      detail: (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/15 pl-1 pr-3 py-1 text-[13px] font-medium text-[#25D366]">
          <span className="grid place-items-center size-4 rounded-full bg-[#25D366] text-navy">
            <Check className="size-2.5" strokeWidth={3} />
          </span>
          {t("Booked · Saturday 14:30", "Rezervuar · E shtunë 14:30")}
        </span>
      ),
    },
  ];
  const n = steps.length;

  // Number of steps lit (1..n). Loops; reduced motion shows the finished state.
  const [lit, setLit] = useState(1);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(n);
      return;
    }
    let i = 1;
    let id = 0;
    const next = () => {
      i = i >= n ? 1 : i + 1;
      setLit(i);
      id = window.setTimeout(next, i === n ? HOLD_MS : STEP_MS);
    };
    id = window.setTimeout(next, STEP_MS);
    return () => clearTimeout(id);
  }, [n]);

  const done = lit === n;

  return (
    <div className="bp-grid rounded-[28px] border border-white/10 p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.16em]">
        <span className="text-[#8FA8D8]">{t("From ad to client", "Nga reklama te klienti")}</span>
        <span
          className={`inline-flex items-center gap-2 transition-colors ${done ? "text-[#25D366]" : "text-white/70"}`}
        >
          <span
            className={`size-2 rounded-full ${done ? "bg-[#25D366]" : "bg-white animate-pulse"}`}
          />
          {done ? t("New client", "Klient i ri") : t("Working", "Në punë")}
        </span>
      </div>

      <ol className="mt-7">
        {steps.map((s, i) => {
          const on = i < lit;
          return (
            <li key={s.title} className="relative flex gap-4 py-3">
              {i < n - 1 && (
                // Line from this step's icon down to the next one; fills when the next step lights up.
                <span className="absolute left-5 top-[52px] -bottom-3 w-px bg-white/10" aria-hidden>
                  <span
                    className={`block size-full origin-top bg-[#8FA8D8] transition-transform duration-500 ease-out ${i + 1 < lit ? "scale-y-100" : "scale-y-0"}`}
                  />
                </span>
              )}
              <span
                className={`relative z-10 grid place-items-center size-10 shrink-0 rounded-xl transition-all duration-500 ${
                  on ? `${s.tile} scale-100` : "bg-navy ring-1 ring-white/15 scale-90 grayscale opacity-60"
                }`}
              >
                {s.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3 pt-2">
                  <p
                    className={`text-[15px] sm:text-base font-medium leading-snug transition-colors duration-500 ${on ? "text-white" : "text-white/35"}`}
                  >
                    {s.title}
                  </p>
                  <span
                    className={`hidden sm:inline shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 ${on ? "text-[#8FA8D8]" : "text-white/25"}`}
                  >
                    {s.tag}
                  </span>
                </div>
                <div
                  className={`mt-2 min-h-7 transition-all duration-500 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
                  aria-hidden={!on}
                >
                  {s.detail}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
