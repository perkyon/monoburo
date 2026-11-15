import { CategoryLanding } from "@/components/CategoryLanding";
import { getPublicProjectsByIds } from "@/data/projects";
import { landingMetadata, serviceJsonLd } from "@/utils/seo";

const title = "Корпусная мебель на заказ в Краснодаре";
const description =
  "Корпусная мебель на заказ в Краснодаре: корпуса в размер помещения, хранение, барные линии, встройки. Свой цех, не массовый каталог. Портфолио и расчёт.";

export const metadata = landingMetadata({
  title,
  description,
  path: "/korpusnaya-mebel",
  image: "/figma/preview-label.jpg",
});

export default function KorpusnayaMebelPage() {
  return (
    <CategoryLanding
      source="korpusnaya-mebel"
      eyebrow="В размер · свой цех"
      title="Корпусная мебель на заказ"
      lead="Корпуса в размер помещения: хранение, кухни, барные линии, встройки. Не щитовой каталог «под любой проём» — свой цех в Краснодаре, узлы под объект. Если стена кривая, корпус повторяет стену."
      facts={[
        { value: "свой", label: "цех на Калинина, 1Л" },
        { value: "в размер", label: "не стандарт из прайса" },
        { value: "1–2", label: "дня на смету" },
      ]}
      offerTitle="Какая корпусная"
      offer={[
        {
          title: "В размер, не из линейки",
          text: "Ниши, скосы, инженерия уже в стенах. Сажаем корпус в существующее, а не просим переделать комнату под каталог.",
        },
        {
          title: "Хранение и кухни",
          text: "Кухонные линии, гардероб, встройки в гостиную. Сценарий сначала, фасады потом.",
        },
        {
          title: "Коммерческие линии",
          text: "Бар, выдача, технические модули для кафе и офиса. Тот же корпусный язык, другой износ.",
        },
        {
          title: "Фактуры вживую",
          text: "Шпон, эмаль, HPL, металл — в шоуруме на Дальнем проезде, 11к1. Не по jpg.",
        },
      ]}
      casesTitle="Корпуса в портфолио"
      projects={getPublicProjectsByIds(["label", "tom-sawyer", "nisha", "format"])}
      related={[
        { href: "/mebel-po-dizayn-proektu", label: "По проекту" },
        { href: "/horeca", label: "HoReCa" },
        { href: "/predmety", label: "Предметы" },
      ]}
      jsonLd={serviceJsonLd({ name: title, description, path: "/korpusnaya-mebel" })}
      steps={[
        {
          title: "Обмер",
          text: "Снимаем ниши, углы, привязки к инженерии. Линейкой на плане корпус не вставишь.",
        },
        {
          title: "Конструктив",
          text: "Чертежи и смета за 1–2 дня. Понятно, где фасад, где наполнение, где фурнитура.",
        },
        {
          title: "Цех",
          text: "Раскрой и сборка на Калинина, 1Л. Можно приехать, пока изделие ещё на стапеле.",
        },
        {
          title: "Монтаж",
          text: "Примыкания к стенам и полу — на объекте. Иначе остаётся щель, которую «не видно на рендере».",
        },
      ]}
    />
  );
}
