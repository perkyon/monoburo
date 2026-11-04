import Link from "next/link";
import { RequestButton } from "@/components/RequestButton";
import { designerCommission } from "@/utils/site";

const perks = [
  {
    title: "Образцы в шоуруме",
    text: "Шпон, эмаль, HPL, металл — вживую в Галерее Фестиваль. Приводите клиента выбирать.",
  },
  {
    title: "Смета за 1–2 дня",
    text: "Присылаете эскиз или чертёж — возвращаем расчёт с комментариями по узлам.",
  },
  {
    title: "Чертежи и узлы — за нами",
    text: "Доводим конструктив до производства: стыки, фурнитура, крепёж. Без доплаты.",
  },
  {
    title: "Выезд на замер",
    text: "Сами снимаем размеры и привязки к инженерии на объекте.",
  },
  {
    title: "Клиента — в цех",
    text: "Показываем производство до договора: станок, стык, как держим срок.",
  },
  {
    title: "Ваше имя в кейсе",
    text: "Публикуем проект на сайте с указанием дизайнера.",
  },
  {
    title: "Чат дизайнеров",
    text: "Закрытый Telegram: анонсы завтраков и новые материалы первыми.",
  },
];

export const Designers = ({ asPage = false }: { asPage?: boolean }) => {
  const Title = asPage ? "h1" : "h2";

  return (
    <section id="designers" className={`relative w-full ${asPage ? "pb-16 pt-24 md:pb-24 md:pt-32" : "py-16 md:py-24"}`}>
      <div className="container-page">
        <div className="rounded-[28px] bg-[#0a0a0a] px-6 py-12 text-white md:rounded-[40px] md:px-14 md:py-20">
          <p className="font-unbounded text-[11px] uppercase tracking-[0.22em] text-white/40 md:text-[12px]">
            Дизайнерам
          </p>
          <div className="mt-3 grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
            <div>
              <Title className="max-w-[16ch] font-unbounded text-[32px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[52px]">
                Ведите проект. Мебель — на нас.
              </Title>
              <p className="mt-5 max-w-[44ch] font-manrope text-[15px] leading-relaxed text-white/55 md:text-[17px]">
                Работаем с дизайнерами интерьера в Краснодаре: доводим ваши чертежи до производства,
                делаем в своём цехе и указываем вас в кейсе.
              </p>
            </div>
            <div className="md:text-right">
              <p className="font-unbounded text-[72px] font-medium leading-none tracking-[-0.05em] md:text-[112px]">
                {designerCommission}
              </p>
              <p className="mt-3 font-manrope text-[14px] leading-snug text-white/55 md:ml-auto md:max-w-[24ch]">
                агентское вознаграждение с каждого приведённого заказа
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 border-t border-white/12 md:mt-16 md:grid-cols-2">
            {perks.map((perk, index) => (
              <div
                key={perk.title}
                className="flex gap-5 border-b border-white/12 py-6 md:gap-6 md:py-7 md:odd:pr-10 md:even:pl-10"
              >
                <span className="font-unbounded text-[13px] text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-unbounded text-[17px] leading-snug tracking-[-0.02em] md:text-[20px]">
                    {perk.title}
                  </span>
                  <span className="mt-2 block max-w-[40ch] font-manrope text-[14px] leading-relaxed text-white/55 md:text-[15px]">
                    {perk.text}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 md:mt-12">
            <RequestButton
              source="designers"
              label="Стать партнёром"
              className="h-[52px] rounded-full bg-white px-8 font-unbounded text-[14px] text-black transition hover:bg-white/85"
            />
            <Link
              href={asPage ? "#events" : "/#events"}
              className="inline-flex h-[52px] items-center rounded-full border border-white/20 px-6 font-unbounded text-[14px] text-white/70 transition hover:border-white/50 hover:text-white"
            >
              Ближайший завтрак
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
