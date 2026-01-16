import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://SEU_DOMINIO_AQUI";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Matheus Antunes | Nutricao esportiva e clinica",
    template: "%s | Matheus Antunes",
  },
  description:
    "Consultoria nutricional premium - Shape Sob Controle. Nutricao esportiva e clinica com metodo, constancia e resultado.",
  applicationName: "Shape Sob Controle",
  creator: "Matheus Antunes",
  publisher: "Matheus Antunes",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
