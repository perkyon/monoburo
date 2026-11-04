"use client";

import { useEffect, useState } from "react";
import { RequestModal } from "@/components/RequestModal";
import { trackGoal } from "@/utils/analytics";
import { contactPhoneTel } from "@/utils/site";

export const StickyContact = () => {
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footer = document.getElementById("contacts");
    const io = footer
      ? new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), {
          threshold: 0.1,
        })
      : null;
    if (footer && io) io.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const visible = pastHero && !footerVisible;

  useEffect(() => {
    document.body.classList.toggle("has-sticky-cta", visible);
    return () => document.body.classList.remove("has-sticky-cta");
  }, [visible]);

  return (
    <>
      <div
        className={`sticky-cta fixed inset-x-4 bottom-4 z-[65] flex gap-2 transition-[opacity,transform] duration-300 md:hidden ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsRequestOpen(true)}
          className="btn-ink h-[52px] flex-1 font-unbounded text-[14px] shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
        >
          Написать нам
        </button>
        <a
          href={`tel:${contactPhoneTel}`}
          onClick={() => trackGoal("contact_phone", { from: "sticky" })}
          aria-label="Позвонить"
          className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-white text-black shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
      {isRequestOpen && <RequestModal source="sticky" onClose={() => setIsRequestOpen(false)} />}
    </>
  );
};
