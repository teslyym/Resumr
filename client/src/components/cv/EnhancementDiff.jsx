import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, Sparkles } from "lucide-react";

export default function EnhancementDiff({
  original,
  enhanced,
  onKeep,
  onRevert,
  type = "text",
}) {
  if (!enhanced) return null;

  const hasOriginal = type === "list" ? original?.length > 0 : !!original;
  const hasEnhanced = type === "list" ? enhanced?.length > 0 : !!enhanced;

  if (!hasEnhanced) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="border border-[hsl(var(--emerald)/0.3)] bg-[hsl(var(--emerald-light))] rounded-lg p-4 space-y-3"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[hsl(var(--emerald))]" />
        <span className="text-xs font-medium text-[hsl(var(--emerald))] uppercase tracking-wider">
          AI Enhanced
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {/* Original */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Original
          </p>
          <div className="bg-background border border-border rounded-md p-3 text-sm text-foreground/80">
            {type === "list" ? (
              hasOriginal ? (
                <ul className="space-y-1.5">
                  {original.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      • {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="italic text-muted-foreground">Empty</span>
              )
            ) : hasOriginal ? (
              <p className="leading-relaxed whitespace-pre-wrap">{original}</p>
            ) : (
              <span className="italic text-muted-foreground">Empty</span>
            )}
          </div>
        </div>

        {/* Enhanced */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-[hsl(var(--emerald))] uppercase tracking-wider">
            AI Version
          </p>
          <div className="bg-background border border-[hsl(var(--emerald)/0.3)] rounded-md p-3 text-sm text-foreground">
            {type === "list" ? (
              <ul className="space-y-1.5">
                {enhanced.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="leading-relaxed whitespace-pre-wrap">{enhanced}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onKeep}
          className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md bg-[hsl(var(--emerald))] text-white hover:bg-[hsl(var(--emerald)/0.9)] transition-colors"
        >
          <Check className="w-3.5 h-3.5" />
          Keep AI version
        </button>
        <button
          type="button"
          onClick={onRevert}
          className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Revert
        </button>
      </div>
    </motion.div>
  );
}
