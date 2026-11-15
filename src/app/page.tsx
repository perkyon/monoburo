import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Workshop } from "@/components/Workshop";
import { Projects } from "@/components/Projects";
import { Events } from "@/components/Events";
import { Designers } from "@/components/Designers";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { StickyContact } from "@/components/StickyContact";
import { siteDescription, siteTitle } from "@/utils/site";

export const metadata: Metadata = {
  title: { absolute: siteTitle },
  description: siteDescription,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <About />
      <Reveal>
        <Workshop />
      </Reveal>
      <Reveal>
        <Projects />
      </Reveal>
      <Reveal>
        <Events />
      </Reveal>
      <Reveal>
        <Designers />
      </Reveal>
      <Reveal>
        <Footer />
      </Reveal>
      <StickyContact />
    </main>
  );
}
