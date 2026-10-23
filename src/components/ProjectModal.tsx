"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import { pauseLenis, resumeLenis } from "@/components/SmoothScroll";
import { getProjectTheme, type ProjectTheme } from "@/utils/projectThemes";

export type ProjectCategory = "home" | "horeca" | "interior";

export type ProjectStat = {
  value: string;
  label: string;
};

export type Project = {
  id: string | number;
  name: string;
  image: string;
  location?: string;
  category?: ProjectCategory;
  kind?: string;
  year?: string;
  tags?: string[];
  stats?: ProjectStat[];
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
  related?: Project[];
  onOpenRelated?: (project: Project) => void;
};

export const ProjectModal = ({
  project,
  onClose,
  layoutId,
  related = [],
  onOpenRelated,
}: ProjectModalProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const SWIPE_THRESHOLD = 50;
  const theme = getProjectTheme(project);
  const gallery = project.gallery?.length ? project.gallery : [project.image];
  const highlights = project.details?.highlights ?? [];
  const stats = project.stats ?? [];

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
    setActiveIndex(null);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

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

  return createPortal(
    <motion.div
      ref={scrollRef}
      tabIndex={-1}
      data-lenis-prevent
      className="fixed inset-0 z-[1000] overflow-y-auto overscroll-contain bg-[var(--background)] outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28 }}
    >
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="fixed right-4 top-4 z-[1020] flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/40 font-unbounded text-[22px] leading-none text-white backdrop-blur-md transition hover:bg-black/65 md:right-6 md:top-6"
      >
        ×
      </button>

      <article>
        <header className="relative min-h-[72svh] overflow-hidden bg-[var(--background)] text-white md:min-h-[78svh]">
          <motion.div
            className="absolute inset-0 origin-bottom"
            layoutId={layoutId ?? `project-cover-${project.id}`}
            transition={{ type: "spring", stiffness: 240, damping: 32 }}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 78%, 0 100%)" }}
          >
            <Image
              src={project.image}
              alt={project.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0" style={{ background: theme.heroOverlay }} />
          </motion.div>

          <div className="relative z-10 flex min-h-[72svh] flex-col justify-end px-5 pb-[18%] pt-24 md:min-h-[78svh] md:px-12 md:pb-[14%] lg:px-20">
            <p className="mb-5 font-unbounded text-[12px] uppercase tracking-[0.28em] text-white/70">
              {project.name}
            </p>
            <h2 className="max-w-[18ch] font-unbounded text-[32px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[52px] lg:text-[60px]">
              {project.details?.lead ?? project.name}
            </h2>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 px-5 py-10 md:grid-cols-2 md:gap-16 md:px-12 md:py-16 lg:px-20">
          <div>
            <p className="font-unbounded text-[40px] font-medium leading-none tracking-[-0.04em] md:text-[56px]">
              {project.year ?? "—"}
            </p>
            {project.tags && project.tags.length > 0 && (
              <p className="mt-6 max-w-[28ch] font-unbounded text-[12px] uppercase tracking-[0.14em] text-black/40">
                {project.tags.join("  ·  ")}
              </p>
            )}
          </div>
          <div>
            <p className="font-unbounded text-[32px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[48px]">
              {project.name}
            </p>
            {project.location && (
              <p className="mt-3 font-manrope text-[15px] text-black/45">{project.location}</p>
            )}
            <p className="mt-6 max-w-[46ch] font-manrope text-[16px] leading-[1.7] text-black/70 md:text-[18px]">
              {project.details?.story ?? "Подробности проекта — по запросу."}
            </p>
          </div>
        </div>

        {highlights.length > 0 && (
          <div className="px-5 py-4 md:px-12 lg:px-20">
            <p className="mb-8 font-unbounded text-[11px] uppercase tracking-[0.2em] text-black/40">
              Цели и задачи
            </p>
            <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-10">
              {highlights.map((item, i) => (
                <li key={item} className="flex gap-5">
                  <span className="font-unbounded text-[13px] text-black/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-unbounded text-[18px] leading-snug tracking-[-0.02em] md:text-[22px]">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-10 px-5 md:mt-16 md:px-12 lg:px-20">
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            className="relative aspect-[16/9] w-full overflow-hidden"
            aria-label="Фото 1"
          >
            <Image src={gallery[0]} alt={project.name} fill sizes="100vw" className="object-cover" />
          </button>
          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-1 gap-3 md:mt-4 md:grid-cols-2 md:gap-4">
              {gallery.slice(1).map((src, index) => (
                <button
                  key={`${project.id}-${src}-${index + 1}`}
                  type="button"
                  onClick={() => setActiveIndex(index + 1)}
                  className="relative aspect-[4/3] w-full overflow-hidden"
                  aria-label={`Фото ${index + 2}`}
                >
                  <Image
                    src={src}
                    alt={`${project.name} — ${index + 2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-8 px-5 py-12 md:grid-cols-4 md:gap-10 md:px-12 md:py-20 lg:px-20">
          {stats.map((stat) => (
            <div key={`${stat.value}-${stat.label}`}>
              <p className="font-unbounded text-[40px] font-medium leading-none tracking-[-0.04em] md:text-[52px]">
                {stat.value}
              </p>
              <p className="mt-2 max-w-[14ch] font-manrope text-[13px] leading-snug text-black/45">
                {stat.label}
              </p>
            </div>
          ))}
          {project.details?.materials && (
            <div>
              <p className="font-unbounded text-[13px] uppercase tracking-[0.16em] text-black/35">
                Материалы
              </p>
              <p className="mt-2 font-manrope text-[15px] leading-relaxed text-black/75">
                {project.details.materials}
              </p>
            </div>
          )}
        </div>

        <div className="px-5 pb-8 md:px-12 lg:px-20">
          <div className="border-t border-black/10 pt-10 md:pt-14">
            <p className="mb-3 font-unbounded text-[11px] uppercase tracking-[0.2em] text-black/40">
              Результат
            </p>
            <p className="max-w-[46ch] font-unbounded text-[22px] leading-[1.3] tracking-[-0.02em] md:text-[28px]">
              {project.details?.result ?? "Результат — по запросу."}
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-8 border-t border-black/8 px-5 py-12 md:px-12 md:py-16 lg:px-20">
            <p className="mb-8 font-unbounded text-[11px] uppercase tracking-[0.2em] text-black/40">
              Ещё кейсы
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
              {related.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onOpenRelated?.(item)}
                  className="group text-left"
                >
                  <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-[20px]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="font-unbounded text-[12px] uppercase tracking-[0.16em] text-black/40">
                    {item.kind ?? "Проект"}
                  </p>
                  <p className="mt-1 font-unbounded text-[22px] tracking-[-0.03em]">{item.name}</p>
                  <p className="mt-1 font-manrope text-[14px] text-black/50">
                    {item.details?.lead}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="px-5 pb-16 md:px-12 md:pb-24 lg:px-20">
          <button
            type="button"
            onClick={onClose}
            className="font-unbounded text-[13px] uppercase tracking-[0.18em] text-black/40 transition hover:text-black"
          >
            ← Все кейсы
          </button>
        </div>
      </article>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/88"
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
              className="absolute -right-3 -top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white text-black"
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
              className="absolute left-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black md:flex"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Следующее"
              onClick={() =>
                setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % gallery.length))
              }
              className="absolute right-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black md:flex"
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
