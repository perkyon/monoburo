"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
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
  const SWIPE_THRESHOLD = 50;
  const theme = getProjectTheme(project);

  useEffect(() => {
    const html = document.documentElement;
    const originalHtmlOverflow = html.style.overflow;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    return () => {
      const y = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      html.style.overflow = originalHtmlOverflow;
      document.body.classList.remove("modal-open");
      window.scrollTo(0, y);
    };
  }, []);

  const gallery = project.gallery?.length ? project.gallery : [project.image];

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
        setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length));
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
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6 overflow-y-auto overscroll-contain"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="relative w-full max-w-[1200px] max-h-[96vh] overflow-y-auto scrollbar-hide rounded-[24px] md:rounded-[36px] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        style={{ color: theme.ink }}
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full text-white shadow-md backdrop-blur-md"
          style={{ background: theme.accent }}
        >
          ×
        </button>

        {/* Hero */}
        <div className="relative h-[240px] md:h-[380px] overflow-hidden rounded-t-[24px] md:rounded-t-[36px]">
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
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0" style={{ background: theme.heroOverlay }} />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 text-white">
            <p
              className="mb-2 font-unbounded text-[11px] tracking-[0.2em] uppercase"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {theme.label}
            </p>
            <h3 className="font-unbounded font-medium text-[28px] md:text-[44px] leading-[1.05]">
              {project.name}
            </h3>
            {project.location && (
              <p className="mt-2 font-unbounded text-[13px] md:text-[15px] text-white/70">
                {project.location}
              </p>
            )}
          </div>
          <div
            className="absolute left-0 top-0 h-full w-[4px] md:w-[6px]"
            style={{ background: theme.accent }}
            aria-hidden
          />
        </div>

        {/* Lead */}
        <div className="px-5 md:px-10 pt-6 md:pt-8">
          <p className="font-unbounded text-[18px] md:text-[24px] leading-[1.35] max-w-[36ch]">
            {project.details?.lead ?? "Короткое описание проекта по запросу."}
          </p>
        </div>

        {/* Gallery */}
        <div className="px-5 md:px-10 pt-6 md:pt-8">
          <div className="flex gap-3 md:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-1">
            {gallery.map((src, index) => (
              <button
                key={`${project.id}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative h-[200px] md:h-[320px] w-[70vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-[18px] md:rounded-[24px] text-left"
                aria-label={`Фото ${index + 1}`}
                style={{ boxShadow: `0 0 0 1px ${theme.accentSoft}` }}
              >
                <Image
                  src={src}
                  alt={`${project.name} — ${index + 1}`}
                  fill
                  sizes="300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Story + metrics */}
        <div className="px-5 md:px-10 py-8 md:py-10">
          <div
            className="rounded-[22px] md:rounded-[28px] p-5 md:p-8"
            style={{ background: theme.panel }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.85fr] gap-7 md:gap-10">
              <div className="space-y-5">
                <p className="font-unbounded text-[14px] md:text-[15px] leading-relaxed opacity-80">
                  {project.details?.story ?? "Подробности и контекст — по запросу."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(project.details?.highlights ?? []).map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-full font-unbounded text-[11px] uppercase tracking-wide"
                      style={{
                        background: theme.accentSoft,
                        color: theme.accent,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div
                  className="rounded-[16px] border px-4 py-3"
                  style={{ borderColor: theme.accentSoft }}
                >
                  <p className="font-unbounded text-[11px] uppercase tracking-[0.16em] opacity-50 mb-1">
                    Результат
                  </p>
                  <p className="font-unbounded text-[14px] leading-relaxed opacity-85">
                    {project.details?.result ?? "Результат и эффект — по запросу."}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-[16px] bg-white/80 px-4 py-3 backdrop-blur-sm"
                    style={{ boxShadow: `inset 3px 0 0 ${theme.accent}` }}
                  >
                    <p className="font-unbounded text-[10px] uppercase tracking-[0.16em] opacity-45">
                      {m.label}
                    </p>
                    <p className="font-unbounded text-[15px] mt-0.5">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/75 backdrop-blur-[2px]"
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
              className="relative h-[80vh] w-[80vw] overflow-hidden rounded-[20px]"
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
