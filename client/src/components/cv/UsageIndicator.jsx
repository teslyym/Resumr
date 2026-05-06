import { Sparkles } from "lucide-react";

export default function UsageIndicator({ used, limit, plan }) {
  if (plan === "pro") {
    return (
      <div className="flex items-center gap-1.5 text-xs text-[hsl(var(--emerald))]">
        <Sparkles className="w-3 h-3" />
        <span>Unlimited AI</span>
      </div>
    );
  }

  if (used == null || limit == null) return null;

  const remaining = limit - used;
  const isLow = remaining <= 1;
  const isEmpty = remaining <= 0;

  return (
    <div
      className={`flex items-center gap-1.5 text-xs ${
        isEmpty
          ? "text-destructive"
          : isLow
            ? "text-amber-600"
            : "text-muted-foreground"
      }`}
    >
      <Sparkles className="w-3 h-3" />
      <span>
        {used} / {limit} AI enhancements this month
      </span>
    </div>
  );
}
