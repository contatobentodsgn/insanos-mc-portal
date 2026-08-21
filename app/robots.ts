import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_sites-preview/"],
    },
    sitemap: "https://www.insanosmc.com.br/sitemap.xml",
  };
}
