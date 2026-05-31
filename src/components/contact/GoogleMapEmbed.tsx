import { SITE_MAPS } from "@/lib/site";

type Props = {
  className?: string;
  title?: string;
  minHeight?: number;
};

export function GoogleMapEmbed({
  className = "",
  title = "Ofis konumu haritası",
  minHeight = 280
}: Props) {
  return (
    <div
      className={["overflow-hidden rounded-sm border border-border bg-white shadow-card", className].join(" ")}
      style={{ minHeight }}
    >
      <iframe
        src={SITE_MAPS.embedUrl}
        width="600"
        height="450"
        style={{ border: 0, width: "100%", height: "100%", minHeight }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  );
}
