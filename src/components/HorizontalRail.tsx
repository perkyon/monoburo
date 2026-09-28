"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type HorizontalRailProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Horizontal cinematic rail.
 * Drag only after movement threshold so clicks still fire.
 */
export function HorizontalRail({ children, className = "" }: HorizontalRailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({
    pointerId: -1,
    dragging: false,
    startX: 0,
    scrollLeft: 0,
    suppressClick: false,
  });
  const [grabbing, setGrabbing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth + 4) return;
      if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={ref}
      className={`flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory select-none [&_button]:cursor-pointer ${
        grabbing ? "cursor-grabbing" : "cursor-grab"
      } ${className}`}
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        // Don't steal gestures from nested scroll areas / controls
        const target = e.target as HTMLElement | null;
        if (target?.closest("a, input, textarea, select")) return;
        const el = ref.current;
        if (!el) return;
        state.current = {
          pointerId: e.pointerId,
          dragging: false,
          startX: e.clientX,
          scrollLeft: el.scrollLeft,
          suppressClick: false,
        };
      }}
      onPointerMove={(e) => {
        const el = ref.current;
        const s = state.current;
        if (!el || s.pointerId !== e.pointerId) return;

        const dx = e.clientX - s.startX;
        if (!s.dragging) {
          if (Math.abs(dx) < 12) return;
          s.dragging = true;
          s.suppressClick = true;
          setGrabbing(true);
          try {
            el.setPointerCapture(e.pointerId);
          } catch {
            /* ignore */
          }
        }
        el.scrollLeft = s.scrollLeft - dx;
      }}
      onPointerUp={(e) => {
        const el = ref.current;
        const s = state.current;
        if (s.pointerId !== e.pointerId) return;
        try {
          if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
        s.pointerId = -1;
        s.dragging = false;
        setGrabbing(false);
      }}
      onPointerCancel={() => {
        state.current.pointerId = -1;
        state.current.dragging = false;
        setGrabbing(false);
      }}
      onClickCapture={(e) => {
        if (state.current.suppressClick) {
          e.preventDefault();
          e.stopPropagation();
          state.current.suppressClick = false;
        }
      }}
    >
      {children}
    </div>
  );
}
