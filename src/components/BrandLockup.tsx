import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";

type BrandLockupProps = {
  href?: string;
  label?: string;
  className?: string;
};

export const BrandLockup = ({
  href = "/",
  label = "На главную",
  className = "",
}: BrandLockupProps) => (
  <Link
    href={href}
    aria-label={label}
    className={`flex items-center gap-2.5 ${className}`}
  >
    <LogoMark className="h-[15px] w-[30px] shrink-0 md:h-[16px] md:w-[32px]" />
    <span className="font-unbounded text-[13px] leading-none tracking-[-0.02em] md:text-[14px]">
      monoburo
    </span>
  </Link>
);
