"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";

export type Project = {
  id: number;
  name: string;
  image: string;
  location?: string;
  gallery?: string[];
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
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % gallery.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length));
      }
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, gallery.length]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6 overflow-y-auto overscroll-contain"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-[1440px] max-h-[96vh] overflow-y-auto scrollbar-hide rounded-[24px] md:rounded-[40px] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute right-[24px] top-[24px] z-10 flex size-[40px] items-center justify-center rounded-full bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
        >
          ×
        </button>

        <div className="relative mx-4 mt-4 md:mx-[40px] md:mt-8 h-[200px] md:h-[320px] overflow-hidden rounded-[20px] md:rounded-[28px]">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 md:p-8 text-white">
            <h3 className="font-unbounded font-medium text-[26px] md:text-[36px] leading-none">{project.name}</h3>
            {project.location && (
              <p className="mt-2 font-unbounded text-[14px] text-white/75">{project.location}</p>
            )}
          </div>
        </div>

        <div className="px-4 md:px-[100px] pt-[28px] md:pt-[40px] pb-[24px] md:pb-[40px]">
          <div className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {gallery.map((src, index) => (
              <div key={`${project.id}-${index}`} className="shrink-0 snap-start">
                <button
                  type="button"
                  data-cursor="view"
                  onClick={() => setActiveIndex(index)}
                  className="group relative h-[240px] md:h-[550px] w-[78vw] max-w-[397px] overflow-hidden rounded-[20px] md:rounded-[40px]"
                  aria-label="Открыть фото"
                >
                  <Image
                    src={src}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 78vw, 397px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 md:px-[100px] pb-[40px] md:pb-[80px]">
          <div className="rounded-[24px] md:rounded-[32px] bg-[#F7F7F7] border border-black/5 p-[20px] md:p-[32px]">
            <div className="text-left">
              <p className="font-unbounded font-semibold text-[24px] md:text-[32px] leading-[1.15] text-black mb-2">
                {project.name}
              </p>
              <p className="font-unbounded t-body text-black/60 mb-6">
                {project.details?.lead ?? "Короткое описание проекта по запросу."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-[1.35fr_0.9fr] gap-6 md:gap-8">
                <div className="space-y-4">
                  <p className="font-unbounded t-body-sm leading-relaxed text-black/75">
                    {project.details?.story ?? "Подробности и контекст — по запросу."}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(project.details?.highlights ?? []).map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-full bg-white text-black/70 t-caption uppercase tracking-wide border border-black/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="font-unbounded t-body-sm leading-relaxed text-black/70">
                    {project.details?.result ?? "Результат и эффект — по запросу."}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="font-unbounded t-caption text-black/50 uppercase tracking-wide">Метрики</p>
                  <div className="rounded-[18px] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                    <p className="font-unbounded t-caption text-black/50 uppercase tracking-wide">Срок</p>
                    <p className="font-unbounded t-body text-black">{project.details?.duration ?? "по запросу"}</p>
                  </div>
                  <div className="rounded-[18px] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                    <p className="font-unbounded t-caption text-black/50 uppercase tracking-wide">Бюджет</p>
                    <p className="font-unbounded t-body text-black">{project.details?.budget ?? "по запросу"}</p>
                  </div>
                  <div className="rounded-[18px] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                    <p className="font-unbounded t-caption text-black/50 uppercase tracking-wide">Материалы</p>
                    <p className="font-unbounded t-body-sm text-black">{project.details?.materials ?? "по запросу"}</p>
                  </div>
                  <div className="rounded-[18px] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                    <p className="font-unbounded t-caption text-black/50 uppercase tracking-wide">Сложности</p>
                    <p className="font-unbounded t-body-sm text-black">{project.details?.challenges ?? "по запросу"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/70 backdrop-blur-[2px]"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] rounded-[24px] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Закрыть фото"
              onClick={() => setActiveIndex(null)}
              className="absolute -right-3 -top-3 z-10 flex size-[36px] items-center justify-center rounded-full bg-white text-black shadow-[0_6px_16px_rgba(0,0,0,0.25)]"
            >
              ×
            </button>
            <button
              type="button"
              aria-label="Предыдущее фото"
              onClick={() => setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length))}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 hidden md:flex size-[44px] items-center justify-center rounded-full bg-white/90 text-black shadow-[0_6px_16px_rgba(0,0,0,0.2)]"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Следующее фото"
              onClick={() => setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % gallery.length))}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 hidden md:flex size-[44px] items-center justify-center rounded-full bg-white/90 text-black shadow-[0_6px_16px_rgba(0,0,0,0.2)]"
            >
              ›
            </button>
            <div
              className="relative h-[80vh] w-[80vw] max-h-[80vh] max-w-[80vw] overflow-hidden rounded-[20px] touch-pan-y"
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const delta = e.changedTouches[0].clientX - touchStartX.current;
                if (Math.abs(delta) < SWIPE_THRESHOLD) return;
                if (delta > 0) {
                  setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length));
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
                className="object-contain transition-transform duration-300 ease-out"
              />
            </div>
          </div>
        </div>
      )}
      </motion.div>
    </motion.div>,
    document.body
  );
};
