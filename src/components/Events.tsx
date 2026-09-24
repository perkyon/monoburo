"use client";

import Image from "next/image";
import { svgPaths } from "@/utils/svgPaths";
import { SectionTitle } from "@/components/SectionTitle";

export const Events = () => {
  const logos = [1, 2, 3, 4, 5, 6];

  return (
    <section id="events" className="relative w-full stacked-card py-10 md:py-16">
      <div className="container-page">
        <SectionTitle eyebrow="Коллаборации" title="Мероприятия" className="mb-8 md:mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div className="relative h-[280px] md:h-[520px] overflow-hidden rounded-[24px] md:rounded-[36px]">
            <Image src="/assets/event1.png" alt="Мероприятие Monoburo" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="relative h-[280px] md:h-[520px] overflow-hidden rounded-[24px] md:rounded-[36px]">
            <Image src="/assets/event2.png" alt="Мероприятие Monoburo" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>

        <div className="mt-8 md:mt-12 overflow-hidden rounded-full border border-black/8 bg-surface/70 py-4">
          <div className="flex items-center animate-marquee whitespace-nowrap">
            {logos.concat(logos).map((_, index) => (
              <div key={index} className="flex items-center shrink-0">
                <div className="w-[200px] h-[24px] mx-10 opacity-70">
                  <svg className="w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 233.999 28.6417">
                    <path d={svgPaths.p1d871e32} fill="#010101" />
                  </svg>
                </div>
                <div className="relative w-[180px] h-[44px] mx-10 opacity-70">
                  <Image
                    src="/assets/russian_house.png"
                    alt="Русский дом"
                    fill
                    className="object-contain pointer-events-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
