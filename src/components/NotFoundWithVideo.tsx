"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const VIDEO_SRC = "/assets/404-bg.mp4";
const VIDEO_BG_COLOR = "#e1e1e1";

export function NotFoundWithVideo() {
  const bgRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const onEnded = () => {
      bg.currentTime = 0;
      bg.play().catch(() => {});
    };

    bg.addEventListener("ended", onEnded);
    bg.play().catch(() => {});

    return () => {
      bg.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <main className="fixed inset-0 h-screen w-screen overflow-hidden" style={{ backgroundColor: VIDEO_BG_COLOR }}>
      {/* Desktop */}
      <div className="relative hidden h-full w-full lg:block">
        <div className="absolute left-1/2 top-1/2 h-[1024px] w-[1440px] -translate-x-1/2 -translate-y-1/2">
          <nav className="absolute left-1/2 top-[64px] z-20 flex h-[57px] w-[439px] -translate-x-1/2 items-center gap-[45px] rounded-[20px] border border-black/5 bg-white/70 pl-[75px] shadow-[0_4px_4px_rgba(0,0,0,0.12)] backdrop-blur-xl">
            <img src="/figma/notfound-brandmark.svg" alt="" className="absolute left-[11px] top-[7px] size-[43px]" />
            <Link href="/#about" className="font-unbounded font-bold text-[20px] text-black/90">О нас</Link>
            <Link href="/#projects" className="font-unbounded font-bold text-[20px] text-black/90">Проекты</Link>
            <Link href="/#contacts" className="font-unbounded font-bold text-[20px] text-black/90">Контакты</Link>
          </nav>

          {/* Видео блок меньше, чтобы человек сзади был меньше */}
          <div className="absolute left-1/2 top-[165px] h-[640px] w-[640px] -translate-x-1/2 overflow-hidden rounded-[32px]">
            <video
              ref={bgRef}
              src={VIDEO_SRC}
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 38%" }}
            />
          </div>

          {/* 404 и ниже опущены */}
          <div className="absolute left-1/2 top-[190px] z-10 flex -translate-x-1/2 items-center leading-none">
            <span className="font-unbounded text-[170px] text-black">4</span>
            <span className="font-unbounded text-[170px] text-black">0</span>
            <span className="font-unbounded text-[170px] text-black">4</span>
          </div>

          <p className="absolute left-1/2 top-[500px] w-[700px] -translate-x-1/2 text-center font-unbounded text-[52px] leading-[1.15] text-black">
            Тут надо подумать......
          </p>
          <p className="absolute left-1/2 top-[575px] w-[760px] -translate-x-1/2 text-center font-unbounded text-[32px] leading-[1.2] text-black/90">
            Давайте вернемся куда-нибудь в знакомое место
          </p>

          <Link
            href="/"
            className="absolute left-1/2 top-[665px] z-20 flex h-[57px] w-[332px] -translate-x-1/2 items-center justify-center rounded-[20px] border border-black/5 bg-white/70 font-unbounded font-bold text-[20px] text-black shadow-[0_4px_4px_rgba(0,0,0,0.12)] backdrop-blur-xl"
          >
            Обратно на главную
          </Link>
        </div>
      </div>

      {/* Mobile / Tablet */}
      <div className="relative flex h-full w-full flex-col items-center lg:hidden">
        <nav className="mt-6 mb-6 flex items-center gap-4 rounded-[16px] border border-black/5 bg-white/70 px-4 py-2 shadow-[0_4px_4px_rgba(0,0,0,0.1)] backdrop-blur-xl">
          <img src="/figma/notfound-brandmark.svg" alt="" className="size-8" />
          <Link href="/#about" className="font-unbounded font-bold text-[14px] text-black/90">О нас</Link>
          <Link href="/#projects" className="font-unbounded font-bold text-[14px] text-black/90">Проекты</Link>
          <Link href="/#contacts" className="font-unbounded font-bold text-[14px] text-black/90">Контакты</Link>
        </nav>

        <div className="relative h-[55vh] w-[88vw] max-w-[420px] overflow-hidden rounded-[24px]">
          <video
            src={VIDEO_SRC}
            muted
            playsInline
            autoPlay
            loop
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 38%" }}
          />
        </div>

        <div className="absolute top-[26vh] z-10 flex items-center leading-none">
          <span className="font-unbounded text-[86px] text-black">404</span>
        </div>

        <p className="mt-5 text-center font-unbounded text-[38px] leading-[1.1] text-black">Тут надо подумать......</p>
        <p className="mt-2 text-center font-unbounded text-[20px] leading-[1.2] text-black/90">Давайте вернемся куда-нибудь в знакомое место</p>
        <Link
          href="/"
          className="mt-5 inline-flex h-[50px] w-[300px] items-center justify-center rounded-[16px] border border-black/5 bg-white/70 font-unbounded font-bold text-[18px] text-black shadow-[0_4px_4px_rgba(0,0,0,0.1)] backdrop-blur-xl"
        >
          Обратно на главную
        </Link>
      </div>
    </main>
  );
}
