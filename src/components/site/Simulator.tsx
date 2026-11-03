import { Check, RotateCcw, UserRound } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { BrandLogo, type BrandKey } from "./Brands";
import { Reveal } from "./Reveal";
import { useSite } from "./SiteProvider";

const HOLD_MS = 2400;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * "Press and hold" illustration of an ad campaign: reach → clicks → messages → clients.
 * Numbers are an example only; the disclaimer under the button says so.
 */
export function AdSimulator() {
  const { t, lang } = useSite();
  const [p, setP] = useState(0);
  const [done, setDone] = useState(false);
  const pRef = useRef(0);
  const holding = useRef(false);
  const raf = useRef(0);
  const last = useRef(0);

  const tick = (now: number) => {
    const dt = now - last.current;
    last.current = now;
    const next = clamp(pRef.current + (holding.current ? dt / HOLD_MS : -dt / (HOLD_MS / 2)));
    pRef.current = next;
    setP(next);
    if (next >= 1) {
      holding.current = false;
      setDone(true);
      return;
    }
    if (next <= 0 && !holding.current) return;
    raf.current = requestAnimationFrame(tick);
  };

  const run = () => {
    cancelAnimationFrame(raf.current);
    last.current = performance.now();
    raf.current = requestAnimationFrame(tick);
  };
  const start = () => {
    if (done || holding.current) return;
    holding.current = true;
    run();
  };
  const stop = () => {
    if (!holding.current) return;
    holding.current = false;
    run();
  };
  const reset = () => {
    cancelAnimationFrame(raf.current);
    pRef.current = 0;
    setP(0);
    setDone(false);
  };
  const onKey = (down: boolean) => (e: KeyboardEvent) => {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    if (down && !e.repeat) start();
    if (!down) stop();
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const stages: { brand?: BrandKey; l: string; v: number; w: number }[] = [
    { brand: "meta", l: t("People who saw the ad", "Njerëz që e panë reklamën"), v: 12400, w: 100 },
    {
      brand: "instagram",
      l: t("Opened the profile or link", "Hapën profilin ose linkun"),
      v: 640,
      w: 68,
    },
    { brand: "whatsapp", l: t("Sent you a message", "Ju shkruan në WhatsApp"), v: 96, w: 42 },
    { l: t("Became clients", "U bënë klientë"), v: 23, w: 24 },
  ];
  const fill = (i: number) => clamp((p - i * 0.17) / 0.49);
  const status = done
    ? t("Done", "Përfundoi")
    : p > 0
      ? t("Running…", "Duke punuar…")
      : t("Ready", "Gati");
  const R = 64;
  const C = 2 * Math.PI * R;

  return (
    <section id="try" className="scroll-mt-20 bg-navy text-white py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
        <Reveal className="lg:col-span-5">
          <p className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8FA8D8]">
            <span className="size-1.5 rounded-full bg-current" aria-hidden />
            {t("Try it yourself", "Provojeni vetë")}
          </p>
          <h2 className="mt-5 text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] leading-[1]">
            {lang === "sq" ? (
              <>
                Çfarë bën <span className="accent-light text-[#8FA8D8]">një reklamë.</span>
              </>
            ) : (
              <>
                What one ad <span className="accent-light text-[#8FA8D8]">does.</span>
              </>
            )}
          </h2>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-md">
            {t(
              "Press and hold the button to run an example campaign. Watch views turn into messages, and messages into clients.",
              "Mbajeni butonin të shtypur për të nisur një fushatë shembull. Shihni si shikimet bëhen mesazhe, dhe mesazhet klientë.",
            )}
          </p>

          <div className="mt-10 flex items-center gap-6">
            {done ? (
              <button
                type="button"
                onClick={reset}
                className="grid place-items-center size-36 rounded-full border border-white/20 text-sm font-medium hover:border-white transition-colors"
              >
                <span className="flex flex-col items-center gap-2">
                  <RotateCcw className="size-5" />
                  {t("Run again", "Provo sërish")}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                  start();
                }}
                onPointerUp={stop}
                onPointerCancel={stop}
                onLostPointerCapture={stop}
                onKeyDown={onKey(true)}
                onKeyUp={onKey(false)}
                onContextMenu={(e) => e.preventDefault()}
                aria-label={t(
                  "Press and hold to run the campaign",
                  "Mbajeni shtypur për të nisur fushatën",
                )}
                className="relative grid place-items-center size-36 rounded-full bg-primary select-none touch-none transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <svg
                  viewBox="0 0 144 144"
                  className="absolute inset-0 size-full -rotate-90"
                  aria-hidden
                >
                  <circle
                    cx="72"
                    cy="72"
                    r={R}
                    fill="none"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r={R}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={C}
                    strokeDashoffset={C * (1 - p)}
                  />
                </svg>
                <span className="relative text-center text-[13px] font-semibold leading-tight px-6">
                  {t("Press & hold", "Mbaje shtypur")}
                </span>
              </button>
            )}
            <p className="text-[13px] text-white/50 leading-relaxed max-w-[15rem]">
              {t(
                "Illustration with example numbers. Real results depend on your budget, offer and industry.",
                "Ilustrim me numra shembull. Rezultatet reale varen nga buxheti, oferta dhe industria.",
              )}
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={100}>
          <div className="bp-grid rounded-[28px] border border-white/10 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.16em]">
              <span className="text-[#8FA8D8]">{t("Example campaign", "Fushatë shembull")}</span>
              <span
                className={`inline-flex items-center gap-2 ${done ? "text-[#25D366]" : "text-white/80"}`}
              >
                <span
                  className={`size-2 rounded-full ${done ? "bg-[#25D366]" : p > 0 ? "bg-white animate-pulse" : "bg-white/40"}`}
                />
                {status}
              </span>
            </div>

            <ol className="mt-8 space-y-5">
              {stages.map((s, i) => {
                const f = fill(i);
                return (
                  <li key={s.l}>
                    <div className="flex items-end justify-between gap-4">
                      <span className="flex items-center gap-3 text-[15px] text-white/85">
                        <span className="grid place-items-center size-8 rounded-lg bg-white">
                          {s.brand ? (
                            <BrandLogo brand={s.brand} className="size-4.5" />
                          ) : (
                            <UserRound className="size-4.5 text-primary" />
                          )}
                        </span>
                        {s.l}
                      </span>
                      <span className="font-mono text-xl sm:text-2xl font-medium tabular-nums">
                        {Math.round(s.v * f).toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="mt-2.5 h-3 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${i === stages.length - 1 ? "bg-[#25D366]" : "bg-[#8FA8D8]"}`}
                        style={{ width: `${s.w * f}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>

            <ul
              className={`mt-8 pt-6 border-t border-white/10 grid sm:grid-cols-3 gap-3 transition-opacity duration-500 ${done ? "opacity-100" : "opacity-30"}`}
            >
              {[
                t("Shown to the right people", "U shfaq te njerëzit e duhur"),
                t("Messages answered 24/7", "Mesazhet marrin përgjigje 24/7"),
                t("Reported in plain words", "Raportuar me fjalë të thjeshta"),
              ].map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-[13px] text-white/80">
                  <span className="mt-0.5 grid place-items-center size-4 shrink-0 rounded-full bg-[#25D366] text-navy">
                    <Check className="size-2.5" strokeWidth={3} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
