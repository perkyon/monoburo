"use client";

import { useState } from "react";
import { RequestModal } from "@/components/RequestModal";
import {
  contactEmail,
  contactPhone,
  contactTelegram,
  contactWhatsApp,
  physicalAddressShort,
} from "@/utils/site";

const columns = [
  {
    title: "О компании",
    items: [
      { label: "О нас", href: "#about" },
      { label: "Проекты", href: "#projects" },
      { label: "Мероприятия", href: "#events" },
    ],
  },
  {
    title: "Связь",
    items: [
      { label: "Telegram", href: contactTelegram },
      { label: "WhatsApp", href: `https://wa.me/${contactWhatsApp}` },
      { label: contactEmail, href: `mailto:${contactEmail}` },
    ],
  },
  {
    title: "Юридически",
    items: [
      { label: "Пользовательское соглашение", href: "/user-agreement" },
      { label: "Политика конфиденциальности", href: "/privacy-policy" },
    ],
  },
] as const;

export const Footer = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  return (
    <footer id="contacts" className="relative w-full overflow-hidden pt-6 md:pt-10">
      <div className="container-page pb-6 md:pb-10">
        <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] bg-black">
          <div className="relative h-[360px] md:h-[640px]">
            <video
              className="absolute inset-0 size-full object-cover opacity-80"
              src="/assets/monoburo-footer-bg.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-6 pb-8 md:pb-12">
              <p className="font-unbounded text-[22px] md:text-[36px] text-white text-center text-balance max-w-[18ch] md:max-w-none">
                Готовы обсудить ваш проект
              </p>
              <button
                type="button"
                onClick={() => setIsRequestOpen(true)}
                className="btn-glass h-[50px] px-8 font-unbounded text-[14px] text-white"
              >
                Оставить заявку
              </button>
            </div>
          </div>

          <div className="px-5 md:px-10 lg:px-14 pt-8 md:pt-10 pb-7 md:pb-9">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              <div className="max-w-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex size-[40px] rounded-[12px] bg-white items-center justify-center">
                    <img src="/assets/monoburo-mark.svg" alt="Monoburo" className="size-[32px]" />
                  </div>
                  <p className="font-unbounded text-white text-[18px]">Monoburo</p>
                </div>
                <p className="font-unbounded text-[13px] leading-relaxed text-white/55">
                  {physicalAddressShort}
                  <br />
                  {contactPhone}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 md:gap-14 text-[13px] text-white/65">
                {columns.map((column) => (
                  <div key={column.title} className="min-w-[150px]">
                    <p className="font-unbounded font-medium text-white/90 mb-3 text-[13px]">
                      {column.title}
                    </p>
                    <div className="flex flex-col gap-2">
                      {column.items.map((item) => (
                        <a
                          key={item.href + item.label}
                          href={item.href}
                          className="font-unbounded hover:text-white transition-colors"
                          {...(item.href.startsWith("http") || item.href.startsWith("mailto")
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 h-px w-full bg-white/12" />
            <p className="mt-4 font-unbounded text-[12px] text-white/45">
              © Monoburo — {new Date().getFullYear()}. Все права защищены.
            </p>
          </div>
        </div>
      </div>
      {isRequestOpen && <RequestModal onClose={() => setIsRequestOpen(false)} />}
    </footer>
  );
};
