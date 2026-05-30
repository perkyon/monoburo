 "use client";

 import Image from "next/image";
 import { useEffect, useRef, useState } from "react";
 import { createPortal } from "react-dom";
 import { ProjectModal, type Project } from "@/components/ProjectModal";
 import { InteriorItems } from "@/components/InteriorItems";

 const cards = [
   { id: "home", title: "Дом", image: "/assets/home1.png" },
   { id: "horeca", title: "HoReCa", image: "/figma/tom7.jpg" },
   { id: "interior", title: "Предметы интерьера", image: "/assets/home3.png" }
 ];

 const horecaProjects: Project[] = [
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
      highlights: ["СВЕТОВЫЕ АКЦЕНТЫ", "ФОТОГЕНИЧНОСТЬ", "ЖЁСТКИЙ ТРАФИК", "ЗОНИРОВАНИЕ"],
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

 const lockBodyScroll = () => {
  const html = document.documentElement;
  const originalHtmlOverflow = html.style.overflow;
   const scrollY = window.scrollY;
   document.body.style.position = "fixed";
   document.body.style.top = `-${scrollY}px`;
   document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
  html.style.overflow = "hidden";
   document.body.classList.add("modal-open");
   return () => {
     const y = Math.abs(parseInt(document.body.style.top || "0", 10));
     document.body.style.position = "";
     document.body.style.top = "";
     document.body.style.width = "";
    document.body.style.overflow = "";
    html.style.overflow = originalHtmlOverflow;
     document.body.classList.remove("modal-open");
     window.scrollTo(0, y);
   };
 };

 export const Projects = () => {
   const [isHoReCaOpen, setIsHoReCaOpen] = useState(false);
   const [isInteriorOpen, setIsInteriorOpen] = useState(false);
   const [activeProject, setActiveProject] = useState<Project | null>(null);
   const [openedFrom, setOpenedFrom] = useState<"horeca" | "interior" | null>(null);
   const horecaScrollRef = useRef<HTMLDivElement>(null);
   const interiorScrollRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
     if (!isHoReCaOpen && !isInteriorOpen) return;
     return lockBodyScroll();
   }, [isHoReCaOpen, isInteriorOpen]);

   return (
    <section id="projects" className="relative z-10 w-full bg-white pt-4 max-md:mt-12 md:pt-6">
       <div className="relative w-full max-w-[1440px] h-auto md:h-[820px] mx-auto px-4 md:px-0">
        <div className="relative md:absolute left-0 md:left-[100px] top-0 w-full md:w-[1234px] h-[48px] md:h-[58px] rounded-full bg-black z-20 flex items-center px-[20px] md:px-[24px]">
          <h2 className="text-white font-bold text-[30px]">Проекты</h2>
        </div>

        <div className="relative mt-10 md:absolute md:left-[100px] md:top-[100px] flex gap-[14px] md:gap-[22px] max-md:flex-col">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => {
                if (card.id === "horeca") {
                  setIsHoReCaOpen(true);
                  return;
                }
                if (card.id === "interior") {
                  setIsInteriorOpen(true);
                  return;
                }
                window.location.href = "/missing";
              }}
              className="group relative w-full md:w-[400px] h-[220px] md:h-[600px] rounded-[24px] md:rounded-[32px] overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                quality={95}
                sizes="(max-width: 768px) 92vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/70 transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute inset-0 rounded-[32px] ring-1 ring-white/0 transition-all duration-300 group-hover:ring-white/30" />
              <div className="absolute bottom-[18px] left-1/2 -translate-x-1/2 text-center text-white font-semibold text-[18px]">
                {card.title}
              </div>
            </button>
          ))}
         </div>
       </div>

       {isHoReCaOpen && typeof document !== "undefined" &&
         createPortal(
           <div
             className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4 md:px-6 py-6 md:py-10 overflow-hidden"
             onClick={() => setIsHoReCaOpen(false)}
           >
            <div
              className="relative w-full max-w-[1200px] max-h-[90vh] rounded-[24px] md:rounded-[32px] bg-white p-[20px] md:p-[40px] shadow-2xl overflow-x-hidden overflow-y-auto"
              onClick={(event) => event.stopPropagation()}
            >
               <button
                 type="button"
                 aria-label="Закрыть"
                 onClick={() => setIsHoReCaOpen(false)}
                 className="absolute right-[20px] top-[16px] text-[28px] text-black/60 hover:text-black"
               >
                 ×
               </button>
               <h3 className="t-h2 text-black mb-4 md:mb-6">Выберите проект HoReCa</h3>
               <div className="relative">
                 <button
                   type="button"
                   aria-label="Листать влево"
                   onClick={() => horecaScrollRef.current?.scrollBy({ left: -400, behavior: "smooth" })}
                   className="absolute left-2 top-1/2 z-10 -translate-y-1/2 hidden md:flex size-9 items-center justify-center rounded-full bg-white/95 text-black/80 shadow-md border border-black/10 hover:bg-white hover:text-black hover:shadow-lg transition-colors"
                 >
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                 </button>
                 <button
                   type="button"
                   aria-label="Листать вправо"
                   onClick={() => horecaScrollRef.current?.scrollBy({ left: 400, behavior: "smooth" })}
                   className="absolute right-2 top-1/2 z-10 -translate-y-1/2 hidden md:flex size-9 items-center justify-center rounded-full bg-white/95 text-black/80 shadow-md border border-black/10 hover:bg-white hover:text-black hover:shadow-lg transition-colors"
                 >
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                 </button>
                 <div ref={horecaScrollRef} className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
                 {horecaProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      setIsHoReCaOpen(false);
                      setOpenedFrom("horeca");
                      setActiveProject(project);
                    }}
                    className="group relative h-[360px] md:h-[60vh] md:max-h-[720px] w-[78vw] md:w-[520px] shrink-0 snap-start overflow-hidden rounded-[20px] md:rounded-[28px] text-left"
                  >
                     <Image src={project.image} alt={project.name} fill className="object-cover" />
                     <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                     <div className="absolute bottom-[16px] left-[20px] text-white">
                       <p className="t-h3 font-semibold">{project.name}</p>
                       {project.location && <p className="t-body-sm text-white/80">{project.location}</p>}
                     </div>
                   </button>
                 ))}
               </div>
               </div>
             </div>
           </div>,
           document.body
         )
       }

       {isInteriorOpen && typeof document !== "undefined" &&
         createPortal(
           <div
             className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4 md:px-6 py-6 md:py-10 overflow-hidden"
             onClick={() => setIsInteriorOpen(false)}
           >
             <div
               className="relative w-full max-w-[1200px] max-h-[90vh] rounded-[24px] md:rounded-[32px] bg-white p-[20px] md:p-[40px] shadow-2xl overflow-x-hidden overflow-y-auto"
               onClick={(e) => e.stopPropagation()}
             >
               <button
                 type="button"
                 aria-label="Закрыть"
                 onClick={() => setIsInteriorOpen(false)}
                 className="absolute right-[20px] top-[16px] text-[28px] text-black/60 hover:text-black"
               >
                 ×
               </button>
               <h3 className="t-h2 text-black mb-4 md:mb-6">Предметы интерьера</h3>
               <InteriorItems
                 scrollRef={interiorScrollRef}
                 onSelect={(project) => {
                   setIsInteriorOpen(false);
                   setOpenedFrom("interior");
                   setActiveProject(project);
                 }}
               />
             </div>
           </div>,
           document.body
         )
       }

       {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => {
            setActiveProject(null);
            if (openedFrom === "horeca") setIsHoReCaOpen(true);
            if (openedFrom === "interior") setIsInteriorOpen(true);
            setOpenedFrom(null);
          }}
        />
       )}
     </section>
   );
 };
