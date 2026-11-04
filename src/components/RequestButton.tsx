"use client";

import { useState } from "react";
import { RequestModal } from "@/components/RequestModal";

type RequestButtonProps = {
  source: string;
  label?: string;
  className?: string;
};

export const RequestButton = ({
  source,
  label = "Оставить заявку",
  className = "btn-ink h-[52px] px-8 font-unbounded text-[14px]",
}: RequestButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className}>
        {label}
      </button>
      {isOpen && <RequestModal source={source} onClose={() => setIsOpen(false)} />}
    </>
  );
};
