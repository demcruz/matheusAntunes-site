import type { Metadata } from "next";

import { ShapeSobControle } from "@/components/templates/ShapeSobControle";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://SEU_DOMINIO_AQUI";
const isProduction = Boolean(process.env.NEXT_PUBLIC_SITE_URL) && !siteUrl.includes("localhost");

export const metadata: Metadata = {
  title: "Shape Sob Controle | Consultoria nutricional premium",
  description:
    "Consultoria nutricional premium online e presencial com Matheus Antunes. Metodo Shape Sob Controle para resultado real e rotina real.",
  alternates: {
    canonical: siteUrl,
  },
  robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    title: "Shape Sob Controle | Consultoria nutricional premium",
    description:
      "Consultoria nutricional premium com metodo, estrategia e consistencia para rotina real.",
    url: siteUrl,
    siteName: "Shape Sob Controle",
    locale: "pt_BR",
    images: [
      {
        url: new URL("/og.svg", siteUrl).toString(),
        width: 1200,
        height: 630,
        alt: "Shape Sob Controle - Consultoria nutricional premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shape Sob Controle | Consultoria nutricional premium",
    description:
      "Consultoria nutricional premium com metodo, estrategia e consistencia para rotina real.",
    images: [new URL("/og.svg", siteUrl).toString()],
  },
};

export default function LandingPage() {
  return <ShapeSobControle />;
}
