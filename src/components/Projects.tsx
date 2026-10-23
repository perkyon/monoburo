"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProjectModal, type Project, type ProjectCategory } from "@/components/ProjectModal";
import { SectionTitle } from "@/components/SectionTitle";
import { allProjects, CATEGORIES, relatedProjects } from "@/data/projects";
import { getProjectTheme } from "@/utils/projectThemes";

export const Projects = () => {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? allProjects : allProjects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="relative z-10 w-full py-16 md:py-24">
      <div className="container-page">
        <div className="mb-8 md:mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle eyebrow="Кейсы" title="Проекты" />
          <p className="max-w-sm font-manrope text-[15px] leading-relaxed text-black/50 md:text-right">
            Масштаб студии — в работах. Каждый кейс собран как отдельная история.
          </p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2 md:gap-3">
          {CATEGORIES.map((cat) => {
            const active = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={`h-10 rounded-full px-4 font-unbounded text-[12px] tracking-[0.04em] transition ${
                  active
                    ? "bg-black text-white"
                    : "bg-black/5 text-black/55 hover:bg-black/10 hover:text-black"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="container-page">
        {visible.map((project, index) => (
          <CaseRow
            key={project.id}
            project={project}
            index={index}
            onOpen={() => setActiveProject(project)}
          />
        ))}
      </div>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          layoutId={`project-cover-${activeProject.id}`}
          related={relatedProjects(activeProject)}
          onOpenRelated={(next) => setActiveProject(next)}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
};

function CaseRow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const theme = getProjectTheme(project);
  const stats = project.stats ?? [];

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group grid w-full grid-cols-1 items-center gap-8 border-t border-black/8 py-10 text-left last:border-b md:grid-cols-[0.92fr_1.18fr] md:gap-12 md:py-16"
    >
      <div>
        {project.tags && project.tags.length > 0 && (
          <p className="mb-6 font-unbounded text-[11px] uppercase tracking-[0.16em] text-black/40">
            {project.tags.join("  ·  ")}
          </p>
        )}

        {stats.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={`${stat.value}-${stat.label}`}>
                <p className="font-unbounded text-[40px] font-medium leading-none tracking-[-0.04em] md:text-[52px]">
                  {stat.value}
                </p>
                <p className="mt-2 max-w-[12ch] font-manrope text-[13px] leading-snug text-black/45">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <p className="mb-2 font-unbounded text-[12px] uppercase tracking-[0.18em] text-black/40">
          {project.kind ?? "Проект"}
        </p>
        <h3 className="font-unbounded text-[28px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[40px]">
          {project.name}
        </h3>
        <p className="mt-3 max-w-[36ch] font-manrope text-[15px] leading-relaxed text-black/60 md:text-[16px]">
          {project.details?.lead ?? project.location}
        </p>
      </div>

      <div
        className="relative overflow-hidden rounded-[24px] p-2.5 md:rounded-[32px] md:p-3.5"
        style={{ background: theme.panel }}
      >
        <motion.div
          layoutId={`project-cover-${project.id}`}
          className="relative aspect-[16/11] overflow-hidden rounded-[16px] md:rounded-[22px]"
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            priority={index < 2}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </motion.div>
      </div>
    </button>
  );
}
