import type { MetadataRoute } from "next";
import { siteDescription } from "@/utils/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "monoburo",
    short_name: "monoburo",
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f3f3f0",
    icons: [
      {
        src: "/favicon-32x32.png?v=3",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icon-192.png?v=3",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png?v=3",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png?v=3",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
