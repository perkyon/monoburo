"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";
import { EventPoster } from "@/components/EventPoster";
import { RequestModal } from "@/components/RequestModal";
import {
  breakfasts,
  eventStatus,
  formatEventDate,
  formatEventPill,
  getInitialBreakfastIndex,
  statusLabel,
} from "@/data/events";

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
  const [active, setActive] = useState(getInitialBreakfastIndex);
  const event = breakfasts[active];
  const status = eventStatus(event);

  const nextUpcomingIndex = useMemo(
    () => breakfasts.findIndex((item) => eventStatus(item) !== "past"),
    []
  );
  const isNextUpcoming = status !== "past" && active === nextUpcomingIndex;
  const label = statusLabel(status, isNextUpcoming);
  const canPrev = active > 0;
  const canNext = active < breakfasts.length - 1;

  return (
    <section id="events" className="relative w-full py-16 md:py-24">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
          <SectionTitle eyebrow="Surf Coffee × Monoburo" title="Завтраки с дизайнерами" />
          <p className="max-w-sm font-manrope text-[15px] leading-relaxed text-black/50 md:text-right">
            Собираемся в Surf на Тургенева. Тема каждого выпуска новая. Формат один.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2 md:mb-10">
          {breakfasts.map((item, index) => {
            const itemStatus = eventStatus(item);
            const isActive = index === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                className={`h-[44px] rounded-full px-5 font-unbounded text-[13px] transition ${
                  isActive
                    ? "btn-ink"
                    : "border border-black/12 text-black/45 hover:border-black/30 hover:text-black"
                }`}
              >
                {formatEventPill(item.date)}
                {itemStatus === "past" && !isActive ? (
                  <span className="ml-2 text-[10px] uppercase tracking-[0.12em] opacity-60">архив</span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <EventPoster event={event} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-between md:py-2">
            <div>
              <p className="font-unbounded text-[12px] uppercase tracking-[0.18em] text-black/40">
                {label}
              </p>
              <p className="mt-3 font-unbounded text-[28px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[36px]">
                {event.theme}
              </p>
              <p className="mt-4 max-w-[34ch] font-manrope text-[15px] leading-relaxed text-black/55 md:text-[16px]">
                {event.description}
              </p>

              <dl className="mt-8 border-t border-black/10">
                <InfoRow label="Где" value={`${event.place} · ${event.address}`} />
                <InfoRow label="Когда" value={formatEventDate(event.date)} />
                <InfoRow label="Для кого" value="Дизайнеры мебели и интерьера" />
              </dl>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsRequestOpen(true)}
                className="btn-ink h-[52px] px-8 font-unbounded text-[14px]"
              >
                {status === "past" ? "На следующий завтрак" : "Записаться на завтрак"}
              </button>
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Предыдущий выпуск"
                  disabled={!canPrev}
                  onClick={() => setActive((index) => Math.max(0, index - 1))}
                  className="flex size-[44px] items-center justify-center rounded-full border border-black/12 font-unbounded text-[18px] disabled:opacity-30"
                >
                  ←
                </button>
                <span className="min-w-[4ch] text-center font-unbounded text-[12px] text-black/40">
                  {String(active + 1).padStart(2, "0")} / {String(breakfasts.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  aria-label="Следующий выпуск"
                  disabled={!canNext}
                  onClick={() => setActive((index) => Math.min(breakfasts.length - 1, index + 1))}
                  className="flex size-[44px] items-center justify-center rounded-full border border-black/12 font-unbounded text-[18px] disabled:opacity-30"
                >
                  →
                </button>
              </div>
            </div>
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
