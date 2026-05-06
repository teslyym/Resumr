import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";

export default function EnhanceButton({
  onClick,
  loading,
  disabled,
  size = "default",
  label = "Enhance with AI",
}) {
  const sizes = {
    sm: "h-8 px-3 text-xs",
    default: "h-9 px-4 text-sm",
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden inline-flex items-center gap-2 ${sizes[size]} font-medium rounded-md bg-foreground text-background transition-opacity disabled:opacity-50 disabled:cursor-not-allowed group`}
    >
      {/* Shimmer overlay while loading */}
      {loading && (
        <span
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ animation: "shimmer-sweep 1.5s linear infinite" }}
          aria-hidden="true"
        />
      )}

      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
      ) : (
        <Sparkles className="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform" />
      )}
      <span className="relative">{loading ? "Enhancing…" : label}</span>
    </motion.button>
  );
}
