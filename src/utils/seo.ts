import type { Metadata } from "next";
import {
  contactEmail,
  contactPhoneRaw,
  siteName,
  siteUrl,
} from "@/utils/site";

export function landingMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const images = image ? [image] : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { url: path, title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const url = `${siteUrl}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    areaServed: {
      "@type": "City",
      name: "Краснодар",
    },
    provider: {
      "@type": "ProfessionalService",
      name: siteName,
      url: siteUrl,
      email: contactEmail,
      telephone: contactPhoneRaw,
    },
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
    },
  };
}
