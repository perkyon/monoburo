"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import { pauseLenis, resumeLenis } from "@/components/SmoothScroll";
import { getProjectTheme, type ProjectTheme } from "@/utils/projectThemes";

export type Project = {
  id: number;
  name: string;
  image: string;
  location?: string;
  gallery?: string[];
  theme?: Partial<ProjectTheme>;
  details?: {
    lead: string;
    story: string;
    highlights: string[];
    materials: string;
    duration: string;
    budget: string;
    challenges: string;
    result: string;
  };
};

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
  layoutId?: string;
};

export const ProjectModal = ({ project, onClose, layoutId }: ProjectModalProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const SWIPE_THRESHOLD = 50;
  const theme = getProjectTheme(project);
  const gallery = project.gallery?.length ? project.gallery : [project.image];

  useEffect(() => {
    const html = document.documentElement;
    const originalHtmlOverflow = html.style.overflow;
    const scrollY = window.scrollY;
    pauseLenis();
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    document.body.classList.add("modal-open");

    // Focus scroll root so wheel/trackpad hits this layer
    scrollRef.current?.focus({ preventScroll: true });

    return () => {
      const y = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      html.style.overflow = originalHtmlOverflow;
      document.body.classList.remove("modal-open");
      resumeLenis();
      window.scrollTo(0, y);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (activeIndex !== null) setActiveIndex(null);
        else onClose();
        return;
      }
      if (activeIndex === null) return;
      if (event.key === "ArrowRight") {
        setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % gallery.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, gallery.length, onClose]);

  if (typeof document === "undefined") return null;

  const metrics = [
    { label: "Срок", value: project.details?.duration ?? "по запросу" },
    { label: "Бюджет", value: project.details?.budget ?? "по запросу" },
    { label: "Материалы", value: project.details?.materials ?? "по запросу" },
    { label: "Сложности", value: project.details?.challenges ?? "по запросу" },
  ];

  return createPortal(
    <motion.div
      ref={scrollRef}
      tabIndex={-1}
      data-lenis-prevent
      className="fixed inset-0 z-[1000] overflow-y-auto overscroll-contain bg-[#0a0a0a] outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      {/* Sticky close */}
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="fixed right-4 top-4 z-[1020] flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/50 font-unbounded text-[22px] leading-none text-white backdrop-blur-md transition hover:bg-black/70 md:right-6 md:top-6"
      >
        ×
      </button>

      <article className="relative min-h-full bg-[var(--background)] text-[var(--ink)]">
        {/* Full-bleed hero */}
        <header className="relative h-[52svh] min-h-[280px] max-h-[620px] w-full overflow-hidden bg-black md:h-[62svh]">
          <motion.div
            className="absolute inset-0"
            layoutId={layoutId ?? `project-cover-${project.id}`}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <Image
              src={project.image}
              alt={project.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div
            className="absolute inset-0"
            style={{ background: theme.heroOverlay }}
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-8 md:px-12 md:pb-12 lg:px-20">
            <p
              className="mb-3 font-unbounded text-[11px] uppercase tracking-[0.22em]"
              style={{ color: theme.accent }}
            >
              {theme.label}
            </p>
            <h2 className="max-w-[16ch] font-unbounded text-[36px] font-medium leading-[1.02] text-white md:text-[56px] lg:text-[64px]">
              {project.name}
            </h2>
            {project.location && (
              <p className="mt-3 font-manrope text-[14px] text-white/65 md:text-[16px]">
                {project.location}
              </p>
            )}
          </div>
        </header>

        {/* Lead */}
        <div className="px-5 pt-2 md:px-12 lg:px-20">
          <p className="max-w-[28ch] font-unbounded text-[22px] leading-[1.3] tracking-[-0.02em] md:max-w-[34ch] md:text-[32px]">
            {project.details?.lead ?? "Короткое описание проекта по запросу."}
          </p>
        </div>

        {/* Gallery */}
        <div className="mt-8 md:mt-12">
          <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide snap-x snap-mandatory md:gap-5 md:px-12 lg:px-20">
            {gallery.map((src, index) => (
              <button
                key={`${project.id}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative h-[240px] w-[68vw] max-w-[340px] shrink-0 snap-start overflow-hidden rounded-[4px] text-left md:h-[420px] md:max-w-[480px]"
                aria-label={`Фото ${index + 1}`}
              >
                <Image
                  src={src}
                  alt={`${project.name} — ${index + 1}`}
                  fill
                  sizes="480px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Story + metrics */}
        <div className="grid grid-cols-1 gap-10 px-5 py-12 md:grid-cols-[1.35fr_0.75fr] md:gap-16 md:px-12 md:py-16 lg:px-20">
          <div className="space-y-8">
            <p className="max-w-[58ch] font-manrope text-[16px] leading-[1.65] text-black/75 md:text-[18px]">
              {project.details?.story ?? "Подробности и контекст — по запросу."}
            </p>

            {(project.details?.highlights?.length ?? 0) > 0 && (
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {project.details!.highlights.map((item) => (
                  <li
                    key={item}
                    className="font-unbounded text-[11px] uppercase tracking-[0.14em] text-black/45"
                  >
                    <span className="mr-2" style={{ color: theme.accent }}>
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-black/10 pt-6">
              <p className="mb-2 font-unbounded text-[11px] uppercase tracking-[0.18em] text-black/40">
                Результат
              </p>
              <p className="max-w-[52ch] font-manrope text-[16px] leading-relaxed text-black/80 md:text-[17px]">
                {project.details?.result ?? "Результат и эффект — по запросу."}
              </p>
            </div>
          </div>

          <dl className="h-fit border-t border-black/10">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="grid grid-cols-[100px_1fr] gap-4 border-b border-black/10 py-4 md:grid-cols-[120px_1fr]"
              >
                <dt className="font-unbounded text-[11px] uppercase tracking-[0.16em] text-black/40">
                  {m.label}
                </dt>
                <dd className="font-manrope text-[15px] text-black/85 md:text-[16px]">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="px-5 pb-16 md:px-12 md:pb-24 lg:px-20">
          <button
            type="button"
            onClick={onClose}
            className="font-unbounded text-[13px] uppercase tracking-[0.18em] text-black/45 transition hover:text-black"
          >
            ← Назад к проектам
          </button>
        </div>
      </article>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/85 backdrop-blur-[2px]"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Закрыть фото"
              onClick={() => setActiveIndex(null)}
              className="absolute -right-3 -top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white text-black shadow-lg"
            >
              ×
            </button>
            <button
              type="button"
              aria-label="Предыдущее"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length
                )
              }
              className="absolute left-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow md:flex"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Следующее"
              onClick={() =>
                setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % gallery.length))
              }
              className="absolute right-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow md:flex"
            >
              ›
            </button>
            <div
              className="relative h-[80vh] w-[80vw] overflow-hidden"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                const delta = e.changedTouches[0].clientX - touchStartX.current;
                if (Math.abs(delta) < SWIPE_THRESHOLD) return;
                if (delta > 0) {
                  setActiveIndex((prev) =>
                    prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length
                  );
                } else {
                  setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % gallery.length));
                }
              }}
            >
              <Image
                src={gallery[activeIndex]}
                alt={project.name}
                fill
                sizes="80vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>,
    document.body
  );
};
