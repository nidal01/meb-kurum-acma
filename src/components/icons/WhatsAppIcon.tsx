import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

type Props = {
  className?: string;
};

export function WhatsAppIcon({ className }: Props) {
  return <FontAwesomeIcon icon={faWhatsapp} className={className} aria-hidden />;
}
