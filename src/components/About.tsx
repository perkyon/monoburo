"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";

export const About = () => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.9", "end 0.75"],
  });
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value);
  });

  const paragraphs = useMemo(
    () => [
      "Мы не делаем мебель ради мебели.",
      "Мы решаем задачи так, чтобы этим было удобно пользоваться каждый день.",
      "Мы работаем с корпусной и отдельно стоящей мебелью, а также делаем решения для бизнеса — офисов, кофеен и HoReCa.",
      "Опыт для нас — не количество лет. Это умение брать ответственность и доводить решение до результата.",
      "Мы сталкивались с нестандартными планировками, ограниченными бюджетами, ошибками ремонта и жёсткими дедлайнами — и умеем собирать решения так, чтобы они работали, а не просто выглядели красиво.",
    ],
    []
  );

  const wordMatrix = useMemo(() => paragraphs.map((text) => text.split(" ")), [paragraphs]);
  const totalWords = useMemo(
    () => wordMatrix.reduce((sum, words) => sum + words.length, 0),
    [wordMatrix]
  );
  let wordIndex = 0;

  return (
    <section id="about" className="relative w-full stacked-card py-10 md:py-16">
      <div className="container-page">
        <div className="overflow-hidden rounded-[28px] md:rounded-[40px] bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.06)]">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative min-h-[320px] md:min-h-[720px] overflow-hidden">
              <Image
                src="/assets/about_img.png"
                alt="О мастерской Monoburo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-6 md:p-12 lg:p-16">
              <SectionTitle eyebrow="Студия" title="О нас" />
              <div ref={textRef} className="mt-8 md:mt-10 flex flex-col gap-4 max-w-[36rem]">
                {wordMatrix.map((words, paragraphIndex) => (
                  <p key={paragraphIndex} className="font-unbounded font-normal text-[18px] md:text-[22px] leading-[1.45] text-black/90">
                    {words.map((word, idx) => {
                      const currentIndex = wordIndex;
                      wordIndex += 1;
                      const reveal = Math.min(
                        Math.max(progress * totalWords - currentIndex, 0),
                        1
                      );
                      return (
                        <span
                          key={`${paragraphIndex}-${idx}`}
                          className="inline-block will-change-transform mr-[6px]"
                          style={{
                            opacity: 0.18 + reveal * 0.82,
                            transform: `translateY(${(1 - reveal) * 6}px)`,
                          }}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
