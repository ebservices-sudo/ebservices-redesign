import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Coffee,
  Dumbbell,
  Globe,
  Hotel,
  MessageCircle,
  Scissors,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
} from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { PhoneChat, type ChatMsg } from "./PhoneChat";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsApp";
import { HomeLink, LogoLockup } from "./Header";
import { useSite, smoothScrollTo } from "./SiteProvider";
import { BrandLogo } from "./Brands";
import { HeroFlow } from "./HeroFlow";
import {
  AdDesignDiagram,
  Blueprint,
  MetaAdsDiagram,
  ReceptionistDiagram,
  WebsiteDiagram,
} from "./Blueprints";
import { services } from "@/lib/services";
import { EMAIL, PHONE, MESSAGES, SOCIAL, waLink } from "@/lib/site";
import ebLogo from "@/assets/eb-logo.png";

export const WRAP = "mx-auto max-w-[1280px] px-5 sm:px-8";

/* ------------------------------------------------------------------ Shared bits */

/** Small uppercase section label with a dot. */
export function Eyebrow({
  children,
  className = "",
  light = false,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] ${light ? "text-[#8FA8D8]" : "text-primary"} ${className}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {children}
    </p>
  );
}

/** Serif italic accent for a word or two inside a heading. */
export function Em({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`accent-light ${className}`}>{children}</span>;
}

/** The three overlapping circles of the EB logo, as a large decorative background shape. */
export function BrandCircles({
  className = "",
  opacity = 0.07,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg viewBox="0 0 512 512" className={`pointer-events-none ${className}`} aria-hidden>
      <circle cx="256" cy="178" r="140" fill="currentColor" fillOpacity={opacity} />
      <circle cx="162" cy="334" r="140" fill="currentColor" fillOpacity={opacity} />
      <circle cx="350" cy="334" r="140" fill="currentColor" fillOpacity={opacity} />
    </svg>
  );
}

const BTN_BASE =
  "group inline-flex items-center justify-center gap-3 h-14 pl-6 pr-2 rounded-full font-medium text-[15px] transition-colors whitespace-nowrap";
export const BTN_PRIMARY = `${BTN_BASE} bg-primary text-white hover:bg-[#0F4789]`;
export const BTN_LIGHT = `${BTN_BASE} bg-white text-navy hover:bg-[#E6ECF7]`;
const BTN_GHOST_DARK =
  "inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full border border-border-strong font-medium text-[15px] hover:border-foreground transition-colors whitespace-nowrap";
const BTN_GHOST_LIGHT =
  "inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full border border-white/25 font-medium text-[15px] hover:border-white transition-colors whitespace-nowrap";

/** Round icon at the end of a pill button. */
function BtnIcon({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "blue" }) {
  return (
    <span
      className={`grid place-items-center size-10 rounded-full transition-transform duration-300 group-hover:rotate-[-12deg] ${
        tone === "blue" ? "bg-primary text-white" : "bg-white text-primary"
      }`}
    >
      {children}
    </span>
  );
}

export function WhatsAppButton({
  label,
  className = BTN_PRIMARY,
  text,
}: {
  label?: string;
  className?: string;
  text?: string;
}) {
  const { t } = useSite();
  const tone = className.includes("bg-white") ? "blue" : "light";
  return (
    <a
      href={waLink(text ?? t(MESSAGES.hello, MESSAGES.helloSq))}
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {label ?? t("Message us on WhatsApp", "Na shkruani në WhatsApp")}
      <BtnIcon tone={tone}>
        <WhatsAppIcon className="size-4" />
      </BtnIcon>
    </a>
  );
}

function SectionHead({
  label,
  title,
  sub,
  light = false,
  className = "",
}: {
  label: string;
  title: ReactNode;
  sub?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <Eyebrow light={light}>{label}</Eyebrow>
      <h2 className="mt-5 text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] leading-[1]">{title}</h2>
      {sub && (
        <p
          className={`mt-6 text-lg leading-relaxed max-w-2xl ${light ? "text-white/70" : "text-muted-foreground"}`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

/** The blueprint diagram for a service (used instead of photos). */
export function ServiceVisual({ slug, className = "" }: { slug: string; className?: string }) {
  const { t } = useSite();
  const index = services.findIndex((s) => s.slug === slug);
  const name = services[index]?.name;
  const fig = `Fig. ${pad(index + 1)}`;
  const title = name ? t(name.en, name.sq) : "";
  let d: ReactNode = null;
  if (slug === "meta-ads-management")
    d = (
      <MetaAdsDiagram
        labels={[
          t("Strategy", "Strategji"),
          t("Audiences", "Audiencat"),
          t("Weekly optimisation", "Optimizim javor"),
        ]}
      />
    );
  if (slug === "ad-designs")
    d = (
      <AdDesignDiagram
        labels={[
          t("Headline", "Titulli"),
          "Story / Reels",
          t("Your brand style", "Stili i brendit"),
        ]}
      />
    );
  if (slug === "websites")
    d = (
      <WebsiteDiagram
        labels={[
          t("Contact", "Kontakti"),
          t("Mobile-first", "Së pari telefoni"),
          t("1-tap WhatsApp", "WhatsApp me 1 prekje"),
        ]}
      />
    );
  if (slug === "ai-receptionist")
    d = (
      <ReceptionistDiagram
        labels={[
          t("Answer", "Përgjigje"),
          t("Booking", "Rezervim"),
          t("Hand-off to you", "Kalon te ju"),
          t("< 10 s avg. reply", "< 10 s përgjigje"),
        ]}
      />
    );
  return (
    <Blueprint fig={fig} title={title} className={className}>
      {d}
    </Blueprint>
  );
}

/* ------------------------------------------------------------------ Hero */

export function Hero() {
  const { t, lang } = useSite();
  const goServices = (e: MouseEvent) => {
    e.preventDefault();
    smoothScrollTo("services");
  };
  const goReceptionist = (e: MouseEvent) => {
    e.preventDefault();
    smoothScrollTo("receptionist");
  };
  return (
    <section id="top" className="relative bg-navy text-white overflow-hidden">
      <BrandCircles
        className="absolute -right-40 -top-24 w-[720px] text-[#8FA8D8] hidden md:block"
        opacity={0.05}
      />
      <div
        className={`${WRAP} relative grid lg:grid-cols-12 gap-14 lg:gap-10 items-center pt-12 pb-20 md:pt-20 md:pb-28`}
      >
        <div className="lg:col-span-6">
          <a
            href="#receptionist"
            onClick={goReceptionist}
            className="group inline-flex items-center gap-3 h-11 pl-1.5 pr-4 rounded-full bg-white/[0.07] border border-white/15 hover:bg-white/[0.12] transition-colors fade-up"
          >
            <span className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-primary text-[12px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap">
              <span className="relative flex size-2" aria-hidden>
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-70" />
                <span className="relative size-2 rounded-full bg-[#25D366]" />
              </span>
              {t("AI Receptionist", "Recepsionisti AI")}
            </span>
            <span className="text-[14px] text-white/85 whitespace-nowrap">
              <span className="sm:hidden">{t("Live 24/7", "Aktiv 24/7")}</span>
              <span className="hidden sm:inline">
                {t("Answers your clients 24/7", "U përgjigjet klientëve tuaj 24/7")}
              </span>
            </span>
            <ArrowRight className="size-4 text-white/60 transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1 className="mt-8 md:mt-10 text-[2.9rem] sm:text-[4rem] xl:text-[5rem] leading-[0.95] tracking-[-0.035em] max-w-[13ch] fade-up [animation-delay:60ms]">
            {lang === "sq" ? (
              <>
                Reklama, dizajn & websites që ju sjellin{" "}
                <Em className="text-[#8FA8D8]">klientë realë.</Em>
              </>
            ) : (
              <>
                Ads, design & websites that bring you{" "}
                <Em className="text-[#8FA8D8]">real clients.</Em>
              </>
            )}
          </h1>

          <p className="mt-7 text-lg text-white/70 leading-relaxed max-w-lg fade-up [animation-delay:120ms]">
            {t(
              "We run your ads, design your posts, build your website and set up an AI that answers every message. You get more bookings and sales.",
              "Ne menaxhojmë reklamat, dizajnojmë postimet, ndërtojmë faqen tuaj dhe vendosim një AI që i përgjigjet çdo mesazhi. Ju merrni më shumë rezervime dhe shitje.",
            )}
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 fade-up [animation-delay:160ms]">
            <WhatsAppButton className={BTN_LIGHT} label={t("Get a free plan", "Merr plan falas")} />
            <a href="#services" onClick={goServices} className={BTN_GHOST_LIGHT}>
              {t("Our services", "Shërbimet tona")} <ArrowRight className="size-4" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8 fade-up [animation-delay:200ms]">
          <HeroFlow />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ About / statement */

/** Small inline pill with logos or icons, set inside the big statement text. */
function Pill({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex align-middle items-center justify-center gap-[0.14em] h-[0.92em] px-[0.3em] mx-[0.1em] -translate-y-[0.06em] rounded-full border border-border bg-card shadow-[0_6px_20px_-12px_rgba(10,26,58,.35)]"
      aria-hidden
    >
      {children}
    </span>
  );
}

const PILL_ICON = "h-[0.5em] w-[0.5em]";

export function About() {
  const { t, lang } = useSite();
  const pills = {
    team: (
      <Pill>
        <img src={ebLogo} alt="" className="h-[0.62em] w-auto" />
      </Pill>
    ),
    ads: (
      <Pill>
        <BrandLogo brand="meta" className={PILL_ICON} />
        <BrandLogo brand="instagram" className={PILL_ICON} />
        <BrandLogo brand="facebook" className={PILL_ICON} />
      </Pill>
    ),
    design: (
      <Pill>
        {["#0A1A3A", "#1556A8", "#8FA8D8"].map((c) => (
          <span key={c} className="size-[0.34em] rounded-full" style={{ background: c }} />
        ))}
      </Pill>
    ),
    web: (
      <Pill>
        <Globe className={`${PILL_ICON} text-primary`} strokeWidth={2.5} />
        <BrandLogo brand="whatsapp" className={PILL_ICON} />
      </Pill>
    ),
  };
  const facts = [
    { v: "4", l: t("services under one roof", "shërbime nën një çati") },
    { v: "24/7", l: t("AI replies to your clients", "përgjigje me AI për klientët") },
    { v: "< 10s", l: t("average AI reply time", "kohë mesatare përgjigjeje") },
    { v: "0", l: t("posts published without your OK", "postime pa miratimin tuaj") },
  ];
  return (
    <section id="about" className="scroll-mt-20 py-24 md:py-36">
      <div className={WRAP}>
        <Reveal>
          <Eyebrow>{t("Who we are", "Kush jemi")}</Eyebrow>
          <p className="mt-8 text-[1.9rem] sm:text-[2.6rem] md:text-[3.4rem] leading-[1.1] font-semibold tracking-[-0.035em] max-w-[1100px]">
            {lang === "sq" ? (
              <>
                Jemi një ekip marketingu {pills.team} që i ndihmon bizneset të fitojnë
                klientë online,{" "}
                <span className="text-[#8A93A3]">
                  me reklama {pills.ads} dizajn {pills.design} dhe websites {pills.web} që
                </span>{" "}
                <Em className="text-primary">funksionojnë vërtet.</Em>
              </>
            ) : (
              <>
                We're a marketing team {pills.team} helping businesses win clients
                online,{" "}
                <span className="text-[#8A93A3]">
                  with ads {pills.ads} design {pills.design} and websites {pills.web} that
                </span>{" "}
                <Em className="text-primary">actually work.</Em>
              </>
            )}
          </p>
        </Reveal>

        <Reveal
          delay={80}
          className="mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 border-t border-border"
        >
          {facts.map((f, i) => (
            <div
              key={f.l}
              className={`pt-8 pb-2 pr-6 ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${i % 2 === 1 ? "border-l pl-6 lg:pl-8" : ""} ${i > 1 ? "border-t lg:border-t-0 mt-0" : ""}`}
            >
              <div className="text-[3rem] md:text-[4.25rem] font-semibold tracking-[-0.05em] leading-none text-foreground">
                {f.v}
              </div>
              <p className="mt-3 text-[15px] text-muted-foreground leading-snug max-w-[20ch]">
                {f.l}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Services */

/** Numbered list of all services, each with its blueprint diagram. */
export function ServiceList() {
  const { lang } = useSite();
  return (
    <ul className="border-b border-border">
      {services.map((s, i) => {
        return (
          <li key={s.slug} className="border-t border-border">
            <div className="grid grid-cols-12 gap-x-4 gap-y-6 lg:gap-x-10 py-10 md:py-14 items-center">
              <span className="col-span-12 lg:col-span-1 self-start text-[13px] font-medium text-muted-foreground tabular-nums lg:pt-3">
                ({pad(i + 1)})
              </span>
              <div className="col-span-12 lg:col-span-6 order-last lg:order-none">
                <h3 className="text-[2.1rem] sm:text-[2.75rem] md:text-[3.25rem] leading-[1] tracking-[-0.04em]">
                  {s.name[lang]}
                </h3>
                <p className="mt-5 text-[17px] text-muted-foreground leading-relaxed max-w-xl">
                  {s.short[lang]}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.blocks.map((b) => (
                    <li
                      key={b.t.en}
                      className="inline-flex items-center h-8 px-3.5 rounded-full border border-border-strong text-[13px] text-[#2B3240]"
                    >
                      {b.t[lang]}
                    </li>
                  ))}
                </ul>
              </div>
              <ServiceVisual
                slug={s.slug}
                className="col-span-12 lg:col-span-5 lg:col-start-8 aspect-[4/3] rounded-[22px]"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function ServicesSection() {
  const { t, lang } = useSite();
  return (
    <section id="services" className="scroll-mt-20 pb-24 md:pb-36">
      <div className={WRAP}>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <SectionHead
            label={t("What we do", "Çfarë bëjmë")}
            title={
              lang === "sq" ? (
                <>
                  Katër shërbime. <Em className="text-primary">Një ekip.</Em>
                </>
              ) : (
                <>
                  Four services. <Em className="text-primary">One team.</Em>
                </>
              )
            }
          />
          <Reveal className="lg:max-w-sm" delay={60}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t(
                "Use one, or combine them. Prices depend on the work, so message us for an offer.",
                "Zgjidhni një, ose kombinojini. Çmimi varet nga puna, prandaj na shkruani për ofertë.",
              )}
            </p>
          </Reveal>
        </div>
        <Reveal className="mt-14 md:mt-20" delay={80}>
          <ServiceList />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Industries */

export function Industries() {
  const { t, lang } = useSite();
  const industries = [
    {
      I: UtensilsCrossed,
      n: t("Restaurants", "Restorante"),
      d: t(
        "Menus that make people hungry, bookings on WhatsApp.",
        "Menu që hapin oreksin, rezervime në WhatsApp.",
      ),
    },
    {
      I: Coffee,
      n: t("Cafés & bars", "Kafene & bare"),
      d: t(
        "Posts and stories that bring people through the door.",
        "Postime e story që sjellin njerëz brenda.",
      ),
    },
    {
      I: Scissors,
      n: t("Salons & barbers", "Sallone & berberë"),
      d: t(
        "Appointments booked 24/7 by the AI receptionist.",
        "Termine të rezervuara 24/7 nga recepsionisti AI.",
      ),
    },
    {
      I: Stethoscope,
      n: t("Clinics & dentists", "Klinika & dentistë"),
      d: t(
        "Ads that build trust and a clean, fast website.",
        "Reklama që ndërtojnë besim dhe website i pastër e i shpejtë.",
      ),
    },
    {
      I: Dumbbell,
      n: t("Gyms & fitness", "Palestra & fitnes"),
      d: t("Campaigns that bring in new members.", "Fushata që sjellin anëtarë të rinj."),
    },
    {
      I: Building2,
      n: t("Real estate", "Patundshmëri"),
      d: t(
        "Interested buyers for every listing, sent to you.",
        "Blerës të interesuar për çdo pronë, direkt te ju.",
      ),
    },
    {
      I: ShoppingBag,
      n: t("Shops & e-commerce", "Dyqane & e-commerce"),
      d: t(
        "Ads that sell products, not just collect likes.",
        "Reklama që shesin produkte, jo vetëm mbledhin pëlqime.",
      ),
    },
    {
      I: Hotel,
      n: t("Hotels & tourism", "Hotele & turizëm"),
      d: t(
        "Reach guests before they book somewhere else.",
        "Arrini mysafirët para se të rezervojnë diku tjetër.",
      ),
    },
  ];
  return (
    <section
      id="industries"
      className="scroll-mt-20 relative bg-navy text-white py-24 md:py-36 overflow-hidden"
    >
      <BrandCircles
        className="absolute -left-48 bottom-0 w-[640px] text-[#8FA8D8]"
        opacity={0.05}
      />
      <div className={`${WRAP} relative`}>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <SectionHead
            light
            label={t("Who we work with", "Me kë punojmë")}
            title={
              lang === "sq" ? (
                <>
                  Për çdo biznes që kërkon <Em className="text-[#8FA8D8]">më shumë klientë.</Em>
                </>
              ) : (
                <>
                  For every business that wants <Em className="text-[#8FA8D8]">more clients.</Em>
                </>
              )
            }
          />
          <Reveal className="lg:max-w-sm" delay={60}>
            <p className="text-lg text-white/70 leading-relaxed">
              {t(
                "Local shops and international brands alike. If your clients are on Instagram, Facebook or WhatsApp, we can help you reach them.",
                "Dyqane lokale dhe brende ndërkombëtare. Nëse klientët tuaj janë në Instagram, Facebook apo WhatsApp, ne ju ndihmojmë t'i arrini.",
              )}
            </p>
          </Reveal>
        </div>

        <Reveal
          className="mt-14 md:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10"
          delay={80}
        >
          {industries.map((ind, i) => (
            <div
              key={ind.n}
              className="group relative border-r border-b border-white/10 p-7 md:p-8 transition-colors hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between">
                <span className="grid place-items-center size-12 rounded-xl border border-white/15 text-[#8FA8D8] transition-colors group-hover:bg-primary group-hover:border-primary group-hover:text-white">
                  <ind.I className="size-5" strokeWidth={1.6} />
                </span>
                <span className="font-mono text-[11px] tracking-[0.14em] text-white/40">
                  {pad(i + 1)}
                </span>
              </div>
              <h3 className="mt-12 text-[1.6rem] leading-tight tracking-[-0.03em]">{ind.n}</h3>
              <p className="mt-3 text-[15px] text-white/60 leading-relaxed">{ind.d}</p>
            </div>
          ))}
        </Reveal>

        <Reveal
          className="mt-14 md:mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-[22px] border border-white/12 p-6 md:p-8"
          delay={60}
        >
          <p className="text-xl md:text-2xl font-semibold tracking-[-0.02em]">
            {t(
              "Don't see your industry? We work with every kind of business.",
              "Nuk e shihni industrinë tuaj? Punojmë me çdo lloj biznesi.",
            )}
          </p>
          <WhatsAppButton className={BTN_LIGHT} label={t("Ask us", "Na pyesni")} />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ AI Receptionist */

const CHAT: Record<"en" | "sq", ChatMsg[]> = {
  en: [
    { from: "user", text: "Hi! I saw your ad. Do you have a free slot on Saturday?" },
    {
      from: "bot",
      text: "Hi! Yes, we have 10:00 and 14:30 free on Saturday. Which one suits you?",
    },
    { from: "user", text: "14:30 please. How long does it take?" },
    { from: "bot", text: "About 45 minutes. Can I have your name to confirm the booking?" },
    { from: "user", text: "Arta" },
    { from: "bot", text: "Thank you, Arta. You're booked for Saturday at 14:30. See you then!" },
  ],
  sq: [
    { from: "user", text: "Përshëndetje! Pashë reklamën tuaj. A keni termin të lirë të shtunën?" },
    {
      from: "bot",
      text: "Përshëndetje! Po, të shtunën kemi të lirë në 10:00 dhe 14:30. Cili ju përshtatet?",
    },
    { from: "user", text: "14:30 ju lutem. Sa zgjat?" },
    { from: "bot", text: "Rreth 45 minuta. Më jepni emrin që ta konfirmoj rezervimin?" },
    { from: "user", text: "Arta" },
    { from: "bot", text: "Faleminderit, Arta. Jeni rezervuar për të shtunën në 14:30. Shihemi!" },
  ],
};

function InstagramGlyph({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ReceptionistSection() {
  const { t, lang } = useSite();
  const points = [
    t(
      "Replies on WhatsApp, Instagram and Messenger",
      "Përgjigjet në WhatsApp, Instagram dhe Messenger",
    ),
    t(
      "Answers questions about prices and opening hours",
      "U përgjigjet pyetjeve për çmime dhe orar",
    ),
    t("Books appointments straight from the chat", "Rezervon takime direkt nga biseda"),
    t("Passes complex questions to you", "Pyetjet e ndërlikuara jua kalon juve"),
  ];
  const channels = [
    {
      n: "WhatsApp",
      icon: <WhatsAppIcon className="size-4" />,
      c: "bg-[#25D366]",
      pos: "left-0 top-[14%] -rotate-3",
    },
    {
      n: "Instagram",
      icon: <InstagramGlyph />,
      c: "bg-[linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)]",
      pos: "right-0 top-[38%] rotate-2",
    },
    {
      n: "Messenger",
      icon: <MessageCircle className="size-4" />,
      c: "bg-[#0084FF]",
      pos: "left-[2%] bottom-[16%] rotate-1",
    },
  ];
  return (
    <section id="receptionist" className="scroll-mt-20 bg-surface py-24 md:py-36 overflow-hidden">
      <div className={`${WRAP} grid lg:grid-cols-12 gap-14 lg:gap-10 items-center`}>
        <div className="lg:col-span-6">
          <SectionHead
            label={t(
              "Our main service · AI Receptionist",
              "Shërbimi ynë kryesor · Recepsionist me AI",
            )}
            title={
              lang === "sq" ? (
                <>
                  U përgjigjet klientëve <Em className="text-primary">ndërsa ju punoni.</Em>
                </>
              ) : (
                <>
                  Answers your clients <Em className="text-primary">while you work.</Em>
                </>
              )
            }
            sub={t(
              "A chatbot that replies to your clients 24/7 and books appointments for you. Day, night or weekend, no message waits.",
              "Një chatbot që u përgjigjet klientëve tuaj 24/7 dhe rezervon takime për ju. Ditë, natë apo fundjavë, asnjë mesazh nuk pret.",
            )}
          />
          <Reveal delay={80}>
            <ul className="mt-10 grid sm:grid-cols-2 gap-3">
              {points.map((p, i) => (
                <li key={p} className="rounded-2xl bg-card border border-border p-5">
                  <span className="text-[12px] font-medium text-primary tabular-nums">
                    {pad(i + 1)}
                  </span>
                  <p className="mt-2 font-medium leading-snug">{p}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-10 flex gap-12">
              <div>
                <dd className="text-5xl font-semibold tracking-[-0.04em]">&lt; 10s</dd>
                <dt className="mt-1.5 text-sm text-muted-foreground">
                  {t("average reply", "përgjigje mesatare")}
                </dt>
              </div>
              <div>
                <dd className="text-5xl font-semibold tracking-[-0.04em]">24/7</dd>
                <dt className="mt-1.5 text-sm text-muted-foreground">
                  {t("always on", "gjithmonë aktiv")}
                </dt>
              </div>
            </dl>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link to="/assistant" className={BTN_PRIMARY}>
                {t("Try the live demo", "Provo demon live")}{" "}
                <BtnIcon>
                  <ArrowUpRight className="size-4" />
                </BtnIcon>
              </Link>
              <WhatsAppButton
                text={MESSAGES.demo}
                label={t("Book a free demo", "Rezervo demo falas")}
                className={BTN_GHOST_DARK}
              />
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-6" delay={120}>
          <div className="relative rounded-[32px] bg-primary px-4 py-12 sm:py-14 overflow-hidden">
            <BrandCircles
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] max-w-none text-white"
              opacity={0.08}
            />
            <div className="relative">
              <PhoneChat
                key={lang}
                phone
                messages={CHAT[lang]}
                name={t("Your Business", "Biznesi juaj")}
                initials={t("YB", "BJ")}
                typingLabel={t("typing…", "duke shkruar…")}
                placeholder={t("Message", "Mesazh")}
              />
              {channels.map((c) => (
                <span
                  key={c.n}
                  className={`hidden sm:inline-flex absolute ${c.pos} items-center gap-2 h-11 pl-1.5 pr-4 rounded-full bg-white text-foreground text-[14px] font-medium shadow-[0_16px_40px_-16px_rgba(10,26,58,.55)]`}
                >
                  <span className={`grid place-items-center size-8 rounded-full text-white ${c.c}`}>
                    {c.icon}
                  </span>
                  {c.n}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Process */

export function Process() {
  const { t, lang } = useSite();
  const steps = [
    {
      t: t("Talk", "Bisedojmë"),
      tag: t("Free", "Falas"),
      d: t(
        "A free call about your business, your clients and your goals.",
        "Një bisedë falas për biznesin, klientët dhe qëllimet tuaja.",
      ),
    },
    {
      t: t("Plan", "Planifikojmë"),
      tag: t("In writing", "Me shkrim"),
      d: t(
        "A clear plan and offer in writing: what we do and what it costs.",
        "Plan dhe ofertë e qartë me shkrim: çfarë bëjmë dhe sa kushton.",
      ),
    },
    {
      t: t("Create", "Krijojmë"),
      tag: t("Your approval", "Me miratimin tuaj"),
      d: t(
        "We make it. Nothing goes live without your approval.",
        "Ne e krijojmë. Asgjë nuk publikohet pa miratimin tuaj.",
      ),
    },
    {
      t: t("Grow", "Rritemi"),
      tag: t("Weekly + monthly", "Javore + mujore"),
      d: t(
        "We track results every week and send a short monthly report.",
        "Ndjekim rezultatet çdo javë dhe dërgojmë një raport të shkurtër mujor.",
      ),
    },
  ];
  return (
    <section id="process" className="scroll-mt-20 py-24 md:py-36">
      <div className={`${WRAP} grid lg:grid-cols-12 gap-14 lg:gap-10`}>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              label={t("How we work", "Si punojmë")}
              title={
                lang === "sq" ? (
                  <>
                    Nga mesazhi i parë te <Em className="text-primary">klientët e parë.</Em>
                  </>
                ) : (
                  <>
                    From first message to <Em className="text-primary">first clients.</Em>
                  </>
                )
              }
            />
            <Reveal delay={60} className="mt-10 bp-grid rounded-[28px] p-7 md:p-8 text-white">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FA8D8]">
                {t("Step 01 · Free", "Hapi 01 · Falas")}
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-[-0.025em] leading-snug max-w-sm">
                {t(
                  "The first call is free. Tell us about your business and we'll suggest a clear plan.",
                  "Biseda e parë është falas. Na tregoni për biznesin tuaj dhe ne ju propozojmë një plan të qartë.",
                )}
              </p>
              <div className="mt-7">
                <WhatsAppButton
                  className={BTN_LIGHT}
                  label={t("Book the free call", "Rezervo bisedën falas")}
                />
              </div>
            </Reveal>
          </div>
        </div>
        <ol className="lg:col-span-6 lg:col-start-7">
          {steps.map((s, i) => (
            <li key={s.t} className="border-t border-border last:border-b">
              <Reveal
                delay={i * 60}
                className="grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10 py-10"
              >
                <span className="text-[3.5rem] sm:text-[5rem] leading-[0.85] font-semibold tracking-[-0.06em] text-[#C5D3E8] tabular-nums">
                  {pad(i + 1)}
                </span>
                <div>
                  <span className="inline-flex items-center h-7 px-3 rounded-full bg-[#E3EBF7] text-primary text-[12px] font-semibold">
                    {s.tag}
                  </span>
                  <h3 className="mt-4 text-[2rem] sm:text-[2.5rem] leading-none tracking-[-0.04em]">
                    {s.t}
                  </h3>
                  <p className="mt-4 text-[17px] text-muted-foreground leading-relaxed max-w-md">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Contact + footer (navy) */

export function CTA(_props: { index?: string | null }) {
  const { t, lang } = useSite();
  const rows = [
    { l: "WhatsApp", v: PHONE, href: waLink(t(MESSAGES.hello, MESSAGES.helloSq)) },
    { l: "Email", v: EMAIL, href: `mailto:${EMAIL}` },
    { l: "Instagram", v: "@ebservicesks", href: SOCIAL.instagram },
    { l: "Facebook", v: "EB Services", href: SOCIAL.facebook },
  ];
  return (
    <section
      id="contact"
      className="scroll-mt-20 relative bg-navy text-white pt-24 md:pt-36 pb-16 overflow-hidden"
    >
      <BrandCircles
        className="absolute -right-56 -top-40 w-[820px] text-[#8FA8D8]"
        opacity={0.05}
      />
      <div className={`${WRAP} relative grid lg:grid-cols-12 gap-14`}>
        <Reveal className="lg:col-span-7">
          <Eyebrow light>{t("Contact", "Kontakti")}</Eyebrow>
          <h2 className="mt-6 text-[3.25rem] sm:text-[4.5rem] md:text-[6rem] leading-[0.92] tracking-[-0.025em]">
            {lang === "sq" ? (
              <>
                Le ta rrisim <Em className="text-[#8FA8D8]">biznesin tuaj.</Em>
              </>
            ) : (
              <>
                Let's grow <Em className="text-[#8FA8D8]">your business.</Em>
              </>
            )}
          </h2>
          <p className="mt-8 text-lg text-white/70 max-w-lg leading-relaxed">
            {t(
              "Start with a free call. Tell us what you need and we'll send a clear plan and offer.",
              "Fillojmë me një bisedë falas. Na tregoni çfarë ju duhet dhe ju dërgojmë plan dhe ofertë të qartë.",
            )}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <WhatsAppButton className={BTN_LIGHT} />
            <a href={`mailto:${EMAIL}`} className={BTN_GHOST_LIGHT}>
              {t("Send an email", "Dërgo email")}
            </a>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-5 lg:pt-14" delay={80}>
          <ul className="space-y-3">
            {rows.map((r) => (
              <li key={r.l}>
                <a
                  href={r.href}
                  target={r.l === "Email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-[20px] border border-white/12 px-6 py-5 hover:bg-white hover:text-navy transition-colors"
                >
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50 group-hover:text-primary transition-colors">
                      {r.l}
                    </span>
                    <span className="block mt-1 text-lg font-medium truncate">{r.v}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-white/50 group-hover:text-primary group-hover:rotate-45 transition-all" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const { t, lang } = useSite();
  return (
    <footer className="bg-navy text-white overflow-hidden">
      <div className={WRAP}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 py-14 border-t border-white/10">
          <div className="lg:col-span-5">
            <HomeLink className="inline-flex">
              <LogoLockup size="lg" />
            </HomeLink>
            <p className="mt-6 text-white/55 max-w-xs leading-relaxed">
              {t(
                "Digital marketing for businesses that want more clients.",
                "Marketing digjital për biznese që duan më shumë klientë.",
              )}
            </p>
          </div>
          <div className="lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
              {t("Services", "Shërbimet")}
            </p>
            <ul className="mt-5 space-y-3 text-[15px]">
              {services.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`${import.meta.env.BASE_URL}#services`}
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    {s.name[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
              {t("Company", "Kompania")}
            </p>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li>
                <Link to="/assistant" className="text-white/75 hover:text-white transition-colors">
                  {t("AI demo", "Demo AI")}
                </Link>
              </li>
              <li>
                <a href={`${import.meta.env.BASE_URL}#process`} className="text-white/75 hover:text-white transition-colors">
                  {t("Process", "Procesi")}
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
              {t("Follow", "Na ndiqni")}
            </p>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="select-none text-center font-semibold tracking-[-0.06em] leading-[0.8] text-[17vw] text-white/[0.07] whitespace-nowrap"
        aria-hidden
      >
        EB Services
      </div>
      <div className={WRAP}>
        <div className="flex flex-col sm:flex-row justify-between gap-3 py-7 text-[13px] text-white/45 pb-24 md:pb-7">
          <span>
            © 2026 EB Services. {t("All rights reserved.", "Të gjitha të drejtat e rezervuara.")}
          </span>
          <span>{t("Digital Growth Solutions", "Zgjidhje për rritje digjitale")}</span>
        </div>
      </div>
    </footer>
  );
}
