import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Events } from "@/components/Events";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <div className="stacked-wrap stacked-2">
        <Reveal>
          <About />
        </Reveal>
      </div>
      <div className="stacked-wrap stacked-1 stacked-tight">
        <Reveal>
          <Projects />
        </Reveal>
      </div>
      <div className="stacked-wrap stacked-3">
        <Reveal>
          <Events />
        </Reveal>
      </div>
      <Reveal>
        <Footer />
      </Reveal>
    </main>
  );
}
