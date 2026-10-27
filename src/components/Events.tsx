"use client";

import { useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { EventPoster } from "@/components/EventPoster";
import { RequestModal } from "@/components/RequestModal";
import { currentBreakfast } from "@/data/events";

const ticker = [
  "завтрак",
  "нетворк",
  "разбор",
  "цех",
  "Surf Coffee",
  "Дальняя 8к1",
  "ЖК Тургенев",
];

export const Events = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const event = currentBreakfast;

  return (
    <section id="events" className="relative w-full py-16 md:py-24">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <SectionTitle eyebrow="Surf Coffee × Monoburo" title="Завтраки с дизайнерами" />
          <p className="max-w-sm font-manrope text-[15px] leading-relaxed text-black/50 md:text-right">
            Собираемся в Surf на Тургенева. Тема каждого выпуска новая. Формат один.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
          <EventPoster event={event} />

          <div className="flex flex-col justify-center md:min-h-full md:py-4">
            <p className="font-unbounded text-[12px] uppercase tracking-[0.18em] text-black/40">
              Ближайший выпуск
            </p>
            <p className="mt-3 font-unbounded text-[28px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[36px]">
              {event.theme}
            </p>
            <p className="mt-4 max-w-[34ch] font-manrope text-[15px] leading-relaxed text-black/55 md:text-[16px]">
              {event.description}
            </p>

            <dl className="mt-8 border-t border-black/10">
              <InfoRow label="Где" value={`${event.place} · ${event.address}`} />
              <InfoRow label="Когда" value={event.when} />
              <InfoRow label="Для кого" value="Дизайнеры мебели и интерьера" />
            </dl>

            <button
              type="button"
              onClick={() => setIsRequestOpen(true)}
              className="btn-ink mt-8 h-[52px] self-start px-8 font-unbounded text-[14px]"
            >
              Записаться на завтрак
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 overflow-hidden border-y border-black/8 py-4 md:mt-16">
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

      {isRequestOpen && <RequestModal onClose={() => setIsRequestOpen(false)} />}
    </section>
  );
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-5 border-b border-black/10 py-4 md:gap-6">
      <dt className="w-[7ch] shrink-0 font-unbounded text-[12px] uppercase tracking-[0.14em] text-black/35">
        {label}
      </dt>
      <dd className="font-unbounded text-[15px] leading-snug tracking-[-0.02em] md:text-[16px]">{value}</dd>
    </div>
  );
}
