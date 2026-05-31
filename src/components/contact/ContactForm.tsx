"use client";

import { useState } from "react";

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

function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function validateForm(state: FormState): string | null {
  if (state.ad.trim().length < 2) return "Lütfen adınızı girin.";
  if (state.soyad.trim().length < 2) return "Lütfen soyadınızı girin.";
  if (phoneDigits(state.telefon).length < 10) return "Geçerli bir telefon numarası girin.";
  if (!state.hizmet) return "Lütfen ilgilendiğiniz hizmeti seçin.";
  if (state.mesaj.trim().length < 5) return "Mesajınız en az 5 karakter olmalıdır.";
  return null;
}

export function ContactForm() {
  const [state, setState] = useState<FormState>({
    ad: "",
    soyad: "",
    telefon: "",
    hizmet: "",
    mesaj: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    if (status !== "loading") {
      setStatus("idle");
      setErrorMessage(null);
    }
    setState((s) => ({ ...s, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const validationError = validateForm(state);
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...state,
          website: String(formData.get("website") ?? "")
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gönderim başarısız");
      setStatus("ok");
      setState({ ad: "", soyad: "", telefon: "", hizmet: "", mesaj: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Bir hata oluştu.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {/* Honeypot — botlar için gizli alan */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ad">
          <input
            value={state.ad}
            onChange={(e) => onChange("ad", e.target.value)}
            className={inputClass}
            placeholder="Adınız"
            autoComplete="given-name"
            required
          />
        </Field>
        <Field label="Soyad">
          <input
            value={state.soyad}
            onChange={(e) => onChange("soyad", e.target.value)}
            className={inputClass}
            placeholder="Soyadınız"
            autoComplete="family-name"
            required
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
            required
          />
        </Field>
        <Field label="İlgilenilen Hizmet">
          <select
            value={state.hizmet}
            onChange={(e) => onChange("hizmet", e.target.value as FormState["hizmet"])}
            className={inputClass}
            required
          >
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
          required
        />
      </Field>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-colors enabled:hover:bg-[#c90510] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Gönderiliyor…" : "Gönder"}
        </button>
        {status === "ok" ? (
          <p className="text-sm font-medium text-green-700">
            Mesajınız e-posta ile iletildi. En kısa sürede sizinle iletişime geçeceğiz.
          </p>
        ) : status === "error" ? (
          <p className="text-sm font-medium text-primary">{errorMessage}</p>
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
