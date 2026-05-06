import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function WizardNav({ steps, current, onJump }) {
  return (
    <nav className="space-y-1">
      {steps.map((step, idx) => {
        const isActive = idx === current;
        const isComplete = idx < current;

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onJump(idx)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-left transition-colors ${
              isActive
                ? "bg-secondary text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium shrink-0 transition-colors ${
                isActive
                  ? "bg-foreground text-background"
                  : isComplete
                    ? "bg-[hsl(var(--emerald))] text-white"
                    : "bg-secondary text-muted-foreground border border-border"
              }`}
            >
              {isComplete ? <Check className="w-3.5 h-3.5" /> : idx + 1}
            </span>
            <span className="truncate">{step.label}</span>
            {isActive && (
              <motion.div
                layoutId="wizard-active-indicator"
                className="ml-auto w-1 h-4 bg-foreground rounded-full"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
