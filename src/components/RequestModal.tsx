"use client";

import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  contactEmail,
  contactTelegram,
  contactTelegramHandle,
  contactWhatsApp,
  contactWhatsAppDisplay,
} from "@/utils/site";

type RequestModalProps = {
  onClose: () => void;
};

export const RequestModal = ({ onClose }: RequestModalProps) => {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const originalHtmlOverflow = html.style.overflow;
    const originalScrollRestoration = window.history.scrollRestoration;
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
      window.history.scrollRestoration = originalScrollRestoration;
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = y;
      document.body.scrollTop = y;
    };
  }, []);
  const [isConsented, setIsConsented] = useState(false);

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isConsented) {
      event.preventDefault();
    }
  };

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto overscroll-contain" onClick={onClose}>
      <div
        className="relative w-[520px] rounded-[24px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute right-5 top-4 text-[28px] text-black/50 hover:text-black transition-colors"
        >
          ×
        </button>

        <h3 className="font-unbounded font-medium t-h3 text-black mb-2">Оставьте заявку</h3>
        <p className="font-unbounded t-body-sm text-black/60 mb-6">Выберите удобный способ связи</p>

        <div className={`flex flex-col gap-4 ${isConsented ? "" : "opacity-60"}`}>
          <a
            href={contactTelegram}
            target="_blank"
            rel="noreferrer"
            onClick={handleContactClick}
            aria-disabled={!isConsented}
            className={`flex items-center gap-4 rounded-[14px] bg-[#0A84C6] p-4 text-white shadow-[0_10px_20px_rgba(10,132,198,0.25)] transition-transform duration-200 ${isConsented ? "hover:-translate-y-[2px] hover:shadow-[0_14px_28px_rgba(10,132,198,0.35)]" : "cursor-not-allowed"}`}
          >
            <span className="flex size-[44px] items-center justify-center rounded-full bg-white/20">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                <path d="m10 13 11-10" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <p className="font-unbounded font-medium t-body">Telegram</p>
              <p className="font-unbounded t-caption text-white/80">{contactTelegramHandle}</p>
            </div>
          </a>

          <a
            href={`https://wa.me/${contactWhatsApp}`}
            target="_blank"
            rel="noreferrer"
            onClick={handleContactClick}
            aria-disabled={!isConsented}
            className={`flex items-center gap-4 rounded-[14px] bg-[#22C55E] p-4 text-white shadow-[0_10px_20px_rgba(34,197,94,0.25)] transition-transform duration-200 ${isConsented ? "hover:-translate-y-[2px] hover:shadow-[0_14px_28px_rgba(34,197,94,0.35)]" : "cursor-not-allowed"}`}
          >
            <span className="flex size-[44px] items-center justify-center rounded-full bg-white/20">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M20 12a8 8 0 1 0-14.6 4.5L4 20l3.7-1.3A8 8 0 0 0 20 12Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                <path d="M9.8 9.4c.2-.5.5-.6 1-.2l1.1 1c.4.3.4.6.2 1l-.5.8c.7 1 1.5 1.8 2.5 2.4l.8-.5c.4-.2.7-.2 1 .2l1 1.1c.4.5.3.8-.2 1-1.2.6-2.8.3-4.6-.9-1.8-1.2-3.2-2.8-3.8-4.2-.5-1.2-.6-2.2-.1-2.9Z" fill="white"/>
              </svg>
            </span>
            <div>
              <p className="font-unbounded font-medium t-body">WhatsApp</p>
              <p className="font-unbounded t-caption text-white/90">{contactWhatsAppDisplay}</p>
            </div>
          </a>

          <a
            href={`mailto:${contactEmail}`}
            onClick={handleContactClick}
            aria-disabled={!isConsented}
            className={`flex items-center gap-4 rounded-[14px] bg-[#141414] p-4 text-white shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-transform duration-200 ${isConsented ? "hover:-translate-y-[2px] hover:shadow-[0_14px_28px_rgba(0,0,0,0.4)]" : "cursor-not-allowed"}`}
          >
            <span className="flex size-[44px] items-center justify-center rounded-full bg-white/15">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2 8 5 8-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="font-unbounded font-medium t-body">Email</p>
              <p className="font-unbounded t-caption text-white/80">{contactEmail}</p>
            </div>
          </a>
        </div>

        <div className="mt-6 border-t border-black/10 pt-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isConsented}
              onChange={(event) => setIsConsented(event.target.checked)}
              className="mt-[2px] size-4 accent-black"
            />
            <span className="font-unbounded t-caption text-black/70">
              Я ознакомился с{" "}
              <a
                href="/user-agreement"
                className="text-black hover:text-black/80 underline underline-offset-2"
              >
                Пользовательским соглашением
              </a>{" "}
              и{" "}
              <a
                href="/privacy-policy"
                className="text-black hover:text-black/80 underline underline-offset-2"
              >
                Политикой конфиденциальности
              </a>
              .
            </span>
          </label>
        </div>
      </div>
    </div>,
    document.body
  );
};
