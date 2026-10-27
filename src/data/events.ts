export type BreakfastAxis = {
  label: string;
  value: number;
};

export type DesignerBreakfast = {
  id: string;
  title: [string, string];
  theme: string;
  description: string;
  place: string;
  address: string;
  when: string;
  axes: BreakfastAxis[];
  /** Готовая афиша. Если нет — собираем набор без чужих фото. */
  posterImage?: string;
};

/** Актуальный выпуск. Меняешь тему, фото, оси — и афиша обновляется. */
export const currentBreakfast: DesignerBreakfast = {
  id: "designers-breakfast",
  title: ["DESIGNERS", "BREAKFAST"],
  theme: "Как на самом деле работает цех",
  description:
    "Завтрак для тех, кто проектирует мебель и интерьер. Нетворк, разбор производства и разговор без слайдов — стык, срок, материал.",
  place: "Surf Coffee",
  address: "Дальняя 8к1, ЖК Тургенев",
  when: "Ближайший — по записи",
  axes: [
    { label: "нетворк", value: 4 },
    { label: "разбор", value: 5 },
    { label: "цех", value: 4 },
  ],
};
