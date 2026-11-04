import type { Metadata } from "next";
import { Designers } from "@/components/Designers";
import { Events } from "@/components/Events";
import { Footer } from "@/components/Footer";
import { StickyContact } from "@/components/StickyContact";
import { SubpageHeader } from "@/components/SubpageHeader";

const title = "Дизайнерам интерьера — партнёрство с мебельным цехом в Краснодаре";
const description =
  "5% агентского вознаграждения, образцы в шоуруме, смета за 1–2 дня, чертежи узлов за наш счёт, выезд на замер. Завтраки для дизайнеров в Surf Coffee.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/designers" },
  openGraph: { url: "/designers", title, description },
};

export default function DesignersPage() {
  return (
    <main className="min-h-screen bg-background">
      <SubpageHeader source="designers" />
      <Designers asPage />
      <Events />
      <Footer />
      <StickyContact />
    </main>
  );
}
