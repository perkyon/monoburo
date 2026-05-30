"use client";

import Image from "next/image";
import Link from "next/link";
import { svgPaths } from "@/utils/svgPaths";
import { motion } from "framer-motion";
import { type Project } from "@/components/ProjectModal";

const projects: Project[] = [
  {
    id: 1,
    name: "ЖК Сердце",
    image: "/assets/home1.png",
    location: "Тургенева 151, Краснодар",
    gallery: ["/assets/home1.png", "/assets/home2.png", "/assets/home3.png", "/assets/home4.png"]
  },
  {
    id: 2,
    name: "ЖК Сердце",
    image: "/assets/home2.png",
    location: "Тургенева 151, Краснодар",
    gallery: ["/assets/home2.png", "/assets/home3.png", "/assets/home4.png", "/assets/home5.png"]
  },
  {
    id: 3,
    name: "ЖК Сердце",
    image: "/assets/home3.png",
    location: "Тургенева 151, Краснодар",
    gallery: ["/assets/home3.png", "/assets/home4.png", "/assets/home5.png", "/assets/home1.png"]
  },
  {
    id: 4,
    name: "ЖК Сердце",
    image: "/assets/home4.png",
    location: "Тургенева 151, Краснодар",
    gallery: ["/assets/home4.png", "/assets/home5.png", "/assets/home1.png", "/assets/home2.png"]
  },
  {
    id: 5,
    name: "ЖК Сердце",
    image: "/assets/home5.png",
    location: "Тургенева 151, Краснодар",
    gallery: ["/assets/home5.png", "/assets/home1.png", "/assets/home2.png", "/assets/home3.png"]
  }
];

// РУЧНОЕ УПРАВЛЕНИЕ ЛИНИЯМИ (меняй эти значения, чтобы двигать вектор)
const LINES_CONFIG = {
  left: -22,
  top: 760,
  width: 1642
};

export const HomeOffice = () => {
  return (
    <section id="projects" className="relative w-full h-[1169.41px] bg-white overflow-hidden">
      <div className="relative w-[1440px] h-full mx-auto" data-name="Проекты Дом и офис">
        {/* Текст */}
        <div className="absolute left-[100px] text-black text-nowrap top-0 z-10" data-name="Текст">
          <div className="absolute font-unbounded font-normal leading-none left-[105px] t-h3 top-[50px]">
            <p className="mb-0">Проектирование и изготовление </p>
            <p className="ml-[200px]">мебели для дома и офиса</p>
          </div>
          <h2 className="absolute font-unbounded font-medium leading-[normal] left-0 t-h1 top-0">Дом и офис</h2>
        </div>

        {/* Слайдер проектов */}
        <div className="absolute top-[174px] left-0 w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <div className="flex gap-10 px-[100px] w-max py-10">
            {projects.map((project) => (
              <Link
                key={project.id}
                href="/missing"
                className="relative snap-start shrink-0 group cursor-pointer"
                style={{ width: "397px" }}
              >
                <div className="relative rounded-[40px] overflow-hidden w-full h-[550px] shadow-lg">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-6 font-unbounded font-normal leading-none t-h3 text-black/60 group-hover:text-black transition-colors text-center w-full">
                  {project.name}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Vector 13 */}
        <div 
          className="absolute pointer-events-none transition-all duration-300"
          style={{ 
            left: `${LINES_CONFIG.left}px`, 
            top: `${LINES_CONFIG.top}px`, 
            width: `${LINES_CONFIG.width}px`,
            height: '456px'
          }}
        >
          <div className="absolute inset-0">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1644.21 458.127">
              <g id="Vector 13">
                <motion.path 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5 }}
                  clipRule="evenodd" d={svgPaths.pb54f00} fill="#141414" fillRule="evenodd" 
                />
                <motion.path 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, delay: 0.3 }}
                  d={svgPaths.p226219a0} fill="#141414" 
                />
                <motion.path 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 3 }}
                  d={svgPaths.p1cdd0b00} 
                  stroke="#141414" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

    </section>
  );
};
