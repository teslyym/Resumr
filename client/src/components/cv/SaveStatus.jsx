import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { formatRelative } from "@/lib/formatDate";

export default function SaveStatus({ status, lastSavedAt }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground min-h-[20px]">
      <AnimatePresence mode="wait">
        {status === "saving" && (
          <motion.div
            key="saving"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Saving…</span>
          </motion.div>
        )}

        {status === "saved" && (
          <motion.div
            key="saved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            <Check className="w-3 h-3 text-[hsl(var(--emerald))]" />
            <span>Saved {lastSavedAt ? formatRelative(lastSavedAt) : ""}</span>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 text-destructive"
          >
            <AlertCircle className="w-3 h-3" />
            <span>Save failed — will retry</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
