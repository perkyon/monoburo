import { Designers } from "@/components/Designers";
import { Events } from "@/components/Events";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { StickyContact } from "@/components/StickyContact";
import { SubpageHeader } from "@/components/SubpageHeader";
import { landingMetadata, serviceJsonLd } from "@/utils/seo";

const title = "Производство мебели для дизайнеров по чертежам";
const description =
  "Производим мебель по чертежам дизайнера: смета за 1–2 дня, деталировка без доплаты, свой цех в Краснодаре, 20% агентских. Открытый цех и образцы в шоуруме.";

export const metadata = landingMetadata({
  title,
  description,
  path: "/designers",
});

export default function DesignersPage() {
  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={serviceJsonLd({ name: title, description, path: "/designers" })} />
      <SubpageHeader source="designers" />
      <Designers asPage />
      <Events />
      <Footer />
      <StickyContact />
    </main>
  );
}
