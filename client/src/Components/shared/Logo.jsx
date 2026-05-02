import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export default function Logo({ size = "default", linkTo = "/" }) {
  const sizes = {
    sm: {
      icon: "w-3.5 h-3.5",
      text: "text-base",
      gap: "gap-2",
      padding: "p-1.5",
    },
    default: { icon: "w-4 h-4", text: "text-lg", gap: "gap-2", padding: "p-2" },
    lg: { icon: "w-5 h-5", text: "text-2xl", gap: "gap-2.5", padding: "p-2.5" },
  };
  const s = sizes[size];

  return (
    <Link
      to={linkTo}
      className={`inline-flex items-center ${s.gap} font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity`}
    >
      <div className={`${s.padding} bg-foreground rounded-md`}>
        <FileText className={`${s.icon} text-background`} />
      </div>
      <span className={s.text}>Resumr</span>
    </Link>
  );
}
