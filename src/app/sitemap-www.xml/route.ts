import { NextResponse } from "next/server";
import {
  buildSitemapEntries,
  getWwwSiteUrl,
  renderSitemapXml
} from "@/lib/sitemap";

export const dynamic = "force-dynamic";
export const revalidate = 600;

/**
 * www önekli (https://www.meboyunevi.com) URL'leri içeren ek sitemap.
 * Kanonik (non-www) sitemap `/sitemap.xml` üzerinden sunulurken,
 * www varyantını talep eden tarayıcılar / arama motorları için
 * paralel bir sitemap çıktısı üretir.
 */
export async function GET() {
  const wwwBaseUrl = getWwwSiteUrl();
  const entries = await buildSitemapEntries(wwwBaseUrl);
  const xml = renderSitemapXml(entries);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600"
    }
  });
}
