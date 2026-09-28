"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RequestModal } from "@/components/RequestModal";
import { Magnetic } from "@/components/Magnetic";

const navLinks = [
  { href: "#about", label: "О нас" },
  { href: "#projects", label: "Проекты" },
  { href: "#events", label: "Мероприятия" },
  { href: "#contacts", label: "Контакты" },
] as const;

export const Hero = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 900], [0, 140]);
  const contentY = useTransform(scrollY, [0, 480], [0, -36]);
  const contentOpacity = useTransform(scrollY, [0, 360], [1, 0.2]);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  return (
    <section id="hero" className="relative w-full min-h-[100svh] overflow-hidden bg-black">
      <h1 className="sr-only">
        Monoburo — дизайн и производство мебели для бизнеса, дома и офисов
      </h1>

      <div className="relative w-full min-h-[100svh]">
        <motion.div className="absolute inset-0 h-[118%] w-full" style={{ y: bgY }}>
          <Image
            src="/assets/hero-bg.png"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[center_30%] pointer-events-none"
          />
        </motion.div>

        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_55%,rgba(0,0,0,0.72)_100%)]" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-black/75" />

        <motion.div
          className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-6"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.img
            src="/assets/monoburo-logo.svg"
            alt="Монобюро"
            className="w-full max-w-[880px] h-auto drop-shadow-[0_12px_48px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />
          <motion.p
            className="mt-8 md:mt-10 max-w-[32rem] text-center font-unbounded text-[13px] md:text-[15px] leading-[1.55] tracking-[0.02em] text-white/85 text-balance"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          >
            Дизайн и производство мебели для бизнеса, дома, офисов и HoReCa.
          </motion.p>

          <motion.div
            className="mt-8 md:mt-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <Magnetic strength={0.35}>
              <button
                type="button"
                onClick={() => setIsRequestOpen(true)}
                className="btn-glass h-[52px] md:h-[56px] px-10 md:px-12 font-unbounded text-[14px] md:text-[15px] text-white"
              >
                Оставить заявку
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-[2] flex justify-center">
          <motion.div
            className="flex flex-col items-center gap-2 text-white/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="font-unbounded text-[10px] tracking-[0.22em] uppercase">Scroll</span>
            <span className="block h-8 w-px bg-white/35" />
          </motion.div>
        </div>

        {/* Logo pill → expands on hover (desktop), always open on mobile */}
        <div className="fixed z-50 left-1/2 top-[14px] md:top-[20px] -translate-x-1/2 group hero-nav">
          <nav className="relative h-[50px] md:h-[56px] w-[58px] md:w-[64px] max-md:w-[min(92vw,520px)] group-hover:w-[min(92vw,520px)] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden rounded-full">
            <div className="absolute inset-0 rounded-full border border-white/12 bg-black/40 backdrop-blur-xl opacity-0 group-hover:opacity-100 max-md:opacity-100 transition-opacity duration-400" />

            <div className="absolute inset-0 flex items-center justify-end gap-5 md:gap-7 pr-5 md:pr-7 pl-[56px] md:pl-[64px] opacity-0 group-hover:opacity-100 max-md:opacity-100 transition-opacity duration-300 delay-100 pointer-events-none group-hover:pointer-events-auto max-md:pointer-events-auto">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-unbounded t-nav whitespace-nowrap text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="absolute left-[8px] md:left-[10px] top-1/2 z-10 size-[34px] md:size-[36px] -translate-y-1/2 overflow-hidden rounded-[10px]">
              <img src="/assets/monoburo-mark.svg" alt="Monoburo" className="block size-full" />
            </div>
          </nav>
        </div>
      </div>

      {isRequestOpen && <RequestModal onClose={() => setIsRequestOpen(false)} />}
    </section>
  );
};
