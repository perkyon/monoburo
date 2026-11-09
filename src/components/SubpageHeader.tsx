import Link from "next/link";
import { RequestButton } from "@/components/RequestButton";

export const SubpageHeader = ({ source }: { source: string }) => (
  <div className="hero-nav pointer-events-none fixed inset-x-0 top-[14px] z-50 flex items-center justify-between px-4 md:top-5 md:px-6">
    <Link
      href="/"
      aria-label="На главную"
      className="pointer-events-auto flex h-[50px] items-center gap-3 rounded-full border border-white/12 bg-black/75 pl-2 pr-5 backdrop-blur-xl transition hover:bg-black md:h-[56px] md:pl-[10px]"
    >
      <img src="/assets/monoburo-mark.svg" alt="" className="size-[34px] md:size-[36px]" />
      <span className="font-unbounded text-[13px] text-white md:text-[14px]">monoburo</span>
    </Link>
    <div className="pointer-events-auto hidden md:block">
      <RequestButton
        source={source}
        className="h-[56px] rounded-full border border-white/12 bg-black/75 px-7 font-unbounded text-[14px] text-white backdrop-blur-xl transition hover:bg-black"
      />
    </div>
  </div>
);
