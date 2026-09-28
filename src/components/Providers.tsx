"use client";

import { ReactNode } from "react";
import { LayoutGroup } from "framer-motion";
import { SmoothScroll } from "@/components/SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <LayoutGroup>{children}</LayoutGroup>
    </SmoothScroll>
  );
}
