import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://SEU_DOMINIO_AQUI";
const isProduction = Boolean(process.env.NEXT_PUBLIC_SITE_URL) && !siteUrl.includes("localhost");

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isProduction
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
