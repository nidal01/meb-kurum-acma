import type { Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ConditionalSiteChrome } from "@/components/layout/ConditionalSiteChrome";
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
      <body className={[roboto.className, "min-h-dvh bg-white text-text antialiased"].join(" ")}>
        <ConditionalSiteChrome>{children}</ConditionalSiteChrome>
      </body>
    </html>
  );
}
