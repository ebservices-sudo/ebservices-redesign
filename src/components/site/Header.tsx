import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSite, smoothScrollTo } from "./SiteProvider";
import ebLogo from "@/assets/eb-logo.png";
import ebLogoText from "@/assets/eb-logo-text.png";

/** The official logo: the circle mark plus the white wordmark cut from the original artwork. For dark backgrounds only. */
export function LogoLockup({ size = "md" }: { size?: "md" | "lg" }) {
  const mark = size === "lg" ? "h-12" : "h-10";
  const text = size === "lg" ? "h-[60px]" : "h-12";
  return (
    <span className="flex items-center gap-2.5" aria-label="EB Services">
      <img src={ebLogo} alt="" width={48} height={48} className={`${mark} w-auto object-contain`} />
      <img
        src={ebLogoText}
        alt="EB Services, Digital Growth Solutions"
        width={684}
        height={344}
        className={`${text} w-auto object-contain`}
      />
    </span>
  );
}

/**
 * Link to the home page hero. On the home page it scrolls smoothly back to the top
 * (a plain link to "/" does nothing there); from other pages it opens the home page at the top.
 * Ctrl/Cmd/Shift-click still opens normally in a new tab or window.
 */
export function HomeLink({
  children,
  className = "",
  onNavigate,
}: {
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onNavigate?.();
    if (pathname === "/") {
      if (window.location.hash) history.replaceState(history.state, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate({ to: "/" }).then(() => window.scrollTo({ top: 0 }));
  };
  return (
    <Link to="/" aria-label="EB Services — home" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

/** The EB Services lockup: the logo mark (unaltered) with the name and subline. */
export function Logo({ small = false, light = false }: { small?: boolean; light?: boolean }) {
  return (
    <span className="flex items-center gap-3 min-w-0">
      <img
        src={ebLogo}
        alt=""
        width={36}
        height={36}
        className={`${small ? "size-8" : "size-9"} object-contain shrink-0`}
      />
      <span className="leading-none min-w-0">
        <span
          className={`block font-semibold text-[16px] tracking-tight truncate ${light ? "text-white" : ""}`}
        >
          EB Services
        </span>
        <span
          className={`block mt-1 text-[9px] font-medium tracking-[0.14em] uppercase truncate ${light ? "text-white/60" : "text-muted-foreground"}`}
        >
          Digital Growth Solutions
        </span>
      </span>
    </span>
  );
}

export function LangSwitch({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useSite();
  return (
    <div
      className={`flex items-center rounded-full border p-0.5 text-[12px] font-medium ${light ? "border-white/25" : "border-border-strong"}`}
      role="group"
      aria-label="Language"
    >
      {(["sq", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`h-7 px-2.5 rounded-full uppercase transition-colors ${
            lang === l
              ? light
                ? "bg-white text-navy"
                : "bg-foreground text-background"
              : light
                ? "text-white/70 hover:text-white"
                : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const nav = [
    { id: "services", label: t("Services", "Shërbimet") },
    { id: "industries", label: t("Industries", "Industritë") },
    { id: "receptionist", label: t("AI Receptionist", "Recepsionisti AI") },
    { id: "process", label: t("Process", "Procesi") },
    { id: "faq", label: "FAQ" },
  ];

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (pathname !== "/") {
      navigate({ to: "/" }).then(() => setTimeout(() => smoothScrollTo(id), 80));
      return;
    }
    smoothScrollTo(id);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 bg-[rgba(10,26,58,0.95)] backdrop-blur-md text-white border-b transition-colors ${scrolled || open ? "border-white/10" : "border-transparent"}`}
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 h-16 sm:h-[76px] flex items-center justify-between gap-4">
        <HomeLink className="min-w-0" onNavigate={() => setOpen(false)}>
          <LogoLockup />
        </HomeLink>

        <nav className="hidden xl:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 text-[14px] font-medium">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`/#${n.id}`}
              onClick={go(n.id)}
              className="px-4 h-9 inline-flex items-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LangSwitch light />
          </div>
          <a
            href="/#contact"
            onClick={go("contact")}
            className="group hidden sm:inline-flex items-center gap-2 h-11 pl-5 pr-1.5 rounded-full bg-white text-navy font-medium text-[14px] hover:bg-[#E6ECF7] transition-colors whitespace-nowrap"
          >
            {t("Let's talk", "Le të flasim")}
            <span className="grid place-items-center size-8 rounded-full bg-primary text-white transition-transform group-hover:rotate-45">
              <ArrowUpRight className="size-4" />
            </span>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="xl:hidden grid place-items-center size-10 rounded-full border border-white/25"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={`xl:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${open ? "max-h-[calc(100dvh-4rem)] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-5 sm:px-8 pb-6 pt-2 flex flex-col bg-navy">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`/#${n.id}`}
              onClick={go(n.id)}
              className="py-4 border-b border-white/10 text-2xl font-semibold tracking-tight"
            >
              {n.label}
            </a>
          ))}
          <div className="mt-6 flex items-center justify-between gap-4">
            <LangSwitch light />
            <a
              href="/#contact"
              onClick={go("contact")}
              className="inline-flex items-center h-11 px-6 rounded-full bg-white text-navy font-medium text-sm"
            >
              {t("Let's talk", "Le të flasim")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
