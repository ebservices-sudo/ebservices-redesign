import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import {
  BrandCircles,
  CTA,
  Em,
  Eyebrow,
  Footer,
  Marquee,
  ServiceList,
  WRAP,
} from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { useSite } from "@/components/site/SiteProvider";

const TITLE = "Services — AI Receptionist, Meta Ads, Ad Design & Websites | EB Services";
const DESCRIPTION =
  "An AI receptionist for WhatsApp, Instagram and Messenger, Meta ads, ad design and social posts, and websites for businesses in Kosovo and across Europe.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://ebservicesks.com/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const { t, lang } = useSite();
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-navy text-white overflow-hidden">
          <BrandCircles
            className="absolute -right-40 -top-24 w-[680px] text-[#8FA8D8] hidden md:block"
            opacity={0.06}
          />
          <div className={`${WRAP} relative pt-14 pb-20 md:pt-24 md:pb-28 fade-up`}>
            <Eyebrow light>{t("Services", "Shërbimet")}</Eyebrow>
            <h1 className="mt-8 text-[2.9rem] sm:text-[4.25rem] lg:text-[5.5rem] leading-[0.95] tracking-[-0.035em] max-w-[14ch]">
              {lang === "sq" ? (
                <>
                  Katër shërbime. <Em className="text-[#8FA8D8]">Një ekip.</Em>
                </>
              ) : (
                <>
                  Four services. <Em className="text-[#8FA8D8]">One team.</Em>
                </>
              )}
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
              {t(
                "Use one, or combine them. Prices depend on the work, so message us for an offer.",
                "Zgjidhni një, ose kombinojini. Çmimi varet nga puna, prandaj na shkruani për ofertë.",
              )}
            </p>
          </div>
        </section>
        <Marquee />
        <section className={`${WRAP} py-20 md:py-28`}>
          <Reveal>
            <ServiceList headingLevel="h2" />
          </Reveal>
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
