"use client";

import { useMemo, useState } from "react";

const OPTIONS = [
  "MEB Kurum Açma Danışmanlığı",
  "Çocuk Oyun Evi Açılış Danışmanlığı",
  "Psikolojik Danışmanlık Merkezi Kurulumu",
  "Dil ve Konuşma (DK) / Ergoterapi Merkezi Açılışı",
  "Kurum Devir İşlemleri",
  "Diğer Danışmanlık Türleri"
] as const;

type FormState = {
  ad: string;
  soyad: string;
  telefon: string;
  hizmet: (typeof OPTIONS)[number] | "";
  mesaj: string;
};

export function ContactForm() {
  const [state, setState] = useState<FormState>({
    ad: "",
    soyad: "",
    telefon: "",
    hizmet: "",
    mesaj: ""
  });
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  const canSubmit = useMemo(() => {
    return (
      state.ad.trim().length >= 2 &&
      state.soyad.trim().length >= 2 &&
      state.telefon.trim().length >= 10 &&
      state.hizmet !== "" &&
      state.mesaj.trim().length >= 10
    );
  }, [state]);

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setStatus("idle");
    setState((s) => ({ ...s, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    // Şimdilik sadece demo: gerçek entegrasyon (e-posta/CRM) sonradan eklenebilir.
    setStatus("ok");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ad">
          <input
            value={state.ad}
            onChange={(e) => onChange("ad", e.target.value)}
            className={inputClass}
            placeholder="Adınız"
            autoComplete="given-name"
          />
        </Field>
        <Field label="Soyad">
          <input
            value={state.soyad}
            onChange={(e) => onChange("soyad", e.target.value)}
            className={inputClass}
            placeholder="Soyadınız"
            autoComplete="family-name"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Telefon">
          <input
            value={state.telefon}
            onChange={(e) => onChange("telefon", e.target.value)}
            className={inputClass}
            placeholder="05xx xxx xx xx"
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>
        <Field label="İlgilenilen Hizmet">
          <select value={state.hizmet} onChange={(e) => onChange("hizmet", e.target.value as FormState["hizmet"])} className={inputClass}>
            <option value="">Seçiniz</option>
            {OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Mesaj">
        <textarea
          value={state.mesaj}
          onChange={(e) => onChange("mesaj", e.target.value)}
          className={[inputClass, "min-h-28"].join(" ")}
          placeholder="Kurum türünüz, bulunduğunuz il/ilçe ve hedef açılış tarihiniz gibi detayları paylaşabilirsiniz."
        />
      </Field>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-colors enabled:hover:bg-[#c90510] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Gönder
        </button>
        {status === "ok" ? (
          <p className="text-sm font-medium text-green-700">Mesajınız alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.</p>
        ) : (
          <p className="text-xs text-gray-600">Göndermeden önce tüm alanları eksiksiz doldurunuz.</p>
        )}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-gray-900">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-sm border border-border bg-white px-3 py-2 text-sm text-gray-900 shadow-card outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/15";

