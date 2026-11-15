import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

import { Providers } from "@/components/Providers";
import {
  contactEmail,
  contactPhoneRaw,
  showroomAddressShort,
  siteDescription,
  siteLocale,
  siteLogo,
  siteName,
  siteOgImage,
  siteTitle,
  siteUrl,
  workshopAddressShort,
} from "@/utils/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s — Monoburo`,
  },
  description: siteDescription,
  applicationName: siteName,
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "default",
  },
  category: "Design",
  keywords: [
    "мебель на заказ Краснодар",
    "производство мебели",
    "мебель по дизайн-проекту",
    "барные стойки на заказ",
    "мебель для кафе и ресторанов",
    "офисная мебель на заказ",
    "корпусная мебель на заказ",
    "HoReCa",
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
    siteName: siteName,
    title: siteTitle,
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
    title: siteTitle,
    description: siteDescription,
    images: [siteOgImage],
  },
  icons: {
    icon: [
      { url: "/mark-fill.svg", type: "image/svg+xml" },
      { url: "/mark.ico", sizes: "32x32" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f3f0",
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
    email: contactEmail,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
  };

  const services = [
    {
      name: "Мебель для кафе и ресторанов",
      description:
        "Барные стойки, зоны выдачи, посадка и хранение для кафе, кофеен и ресторанов. Свой цех в Краснодаре.",
      url: `${siteUrl}/horeca`,
    },
    {
      name: "Барные стойки на заказ",
      description:
        "Барные стойки под поток, технику и интерьер зала: высота, глубина, узлы, свет. Производство в Краснодаре.",
      url: `${siteUrl}/barnye-stoyki`,
    },
    {
      name: "Офисная мебель на заказ",
      description:
        "Рабочие места, переговорные, reception и кабинеты под планировку офиса. Обмер, чертёж, свой цех.",
      url: `${siteUrl}/ofisnaya-mebel`,
    },
    {
      name: "Корпусная мебель на заказ",
      description:
        "Корпуса в размер помещения: хранение, кухни, барные линии, встройки. Не каталог — производство под объект.",
      url: `${siteUrl}/korpusnaya-mebel`,
    },
    {
      name: "Мебель по дизайн-проекту",
      description:
        "Считаем, деталируем и производим мебель по чертежам и дизайн-проектам. Для дизайнеров и заказчиков с готовым интерьером.",
      url: `${siteUrl}/mebel-po-dizayn-proektu`,
    },
    {
      name: "Производство мебели для дизайнеров",
      description:
        "Цех работает по чертежам дизайнера: смета, деталировка, изготовление и монтаж. Авторство проекта остаётся вашим.",
      url: `${siteUrl}/designers`,
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
      streetAddress: "Дальний проезд, 11к1, этаж 2",
      addressLocality: "Краснодар",
      addressRegion: "Краснодарский край",
      addressCountry: "RU",
    },
    areaServed: {
      "@type": "Country",
      name: "Россия",
    },
    telephone: contactPhoneRaw,
    email: contactEmail,
    location: [
      {
        "@type": "Place",
        name: "Шоурум Monoburo",
        address: {
          "@type": "PostalAddress",
          streetAddress: showroomAddressShort,
          addressLocality: "Краснодар",
          addressRegion: "Краснодарский край",
          addressCountry: "RU",
        },
      },
      {
        "@type": "Place",
        name: "Цех Monoburo",
        address: {
          "@type": "PostalAddress",
          streetAddress: workshopAddressShort,
          addressLocality: "Краснодар",
          addressRegion: "Краснодарский край",
          addressCountry: "RU",
        },
      },
    ],
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

  return (
    <html lang="ru">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if("scrollRestoration"in history)history.scrollRestoration="manual";var n=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];var r=n?n.type==="reload":(performance.navigation&&performance.navigation.type===1);if(r&&location.hash)history.replaceState(null,"",location.pathname+location.search);if(!location.hash)scrollTo(0,0);}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Unbounded:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/mark-fill.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
      </head>
      <body
        className="antialiased"
      >
        <noscript>
          <img
            src="https://mc.yandex.ru/watch/107082729"
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
