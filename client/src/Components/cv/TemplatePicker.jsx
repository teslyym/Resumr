import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { TEMPLATES } from "./templates";

export default function TemplatePicker({ value, onChange }) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold mb-1">Choose template</h3>
        <p className="text-xs text-muted-foreground">
          Pick a style. You can change anytime.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {TEMPLATES.map((tpl) => {
          const isSelected = (value || "modern") === tpl.id;
          return (
            <motion.button
              key={tpl.id}
              type="button"
              onClick={() => onChange(tpl.id)}
              whileTap={{ scale: 0.97 }}
              className={`relative text-left p-3 rounded-lg border transition-colors ${
                isSelected
                  ? "border-foreground bg-secondary/40"
                  : "border-border hover:border-foreground/40"
              }`}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-foreground text-background flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </span>
              )}
              <div className="mb-2">
                <TemplateThumbnail templateId={tpl.id} />
              </div>
              <p className="text-xs font-semibold">{tpl.name}</p>
              <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">
                {tpl.description}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// Tiny stylized thumbnails — abstract representations of each template
function TemplateThumbnail({ templateId }) {
  const base =
    "w-full h-20 rounded border border-border overflow-hidden bg-white";
  switch (templateId) {
    case "modern":
      return (
        <div className={base}>
          <div className="p-2 space-y-1">
            <div className="h-1.5 w-2/3 bg-foreground rounded-sm" />
            <div className="h-1 w-1/3 bg-muted-foreground/50 rounded-sm" />
            <div className="h-px bg-border my-1" />
            <div className="h-0.5 w-1/4 bg-foreground rounded-sm" />
            <div className="h-0.5 w-full bg-muted-foreground/30 rounded-sm" />
            <div className="h-0.5 w-5/6 bg-muted-foreground/30 rounded-sm" />
          </div>
        </div>
      );
    case "classic":
      return (
        <div className={base}>
          <div className="p-2 space-y-1">
            <div className="h-1.5 w-1/2 bg-foreground rounded-sm mx-auto" />
            <div className="h-1 w-1/3 bg-muted-foreground/50 rounded-sm mx-auto" />
            <div className="h-px bg-foreground my-1" />
            <div className="h-0.5 w-1/3 bg-foreground rounded-sm" />
            <div className="h-0.5 w-full bg-muted-foreground/30 rounded-sm" />
          </div>
        </div>
      );
    case "compact":
      return (
        <div className={base + " flex"}>
          <div className="w-1/3 bg-secondary p-1.5 space-y-1">
            <div className="h-1.5 w-full bg-foreground rounded-sm" />
            <div className="h-0.5 w-3/4 bg-muted-foreground/40 rounded-sm" />
            <div className="h-0.5 w-2/3 bg-muted-foreground/40 rounded-sm" />
          </div>
          <div className="flex-1 p-1.5 space-y-1">
            <div className="h-0.5 w-1/2 bg-foreground rounded-sm" />
            <div className="h-0.5 w-full bg-muted-foreground/30 rounded-sm" />
            <div className="h-0.5 w-5/6 bg-muted-foreground/30 rounded-sm" />
            <div className="h-0.5 w-3/4 bg-muted-foreground/30 rounded-sm" />
          </div>
        </div>
      );
    case "bold":
      return (
        <div className={base}>
          <div className="bg-[hsl(var(--emerald))] p-1.5">
            <div className="h-1.5 w-2/3 bg-white/95 rounded-sm" />
            <div className="h-0.5 w-1/3 bg-white/70 rounded-sm mt-0.5" />
          </div>
          <div className="p-1.5 space-y-0.5">
            <div className="h-0.5 w-1/4 bg-[hsl(var(--emerald))] rounded-sm" />
            <div className="h-0.5 w-full bg-muted-foreground/30 rounded-sm" />
            <div className="h-0.5 w-5/6 bg-muted-foreground/30 rounded-sm" />
          </div>
        </div>
      );
    default:
      return <div className={base} />;
  }
}
