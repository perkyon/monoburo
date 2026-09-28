import type { Project } from "@/components/ProjectModal";

export type ProjectTheme = {
  label: string;
  accent: string;
  accentSoft: string;
  panel: string;
  ink: string;
  heroOverlay: string;
};

const FALLBACK: ProjectTheme = {
  label: "Проект",
  accent: "#1a1a1a",
  accentSoft: "rgba(26,26,26,0.08)",
  panel: "#f3f3f0",
  ink: "#0a0a0a",
  heroOverlay: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)",
};

const BY_NAME: Record<string, ProjectTheme> = {
  "Союзники кофе": {
    label: "HoReCa · уют",
    accent: "#8B5E3C",
    accentSoft: "rgba(139,94,60,0.12)",
    panel: "#F6F0E8",
    ink: "#2A1C12",
    heroOverlay: "linear-gradient(180deg, transparent 25%, rgba(42,28,18,0.78) 100%)",
  },
  "Том Сойер": {
    label: "HoReCa · компакт",
    accent: "#3D5A5B",
    accentSoft: "rgba(61,90,91,0.12)",
    panel: "#EEF2F2",
    ink: "#1C2A2B",
    heroOverlay: "linear-gradient(180deg, transparent 25%, rgba(28,42,43,0.78) 100%)",
  },
  "Серф кофе": {
    label: "HoReCa · энергия",
    accent: "#C45C26",
    accentSoft: "rgba(196,92,38,0.14)",
    panel: "#F7EEE8",
    ink: "#2B160C",
    heroOverlay: "linear-gradient(180deg, transparent 25%, rgba(43,22,12,0.8) 100%)",
  },
  "Лейбл кофе": {
    label: "HoReCa · quiet luxury",
    accent: "#111111",
    accentSoft: "rgba(17,17,17,0.08)",
    panel: "#F2F2F2",
    ink: "#111111",
    heroOverlay: "linear-gradient(180deg, transparent 25%, rgba(0,0,0,0.82) 100%)",
  },
  "ЖК Сердце": {
    label: "Дом · жилой",
    accent: "#6B7C6E",
    accentSoft: "rgba(107,124,110,0.14)",
    panel: "#F1F3F0",
    ink: "#1E241F",
    heroOverlay: "linear-gradient(180deg, transparent 25%, rgba(30,36,31,0.75) 100%)",
  },
  "Частный интерьер": {
    label: "Дом · private",
    accent: "#7A6552",
    accentSoft: "rgba(122,101,82,0.14)",
    panel: "#F4F0EB",
    ink: "#251E18",
    heroOverlay: "linear-gradient(180deg, transparent 25%, rgba(37,30,24,0.75) 100%)",
  },
  "Домашняя кухня": {
    label: "Дом · кухня",
    accent: "#A67C52",
    accentSoft: "rgba(166,124,82,0.14)",
    panel: "#F7F1EA",
    ink: "#2A1F14",
    heroOverlay: "linear-gradient(180deg, transparent 25%, rgba(42,31,20,0.75) 100%)",
  },
  Гостиная: {
    label: "Дом · гостиная",
    accent: "#5C6B7A",
    accentSoft: "rgba(92,107,122,0.14)",
    panel: "#EEF1F4",
    ink: "#1A2229",
    heroOverlay: "linear-gradient(180deg, transparent 25%, rgba(26,34,41,0.75) 100%)",
  },
  Спальня: {
    label: "Дом · спальня",
    accent: "#8A7A8E",
    accentSoft: "rgba(138,122,142,0.14)",
    panel: "#F3F0F4",
    ink: "#241F26",
    heroOverlay: "linear-gradient(180deg, transparent 25%, rgba(36,31,38,0.75) 100%)",
  },
  Свод: {
    label: "Предмет · форма",
    accent: "#2F2F2F",
    accentSoft: "rgba(47,47,47,0.1)",
    panel: "#F5F5F5",
    ink: "#141414",
    heroOverlay: "linear-gradient(180deg, transparent 25%, rgba(0,0,0,0.7) 100%)",
  },
  Кант: {
    label: "Предмет · акцент",
    accent: "#4A5D4E",
    accentSoft: "rgba(74,93,78,0.12)",
    panel: "#F0F3F0",
    ink: "#1A221C",
    heroOverlay: "linear-gradient(180deg, transparent 25%, rgba(26,34,28,0.72) 100%)",
  },
  Ниша: {
    label: "Предмет · объём",
    accent: "#6E5A48",
    accentSoft: "rgba(110,90,72,0.12)",
    panel: "#F3EFEA",
    ink: "#231C16",
    heroOverlay: "linear-gradient(180deg, transparent 25%, rgba(35,28,22,0.72) 100%)",
  },
  Формат: {
    label: "Предмет · модуль",
    accent: "#3A4A5C",
    accentSoft: "rgba(58,74,92,0.12)",
    panel: "#EEF1F4",
    ink: "#161C24",
    heroOverlay: "linear-gradient(180deg, transparent 25%, rgba(22,28,36,0.72) 100%)",
  },
};

export function getProjectTheme(project: Pick<Project, "name" | "theme">): ProjectTheme {
  if (project.theme) return { ...FALLBACK, ...project.theme };
  return BY_NAME[project.name] ?? FALLBACK;
}
