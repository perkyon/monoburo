import { BrandLockup } from "@/components/BrandLockup";
import { RequestButton } from "@/components/RequestButton";

export const SubpageHeader = ({ source }: { source: string }) => (
  <div className="hero-nav pointer-events-none fixed inset-x-0 top-[14px] z-50 flex items-center justify-between px-4 md:top-5 md:px-6">
    <div className="pointer-events-auto flex h-[50px] items-center rounded-full border border-white/12 bg-black/75 px-3.5 backdrop-blur-xl md:h-[56px] md:px-4">
      <BrandLockup className="text-white" />
    </div>
    <div className="pointer-events-auto hidden md:block">
      <RequestButton
        source={source}
        className="h-[56px] rounded-full border border-white/12 bg-black/75 px-7 font-unbounded text-[14px] text-white backdrop-blur-xl transition hover:bg-black"
      />
    </div>
  </div>
);
