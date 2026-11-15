import { CategoryLanding } from "@/components/CategoryLanding";
import { getPublicProjectsByIds } from "@/data/projects";
import { landingMetadata, serviceJsonLd } from "@/utils/seo";

const title = "Офисная мебель на заказ в Краснодаре";
const description =
  "Офисная мебель на заказ: рабочие места, переговорные, reception и кабинеты под планировку. Свой цех в Краснодаре — обмер, чертёж, производство, монтаж.";

export const metadata = landingMetadata({
  title,
  description,
  path: "/ofisnaya-mebel",
  image: "/assets/workshop-poster.jpg",
});

export default function OfisnayaMebelPage() {
  return (
    <CategoryLanding
      source="ofisnaya-mebel"
      eyebrow="Офисы · Краснодар"
      title="Офисная мебель на заказ"
      lead="Рабочие места, переговорные, reception и кабинеты — под вашу планировку, а не из каталога. Тот же цех, что собирает коммерческие интерьеры: обмер, чертёж, производство на Калинина, монтаж. Открытые кейсы пока из HoReCa — конструктив тот же, сценарий другой."
      facts={[
        { value: "1–2", label: "дня на смету" },
        { value: "свой", label: "цех, не посредник" },
        { value: "11к1", label: "шоурум на Дальнем" },
      ]}
      offerTitle="Что делаем в офис"
      offer={[
        {
          title: "Reception и вход",
          text: "Стойка, ожидание, хранение для ресепшена. Первое, что видит гость, должно быть собрано, а не «почти».",
        },
        {
          title: "Рабочие места",
          text: "Столы, экраны, кабель-менеджмент, хранение под реальный штат — не стандарт 1200 из прайса.",
        },
        {
          title: "Переговорные и кабинеты",
          text: "Стол на нужное число, акустика мягкими поверхностями, техника без открытой проводовки.",
        },
        {
          title: "Материалы под каждый день",
          text: "Шпон, эмаль, HPL, металл — то, что можно посмотреть в шоуруме и что переживёт офис, а не съёмку.",
        },
      ]}
      casesTitle="Как собираем коммерческие интерьеры"
      projects={getPublicProjectsByIds(["surf", "label", "soyzniki"])}
      related={[
        { href: "/korpusnaya-mebel", label: "Корпусная" },
        { href: "/mebel-po-dizayn-proektu", label: "По проекту" },
        { href: "/designers", label: "Дизайнерам" },
      ]}
      jsonLd={serviceJsonLd({ name: title, description, path: "/ofisnaya-mebel" })}
      steps={[
        {
          title: "Планировка и обмер",
          text: "Снимаем офис или работаем по вашему плану: проходы, розетки, кто где сидит.",
        },
        {
          title: "Чертёж и смета",
          text: "Конструктив и расчёт за 1–2 дня. Можно приехать в шоурум выбрать фактуру.",
        },
        {
          title: "Цех",
          text: "Делаем на Калинина, 1Л. Можно зайти посмотреть каркас, пока не уехал на объект.",
        },
        {
          title: "Монтаж",
          text: "Ставим вне рабочих часов, если офис уже живой. Стыки и кабели — сразу, без второй итерации.",
        },
      ]}
    />
  );
}
