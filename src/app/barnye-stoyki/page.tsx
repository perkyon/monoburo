import { CategoryLanding } from "@/components/CategoryLanding";
import { getPublicProjectsByIds } from "@/data/projects";
import { landingMetadata, serviceJsonLd } from "@/utils/seo";

const title = "Барные стойки на заказ в Краснодаре";
const description =
  "Барные стойки под поток гостей, технику и интерьер зала. Свой цех в Краснодаре: обмер, чертёж, производство, монтаж. Кейсы surf coffee, Лейбл, Том Сойер, Союзники.";

export const metadata = landingMetadata({
  title,
  description,
  path: "/barnye-stoyki",
  image: "/figma/preview-surf.webp",
});

export default function BarnyeStoykiPage() {
  return (
    <CategoryLanding
      source="barnye-stoyki"
      eyebrow="HoReCa · бар"
      title="Барные стойки на заказ"
      lead="Бар — рабочий и визуальный центр зала. Делаем стойки под ваш сценарий: высота, глубина, техника, свет и то, как бариста двигается в смену. Свой цех в Краснодаре, не каталог готовых линий."
      facts={[
        { value: "29–45", label: "дней от проекта до монтажа" },
        { value: "4", label: "кофейни с баром в портфолио" },
        { value: "1Л", label: "Калинина — свой цех" },
      ]}
      offerTitle="Что собираем"
      offer={[
        {
          title: "Бар как линия",
          text: "Не «стойка красивой картинкой», а рабочий контур: выдача, посадка у бара, место техники, куда уезжает грязная посуда.",
        },
        {
          title: "Техника и инженерия",
          text: "Привязка к воде, электрике, вытяжке. Снимаем объект сами — иначе стойка не встанет в реальный пол.",
        },
        {
          title: "Износ и уборка",
          text: "Фасады и столешницы — под ежедневный трафик. То, что хорошо на сэмпле, должно мыться каждый день.",
        },
        {
          title: "Монтаж на объекте",
          text: "Стыки, цоколи, примыкания к стенам проверяем на месте. Бар не прощает «потом подпилим».",
        },
      ]}
      casesTitle="Бары в портфолио"
      projects={getPublicProjectsByIds(["surf", "label", "tom-sawyer", "soyzniki"])}
      related={[
        { href: "/horeca", label: "HoReCa" },
        { href: "/korpusnaya-mebel", label: "Корпусная" },
        { href: "/mebel-po-dizayn-proektu", label: "По проекту" },
      ]}
      jsonLd={serviceJsonLd({ name: title, description, path: "/barnye-stoyki" })}
      steps={[
        {
          title: "Обмер и сценарий",
          text: "Приезжаем на объект, снимаем размеры и разбираем, как будет работать бар в часы пик.",
        },
        {
          title: "Конструктив и смета",
          text: "Чертежи узлов и расчёт за 1–2 дня. Материалы — под износ, а не под рендер.",
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
