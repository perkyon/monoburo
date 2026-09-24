type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  className?: string;
};

export function SectionTitle({ eyebrow, title, className = "" }: SectionTitleProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {eyebrow ? (
        <p className="font-unbounded text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-black/45">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-unbounded font-medium text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] text-black">
        {title}
      </h2>
    </div>
  );
}
