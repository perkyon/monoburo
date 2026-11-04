import type { Metadata } from "next";
import { CategoryLanding } from "@/components/CategoryLanding";
import { publicProjects } from "@/data/projects";

const title = "Мебель для кафе и ресторанов на заказ в Краснодаре";
const description =
  "Барные стойки, зоны выдачи, посадка и хранение для кофеен и ресторанов. Свой цех в Краснодаре, проекты за 29–45 дней. Кейсы surf coffee, Лейбл, Том Сойер, Союзники.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/horeca" },
  openGraph: { url: "/horeca", title, description, images: ["/figma/preview-surf.webp"] },
};

export default function HorecaPage() {
  return (
    <CategoryLanding
      source="horeca"
      eyebrow="HoReCa · Краснодар"
      title="Мебель для кафе, кофеен и ресторанов на заказ"
      lead="Проектируем и делаем мебель для HoReCa в своём цехе в Краснодаре: бар, выдача, посадка, хранение. Под поток гостей и ежедневную уборку, а не под рендер."
      facts={[
        { value: "29–45", label: "дней от проекта до открытия" },
        { value: "1.2–2.4", label: "млн ₽ — бюджеты наших проектов" },
        { value: "4", label: "кофейни в портфолио" },
      ]}
      offerTitle="Что делаем"
      offer={[
        {
          title: "Барные стойки и линии",
          text: "Бар как рабочий и визуальный центр зала: высота, глубина, техника, свет.",
        },
        {
          title: "Стойки выдачи и to-go",
          text: "Очередь не перекрывает проход, бариста понимает, куда отдавать заказ.",
        },
        {
          title: "Посадка и столы",
          text: "Плотная посадка у бара и спокойная дальше — под реальный поток, а не под фото.",
        },
        {
          title: "Хранение и технические модули",
          text: "Запас, посуда, техника — за фасадами. Шпон, HPL, эмаль и металл, которые держат трафик.",
        },
      ]}
      casesTitle="Кейсы HoReCa"
      projects={publicProjects.filter((project) => project.category === "horeca")}
      steps={[
        {
          title: "Обмер и сценарий",
          text: "Приезжаем на объект, снимаем размеры и привязки к инженерии, разбираем, как будет работать зал.",
        },
        {
          title: "Конструктив и смета",
          text: "Чертежи узлов и расчёт за 1–2 дня. Материалы — под износ, а не под сэмпл.",
        },
        {
          title: "Производство в своём цехе",
          text: "Пилим и собираем на Калинина, 1Л. Можно приехать посмотреть на любом этапе.",
        },
        {
          title: "Монтаж",
          text: "Ставим на объекте и проверяем узлы на месте — иначе картинка рассыпается на стыках.",
        },
      ]}
    />
  );
}
