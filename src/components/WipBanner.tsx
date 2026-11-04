"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "monoburo-wip-dismissed";

const subscribe = () => () => {};

function readDismissed() {
  try {
    return Boolean(sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}

export const WipBanner = () => {
  const dismissedEarlier = useSyncExternalStore(subscribe, readDismissed, () => true);
  const [closed, setClosed] = useState(false);
  const visible = !dismissedEarlier && !closed;

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setClosed(true);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="wip-banner fixed bottom-4 left-4 z-[70] w-[min(calc(100vw-32px),320px)] rounded-[22px] bg-[#0a0a0a] p-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)] md:bottom-6 md:left-6 md:p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="font-unbounded text-[10px] uppercase tracking-[0.2em] text-white/45">
              В работе
            </p>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Закрыть"
              className="flex size-7 shrink-0 items-center justify-center rounded-full text-white/45 transition hover:bg-white/10 hover:text-white"
            >
              <span className="block text-[18px] leading-none">×</span>
            </button>
          </div>
          <p className="mt-2 font-unbounded text-[16px] leading-snug tracking-[-0.03em]">
            Пилим сайт
          </p>
          <p className="mt-1.5 font-manrope text-[13px] leading-relaxed text-white/60">
            Ещё дорабатываем — возможны косяки. Не пугайтесь.
          </p>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
};
