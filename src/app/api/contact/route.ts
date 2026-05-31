import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/contact/email";

const SERVICE_OPTIONS = new Set([
  "MEB Kurum Açma Danışmanlığı",
  "Çocuk Oyun Evi Açılış Danışmanlığı",
  "Psikolojik Danışmanlık Merkezi Kurulumu",
  "Dil ve Konuşma (DK) / Ergoterapi Merkezi Açılışı",
  "Kurum Devir İşlemleri",
  "Diğer Danışmanlık Türleri"
]);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      ad?: string;
      soyad?: string;
      telefon?: string;
      hizmet?: string;
      mesaj?: string;
      website?: string;
    };

    // Honeypot — bot doldurursa sessizce başarılı dön
    if (body.website?.trim()) {
      return NextResponse.json({ ok: true });
    }

    const ad = body.ad?.trim() ?? "";
    const soyad = body.soyad?.trim() ?? "";
    const telefon = body.telefon?.trim() ?? "";
    const hizmet = body.hizmet?.trim() ?? "";
    const mesaj = body.mesaj?.trim() ?? "";

    if (ad.length < 2 || soyad.length < 2 || telefon.length < 10 || mesaj.length < 10) {
      return NextResponse.json({ error: "Lütfen tüm alanları eksiksiz doldurun." }, { status: 400 });
    }

    if (!SERVICE_OPTIONS.has(hizmet)) {
      return NextResponse.json({ error: "Geçerli bir hizmet seçin." }, { status: 400 });
    }

    await sendContactEmail({ ad, soyad, telefon, hizmet, mesaj });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gönderim hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
