"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { pauseLenis, resumeLenis } from "@/components/SmoothScroll";
import { ProjectArticle } from "@/components/ProjectArticle";
import { projectPath } from "@/data/projects";
import { trackPageview } from "@/utils/analytics";
import type { ProjectTheme } from "@/utils/projectThemes";

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
    brief?: string;
    story: string;
    goals?: { title: string; text: string }[];
    process?: string;
    highlights?: string[];
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
  related?: Project[];
  onOpenRelated?: (project: Project) => void;
};

export const ProjectModal = ({
  project,
  onClose,
  related = [],
  onOpenRelated,
}: ProjectModalProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

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
    const path = projectPath(project);
    if (!pushedRef.current) {
      window.history.pushState(null, "", path);
      pushedRef.current = true;
    } else if (window.location.pathname !== path) {
      window.history.replaceState(null, "", path);
    }
    const previousTitle = document.title;
    document.title = `${project.name} — monoburo`;
    trackPageview(path, project.name);
    scrollRef.current?.scrollTo({ top: 0 });
    return () => {
      document.title = previousTitle;
    };
  }, [project]);

  useEffect(() => {
    const onPopState = () => {
      if (!window.location.pathname.startsWith("/projects/")) onCloseRef.current();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const requestClose = useCallback(() => {
    if (pushedRef.current && window.location.pathname.startsWith("/projects/")) {
      window.history.back();
    } else {
      onCloseRef.current();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [requestClose]);

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
        onClick={requestClose}
        className="fixed right-4 top-4 z-[1020] flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/40 font-unbounded text-[22px] leading-none text-white backdrop-blur-md transition hover:bg-black/65 md:right-6 md:top-6"
      >
        ×
      </button>

      <ProjectArticle
        key={project.id}
        project={project}
        related={related}
        onOpenRelated={onOpenRelated}
        onBack={requestClose}
      />
    </motion.div>,
    document.body
  );
};
