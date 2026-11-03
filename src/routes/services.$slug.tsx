import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import {
  BrandCircles,
  BTN_LIGHT,
  BTN_PRIMARY,
  CTA,
  Eyebrow,
  Footer,
  ServiceVisual,
  WhatsAppButton,
  WRAP,
} from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { useSite } from "@/components/site/SiteProvider";
import { getService, legacySlugs, services } from "@/lib/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) {
      // Old URLs from earlier versions of the site.
      if (params.slug in legacySlugs) {
        const target = legacySlugs[params.slug];
        if (target)
          throw redirect({ to: "/services/$slug", params: { slug: target }, statusCode: 301 });
        throw redirect({ to: "/services", statusCode: 301 });
      }
      throw notFound();
    }
    return { slug: service.slug };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Not found — EB Services" }, { name: "robots", content: "noindex" }],
      };
    const { metaTitle, metaDescription } = getService(loaderData.slug)!;
    return {
      meta: [
        { title: metaTitle },
        { name: "description", content: metaDescription },
        { property: "og:title", content: metaTitle },
        { property: "og:description", content: metaDescription },
      ],
      links: [{ rel: "canonical", href: `https://ebservicesks.com/services/${params.slug}` }],
    };
  },
  component: ServiceDetail,
});

const pad = (n: number) => String(n).padStart(2, "0");

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const { t, lang } = useSite();
  const service = getService(slug)!;
  const index = services.findIndex((s) => s.slug === slug);
  const others = services.filter((s) => s.slug !== slug);
  const offer = t(
    `Hi EB Services, I'd like an offer for: ${service.name.en}.`,
    `Përshëndetje EB Services, dëshiroj një ofertë për: ${service.name.sq}.`,
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-navy text-white overflow-hidden">
          <BrandCircles
            className="absolute -right-40 -top-24 w-[680px] text-[#8FA8D8] hidden md:block"
            opacity={0.06}
          />
          <div className={`${WRAP} relative pt-10 md:pt-16 pb-40 md:pb-56 fade-up`}>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-4" /> {t("All services", "Të gjitha shërbimet")}
            </Link>
            <div className="mt-12 grid lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <Eyebrow light>
                  {t("Service", "Shërbimi")} {pad(index + 1)} / {pad(services.length)}
                </Eyebrow>
                <h1 className="mt-6 text-[2.75rem] sm:text-[4rem] xl:text-[5.25rem] leading-[0.95] tracking-[-0.045em]">
                  {service.name[lang]}
                </h1>
                <p className="mt-7 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
                  {service.short[lang]}
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                <WhatsAppButton
                  text={offer}
                  label={t("Message us for an offer", "Na shkruani për ofertë")}
                  className={BTN_LIGHT}
                />
                {slug === "ai-receptionist" && (
                  <Link
                    to="/assistant"
                    className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full border border-white/25 font-medium text-[15px] hover:border-white transition-colors"
                  >
                    {t("Try the live demo", "Provo demon live")} <ArrowUpRight className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Blueprint diagram overlapping the hero */}
        <div className={`${WRAP} -mt-28 md:-mt-40 relative`}>
          <ServiceVisual
            slug={slug}
            className="aspect-[4/3] md:aspect-[21/9] rounded-[28px] border border-white/10 shadow-[0_40px_80px_-40px_rgba(10,26,58,.5)]"
          />
        </div>

        {/* Overview */}
        <section className="py-20 md:py-28">
          <div className={`${WRAP} grid lg:grid-cols-12 gap-10`}>
            <div className="lg:col-span-4">
              <Eyebrow>{t("Overview", "Përmbledhje")}</Eyebrow>
            </div>
            <Reveal className="lg:col-span-8 space-y-6">
              {service.intro.map((p, i) => (
                <p
                  key={i}
                  className={`leading-relaxed max-w-3xl ${i === 0 ? "text-2xl sm:text-[2rem] leading-[1.25] font-semibold tracking-[-0.025em]" : "text-lg text-muted-foreground"}`}
                >
                  {p[lang]}
                </p>
              ))}
            </Reveal>
          </div>
        </section>

        {/* What you get */}
        <section className="py-20 md:py-28 bg-surface">
          <div className={WRAP}>
            <Eyebrow>{t("What you get", "Çfarë përfitoni")}</Eyebrow>
            <h2 className="mt-5 text-[2.25rem] md:text-[3.25rem] leading-[1] max-w-2xl">
              {t(
                "Everything included, start to finish.",
                "Gjithçka e përfshirë, nga fillimi deri në fund.",
              )}
            </h2>
            <Reveal className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.blocks.map((b, i) => (
                <div
                  key={b.t.en}
                  className="rounded-[22px] bg-card border border-border p-7 flex flex-col min-h-[220px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-muted-foreground tabular-nums">
                      {pad(i + 1)}
                    </span>
                    <span className="grid place-items-center size-9 rounded-full bg-[#E3EBF7] text-primary">
                      <Check className="size-4" />
                    </span>
                  </div>
                  <h3 className="mt-auto pt-10 text-[1.6rem] leading-tight tracking-[-0.03em]">
                    {b.t[lang]}
                  </h3>
                  <p className="mt-2.5 text-muted-foreground leading-relaxed">{b.d[lang]}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Price */}
        <section className="py-20 md:py-28">
          <div className={WRAP}>
            <Reveal className="relative rounded-[32px] bg-primary text-white p-8 sm:p-12 md:p-16 overflow-hidden grid lg:grid-cols-12 gap-10 items-end">
              <BrandCircles
                className="absolute -right-24 -bottom-32 w-[520px] text-white"
                opacity={0.08}
              />
              <div className="relative lg:col-span-8">
                <Eyebrow light className="text-white/70!">
                  {t("Price", "Çmimi")}
                </Eyebrow>
                <p className="mt-6 text-[1.9rem] sm:text-[2.6rem] font-semibold tracking-[-0.035em] leading-[1.1] max-w-2xl">
                  {service.pricing[lang]}
                </p>
                <ul className="mt-8 space-y-2.5">
                  {service.notes.map((n) => (
                    <li key={n.en} className="flex items-center gap-3 text-white/85">
                      <span className="grid place-items-center size-5 rounded-full bg-white/15">
                        <Check className="size-3" />
                      </span>
                      {n[lang]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative lg:col-span-4 lg:justify-self-end">
                <WhatsAppButton
                  text={offer}
                  label={t("Get an offer", "Merr ofertë")}
                  className={BTN_LIGHT}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Other services */}
        <section className="pb-24 md:pb-32">
          <div className={WRAP}>
            <div className="flex items-end justify-between gap-6 border-t border-border pt-14">
              <h2 className="text-[2rem] md:text-[2.75rem] leading-none">
                {t("Other services", "Shërbime të tjera")}
              </h2>
              <div className="hidden sm:block">
                <Link to="/services" className={`${BTN_PRIMARY} h-12!`}>
                  {t("All services", "Të gjitha")}
                  <span className="grid place-items-center size-8 rounded-full bg-white text-primary">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {others.map((s) => {
                return (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group block"
                  >
                    <ServiceVisual
                      slug={s.slug}
                      className="aspect-[4/3] rounded-[20px] transition-transform duration-500 group-hover:-translate-y-1"
                    />
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <h3 className="text-lg tracking-[-0.02em] group-hover:text-primary transition-colors">
                        {s.name[lang]}
                      </h3>
                      <ArrowUpRight className="size-5 shrink-0 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
