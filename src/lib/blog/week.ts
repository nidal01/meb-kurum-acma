/** ISO hafta anahtarı: 2026-W22 */
export function getIsoWeekKey(date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

/** Pazartesi=0 … Pazar=6 */
export function getWeekdayIndex(date = new Date()): number {
  return (date.getDay() + 6) % 7;
}

/** Haftalık 14 slot: gün × 2 + sabah/öğleden sonra */
export function getSlotOrder(slot: 0 | 1, date = new Date()): number {
  return getWeekdayIndex(date) * 2 + slot;
}

export const WEEKDAY_LABELS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"] as const;

export function slotOrderLabel(order: number): string {
  const day = Math.floor(order / 2);
  const half = order % 2 === 0 ? "09:00" : "17:00";
  return `${WEEKDAY_LABELS[day] ?? "?"} · ${half}`;
}

export const TOPICS_PER_WEEK = 14;
