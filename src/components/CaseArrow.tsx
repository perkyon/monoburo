export function CaseArrow() {
  return (
    <span className="pointer-events-none absolute bottom-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-white text-black shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:bottom-4 md:right-4 md:size-9">
      <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden>
        <path
          d="M4.2 11.8 11.8 4.2M5.5 4.2H11.8V10.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
