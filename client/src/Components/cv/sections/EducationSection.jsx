import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EntryCard from "./EntryCard";

const blankEntry = () => ({ degree: "", school: "", year: "" });

export default function EducationSection({ education = [], onChange }) {
  const updateEntry = (idx, changes) => {
    onChange(education.map((e, i) => (i === idx ? { ...e, ...changes } : e)));
  };
  const addEntry = () => onChange([...education, blankEntry()]);
  const removeEntry = (idx) => onChange(education.filter((_, i) => i !== idx));
  const moveEntry = (idx, dir) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= education.length) return;
    const updated = [...education];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    onChange(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-1">
          Education
        </h2>
        <p className="text-sm text-muted-foreground">
          Degrees, diplomas, Certifications, and any relevant programs.
        </p>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {education.map((entry, idx) => (
            <EntryCard
              key={idx}
              index={idx}
              total={education.length}
              title={entry.degree}
              subtitle={
                entry.school
                  ? `${entry.school}${entry.year ? ` · ${entry.year}` : ""}`
                  : null
              }
              onMoveUp={() => moveEntry(idx, -1)}
              onMoveDown={() => moveEntry(idx, 1)}
              onRemove={() => removeEntry(idx)}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label>Degree</Label>
                  <Input
                    value={entry.degree}
                    onChange={(e) =>
                      updateEntry(idx, { degree: e.target.value })
                    }
                    placeholder="BSc Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>School</Label>
                  <Input
                    value={entry.school}
                    onChange={(e) =>
                      updateEntry(idx, { school: e.target.value })
                    }
                    placeholder="Lagos State University"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    value={entry.year}
                    onChange={(e) => updateEntry(idx, { year: e.target.value })}
                    placeholder="2020"
                  />
                </div>
              </div>
            </EntryCard>
          ))}
        </AnimatePresence>

        {education.length === 0 && (
          <p className="text-sm text-muted-foreground italic py-4 text-center border border-dashed border-border rounded-lg">
            No education added yet.
          </p>
        )}

        <button
          type="button"
          onClick={addEntry}
          className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add education
        </button>
      </div>
    </motion.div>
  );
}
