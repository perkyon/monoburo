"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/components/ProjectModal";

const interiorItems: Project[] = [
  {
    id: 1,
    name: "Свод",
    image: "/interior/DSC03204.JPG",
    location: "Тургенева 151, Краснодар",
    details: {
      lead: "Отдельно стоящий предмет с характером — форма, которая держит пространство.",
      story:
        "Объект спроектирован как самодостаточный элемент интерьера: лаконичная геометрия, аккуратная эмаль, устойчивые пропорции. Подходит для жилых и коммерческих пространств — как акцент или функциональный модуль.",
      highlights: ["МДФ", "эмаль", "1,5 месяца", "40.000 ₽"],
      result:
        "Готовый предмет с фиксированной ценой и сроком изготовления. Цвет и размер — под заказ.",
      duration: "1,5 месяца",
      budget: "40.000 ₽",
      materials: "МДФ, эмаль",
      challenges: "—"
    },
    gallery: [
      "/interior/DSC03157.JPG",
      "/interior/DSC03180.JPG",
      "/interior/DSC03192.JPG",
      "/interior/DSC03204.JPG",
      "/interior/DSC03213.JPG",
      "/interior/DSC03917.JPG",
      "/interior/DSC03936.JPG",
      "/interior/DSC03988.JPG"
    ]
  },
  {
    id: 2,
    name: "Кант",
    image: "/interior/item2/DSC03198.JPG",
    location: "Тургенева 151, Краснодар",
    details: {
      lead: "Чёткая форма и спокойная эмаль — предмет как акцент интерьера.",
      story:
        "Изготовлен из МДФ с эмалевым покрытием. Универсальный формат под жилое или коммерческое пространство. Цвет и размер — под заказ.",
      highlights: ["МДФ", "эмаль", "1,5 месяца", "80.000 ₽"],
      result: "Готовый предмет с фиксированной ценой и сроком. Цвет и размер — под заказ.",
      duration: "1,5 месяца",
      budget: "80.000 ₽",
      materials: "МДФ, эмаль",
      challenges: "—"
    },
    gallery: [
      "/interior/item2/DSC03198.JPG",
      "/interior/item2/DSC03200.JPG",
      "/interior/item2/DSC03222.JPG",
      "/interior/item2/DSC03227.JPG",
      "/interior/item2/DSC03787.JPG",
      "/interior/item2/DSC03864.JPG"
    ]
  },
  {
    id: 3,
    name: "Ниша",
    image: "/interior/item3/DSC03242.JPG",
    location: "Тургенева 151, Краснодар",
    details: {
      lead: "Объём и ритм — модуль с выраженным характером.",
      story:
        "МДФ и эмаль, лаконичная геометрия. Подходит как отдельный объект или часть композиции в интерьере. Цвет и размер — под заказ.",
      highlights: ["МДФ", "эмаль", "1,5 месяца", "120.000 ₽"],
      result: "Готовый предмет с фиксированной ценой и сроком. Цвет и размер — под заказ.",
      duration: "1,5 месяца",
      budget: "120.000 ₽",
      materials: "МДФ, эмаль",
      challenges: "—"
    },
    gallery: [
      "/interior/item3/DSC03242.JPG",
      "/interior/item3/DSC03253.JPG",
      "/interior/item3/DSC03265.JPG",
      "/interior/item3/DSC03936.JPG"
    ]
  },
  {
    id: 4,
    name: "Формат",
    image: "/interior/item4/DSC04104.JPG",
    location: "Тургенева 151, Краснодар",
    details: {
      lead: "Крупный формат и спокойная эмаль — объект, который задаёт тон пространству.",
      story:
        "Изготовлен из МДФ с эмалевым покрытием. Рассчитан на просторные интерьеры. Цвет и размер — под заказ.",
      highlights: ["МДФ", "эмаль", "1,5 месяца", "140.000 ₽"],
      result: "Готовый предмет с фиксированной ценой и сроком. Цвет и размер — под заказ.",
      duration: "1,5 месяца",
      budget: "140.000 ₽",
      materials: "МДФ, эмаль",
      challenges: "—"
    },
    gallery: [
      "/interior/item4/DSC04104.JPG",
      "/interior/item4/DSC04125.JPG"
    ]
  }
];

type InteriorItemsProps = {
  onSelect: (project: Project) => void;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
};

export const interiorItemsList = interiorItems;

export const InteriorItems = ({ onSelect, scrollRef }: InteriorItemsProps) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const listRef = scrollRef ?? internalRef;

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Листать влево"
        onClick={() => listRef.current?.scrollBy({ left: -400, behavior: "smooth" })}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 hidden md:flex size-9 items-center justify-center rounded-full bg-white/95 text-black/80 shadow-md border border-black/10 hover:bg-white hover:text-black hover:shadow-lg transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button
        type="button"
        aria-label="Листать вправо"
        onClick={() => listRef.current?.scrollBy({ left: 400, behavior: "smooth" })}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 hidden md:flex size-9 items-center justify-center rounded-full bg-white/95 text-black/80 shadow-md border border-black/10 hover:bg-white hover:text-black hover:shadow-lg transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <div
        ref={listRef}
        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
      >
        {interiorItems.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(project)}
            className="group relative h-[360px] md:h-[60vh] md:max-h-[720px] w-[78vw] md:w-[520px] shrink-0 snap-start overflow-hidden rounded-[20px] md:rounded-[28px] text-left"
          >
            <Image src={project.image} alt={project.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute bottom-[16px] left-[20px] text-white">
              <p className="t-h3 font-semibold">{project.name}</p>
              {project.location && <p className="t-body-sm text-white/80">{project.location}</p>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
