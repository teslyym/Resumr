import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import EntryCard from "./EntryCard";

const blankEntry = () => ({ title: "", description: "", technologies: [] });

export default function ProjectsSection({ projects = [], onChange }) {
  const updateEntry = (idx, changes) => {
    onChange(projects.map((e, i) => (i === idx ? { ...e, ...changes } : e)));
  };
  const addEntry = () => onChange([...projects, blankEntry()]);
  const removeEntry = (idx) => onChange(projects.filter((_, i) => i !== idx));
  const moveEntry = (idx, dir) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= projects.length) return;
    const updated = [...projects];
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
        <h2 className="text-2xl font-semibold tracking-tight mb-1">Projects</h2>
        <p className="text-sm text-muted-foreground">
          Side projects, freelance work — anything that shows your craft.
        </p>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {projects.map((entry, idx) => (
            <EntryCard
              key={idx}
              index={idx}
              total={projects.length}
              title={entry.title}
              subtitle={
                entry.technologies.length > 0
                  ? entry.technologies.join(" · ")
                  : null
              }
              onMoveUp={() => moveEntry(idx, -1)}
              onMoveDown={() => moveEntry(idx, 1)}
              onRemove={() => removeEntry(idx)}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={entry.title}
                    onChange={(e) =>
                      updateEntry(idx, { title: e.target.value })
                    }
                    placeholder="Real-time chat app"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={entry.description}
                    onChange={(e) =>
                      updateEntry(idx, { description: e.target.value })
                    }
                    placeholder="What you built and why it's interesting..."
                    rows={3}
                    className="resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Technologies</Label>
                  <TechTagsInput
                    technologies={entry.technologies}
                    onChange={(techs) =>
                      updateEntry(idx, { technologies: techs })
                    }
                  />
                </div>
              </div>
            </EntryCard>
          ))}
        </AnimatePresence>

        {projects.length === 0 && (
          <p className="text-sm text-muted-foreground italic py-4 text-center border border-dashed border-border rounded-lg">
            No projects added yet.
          </p>
        )}

        <button
          type="button"
          onClick={addEntry}
          className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add project
        </button>
      </div>
    </motion.div>
  );
}

// Mini sub-component for technologies tags within a project
function TechTagsInput({ technologies, onChange }) {
  const [draft, setDraft] = useState("");

  const addTech = () => {
    const trimmed = draft.trim();
    if (!trimmed || technologies.includes(trimmed)) {
      setDraft("");
      return;
    }
    onChange([...technologies, trimmed]);
    setDraft("");
  };

  const removeTech = (tech) => {
    onChange(technologies.filter((t) => t !== tech));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTech();
    } else if (
      e.key === "Backspace" &&
      draft === "" &&
      technologies.length > 0
    ) {
      removeTech(technologies[technologies.length - 1]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="React, Node.js, PostgreSQL..."
          className="flex-1"
        />
        <button
          type="button"
          onClick={addTech}
          disabled={!draft.trim()}
          className="px-3 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>

      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <AnimatePresence>
            {technologies.map((tech) => (
              <motion.span
                key={tech}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary rounded text-xs"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTech(tech)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={`Remove ${tech}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
