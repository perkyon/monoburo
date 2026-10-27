import Image from "next/image";
import type { DesignerBreakfast } from "@/data/events";

const AXIS_MAX = 5;

export function EventPoster({ event }: { event: DesignerBreakfast }) {
  if (event.posterImage) {
    return (
      <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-[#f4efe6] md:rounded-[32px]">
        <Image
          src={event.posterImage}
          alt={`${event.title.join(" ")} — ${event.theme}`}
          fill
          quality={90}
          sizes="(max-width: 768px) 100vw, 52vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <article className="relative overflow-hidden rounded-[24px] bg-[#f4efe6] px-7 pb-0 pt-10 text-[#111] md:rounded-[32px] md:px-12 md:pt-14">
      <div className="flex items-center justify-center gap-5 md:gap-7">
        <div className="flex size-[52px] items-center justify-center rounded-full border border-[#111] md:size-[58px]">
          <img src="/assets/monoburo-mark.svg" alt="Monoburo" className="size-[30px] md:size-[34px]" />
        </div>
        <div className="flex h-[52px] items-center rounded-full border border-[#111] px-4 md:h-[58px] md:px-5">
          <img src="/figma/surf-logo.png" alt="Surf Coffee" className="h-[18px] w-auto md:h-[20px]" />
        </div>
      </div>

      <h3 className="font-poster mt-8 text-center text-[34px] font-medium leading-[0.95] tracking-[-0.03em] md:mt-10 md:text-[52px]">
        {event.title[0]}
        <br />
        {event.title[1]}
      </h3>

      <p className="mx-auto mt-5 max-w-[34ch] text-center font-manrope text-[13px] leading-relaxed text-[#111]/75 md:mt-6 md:text-[15px]">
        {event.description}
      </p>
      <p className="mx-auto mt-2 max-w-[32ch] text-center font-manrope text-[13px] leading-relaxed text-[#111] md:text-[15px]">
        Тема выпуска — <span className="underline decoration-[#111]/30 underline-offset-4">{event.theme}</span>
      </p>

      <div className="mt-10 grid grid-cols-[1fr_0.9fr] items-end gap-4 md:mt-14 md:gap-6">
        <FlavorChart axes={event.axes} />
        <div className="relative -mr-7 aspect-[4/5] overflow-hidden md:-mr-12">
          <Image
            src={event.photo}
            alt=""
            fill
            quality={90}
            sizes="(max-width: 768px) 50vw, 24vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </article>
  );
}

function FlavorChart({ axes }: { axes: DesignerBreakfast["axes"] }) {
  const h = 168;
  const padTop = 8;
  const plot = h - padTop;

  return (
    <div className="pb-6">
      <svg viewBox={`0 0 220 ${h}`} className="w-full max-w-[240px]" aria-hidden>
        {axes.map((axis, index) => {
          const x = 28 + index * 82;
          const y = padTop + plot * (1 - axis.value / AXIS_MAX);
          return (
            <g key={axis.label}>
              <line x1={x} y1={padTop} x2={x} y2={h - 2} stroke="#111" strokeWidth="1.2" />
              <circle cx={x} cy={y} r="4.2" fill="#111" />
              <text
                x={x + 10}
                y={y + 4}
                fill="#111"
                fontSize="11"
                fontFamily="Manrope, sans-serif"
              >
                {axis.value}
              </text>
            </g>
          );
        })}
        <line x1="8" y1={h - 2} x2="212" y2={h - 2} stroke="#111" strokeWidth="1.2" />
      </svg>
      <div className="mt-2 flex max-w-[240px] justify-between font-manrope text-[10px] uppercase tracking-[0.08em] text-[#111]/70 md:text-[11px]">
        {axes.map((axis) => (
          <span key={axis.label} className="w-1/3 text-center">
            {axis.label}
          </span>
        ))}
      </div>
    </div>
  );
}
