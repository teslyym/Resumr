import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";
export default function CVPreview({ cv }) {
  const p = cv?.personalInfo || {};
  const hasContact =
    p.email || p.phone || p.location || p.linkedin || p.portfolio;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-border rounded-lg shadow-sm overflow-hidden h-full"
    >
      <div className="p-8 sm:p-10 max-h-[800px] overflow-y-auto">
        {/* Header */}
        <header className="mb-6 pb-6 border-b border-border">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1">
            {p.fullName || (
              <span className="text-muted-foreground italic font-normal text-xl">
                Your name
              </span>
            )}
          </h1>
          {cv?.targetJobTitle && (
            <p className="text-base text-muted-foreground mb-3">
              {cv.targetJobTitle}
            </p>
          )}
          {hasContact && (
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              {p.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {p.email}
                </span>
              )}
              {p.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {p.phone}
                </span>
              )}
              {p.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {p.location}
                </span>
              )}
              {p.linkedin && (
                <span className="flex items-center gap-1">
                  <Link2 className="w-3 h-3" /> {p.linkedin}
                </span>
              )}
              {p.portfolio && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {p.portfolio}
                </span>
              )}
            </div>
          )}
        </header>

        {/* Summary */}
        {cv?.summary && (
          <Section title="Summary">
            <p className="text-sm leading-relaxed text-foreground/80">
              {cv.summary}
            </p>
          </Section>
        )}

        {/* Skills */}
        {cv?.skills?.length > 0 && (
          <Section title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {cv.skills.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded"
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>
        )}

        {cv?.experience?.length > 0 && (
          <Section title="Experience">
            <p className="text-xs text-muted-foreground italic">
              Experience will render here once you add it.
            </p>
          </Section>
        )}

        {/* Empty state */}
        {!p.fullName && !cv?.summary && !cv?.skills?.length && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm italic">
              Start filling in the form — your CV will appear here.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-5">
      <h2 className="text-xs uppercase tracking-wider font-semibold text-foreground mb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}
