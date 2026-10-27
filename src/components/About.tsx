"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const chapters = [
  {
    id: "craft",
    index: "01",
    title: "Пользоваться каждый день",
    text: "Чтобы пространством было удобно жить и работать — не только снимать его.",
    image: "/assets/about_img.png",
    caption: "Мастерская · Краснодар",
  },
  {
    id: "range",
    index: "02",
    title: "Дом, офис, HoReCa",
    text: "Корпусная и отдельно стоящая мебель, кофейни, офисы, жилые интерьеры. Один язык — разные сценарии.",
    image: "/figma/surf2.png",
    caption: "HoReCa · surf coffee",
  },
  {
    id: "finish",
    index: "03",
    title: "Довести до результата",
    text: "Нестандартные планировки, ограниченный бюджет, ошибки ремонта, жёсткий дедлайн. Берём ответственность и собираем так, чтобы работало.",
    image: "/assets/home1.png",
    caption: "Дом · жилые пространства",
  },
] as const;

const ticker = [
  "корпусная мебель",
  "отдельно стоящая",
  "офисы",
  "кофейни",
  "HoReCa",
  "предметы интерьера",
];

export const About = () => {
  const [active, setActive] = useState(0);
  const chapter = chapters[active];

  return (
    <section id="about" className="relative w-full py-16 md:py-24 overflow-hidden">
      <div className="container-page">
        <p className="font-unbounded text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-black/45">
          Мастерская
        </p>
        <h2 className="mt-2 max-w-[16ch] font-unbounded text-[32px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[52px] lg:text-[60px]">
          Мы не делаем мебель ради мебели.
        </h2>
      </div>

      <div className="container-page mt-8 md:mt-12 grid grid-cols-1 items-stretch gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
        <div className="relative min-h-[380px] overflow-hidden rounded-[24px] md:min-h-[640px] md:rounded-[32px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={chapter.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={chapter.image}
                alt={chapter.caption}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                quality={90}
                className="object-cover"
                priority={active === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 font-unbounded text-[11px] uppercase tracking-[0.18em] text-white/80 md:bottom-7 md:left-7">
                {chapter.caption}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-8 max-w-[34ch] font-manrope text-[16px] leading-relaxed text-black/55 md:text-[17px]">
            Сначала — как здесь будут пользоваться. Потом стыки, свет и материал.
          </p>

          <div className="border-t border-black/10">
            {chapters.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className="group flex w-full gap-5 border-b border-black/10 py-5 text-left md:gap-6 md:py-6"
                >
                  <span
                    className={`font-unbounded text-[13px] transition ${
                      isActive ? "text-black" : "text-black/30"
                    }`}
                  >
                    {item.index}
                  </span>
                  <span>
                    <span
                      className={`block font-unbounded text-[18px] leading-snug tracking-[-0.02em] transition md:text-[22px] ${
                        isActive ? "text-black" : "text-black/40"
                      }`}
                    >
                      {item.title}
                    </span>
                    {isActive ? (
                      <span className="mt-2 block max-w-[34ch] font-manrope text-[14px] leading-relaxed text-black/60 md:text-[15px]">
                        {item.text}
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16 overflow-hidden border-y border-black/8 py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {ticker.concat(ticker).map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="mx-6 font-unbounded text-[12px] uppercase tracking-[0.22em] text-black/35 md:mx-10 md:text-[13px]"
            >
              {item}
              <span className="ml-6 md:ml-10">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
