"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RequestModal } from "@/components/RequestModal";
import { Magnetic } from "@/components/Magnetic";
import { trackGoal, type Goal } from "@/utils/analytics";
import {
  contactEmail,
  contactPhone,
  contactPhoneTel,
  contactTelegram,
  contactWhatsApp,
  showroomAddressShort,
  workshopAddressShort,
} from "@/utils/site";

type FooterLink = { label: string; href: string; goal?: Goal };

const columns: { title: string; items: FooterLink[] }[] = [
  {
    title: "О компании",
    items: [
      { label: "О нас", href: "/#about" },
      { label: "Цех и шоурум", href: "/#workshop" },
      { label: "Проекты", href: "/#projects" },
      { label: "Мероприятия", href: "/#events" },
    ],
  },
  {
    title: "Направления",
    items: [
      { label: "Мебель для HoReCa", href: "/horeca" },
      { label: "Предметы", href: "/predmety" },
      { label: "Дизайнерам", href: "/designers" },
    ],
  },
  {
    title: "Связь",
    items: [
      { label: "Telegram", href: contactTelegram, goal: "contact_telegram" },
      { label: "WhatsApp", href: `https://wa.me/${contactWhatsApp}`, goal: "contact_whatsapp" },
      { label: contactEmail, href: `mailto:${contactEmail}`, goal: "contact_email" },
    ],
  },
  {
    title: "Юридически",
    items: [
      { label: "Пользовательское соглашение", href: "/user-agreement" },
      { label: "Политика конфиденциальности", href: "/privacy-policy" },
    ],
  },
];

const navColumns = columns.filter((column) => column.title !== "Юридически");
const legalColumn = columns.find((column) => column.title === "Юридически");

export const Footer = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          const video = videoRef.current;
          if (video) {
            video.play().catch(() => {});
          }
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "0px", threshold: 0.35 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    videoRef.current?.play().catch(() => {});
  }, [shouldLoad]);

  return (
    <footer id="contacts" className="relative w-full overflow-hidden pt-6 md:pt-10">
      <div className="container-page pb-6 md:pb-10">
        <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] bg-black">
          <div ref={stageRef} className="relative h-[360px] md:h-[640px] bg-[#111]">
            <Image
              src="/assets/footer-poster.jpg"
              alt=""
              fill
              sizes="100vw"
              quality={75}
              className={`object-cover transition-opacity duration-500 ${
                videoReady ? "opacity-0" : "opacity-100"
              }`}
            />
            {shouldLoad ? (
              <video
                ref={videoRef}
                className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
                  videoReady ? "opacity-100" : "opacity-0"
                }`}
                src="/assets/monoburo-footer-bg.mp4?v=2"
                muted
                loop
                playsInline
                preload="none"
                onPlaying={() => setVideoReady(true)}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-6 pb-8 md:pb-12">
              <p className="font-unbounded text-[22px] md:text-[36px] text-white text-center text-balance max-w-[18ch] md:max-w-none">
                Готовы обсудить ваш проект
              </p>
              <Magnetic strength={0.32}>
                <button
                  type="button"
                onClick={() => setIsRequestOpen(true)}
                className="btn-glass h-[50px] px-8 font-unbounded text-[14px] text-white"
                >
                  Оставить заявку
                </button>
              </Magnetic>
            </div>
          </div>

          <div className="px-5 md:px-10 lg:px-14 pt-8 md:pt-12 pb-6 md:pb-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)] lg:gap-16 lg:items-start">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex size-[40px] rounded-[12px] bg-white items-center justify-center">
                    <img src="/assets/monoburo-mark.svg" alt="Monoburo" className="size-[32px]" />
                  </div>
                  <p className="font-unbounded text-white text-[18px]">Monoburo</p>
                </div>
                <div className="mt-5 space-y-1.5 font-manrope text-[13px] leading-[1.55] text-white/50">
                  <p>Шоурум: {showroomAddressShort}</p>
                  <p>Цех: {workshopAddressShort}</p>
                  <a
                    href={`tel:${contactPhoneTel}`}
                    onClick={() => trackGoal("contact_phone", { from: "footer" })}
                    className="inline-block pt-1 font-unbounded text-[13px] text-white/70 transition-colors hover:text-white"
                  >
                    {contactPhone}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
                {navColumns.map((column) => (
                  <div key={column.title}>
                    <p className="mb-4 font-unbounded text-[11px] uppercase tracking-[0.16em] text-white/35">
                      {column.title}
                    </p>
                    <div className="flex flex-col gap-2.5">
                      {column.items.map(({ label, href, goal }) => (
                        <a
                          key={href + label}
                          href={href}
                          className="font-unbounded text-[13px] leading-snug text-white/70 transition-colors hover:text-white"
                          onClick={goal ? () => trackGoal(goal, { from: "footer" }) : undefined}
                          {...(href.startsWith("http") || href.startsWith("mailto")
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                        >
                          {label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.08] pt-5 md:mt-12 md:flex-row md:items-center md:justify-between">
              <p className="font-unbounded text-[11px] tracking-[0.04em] text-white/35">
                © Monoburo — {new Date().getFullYear()}. Все права защищены.
              </p>
              {legalColumn ? (
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {legalColumn.items.map(({ label, href }) => (
                    <a
                      key={href}
                      href={href}
                      className="font-unbounded text-[11px] tracking-[0.04em] text-white/40 transition-colors hover:text-white/70"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {isRequestOpen && <RequestModal source="footer" onClose={() => setIsRequestOpen(false)} />}
    </footer>
  );
};
