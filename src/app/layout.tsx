import type { Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ConditionalSiteChrome } from "@/components/layout/ConditionalSiteChrome";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SiteAeo } from "@/components/seo/SiteAeo";
import { buildRootMetadata } from "@/lib/seo";

const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  display: "swap"
});

export const metadata = buildRootMetadata();

export const viewport: Viewport = {
  themeColor: "#E30613",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <SiteAeo />
      </head>
      <body className={[roboto.className, "min-h-dvh bg-white text-text antialiased"].join(" ")}>
        <GoogleAnalytics />
        <ConditionalSiteChrome>{children}</ConditionalSiteChrome>
      </body>
    </html>
  );
}
