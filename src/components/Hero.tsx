"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BrandLockup } from "@/components/BrandLockup";
import { RequestModal } from "@/components/RequestModal";
import { Magnetic } from "@/components/Magnetic";

const navLinks = [
  { href: "#about", label: "О нас" },
  { href: "#workshop", label: "Цех и шоурум" },
  { href: "#projects", label: "Проекты" },
  { href: "#events", label: "Мероприятия" },
  { href: "#contacts", label: "Контакты" },
] as const;

export const Hero = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!navOpen) return;
    const close = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest(".hero-nav")) return;
      setNavOpen(false);
    };
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [navOpen]);

  return (
    <section id="hero" className="relative w-full min-h-[100svh] overflow-hidden bg-black">
      <h1 className="sr-only">
        Monoburo — дизайн и производство мебели для бизнеса, дома и офисов
      </h1>

      <div className="relative w-full min-h-[100svh]">
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/assets/hero-bg.png"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[center_30%] pointer-events-none"
          />
        </div>

        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_55%,rgba(0,0,0,0.72)_100%)]" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-black/75" />

        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-6">
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
        </div>

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

        <div className="hero-nav pointer-events-none fixed inset-x-0 top-[14px] z-50 flex items-center justify-between px-4 md:top-5 md:px-6">
          <nav className="pointer-events-auto flex h-[50px] max-w-[calc(100vw-32px)] items-center rounded-full border border-white/12 bg-black/75 pl-3.5 pr-2 backdrop-blur-xl md:h-[56px] md:pl-4 md:pr-3">
            <BrandLockup className="text-white" />
            <div className="ml-4 hidden items-center gap-5 border-l border-white/15 pl-5 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setNavOpen(false)}
                  className="font-unbounded whitespace-nowrap text-[12px] text-white/75 transition-colors hover:text-white md:text-[13px]"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              type="button"
              aria-label={navOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={navOpen}
              onClick={() => setNavOpen((open) => !open)}
              className="ml-1 flex size-9 shrink-0 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white md:hidden"
            >
              <span className="block text-[22px] leading-none">{navOpen ? "×" : "☰"}</span>
            </button>
          </nav>
        </div>
        {navOpen ? (
          <div className="hero-nav pointer-events-auto fixed inset-x-4 top-[72px] z-50 rounded-[22px] border border-white/12 bg-black/90 p-4 backdrop-blur-xl md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setNavOpen(false)}
                className="block rounded-xl px-3 py-3 font-unbounded text-[14px] text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>

      {isRequestOpen && <RequestModal source="hero" onClose={() => setIsRequestOpen(false)} />}
    </section>
  );
};
