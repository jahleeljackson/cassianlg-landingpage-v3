import { Cta } from "@/components/Cta";
import { Faqs } from "@/components/Faqs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LeadResponseDemo } from "@/components/LeadResponseDemo";
import { Offer } from "@/components/Offer";
import { Problem } from "@/components/Problem";

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-col">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Offer />
        <LeadResponseDemo />
        <Faqs />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
