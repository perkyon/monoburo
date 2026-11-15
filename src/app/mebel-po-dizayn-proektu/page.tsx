import { CategoryLanding } from "@/components/CategoryLanding";
import { getPublicProjectsByIds } from "@/data/projects";
import { designerCommission } from "@/utils/site";
import { landingMetadata, serviceJsonLd } from "@/utils/seo";

const title = "Мебель по дизайн-проекту — производство в Краснодаре";
const description =
  "Производим мебель по дизайн-проекту и чертежам: смета за 1–2 дня, деталировка, свой цех в Краснодаре, монтаж. Для дизайнеров и заказчиков с готовым интерьером.";

export const metadata = landingMetadata({
  title,
  description,
  path: "/mebel-po-dizayn-proektu",
  image: "/figma/preview-label.jpg",
});

export default function MebelPoDizaynProektuPage() {
  return (
    <CategoryLanding
      source="mebel-po-dizayn-proektu"
      eyebrow="Чертежи · цех"
      title="Мебель по дизайн-проекту"
      lead="Присылаете проект или чертежи — считаем, деталируем и делаем в своём цехе. Вы остаётесь автором интерьера, мы берём производство: раскрой, фурнитура, сборка, монтаж. Для дизайнеров и для заказчиков с готовым проектом."
      facts={[
        { value: "1–2", label: "дня на смету по проекту" },
        { value: designerCommission, label: "агентских — если вы дизайнер" },
        { value: "1Л", label: "Калинина — открытый цех" },
      ]}
      offerTitle="Как заводим проект"
      offer={[
        {
          title: "Смета по вашим чертежам",
          text: "Присылаете проект — возвращаем расчёт. Не перерисовываем интерьер «под себя».",
        },
        {
          title: "Деталировка без доплаты",
          text: "Документацию для цеха готовим сами: раскрой, фурнитура, крепёж. Ваш проект остаётся вашим.",
        },
        {
          title: "Свой цех, не подрядчик с каталогом",
          text: "Пилим и собираем на Калинина, 1Л. Можно приехать со клиентом на любом этапе.",
        },
        {
          title: "Монтаж и стыки",
          text: "Ставим на объекте. Если ниша живая — корпус повторяет помещение, а не оставляет щель.",
        },
      ]}
      casesTitle="Сделано по проекту"
      projects={getPublicProjectsByIds(["label", "surf", "svod", "format"])}
      related={[
        { href: "/designers", label: "Дизайнерам" },
        { href: "/korpusnaya-mebel", label: "Корпусная" },
        { href: "/horeca", label: "HoReCa" },
      ]}
      jsonLd={serviceJsonLd({ name: title, description, path: "/mebel-po-dizayn-proektu" })}
      steps={[
        {
          title: "Проект",
          text: "Присылаете чертежи, ведомость или просто планировку с размерами. Если нужно — выезжаем на замер.",
        },
        {
          title: "Расчёт",
          text: "Смета за 1–2 дня. Понятно, из чего цифра, без «потом посмотрим на объекте».",
        },
        {
          title: "Цех",
          text: "Деталировка, раскрой, сборка. Дизайнер и заказчик могут зайти посмотреть.",
        },
        {
          title: "Монтаж",
          text: "Привозим и ставим. Стыки, примыкания, фурнитура — на месте, не «как в рендере».",
        },
      ]}
    />
  );
}
