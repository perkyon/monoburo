export type BreakfastAxis = {
  label: string;
  value: number;
};

export type DesignerBreakfast = {
  id: string;
  date: string;
  title: [string, string];
  theme: string;
  description: string;
  place: string;
  address: string;
  axes: BreakfastAxis[];
  /** Готовая афиша. Если нет — собираем набор без чужих фото. */
  posterImage?: string;
};

export type BreakfastStatus = "past" | "today" | "upcoming";

const PLACE = {
  title: ["DESIGNERS", "BREAKFAST"] as [string, string],
  place: "Surf Coffee",
  address: "Дальняя 8к1, ЖК Тургенев",
};

/** Выпуски по дате. Меняешь массив — лента обновляется сама. */
export const breakfasts: DesignerBreakfast[] = [
  {
    id: "2026-10-20",
    date: "2026-10-20",
    ...PLACE,
    theme: "Как на самом деле работает цех",
    description:
      "Первый завтрак: нетворк и разбор производства без слайдов. Стык, срок, материал — как это устроено на полу.",
    axes: [
      { label: "нетворк", value: 4 },
      { label: "разбор", value: 5 },
      { label: "цех", value: 4 },
    ],
  },
  {
    id: "2026-10-25",
    date: "2026-10-25",
    ...PLACE,
    theme: "Стык, срок, смета",
    description:
      "Почему проект уезжает в другой цех. Где ломается смета, кто держит срок и как читать чертеж до договора.",
    axes: [
      { label: "смета", value: 5 },
      { label: "срок", value: 4 },
      { label: "чертёж", value: 4 },
    ],
  },
  {
    id: "2026-11-12",
    date: "2026-11-12",
    ...PLACE,
    theme: "Дом, офис, HoReCa — один язык",
    description:
      "Следующий выпуск: один конструктив на разные сценарии. Как не делать три мебели под три брифа.",
    axes: [
      { label: "дом", value: 4 },
      { label: "офис", value: 3 },
      { label: "horeca", value: 5 },
    ],
  },
];

function startOfDay(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime();
}

export function parseEventDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function eventStatus(event: DesignerBreakfast, now = new Date()): BreakfastStatus {
  const eventDay = startOfDay(parseEventDate(event.date));
  const today = startOfDay(now);
  if (eventDay < today) return "past";
  if (eventDay > today) return "upcoming";
  return "today";
}

export function formatEventDate(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(parseEventDate(iso));
}

export function formatEventDay(iso: string) {
  return String(parseEventDate(iso).getDate());
}

export function formatEventMonth(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(parseEventDate(iso));
}

export function formatEventPill(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
  }).format(parseEventDate(iso));
}

/** Ближайший будущий, иначе последний прошедший. */
export function getInitialBreakfastIndex(events = breakfasts, now = new Date()) {
  const today = startOfDay(now);
  const upcoming = events.findIndex((event) => startOfDay(parseEventDate(event.date)) >= today);
  return upcoming === -1 ? events.length - 1 : upcoming;
}

export function statusLabel(status: BreakfastStatus, isNextUpcoming: boolean) {
  if (status === "today") return "Сегодня";
  if (status === "past") return "Архив";
  return isNextUpcoming ? "Ближайший" : "Скоро";
}
