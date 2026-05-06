import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SkillsSection({ skills = [], onChange }) {
  const [draft, setDraft] = useState("");

  const addSkill = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (skills.includes(trimmed)) {
      setDraft("");
      return;
    }
    onChange([...skills, trimmed]);
    setDraft("");
  };

  const removeSkill = (skill) => {
    onChange(skills.filter((s) => s !== skill));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    } else if (e.key === "Backspace" && draft === "" && skills.length > 0) {
      removeSkill(skills[skills.length - 1]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-1">Skills</h2>
        <p className="text-sm text-muted-foreground">
          Add as many as you'd like. Type a skill and press Enter or comma to
          add it.
        </p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="skills">Skills</Label>

        <div className="flex gap-2">
          <Input
            id="skills"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. JavaScript"
            className="flex-1"
          />
          <button
            type="button"
            onClick={addSkill}
            disabled={!draft.trim()}
            className="px-3 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {/* Tags */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            <AnimatePresence>
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        )}

        {skills.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            No skills added yet.
          </p>
        )}
      </div>
    </motion.div>
  );
}
