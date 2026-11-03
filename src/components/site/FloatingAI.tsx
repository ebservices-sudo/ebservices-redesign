import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Bot, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSite } from "./SiteProvider";

const DISMISS_KEY = "ai-cta-dismissed";

/**
 * Floating "Try the AI Receptionist" button, so no visitor misses the main service.
 * Shows after scrolling past the hero, hides while the AI Receptionist section is on screen,
 * never shows on /assistant, and can be closed for the rest of the visit.
 */
export function FloatingAI() {
  const { t } = useSite();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSectionInView(false);
    const el = document.getElementById("receptionist");
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setSectionInView(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* storage unavailable */
    }
  };

  if (pathname.startsWith("/assistant") || dismissed) return null;
  const visible = scrolled && !sectionInView;

  return (
    <div
      className={`fixed left-4 bottom-4 md:left-6 md:bottom-6 z-40 flex items-center gap-1.5 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!visible}
    >
      <Link
        to="/assistant"
        tabIndex={visible ? 0 : -1}
        className="group flex items-center gap-3 h-14 pl-2 pr-4 md:pr-5 rounded-full bg-primary text-white shadow-[0_18px_40px_-14px_rgba(10,26,58,.65)] ring-1 ring-white/15 hover:bg-[#0F4789] transition-colors"
      >
        <span className="relative grid place-items-center size-10 rounded-full bg-white text-primary">
          <Bot className="size-5" />
          <span className="absolute -top-0.5 -right-0.5 size-3 rounded-full bg-[#25D366] ring-2 ring-primary" />
        </span>
        <span className="leading-tight">
          <span className="block text-[14px] font-semibold">
            <span className="md:hidden">{t("AI Receptionist", "Recepsionisti AI")}</span>
            <span className="hidden md:inline">
              {t("Try the AI Receptionist", "Provo Recepsionistin AI")}
            </span>
          </span>
          <span className="hidden md:block text-[12px] text-white/75">
            {t("Live demo · answers in seconds", "Demo live · përgjigjet për sekonda")}
          </span>
        </span>
        <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
      </Link>
      <button
        type="button"
        onClick={dismiss}
        tabIndex={visible ? 0 : -1}
        aria-label={t("Close", "Mbyll")}
        className="grid place-items-center size-8 rounded-full bg-white text-navy shadow-md hover:bg-[#E6ECF7] transition-colors"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
