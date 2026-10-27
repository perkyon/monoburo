import type { DesignerBreakfast } from "@/data/events";
import Image from "next/image";

export function EventPoster({ event }: { event: DesignerBreakfast }) {
  if (event.posterImage) {
    return (
      <div className="relative min-h-[480px] overflow-hidden rounded-[24px] md:min-h-[640px] md:rounded-[32px]">
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
    <article className="flex min-h-[480px] flex-col justify-between rounded-[24px] bg-black px-7 py-8 text-white md:min-h-[640px] md:rounded-[32px] md:px-10 md:py-12">
      <div className="flex size-11 items-center justify-center rounded-full bg-white md:size-12">
        <img src="/assets/monoburo-mark.svg" alt="" className="size-7 md:size-8" />
      </div>

      <div>
        <p className="font-unbounded text-[11px] uppercase tracking-[0.22em] text-white/45">
          {event.title.join(" · ")}
        </p>
        <h3 className="mt-4 max-w-[14ch] font-unbounded text-[32px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[44px]">
          {event.theme}
        </h3>
        <p className="mt-5 max-w-[36ch] font-manrope text-[15px] leading-relaxed text-white/55 md:text-[16px]">
          {event.description}
        </p>
        <p className="mt-6 font-unbounded text-[12px] uppercase tracking-[0.16em] text-white/50">
          {event.place} · {event.address}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {event.axes.map((axis) => (
            <span
              key={axis.label}
              className="rounded-full border border-white/20 px-3 py-1 font-unbounded text-[10px] uppercase tracking-[0.14em] text-white/70"
            >
              {axis.label}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
