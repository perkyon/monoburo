"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";

export const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const [progress, setProgress] = useState(0);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

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
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "220vh" }}
    >
      <div className="sticky top-0 flex h-[100svh] items-stretch overflow-hidden">
        <div className="container-page flex h-full w-full items-center py-10 md:py-0">
          <div className="grid h-full max-h-[860px] w-full overflow-hidden rounded-[24px] md:rounded-[36px] bg-surface md:grid-cols-2 shadow-[0_30px_90px_rgba(0,0,0,0.08)]">
            <div className="relative hidden min-h-full overflow-hidden md:block">
              <motion.div className="absolute inset-0" style={{ scale: imageScale, y: imageY }}>
                <Image
                  src="/assets/about_img.png"
                  alt="О мастерской Monoburo"
                  fill
                  sizes="50vw"
                  className="object-cover"
                  priority={false}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            </div>

            <div className="relative flex flex-col justify-center px-6 py-10 md:px-12 lg:px-16">
              <div className="mb-6 h-[2px] w-full overflow-hidden rounded-full bg-black/10">
                <motion.div
                  className="h-full origin-left bg-black"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>

              <SectionTitle eyebrow="Мастерская" title="О нас" />

              <div className="relative mt-6 min-h-[200px] overflow-hidden rounded-[20px] md:hidden">
                <Image
                  src="/assets/about_img.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              <div className="mt-8 md:mt-10 flex flex-col gap-4 max-w-[34rem]">
                {wordMatrix.map((words, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="font-unbounded font-normal text-[17px] md:text-[22px] leading-[1.45] text-black"
                  >
                    {words.map((word, idx) => {
                      const currentIndex = wordIndex;
                      wordIndex += 1;
                      const reveal = Math.min(
                        Math.max(progress * totalWords * 0.92 - currentIndex, 0),
                        1
                      );
                      return (
                        <span
                          key={`${paragraphIndex}-${idx}`}
                          className="mr-[6px] inline-block will-change-transform"
                          style={{
                            opacity: 0.14 + reveal * 0.86,
                            transform: `translateY(${(1 - reveal) * 8}px)`,
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
