"use client";

import { ReactNode } from "react";
import { LayoutGroup } from "framer-motion";
import { SoftCursor } from "@/components/SoftCursor";
import { SmoothScroll } from "@/components/SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <LayoutGroup>
        <SoftCursor />
        {children}
      </LayoutGroup>
    </SmoothScroll>
  );
}
