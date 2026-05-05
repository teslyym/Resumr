import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import EnhanceButton from "@/components/cv/EnhanceButton";
import EnhancementDiff from "@/components/cv/EnhancementDiff";

export default function SummarySection({
  targetJobTitle,
  summary,
  enhancedSummary,
  onTargetChange,
  onSummaryChange,
  onEnhance,
  onKeepEnhanced,
  onRevertEnhanced,
  enhancing,
  canEnhance,
}) {
  const charCount = (summary || "").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-1">
          Professional summary
        </h2>
        <p className="text-sm text-muted-foreground">
          A short pitch about who you are and what you bring. AI can help you
          polish this.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetJobTitle">Target job title</Label>
        <Input
          id="targetJobTitle"
          value={targetJobTitle || ""}
          onChange={(e) => onTargetChange(e.target.value)}
          placeholder="Senior Backend Engineer"
        />
        <p className="text-xs text-muted-foreground">
          What role are you applying for? Helps tailor the AI rewrite.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Label htmlFor="summary">Summary</Label>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs ${
                charCount > 400 ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {charCount} / 400
            </span>
            <EnhanceButton
              onClick={onEnhance}
              loading={enhancing}
              disabled={!canEnhance || charCount === 0}
              size="sm"
            />
          </div>
        </div>
        <Textarea
          id="summary"
          value={summary || ""}
          onChange={(e) => onSummaryChange(e.target.value)}
          placeholder="Backend engineer with 4 years of experience..."
          rows={5}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">
          2-4 sentences works best. Keep it tight.
        </p>
      </div>

      {enhancedSummary && enhancedSummary !== summary && (
        <EnhancementDiff
          original={summary}
          enhanced={enhancedSummary}
          onKeep={onKeepEnhanced}
          onRevert={onRevertEnhanced}
          type="text"
        />
      )}
    </motion.div>
  );
}
