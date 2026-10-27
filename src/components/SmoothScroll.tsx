"use client";

import { ReactNode, useEffect } from "react";

function isReload() {
  const nav = performance.getEntriesByType?.("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  if (nav) return nav.type === "reload";
  return window.performance?.navigation?.type === 1;
}

function pinTop() {
  if (isReload() && location.hash) {
    history.replaceState(null, "", location.pathname + location.search);
  }
  if (location.hash) return;
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    pinTop();

    let userMoved = false;
    const onScroll = () => {
      userMoved = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true, once: true });

    const onLoad = () => {
      if (!userMoved) pinTop();
    };
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted && !userMoved) pinTop();
    };

    window.addEventListener("load", onLoad);
    window.addEventListener("pageshow", onPageShow);
    const frame = requestAnimationFrame(pinTop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <>{children}</>;
}

export function pauseLenis() {}

export function resumeLenis() {}
