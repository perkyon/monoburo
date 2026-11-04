import type { Metadata } from "next";
import { CategoryLanding } from "@/components/CategoryLanding";
import { publicProjects } from "@/data/projects";

const title = "Предметы мебели на заказ из МДФ и эмали — Краснодар";
const description =
  "Отдельно стоящие предметы мебели: фиксированная цена от 40 000 ₽, срок 1,5 месяца, цвет и размер под заказ. Свой цех в Краснодаре.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/predmety" },
  openGraph: { url: "/predmety", title, description, images: ["/interior/DSC03204.JPG"] },
};

export default function PredmetyPage() {
  return (
    <CategoryLanding
      source="predmety"
      eyebrow="Предметы · МДФ и эмаль"
      title="Предметы мебели на заказ"
      lead="Отдельно стоящие объекты из МДФ с эмалью: фиксированная цена и срок, цвет и размер — под ваш интерьер. Для дома и для коммерческих пространств."
      facts={[
        { value: "от 40", label: "тыс. ₽ за предмет" },
        { value: "1.5", label: "месяца на изготовление" },
        { value: "4", label: "модели в линейке" },
      ]}
      offerTitle="Что важно знать"
      offer={[
        {
          title: "Фиксированная цена",
          text: "Свод — 40 000 ₽, Кант — 80 000 ₽, Ниша — 120 000 ₽, Формат — 140 000 ₽.",
        },
        {
          title: "Цвет и размер под заказ",
          text: "Подбираем эмаль под палитру интерьера и габарит под конкретное место.",
        },
        {
          title: "Образцы вживую",
          text: "Эмаль и фактуры можно посмотреть в шоуруме на Дальнем проезде, 11к1.",
        },
        {
          title: "Свой цех",
          text: "Делаем в Краснодаре, на Калинина, 1Л. Срок — 1,5 месяца.",
        },
      ]}
      casesTitle="Линейка"
      projects={publicProjects.filter((project) => project.category === "interior")}
      steps={[
        { title: "Модель", text: "Выбираете предмет — в шоуруме или по фото." },
        { title: "Цвет и размер", text: "Подбираем эмаль и габарит под место." },
        { title: "Изготовление", text: "1,5 месяца в нашем цехе в Краснодаре." },
        { title: "Передача", text: "Согласуем доставку и установку под ваш объект." },
      ]}
    />
  );
}
