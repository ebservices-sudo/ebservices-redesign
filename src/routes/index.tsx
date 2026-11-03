import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import {
  Hero,
  Marquee,
  About,
  ServicesSection,
  Industries,
  ReceptionistSection,
  Process,
  CTA,
  Footer,
} from "@/components/site/Sections";
import { AdSimulator } from "@/components/site/Simulator";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EB Services — Digital Marketing Agency" },
      {
        name: "description",
        content:
          "An AI receptionist that answers your clients 24/7, plus Meta ads, ad design and websites for businesses in Kosovo and across Europe.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://ebservicesks.com/" },
      { rel: "preload", as: "image", href: "/images/hero-strategy.webp" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <ReceptionistSection />
        <About />
        <ServicesSection />
        <Industries />
        <AdSimulator />
        <Process />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
