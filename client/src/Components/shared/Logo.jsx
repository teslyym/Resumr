import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export default function Logo({ size = "default", linkTo = "/" }) {
  const sizes = {
    sm: { icon: "w-4 h-4", text: "text-base", gap: "gap-2", padding: "p-1.5" },
    default: { icon: "w-5 h-5", text: "text-lg", gap: "gap-2", padding: "p-2" },
    lg: { icon: "w-6 h-6", text: "text-2xl", gap: "gap-2.5", padding: "p-2.5" },
  };
  const s = sizes[size];

  return (
    <Link
      to={linkTo}
      className={`inline-flex items-center ${s.gap} font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity`}
    >
      <div
        className={`${s.padding} bg-emerald-light rounded-lg border border-[hsl(var(--emerald)/0.2)]`}
      >
        <FileText className={`${s.icon} text-[hsl(var(--emerald))]`} />
      </div>
      <span className={s.text}>Resumr</span>
    </Link>
  );
}
