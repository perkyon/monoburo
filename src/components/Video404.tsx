"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC = "/assets/404-bg.mp4";

/** Простой цикл: до конца → с начала снова (без реверса). */
export function Video404({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnded = () => {
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener("ended", onEnded);
    video.play().catch(() => {});

    return () => video.removeEventListener("ended", onEnded);
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      className={className}
      style={{ objectFit: "cover", ...style }}
    />
  );
}
