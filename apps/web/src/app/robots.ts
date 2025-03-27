import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/api/", "/dashboard/"],
      },
    ],
    sitemap: "https://www.edust.org/sitemap.xml",
    host: "https://www.edust.org",
  }
}
