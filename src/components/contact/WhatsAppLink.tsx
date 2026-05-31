import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { buildWhatsAppUrl, getWhatsAppDefaultMessage } from "@/lib/contact/whatsapp";

type Props = {
  variant?: "float" | "button" | "link";
  className?: string;
  label?: string;
};

export function WhatsAppLink({ variant = "link", className = "", label }: Props) {
  const href = buildWhatsAppUrl();
  const text = label ?? "WhatsApp ile yazın";

  if (variant === "float") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp: ${getWhatsAppDefaultMessage()}`}
        className={[
          "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1ebe57]",
          className
        ].join(" ")}
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    );
  }

  if (variant === "button") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          "inline-flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe57]",
          className
        ].join(" ")}
      >
        <WhatsAppIcon className="h-4 w-4" />
        {text}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={["inline-flex items-center gap-2 font-medium hover:text-[#128C7E]", className].join(" ")}
    >
      <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
      {text}
    </a>
  );
}
