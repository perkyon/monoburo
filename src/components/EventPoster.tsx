import Image from "next/image";
import type { DesignerBreakfast } from "@/data/events";

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
    <article className="relative min-h-[480px] overflow-hidden rounded-[24px] md:min-h-[640px] md:rounded-[32px]">
      <Image
        src={event.photo}
        alt={`${event.place} · ${event.theme}`}
        fill
        quality={90}
        sizes="(max-width: 768px) 100vw, 58vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white md:right-7 md:top-7 md:size-12">
        <img src="/assets/monoburo-mark.svg" alt="" className="size-7 md:size-8" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
        <p className="font-unbounded text-[11px] uppercase tracking-[0.18em] text-white/75">
          {event.title.join(" · ")}
        </p>
        <h3 className="mt-2 max-w-[16ch] font-unbounded text-[26px] font-medium leading-[1.08] tracking-[-0.03em] text-white md:text-[34px]">
          {event.theme}
        </h3>
        <p className="mt-3 font-unbounded text-[12px] uppercase tracking-[0.16em] text-white/70">
          {event.place} · {event.address}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {event.axes.map((axis) => (
            <span
              key={axis.label}
              className="rounded-full border border-white/25 px-3 py-1 font-unbounded text-[10px] uppercase tracking-[0.14em] text-white/80"
            >
              {axis.label}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
