import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, Trash2, GripVertical } from "lucide-react";

export default function EntryCard({
  title,
  subtitle,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onRemove,
  children,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="border border-border rounded-lg bg-background"
    >
      {/* Header */}
      <div className="flex items-start gap-2 p-3 border-b border-border bg-secondary/30 rounded-t-lg">
        <div className="flex flex-col text-muted-foreground">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-0.5 hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground"
            aria-label="Move up"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="p-0.5 hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground"
            aria-label="Move down"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-sm font-medium truncate">
            {title || (
              <span className="text-muted-foreground italic">Untitled</span>
            )}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
          )}
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
          aria-label="Remove entry"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">{children}</div>
    </motion.div>
  );
}
