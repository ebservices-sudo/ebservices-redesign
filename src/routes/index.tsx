import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import {
  Hero,
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
          "An AI receptionist that answers your clients 24/7, plus Meta ads, ad design and websites for businesses that want more clients.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://ebservicesks.com/" },
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
