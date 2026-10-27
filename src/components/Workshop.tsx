"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RequestModal } from "@/components/RequestModal";
import {
  showroomAddressShort,
  showroomMapUrl,
  showroomPlace,
  workshopAddressShort,
} from "@/utils/site";

const places = [
  {
    id: "workshop",
    label: "Цех",
    caption: "Цех · Краснодар",
    intro:
      "Не рендеры. Своё производство: каркас, пыль, срок. Приезжают посмотреть — и уже отсюда решают, кому отдавать проект.",
    facts: [
      { index: "01", title: "Своё производство", text: "Пилим, кроим и собираем сами. Не посредник с каталогом." },
      { index: "02", title: "Можно приехать", text: "Дизайнеры и заказчики смотрят цех до договора — станок, стык, как держим срок." },
      { index: "03", title: workshopAddressShort, text: "Напишите — договоримся, когда удобно зайти." },
    ],
    cta: "Записаться в цех",
    mapUrl: undefined as string | undefined,
  },
  {
    id: "showroom",
    label: "Шоурум",
    caption: `Шоурум · ${showroomPlace}`,
    intro:
      "Образцы, материал и разговор без цеховой пыли. Второй этаж, Галерея Фестиваль на ФМР.",
    facts: [
      { index: "01", title: showroomPlace, text: "Фестивальный микрорайон. Удобно заехать посмотреть фактуру вживую." },
      { index: "02", title: showroomAddressShort, text: "10:00–19:00. Лучше написать заранее — встретим." },
      { index: "03", title: "Маршрут", text: "Открыть точку на Яндекс Картах и доехать." },
    ],
    cta: "Записаться в шоурум",
    mapUrl: showroomMapUrl,
  },
] as const;

export const Workshop = () => {
  const [active, setActive] = useState(0);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const place = places[active];
  const isWorkshop = place.id === "workshop";

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "0px", threshold: 0.4 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !isWorkshop) {
      videoRef.current?.pause();
      return;
    }
    videoRef.current?.play().catch(() => {});
  }, [shouldLoad, isWorkshop]);

  return (
    <section id="workshop" className="relative w-full py-16 md:py-24">
      <div className="container-page">
        <p className="font-unbounded text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-black/45">
          Цех и шоурум
        </p>
        <h2 className="mt-2 max-w-[16ch] font-unbounded text-[32px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[52px] lg:text-[60px]">
          Сначала — приехать и посмотреть.
        </h2>

        <div className="mt-8 flex flex-wrap gap-2">
          {places.map((item, index) => {
            const isActive = index === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                className={`h-[48px] rounded-full px-7 font-unbounded text-[14px] transition ${
                  isActive
                    ? "btn-ink"
                    : "border border-black/12 text-black/50 hover:border-black/30 hover:text-black"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="container-page mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] md:items-stretch md:gap-14">
        <div
          ref={stageRef}
          className="relative h-full min-h-[420px] overflow-hidden rounded-[24px] bg-black md:rounded-[32px]"
        >
          {shouldLoad ? (
            <video
              ref={videoRef}
              className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${
                isWorkshop ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              src="/assets/workshop-loop.mp4"
              poster="/assets/workshop-poster.jpg"
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <Image
              src="/assets/workshop-poster.jpg"
              alt="Цех Monoburo"
              fill
              sizes="(max-width: 768px) 100vw, 46vw"
              quality={90}
              className={`object-cover transition-opacity duration-300 ${
                isWorkshop ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />
          )}
          <Image
            src="/assets/showroom.jpg"
            alt="Шоурум Monoburo"
            fill
            sizes="(max-width: 768px) 100vw, 46vw"
            quality={90}
            className={`object-cover object-center transition-opacity duration-300 ${
              isWorkshop ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 font-unbounded text-[11px] uppercase tracking-[0.18em] text-white/80 md:bottom-7 md:left-7">
            {place.caption}
          </p>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="mb-8 max-w-[36ch] font-manrope text-[16px] leading-relaxed text-black/55 md:text-[17px]">
              {place.intro}
            </p>

            <div className="border-t border-black/10">
              {place.facts.map((item) => {
                const isMap = Boolean(place.mapUrl && item.title === "Маршрут");
                const inner = (
                  <>
                    <span className="font-unbounded text-[13px] text-black/30">{item.index}</span>
                    <span>
                      <span className="block font-unbounded text-[18px] leading-snug tracking-[-0.02em] md:text-[22px]">
                        {item.title}
                      </span>
                      <span className="mt-2 block max-w-[34ch] font-manrope text-[14px] leading-relaxed text-black/60 md:text-[15px]">
                        {item.text}
                      </span>
                    </span>
                  </>
                );

                return isMap ? (
                  <a
                    key={item.index}
                    href={place.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex gap-5 border-b border-black/10 py-5 transition hover:bg-black/[0.02] md:gap-6 md:py-6"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={item.index} className="flex gap-5 border-b border-black/10 py-5 md:gap-6 md:py-6">
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
            <button
              type="button"
              onClick={() => setIsRequestOpen(true)}
              className="btn-ink h-[52px] px-8 font-unbounded text-[14px]"
            >
              {place.cta}
            </button>
            {place.mapUrl ? (
              <a
                href={place.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[52px] items-center rounded-full border border-black/12 px-6 font-unbounded text-[14px] text-black/60 transition hover:border-black/30 hover:text-black"
              >
                На карте
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {isRequestOpen && <RequestModal onClose={() => setIsRequestOpen(false)} />}
    </section>
  );
};
