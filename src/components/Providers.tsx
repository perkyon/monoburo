"use client";

import { ReactNode } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WipBanner } from "@/components/WipBanner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      {children}
      <WipBanner />
    </SmoothScroll>
  );
}
