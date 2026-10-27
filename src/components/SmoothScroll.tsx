"use client";

import { ReactNode, useEffect } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const { history, location } = window;
    const previous = history.scrollRestoration;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (!location.hash) {
      window.scrollTo(0, 0);
    }

    return () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = previous;
      }
    };
  }, []);

  return <>{children}</>;
}

export function pauseLenis() {}

export function resumeLenis() {}
