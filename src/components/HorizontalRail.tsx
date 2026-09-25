"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type HorizontalRailProps = {
  children: ReactNode;
  className?: string;
};

/** Signature: horizontal cinematic rail — wheel + drag */
export function HorizontalRail({ children, className = "" }: HorizontalRailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
  });
  const [grabbing, setGrabbing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      if (el.scrollWidth <= el.clientWidth + 4) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY + e.deltaX;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={ref}
      data-cursor="drag"
      className={`flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none ${grabbing ? "cursor-grabbing" : ""} ${className}`}
      onPointerDown={(e) => {
        const el = ref.current;
        if (!el) return;
        drag.current = {
          active: true,
          moved: false,
          startX: e.clientX,
          scrollLeft: el.scrollLeft,
        };
        setGrabbing(true);
        el.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current.active || !ref.current) return;
        const dx = e.clientX - drag.current.startX;
        if (Math.abs(dx) > 6) drag.current.moved = true;
        ref.current.scrollLeft = drag.current.scrollLeft - dx;
      }}
      onPointerUp={(e) => {
        drag.current.active = false;
        setGrabbing(false);
        ref.current?.releasePointerCapture(e.pointerId);
      }}
      onPointerCancel={() => {
        drag.current.active = false;
        setGrabbing(false);
      }}
      onClickCapture={(e) => {
        if (drag.current.moved) {
          e.preventDefault();
          e.stopPropagation();
          drag.current.moved = false;
        }
      }}
    >
      {children}
    </div>
  );
}
