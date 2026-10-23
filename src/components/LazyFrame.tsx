"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type LazyFrameProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  quality?: number;
  className?: string;
};

export function LazyFrame({
  src,
  alt,
  sizes,
  priority = false,
  quality = 68,
  className = "object-cover",
}: LazyFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(priority);

  useEffect(() => {
    if (priority) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        io.disconnect();
      },
      { rootMargin: "280px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [priority]);

  return (
    <div ref={ref} className="absolute inset-0 bg-black/[0.04]">
      {visible ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          className={className}
        />
      ) : null}
    </div>
  );
}
