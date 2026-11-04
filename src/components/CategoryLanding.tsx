import Image from "next/image";
import { Footer } from "@/components/Footer";
import type { Project } from "@/components/ProjectModal";
import { RequestButton } from "@/components/RequestButton";
import { StickyContact } from "@/components/StickyContact";
import { SubpageHeader } from "@/components/SubpageHeader";
import { projectPath } from "@/data/projects";

type Fact = { value: string; label: string };
type Point = { title: string; text: string };

export type CategoryLandingProps = {
  source: string;
  eyebrow: string;
  title: string;
  lead: string;
  facts: Fact[];
  offerTitle: string;
  offer: Point[];
  steps: Point[];
  casesTitle: string;
  projects: Project[];
};

export const CategoryLanding = ({
  source,
  eyebrow,
  title,
  lead,
  facts,
  offerTitle,
  offer,
  steps,
  casesTitle,
  projects,
}: CategoryLandingProps) => (
  <main className="min-h-screen bg-background">
    <SubpageHeader source={source} />

    <section className="container-page pb-12 pt-32 md:pb-20 md:pt-44">
      <p className="font-unbounded text-[11px] uppercase tracking-[0.22em] text-black/45 md:text-[12px]">
        {eyebrow}
      </p>
      <h1 className="mt-3 max-w-[18ch] font-unbounded text-[34px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[60px]">
        {title}
      </h1>
      <p className="mt-6 max-w-[52ch] font-manrope text-[16px] leading-relaxed text-black/60 md:text-[18px]">
        {lead}
      </p>

      <div className="mt-10 flex flex-wrap gap-10 md:mt-14 md:gap-16">
        {facts.map((fact) => (
          <div key={fact.label}>
            <p className="font-unbounded text-[40px] font-medium leading-none tracking-[-0.04em] md:text-[56px]">
              {fact.value}
            </p>
            <p className="mt-2 max-w-[16ch] font-manrope text-[13px] leading-snug text-black/45">
              {fact.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 md:mt-14">
        <RequestButton source={source} />
      </div>
    </section>

    <section className="container-page py-12 md:py-20">
      <p className="mb-8 font-unbounded text-[11px] uppercase tracking-[0.2em] text-black/40">
        {offerTitle}
      </p>
      <div className="grid grid-cols-1 border-t border-black/10 md:grid-cols-2">
        {offer.map((item, index) => (
          <div
            key={item.title}
            className="flex gap-5 border-b border-black/10 py-6 md:gap-6 md:py-8 md:odd:pr-10 md:even:pl-10"
          >
            <span className="font-unbounded text-[13px] text-black/30">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="block font-unbounded text-[18px] leading-snug tracking-[-0.02em] md:text-[22px]">
                {item.title}
              </span>
              <span className="mt-2 block max-w-[40ch] font-manrope text-[14px] leading-relaxed text-black/60 md:text-[15px]">
                {item.text}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>

    <section className="container-page py-12 md:py-20">
      <p className="mb-8 font-unbounded text-[11px] uppercase tracking-[0.2em] text-black/40">
        {casesTitle}
      </p>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
        {projects.map((project) => (
          <a key={project.id} href={projectPath(project)} className="group">
            <div className="relative mb-5 aspect-[16/11] overflow-hidden rounded-[24px]">
              <Image
                src={project.image}
                alt={project.name}
                fill
                quality={75}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <p className="font-unbounded text-[12px] uppercase tracking-[0.16em] text-black/40">
              {[project.kind, project.details?.duration, project.details?.budget]
                .filter(Boolean)
                .join("  ·  ")}
            </p>
            <h2 className="mt-2 font-unbounded text-[26px] font-medium tracking-[-0.03em] md:text-[32px]">
              {project.name}
            </h2>
            <p className="mt-2 max-w-[44ch] font-manrope text-[15px] leading-relaxed text-black/55">
              {project.details?.lead}
            </p>
          </a>
        ))}
      </div>
    </section>

    <section className="container-page py-12 md:py-20">
      <p className="mb-8 font-unbounded text-[11px] uppercase tracking-[0.2em] text-black/40">
        Как работаем
      </p>
      <ol className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-10">
        {steps.map((step, index) => (
          <li key={step.title} className="border-t border-black/10 pt-6">
            <span className="font-unbounded text-[13px] text-black/30">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 font-unbounded text-[18px] leading-snug tracking-[-0.02em] md:text-[20px]">
              {step.title}
            </p>
            <p className="mt-2 font-manrope text-[14px] leading-relaxed text-black/60 md:text-[15px]">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </section>

    <Footer />
    <StickyContact />
  </main>
);
