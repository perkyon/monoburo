"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RequestModal } from "@/components/RequestModal";
import { physicalAddressShort } from "@/utils/site";

const facts = [
  { index: "01", title: "Своё производство", text: "Пилим, кроим и собираем сами. Не посредник с каталогом." },
  { index: "02", title: "Можно приехать", text: "Дизайнеры и заказчики смотрят цех до договора — станок, стык, как держим срок." },
  { index: "03", title: physicalAddressShort, text: "Краснодар. Напишите — договоримся, когда удобно зайти." },
] as const;

export const Workshop = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "180px 0px", threshold: 0.2 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    videoRef.current?.play().catch(() => {});
  }, [shouldLoad]);

  return (
    <section id="workshop" className="relative w-full py-16 md:py-24">
      <div className="container-page">
        <p className="font-unbounded text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-black/45">
          Цех
        </p>
        <h2 className="mt-2 max-w-[16ch] font-unbounded text-[32px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[52px] lg:text-[60px]">
          Сначала — приехать и посмотреть.
        </h2>
      </div>

      <div className="container-page mt-8 md:mt-12 grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] md:items-stretch md:gap-14">
        <div
          ref={stageRef}
          className="relative h-full min-h-[420px] overflow-hidden rounded-[24px] bg-black md:rounded-[32px]"
        >
          {shouldLoad ? (
            <video
              ref={videoRef}
              className="absolute inset-0 size-full object-cover"
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
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 font-unbounded text-[11px] uppercase tracking-[0.18em] text-white/80 md:bottom-7 md:left-7">
            Цех · Краснодар
          </p>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="mb-8 max-w-[36ch] font-manrope text-[16px] leading-relaxed text-black/55 md:text-[17px]">
              Не рендеры и не шоурум. Своё производство: каркас, пыль, срок. Приезжают
              посмотреть — и уже отсюда решают, кому отдавать проект.
            </p>

            <div className="border-t border-black/10">
              {facts.map((item) => (
                <div key={item.index} className="flex gap-5 border-b border-black/10 py-5 md:gap-6 md:py-6">
                  <span className="font-unbounded text-[13px] text-black/30">{item.index}</span>
                  <span>
                    <span className="block font-unbounded text-[18px] leading-snug tracking-[-0.02em] md:text-[22px]">
                      {item.title}
                    </span>
                    <span className="mt-2 block max-w-[34ch] font-manrope text-[14px] leading-relaxed text-black/60 md:text-[15px]">
                      {item.text}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsRequestOpen(true)}
            className="btn-ink mt-8 h-[52px] self-start px-8 font-unbounded text-[14px] md:mt-10"
          >
            Записаться в цех
          </button>
        </div>
      </div>

      {isRequestOpen && <RequestModal onClose={() => setIsRequestOpen(false)} />}
    </section>
  );
};
