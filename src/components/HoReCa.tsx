"use client";

import Image from "next/image";
import { svgPaths } from "@/utils/svgPaths";
import { motion } from "framer-motion";
import { useState } from "react";
import { ProjectModal, type Project } from "@/components/ProjectModal";

const projects: Project[] = [
  {
    id: 1,
    name: "Союзники кофе",
    image: "/figma/preview-so.jpg",
    location: "Тургенева 151, Краснодар",
    details: {
      lead: "Про уют без потери скорости обслуживания — пространство, которое работает в часы пик.",
      story:
        "Мы пересобрали планировку, отделили потоки гостей и бариста и сделали посадку «на разные сценарии»: быстрый кофе, работа, встреча. Интерьер держится на тёплой фактуре дерева, мягком свете и лёгкой мебели, чтобы зал не давил даже при высокой посадке.",
      highlights: ["перепланировка логистики", "посадка на 3 сценария", "мягкий свет", "легкая мебель"],
      result:
        "Получили пространство, где комфортно находиться долго, а сервис остаётся быстрым. Оборачиваемость выросла, шум снизился, а интерьер считывается как цельный и живой.",
      duration: "38 дней",
      budget: "1.8 млн ₽",
      materials: "шпон дуба, эмаль, металл, износостойкие ткани",
      challenges: "перепад высот, скрытые коммуникации, дедлайн под открытие"
    },
    gallery: [
      "/figma/so1.jpg",
      "/figma/so2.jpg",
      "/figma/so3.jpg",
      "/figma/so4.jpg",
      "/figma/so5.jpg",
      "/figma/so6.jpg",
      "/figma/so7.jpg"
    ]
  },
  {
    id: 2,
    name: "Том Сойер",
    image: "/figma/preview-tom.jpg",
    location: "Тургенева 151, Краснодар",
    details: {
      lead: "Маленькая площадь, где каждый сантиметр обязан работать на бизнес.",
      story:
        "Мы проверили проходы и собрали компактные столы с мягкой посадкой, вынесли хранение в незаметные модули и убрали визуальный шум. Интерьер строится на аккуратных радиусах и спокойной графике — зал выглядит дороже и не устаёт визуально.",
      highlights: ["компактная посадка", "тихая акустика", "скрытое хранение", "чистая геометрия"],
      result:
        "Больше посадочных мест без тесноты, быстрее обслуживание и ощущение «дорогого» пространства при небольшом метраже.",
      duration: "29 дней",
      budget: "1.2 млн ₽",
      materials: "массив, фанера, металл, ламинированные панели",
      challenges: "нестандартные радиусы мебели, узкие проходы, ночной монтаж"
    },
    gallery: [
      "/figma/tom1.jpg",
      "/figma/tom3.jpg",
      "/figma/tom4.jpg",
      "/figma/tom5.jpg",
      "/figma/tom6.jpg",
      "/figma/tom7.jpg",
      "/figma/tom8.jpg"
    ]
  },
  {
    id: 3,
    name: "Серф кофе",
    image: "/figma/preview-surf.webp",
    location: "Тургенева 151, Краснодар",
    details: {
      lead: "Про энергию и «картинку» — интерьер, который работает и днём, и вечером.",
      story:
        "Мы усилили акцент света, контраст фактур и чёткое зонирование: бар, быстрый кофе и зона для долгого сидения. Мебель держит визуальную лёгкость, но рассчитана на интенсивный поток.",
      highlights: ["световые акценты", "фотогеничность", "жёсткий трафик", "зонирование"],
      result:
        "Интерьер запоминается с первого взгляда, гости чаще делятся фото, а стиль бренда считывается мгновенно.",
      duration: "45 дней",
      budget: "2.4 млн ₽",
      materials: "шпон, металл, HPL, каленое стекло",
      challenges: "сложный свет, большой объём столярки, согласование материалов"
    },
    gallery: [
      "/figma/surf2.png",
      "/figma/surf-extra-1.webp",
      "/figma/surf-extra-2.webp",
      "/figma/surf-extra-3.webp",
      "/figma/surf-extra-4.webp",
      "/figma/surf-extra-5.webp",
      "/figma/surf-extra-6.webp"
    ]
  },
  {
    id: 4,
    name: "Лейбл кофе",
    image: "/figma/preview-label.jpg",
    location: "Тургенева 151, Краснодар",
    details: {
      lead: "Премиальная чистота без демонстративной роскоши.",
      story:
        "Акцент на геометрии, идеальных стыках и спокойных материалах. Мы добивались эффекта «тихой дороговизны» — без лишнего декора, но с точной работой по деталям и свету.",
      highlights: ["идеальные стыки", "чистая геометрия", "спокойные фактуры", "точный свет"],
      result:
        "Интерьер выглядит дорого и аккуратно, а мебель сохраняет внешний вид даже при активной эксплуатации.",
      duration: "32 дня",
      budget: "1.6 млн ₽",
      materials: "эмаль, МДФ, металл, натуральный шпон",
      challenges: "чистовая отделка, точная подгонка фасадов, быстрый запуск"
    },
    gallery: [
      "/figma/surf1.jpg",
      "/figma/label1.jpg",
      "/figma/label2.jpg",
      "/figma/label3.jpg",
      "/figma/label4.jpg",
      "/figma/label5.jpg",
      "/figma/label6.jpg",
      "/figma/label7.jpg",
      "/figma/label8.jpg",
      "/figma/label9.jpg",
      "/figma/label10.jpg"
    ]
  }
];

// РУЧНОЕ УПРАВЛЕНИЕ ЛИНИЯМИ (меняй эти значения, чтобы двигать вектор)
const LINES_CONFIG = {
  left: 0,
  top: 760,
  width: 1439
};

export const HoReCa = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="horeca" className="relative w-full h-[1145.52px] bg-white overflow-hidden">
      <div className="relative w-[1440px] h-full mx-auto" data-name="Проекты HoReCa">
        {/* Текст */}
        <div className="absolute left-[98px] text-black text-nowrap top-0 z-10" data-name="Текст">
          <div className="absolute font-unbounded font-normal leading-none left-[105px] t-h3 top-[50px]">
            <p className="mb-0">Проектирование и изготовление </p>
            <p className="ml-[200px]">мебели для HoReCa</p>
          </div>
          <h2 className="absolute font-unbounded font-medium leading-[normal] left-0 t-h1 top-0">HoReCa</h2>
        </div>

        {/* Слайдер проектов */}
        <div className="absolute top-[174px] left-0 w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <div className="flex gap-10 px-[100px] w-max py-10">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="relative snap-start shrink-0 group cursor-pointer" 
                style={{ width: '397px' }}
                onClick={() => setActiveProject(project)}
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
              </div>
            ))}
          </div>
        </div>

        {/* Vector 11 - ВОЗВРАЩЕНА ЗАЛИВКА И ПОЛОЖЕНИЕ */}
        <div 
          className="absolute pointer-events-none transition-all duration-300"
          style={{ 
            left: `${LINES_CONFIG.left}px`, 
            top: `${LINES_CONFIG.top}px`, 
            width: `${LINES_CONFIG.width}px`,
            height: '421px'
          }}
        >
          <div className="absolute inset-0">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1441.18 423.232">
              <g id="Vector 11">
                <motion.path 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5 }}
                  d={svgPaths.p2d446680} fill="#141414" 
                />
                <motion.path 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, delay: 0.3 }}
                  d={svgPaths.p30d93d40} fill="#141414" 
                />
                <motion.path 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 3 }}
                  d={svgPaths.p2dbd3700} 
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

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
};
