"use client";

import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { trackGoal, type Goal } from "@/utils/analytics";
import {
  contactEmail,
  contactPhone,
  contactPhoneTel,
  contactTelegram,
  contactTelegramHandle,
  contactWhatsApp,
  contactWhatsAppDisplay,
} from "@/utils/site";

type RequestModalProps = {
  onClose: () => void;
  source: string;
};

type Channel = {
  goal: Goal;
  href: string;
  title: string;
  caption: string;
  className: string;
  external?: boolean;
  icon: ReactNode;
};

const channels: Channel[] = [
  {
    goal: "contact_telegram",
    href: contactTelegram,
    title: "Telegram",
    caption: contactTelegramHandle,
    className: "bg-[#0A84C6] text-white shadow-[0_10px_20px_rgba(10,132,198,0.25)]",
    external: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        <path d="m10 13 11-10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    goal: "contact_whatsapp",
    href: `https://wa.me/${contactWhatsApp}`,
    title: "WhatsApp",
    caption: contactWhatsAppDisplay,
    className: "bg-[#22C55E] text-white shadow-[0_10px_20px_rgba(34,197,94,0.25)]",
    external: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M20 12a8 8 0 1 0-14.6 4.5L4 20l3.7-1.3A8 8 0 0 0 20 12Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9.8 9.4c.2-.5.5-.6 1-.2l1.1 1c.4.3.4.6.2 1l-.5.8c.7 1 1.5 1.8 2.5 2.4l.8-.5c.4-.2.7-.2 1 .2l1 1.1c.4.5.3.8-.2 1-1.2.6-2.8.3-4.6-.9-1.8-1.2-3.2-2.8-3.8-4.2-.5-1.2-.6-2.2-.1-2.9Z" fill="white" />
      </svg>
    ),
  },
  {
    goal: "contact_phone",
    href: `tel:${contactPhoneTel}`,
    title: "Позвонить",
    caption: contactPhone,
    className: "bg-[#141414] text-white shadow-[0_10px_20px_rgba(0,0,0,0.3)]",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    goal: "contact_email",
    href: `mailto:${contactEmail}`,
    title: "Почта",
    caption: contactEmail,
    className: "border border-black/10 bg-white text-black",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2 8 5 8-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export const RequestModal = ({ onClose, source }: RequestModalProps) => {
  useEffect(() => {
    trackGoal("request_open", { from: source });
  }, [source]);

  useLayoutEffect(() => {
    if (document.body.style.position === "fixed") return;
    const html = document.documentElement;
    const originalHtmlOverflow = html.style.overflow;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    window.history.scrollRestoration = "manual";
    return () => {
      const y = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      html.style.overflow = originalHtmlOverflow;
      document.body.classList.remove("modal-open");
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = y;
      document.body.scrollTop = y;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      onClose();
    };
    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center overflow-y-auto overscroll-contain bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[520px] rounded-[24px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute right-5 top-4 text-[28px] text-black/50 transition-colors hover:text-black"
        >
          ×
        </button>

        <h3 className="mb-2 font-unbounded t-h3 font-medium text-black">Оставьте заявку</h3>
        <p className="mb-6 font-unbounded t-body-sm text-black/60">
          Выберите удобный способ связи
        </p>

        <div className="flex flex-col gap-3 md:gap-4">
          {channels.map((channel) => (
            <a
              key={channel.goal}
              href={channel.href}
              onClick={() => trackGoal(channel.goal, { from: source })}
              {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className={`flex items-center gap-4 rounded-[14px] p-4 transition-transform duration-200 hover:-translate-y-[2px] ${channel.className}`}
            >
              <span
                className={`flex size-[44px] shrink-0 items-center justify-center rounded-full ${
                  channel.goal === "contact_email" ? "bg-black/5" : "bg-white/20"
                }`}
              >
                {channel.icon}
              </span>
              <span>
                <span className="block font-unbounded t-body font-medium">{channel.title}</span>
                <span className="block font-unbounded t-caption opacity-80">{channel.caption}</span>
              </span>
            </a>
          ))}
        </div>

        <p className="mt-6 border-t border-black/10 pt-4 font-unbounded t-caption text-black/50">
          Связываясь с нами, вы соглашаетесь с{" "}
          <a href="/user-agreement" className="text-black/70 underline underline-offset-2 hover:text-black">
            Пользовательским соглашением
          </a>{" "}
          и{" "}
          <a href="/privacy-policy" className="text-black/70 underline underline-offset-2 hover:text-black">
            Политикой конфиденциальности
          </a>
          .
        </p>
      </div>
    </div>,
    document.body
  );
};
