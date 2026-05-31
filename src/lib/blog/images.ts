/** Blog kapak ve içerik görselleri havuzu */
export const BLOG_COVER_IMAGES = [
  "/images/services/meb-kurum-acma-danismanligi.svg",
  "/images/services/ozel-egitim-rehabilitasyon-merkezi-acilisi.svg",
  "/images/services/cocuk-oyun-evi-acilis-danismanligi.svg",
  "/images/services/psikolojik-danismanlik-merkezi-kurulumu.svg",
  "/images/services/dk-ergoterapi-merkezi-acilisi.svg",
  "/images/services/kurum-devir-islemleri.svg",
  "/images/hero-stripe.svg"
] as const;

export function pickCoverImage(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return BLOG_COVER_IMAGES[hash % BLOG_COVER_IMAGES.length];
}

export function pickInlineImage(seed: string, index: number): string {
  const combined = `${seed}-${index}`;
  return pickCoverImage(combined);
}
