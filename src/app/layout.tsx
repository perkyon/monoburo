import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

import { CustomCursor } from "@/components/CustomCursor";
import {
  contactPhoneRaw,
  siteDescription,
  siteLocale,
  siteLogo,
  siteName,
  siteOgImage,
  siteUrl,
} from "@/utils/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — дизайн и производство мебели`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  category: "Design",
  keywords: [
    "дизайн мебели",
    "производство мебели",
    "мебель на заказ",
    "HoReCa",
    "офисная мебель",
    "дизайн интерьера",
    "проектирование мебели",
    "мебель для бизнеса",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} — дизайн и производство мебели`,
    description: siteDescription,
    locale: siteLocale,
    images: [
      {
        url: siteOgImage,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — дизайн и производство мебели`,
    description: siteDescription,
    images: [siteOgImage],
  },
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
    shortcut: { url: "/favicon.svg", type: "image/svg+xml" },
    apple: { url: siteLogo, type: "image/svg+xml" },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: new URL(siteLogo, siteUrl).toString(),
    description: siteDescription,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
  };

  const services = [
    {
      name: "Мебель для HoReCa",
      description:
        "Разработка и производство мебели под заказ для кафе, ресторанов, баров и кофеен: залы, барные зоны, посадка, стойки выдачи и ожидания.",
      url: `${siteUrl}#projects`,
    },
    {
      name: "Офисная мебель",
      description:
        "Рабочие места, переговорные, кабинеты, зоны ожидания и reception для офисов малого и среднего бизнеса, проектирование под планировку.",
      url: `${siteUrl}#projects`,
    },
    {
      name: "Мебель для рабочих пространств и коворкингов",
      description:
        "Гибкие рабочие места, переговорные комнаты и зоны коллаборации для коворкингов, образовательных и гибридных пространств.",
      url: `${siteUrl}#projects`,
    },
  ];

  const professionalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteName,
    url: siteUrl,
    image: new URL(siteOgImage, siteUrl).toString(),
    description: siteDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Тургенева, 151",
      addressLocality: "Краснодар",
      addressRegion: "Краснодарский край",
      addressCountry: "RU",
    },
    areaServed: {
      "@type": "Country",
      name: "Россия",
    },
    telephone: contactPhoneRaw,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги Monoburo",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          url: service.url,
        },
      })),
    },
  };

  const servicesItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Услуги Monoburo",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: service.url,
        provider: {
          "@type": "Organization",
          name: siteName,
          url: siteUrl,
        },
      },
    })),
  };

  return (
    <html lang="ru">
      <head>
        <link rel="preload" href="/favicon.svg" as="image" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KJVBD9CH2B"
          strategy="afterInteractive"
        />
        <Script
          id="ga4"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KJVBD9CH2B');
            `,
          }}
        />
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) { return; }
                  }
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=107082729', 'ym');

              ym(107082729, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(servicesItemListJsonLd),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${roboto.variable} antialiased font-unbounded`}
      >
        <noscript>
          <img
            src="https://mc.yandex.ru/watch/107082729"
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </noscript>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
