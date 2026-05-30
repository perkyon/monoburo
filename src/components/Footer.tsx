"use client";

import { type ReactNode, useState } from "react";
import { RequestModal } from "@/components/RequestModal";
import { svgPaths } from "@/utils/svgPaths";

type FooterProps = {
  ctaContent?: ReactNode;
};

const columns = [
  { title: "О компании", items: ["О нас", "Проекты", "Мероприятия", "История бренда"] },
  { title: "Партнерам", items: ["Дизайнерам", "Производителям"] },
  {
    title: "Юридически",
    items: [
      { label: "Пользовательское соглашение", href: "/user-agreement" },
      { label: "Политика конфиденциальности", href: "/privacy-policy" }
    ]
  }
];

import { contactTelegram, contactWhatsApp } from "@/utils/site";

const socialLinks = {
  telegram: contactTelegram,
  instagram: "https://www.instagram.com/buro.house?igsh=MXNudnNnamlob2c1NQ==",
  pinterest: "https://pinterest.com",
  whatsapp: `https://wa.me/${contactWhatsApp}`,
  vk: "https://vk.com"
} as const;

const SOCIAL_SCALE = 0.7;
const SOCIAL_SIZE = 40 * SOCIAL_SCALE;
const SOCIAL_WIDTH = 291 * SOCIAL_SCALE;
const SOCIAL_HEIGHT = 41 * SOCIAL_SCALE;

const socialHitAreas = [
  { label: "Telegram", href: socialLinks.telegram, left: 0 },
  { label: "Instagram", href: socialLinks.instagram, left: 62.8293 },
  { label: "Pinterest", href: socialLinks.pinterest, left: 125.659 },
  { label: "WhatsApp", href: socialLinks.whatsapp, left: 188.489 },
  { label: "VK", href: socialLinks.vk, left: 251.318 }
] as const;

export const Footer = ({ ctaContent }: FooterProps) => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  return (
    <footer id="contacts" className="relative w-full bg-white overflow-hidden">
      <div
        className="relative w-full overflow-hidden bg-black rounded-t-[24px] rounded-b-none md:rounded-t-[40px]"
        data-name="Контакты"
      >
        <div className="relative h-[420px] md:h-[880px]">
          <video
            className="absolute inset-0 size-full object-cover"
            src="/assets/monoburo-footer-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <button
            type="button"
            onClick={() => setIsRequestOpen(true)}
            className="absolute left-1/2 bottom-[24px] -translate-x-1/2 px-6 py-2 rounded-full bg-white/20 text-white text-[14px] font-medium backdrop-blur-md"
          >
            Оставить заявку
          </button>
        </div>

        <div className="px-4 md:px-[80px] lg:px-[100px] pt-[28px] md:pt-[36px] pb-[24px] md:pb-[32px]">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="hidden md:flex size-[40px] rounded-[10px] bg-white items-center justify-center">
              <img src="/assets/monoburo-mark.svg" alt="Monoburo" className="size-[35px]" />
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-[64px] text-[13px] text-white/70">
              {columns.map((column) => (
                <div key={column.title} className="min-w-[170px]">
                  <p className="font-unbounded font-semibold text-white/80 mb-[10px] text-[13px]">{column.title}</p>
                  <div className="flex flex-col gap-[6px]">
                    {column.items.map((item) => {
                      if (typeof item === "string") {
                        return (
                          <span key={item} className="font-unbounded">
                            {item}
                          </span>
                        );
                      }

                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          className="font-unbounded hover:text-white transition-colors"
                        >
                          {item.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[24px] h-px w-full bg-white/20" />

          <div className="mt-[14px] flex flex-col md:flex-row md:items-center justify-between gap-4 text-white/70 text-[12px]">
            <p>© Monoburo - 2025. Все права защищены.</p>
            <div className="relative" style={{ width: `${SOCIAL_WIDTH}px`, height: `${SOCIAL_HEIGHT}px` }}>
              <img src="/assets/socials.svg" alt="Socials" className="block size-full" />
              {socialHitAreas.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="absolute top-0"
                  style={{
                    left: `${item.left * SOCIAL_SCALE}px`,
                    width: `${SOCIAL_SIZE}px`,
                    height: `${SOCIAL_SIZE}px`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isRequestOpen && <RequestModal onClose={() => setIsRequestOpen(false)} />}
    </footer>
  );
};
