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

        {/* craft vignette */}
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
                data-cursor="cta"
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

        <div className="fixed z-50 left-1/2 top-[14px] md:top-[18px] hero-nav w-[min(92vw,540px)] -translate-x-1/2">
          <nav className="relative flex h-[50px] md:h-[54px] items-center rounded-full border border-white/12 bg-black/40 px-2 backdrop-blur-xl">
            <a
              href="#hero"
              className="relative z-10 ml-1 flex size-[34px] md:size-[38px] shrink-0 items-center justify-center overflow-hidden rounded-[11px]"
            >
              <img src="/assets/monoburo-mark.svg" alt="Monoburo" className="size-full" />
            </a>
            <div className="flex flex-1 items-center justify-evenly gap-1 px-2 md:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-unbounded t-nav whitespace-nowrap px-1 text-white/70 transition-colors hover:text-white"
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
