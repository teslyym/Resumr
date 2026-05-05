import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import EntryCard from "./EntryCard";
import EnhanceButton from "@/components/cv/EnhanceButton";
import EnhancementDiff from "@/components/cv/EnhancementDiff";

const blankEntry = () => ({
  jobTitle: "",
  company: "",
  startDate: "",
  endDate: "",
  responsibilities: [""],
  enhancedResponsibilities: [],
});

export default function ExperienceSection({
  experience = [],
  onChange,
  onEnhance,
  onKeepEnhancedBullets,
  onRevertEnhancedBullets,
  enhancing,
  canEnhance,
}) {
  const updateEntry = (idx, changes) => {
    onChange(experience.map((e, i) => (i === idx ? { ...e, ...changes } : e)));
  };
  const addEntry = () => onChange([...experience, blankEntry()]);
  const removeEntry = (idx) => onChange(experience.filter((_, i) => i !== idx));
  const moveEntry = (idx, dir) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= experience.length) return;
    const updated = [...experience];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    onChange(updated);
  };

  const updateBullet = (entryIdx, bulletIdx, value) => {
    const entry = experience[entryIdx];
    const newBullets = entry.responsibilities.map((b, i) =>
      i === bulletIdx ? value : b,
    );
    updateEntry(entryIdx, { responsibilities: newBullets });
  };

  const addBullet = (entryIdx) => {
    const entry = experience[entryIdx];
    updateEntry(entryIdx, {
      responsibilities: [...entry.responsibilities, ""],
    });
  };

  const removeBullet = (entryIdx, bulletIdx) => {
    const entry = experience[entryIdx];
    updateEntry(entryIdx, {
      responsibilities: entry.responsibilities.filter(
        (_, i) => i !== bulletIdx,
      ),
    });
  };

  const hasAnyBullets = experience.some((e) =>
    e.responsibilities?.some((r) => r.trim()),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-1">
            Work experience
          </h2>
          <p className="text-sm text-muted-foreground">
            Add your relevant roles. Most recent first works best.
          </p>
        </div>
        {hasAnyBullets && (
          <EnhanceButton
            onClick={onEnhance}
            loading={enhancing}
            disabled={!canEnhance}
            size="sm"
            label="Enhance bullets"
          />
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {experience.map((entry, idx) => (
            <EntryCard
              key={idx}
              index={idx}
              total={experience.length}
              title={entry.jobTitle}
              subtitle={
                entry.company
                  ? `${entry.company}${
                      entry.startDate ? ` · ${entry.startDate}` : ""
                    }${entry.endDate ? ` – ${entry.endDate}` : ""}`
                  : null
              }
              onMoveUp={() => moveEntry(idx, -1)}
              onMoveDown={() => moveEntry(idx, 1)}
              onRemove={() => removeEntry(idx)}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label>Job title</Label>
                  <Input
                    value={entry.jobTitle}
                    onChange={(e) =>
                      updateEntry(idx, { jobTitle: e.target.value })
                    }
                    placeholder="Senior Backend Engineer"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Company</Label>
                  <Input
                    value={entry.company}
                    onChange={(e) =>
                      updateEntry(idx, { company: e.target.value })
                    }
                    placeholder="Acme Corp"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start date</Label>
                  <Input
                    value={entry.startDate}
                    onChange={(e) =>
                      updateEntry(idx, { startDate: e.target.value })
                    }
                    placeholder="Jan 2022"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End date</Label>
                  <Input
                    value={entry.endDate}
                    onChange={(e) =>
                      updateEntry(idx, { endDate: e.target.value })
                    }
                    placeholder="Present"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <Label>Responsibilities &amp; achievements</Label>
                <div className="space-y-2">
                  <AnimatePresence>
                    {entry.responsibilities.map((bullet, bIdx) => (
                      <motion.div
                        key={bIdx}
                        layout
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.18 }}
                        className="flex gap-2"
                      >
                        <span className="pt-2.5 text-muted-foreground text-sm select-none">
                          •
                        </span>
                        <Textarea
                          value={bullet}
                          onChange={(e) =>
                            updateBullet(idx, bIdx, e.target.value)
                          }
                          placeholder="Describe what you did and the impact you had..."
                          rows={2}
                          className="resize-none flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => removeBullet(idx, bIdx)}
                          disabled={entry.responsibilities.length === 1}
                          className="p-1.5 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30 disabled:hover:text-muted-foreground self-start mt-1"
                          aria-label="Remove bullet"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <button
                  type="button"
                  onClick={() => addBullet(idx)}
                  className="text-xs font-medium text-foreground hover:opacity-70 inline-flex items-center gap-1 transition-opacity pt-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add bullet
                </button>
              </div>

              {/* AI diff per entry */}
              {entry.enhancedResponsibilities?.length > 0 && (
                <div className="pt-2">
                  <EnhancementDiff
                    original={
                      entry.responsibilities?.filter((r) => r.trim()) || []
                    }
                    enhanced={entry.enhancedResponsibilities}
                    onKeep={() => onKeepEnhancedBullets(idx)}
                    onRevert={() => onRevertEnhancedBullets(idx)}
                    type="list"
                  />
                </div>
              )}
            </EntryCard>
          ))}
        </AnimatePresence>

        {experience.length === 0 && (
          <p className="text-sm text-muted-foreground italic py-4 text-center border border-dashed border-border rounded-lg">
            No experience added yet.
          </p>
        )}

        <button
          type="button"
          onClick={addEntry}
          className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add experience
        </button>
      </div>
    </motion.div>
  );
}
