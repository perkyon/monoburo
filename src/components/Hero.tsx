"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RequestModal } from "@/components/RequestModal";

const navLinks = [
  { href: "#about", label: "О нас" },
  { href: "#projects", label: "Проекты" },
  { href: "#events", label: "Мероприятия" },
  { href: "#contacts", label: "Контакты" },
] as const;

export const Hero = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 180]);
  const contentY = useTransform(scrollY, [0, 500], [0, -40]);
  const contentOpacity = useTransform(scrollY, [0, 320], [1, 0.35]);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  return (
    <section id="hero" className="relative w-full min-h-[100svh] overflow-hidden bg-black">
      <h1 className="sr-only">
        Monoburo — дизайн и производство мебели для бизнеса, дома и офисов
      </h1>

      <div className="relative w-full min-h-[100svh] overflow-hidden" data-name="Hero">
        <motion.div className="absolute inset-0 w-full h-[120%]" style={{ y: bgY }}>
          <Image
            src="/assets/hero-bg.png"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover pointer-events-none object-[center_28%]"
          />
        </motion.div>

        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.35)_42%,rgba(0,0,0,0.72)_100%)]" />

        <motion.div
          className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-6 pointer-events-none"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <img
            src="/assets/monoburo-logo.svg"
            alt="Монобюро"
            className="w-full max-w-[920px] h-auto drop-shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
          />
          <p className="mt-8 md:mt-10 max-w-[34rem] text-center font-unbounded text-[14px] md:text-[16px] leading-[1.5] text-white/88 text-balance">
            Дизайн и производство мебели для бизнеса, дома, офисов и HoReCa.
          </p>
          <button
            type="button"
            onClick={() => setIsRequestOpen(true)}
            className="btn-glass pointer-events-auto mt-7 md:mt-9 h-[52px] md:h-[56px] px-9 md:px-11 font-unbounded text-[14px] md:text-[15px] text-white"
          >
            Оставить заявку
          </button>
        </motion.div>

        <div className="fixed z-50 left-1/2 -translate-x-1/2 top-[14px] md:top-[20px] hero-nav w-[min(92vw,560px)]">
          <nav className="relative flex h-[52px] md:h-[56px] items-center rounded-full border border-white/12 bg-black/35 px-2 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <a href="#hero" className="relative z-10 ml-1 flex size-[36px] md:size-[40px] shrink-0 items-center justify-center rounded-[12px] overflow-hidden">
              <img src="/assets/monoburo-mark.svg" alt="Monoburo" className="size-full" />
            </a>
            <div className="flex flex-1 items-center justify-evenly gap-1 px-2 md:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-unbounded t-nav text-white/75 hover:text-white transition-colors whitespace-nowrap px-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {isRequestOpen && <RequestModal onClose={() => setIsRequestOpen(false)} />}
    </section>
  );
};
