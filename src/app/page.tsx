import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Workshop } from "@/components/Workshop";
import { Projects } from "@/components/Projects";
import { Events } from "@/components/Events";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

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
        <Footer />
      </Reveal>
    </main>
  );
}
