import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EntryCard from "./EntryCard";

const blankEntry = () => ({ name: "", issuer: "", date: "", credentialId: "" });

export default function CertificationsSection({
  certifications = [],
  onChange,
}) {
  const updateEntry = (idx, changes) => {
    onChange(
      certifications.map((e, i) => (i === idx ? { ...e, ...changes } : e)),
    );
  };
  const addEntry = () => onChange([...certifications, blankEntry()]);
  const removeEntry = (idx) =>
    onChange(certifications.filter((_, i) => i !== idx));
  const moveEntry = (idx, dir) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= certifications.length) return;
    const updated = [...certifications];
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
          Certifications
        </h2>
        <p className="text-sm text-muted-foreground">
          Courses or certifications you've earned.
        </p>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {certifications.map((entry, idx) => (
            <EntryCard
              key={idx}
              index={idx}
              total={certifications.length}
              title={entry.name}
              subtitle={
                entry.issuer
                  ? `${entry.issuer}${entry.date ? ` · ${entry.date}` : ""}`
                  : null
              }
              onMoveUp={() => moveEntry(idx, -1)}
              onMoveDown={() => moveEntry(idx, 1)}
              onRemove={() => removeEntry(idx)}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label>Name</Label>
                  <Input
                    value={entry.name}
                    onChange={(e) => updateEntry(idx, { name: e.target.value })}
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issuer</Label>
                  <Input
                    value={entry.issuer}
                    onChange={(e) =>
                      updateEntry(idx, { issuer: e.target.value })
                    }
                    placeholder="Amazon Web Services"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    value={entry.date}
                    onChange={(e) => updateEntry(idx, { date: e.target.value })}
                    placeholder="June 2023"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>
                    Credential ID{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    value={entry.credentialId}
                    onChange={(e) =>
                      updateEntry(idx, { credentialId: e.target.value })
                    }
                    placeholder="ABC-123-XYZ"
                  />
                </div>
              </div>
            </EntryCard>
          ))}
        </AnimatePresence>

        {certifications.length === 0 && (
          <p className="text-sm text-muted-foreground italic py-4 text-center border border-dashed border-border rounded-lg">
            No certifications added yet.
          </p>
        )}

        <button
          type="button"
          onClick={addEntry}
          className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add certification
        </button>
      </div>
    </motion.div>
  );
}
