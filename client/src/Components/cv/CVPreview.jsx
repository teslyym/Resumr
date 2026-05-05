import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

export default function CVPreview({ cv }) {
  const p = cv?.personalInfo || {};
  const hasContact =
    p.email || p.phone || p.location || p.linkedin || p.portfolio;

  const isEmpty =
    !p.fullName &&
    !cv?.summary &&
    !cv?.skills?.length &&
    !cv?.experience?.length &&
    !cv?.education?.length &&
    !cv?.projects?.length &&
    !cv?.certifications?.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-border rounded-lg shadow-sm overflow-hidden h-full"
    >
      <div className="p-8 sm:p-10 max-h-[800px] overflow-y-auto">
        {/* Header */}
        <header className="mb-6 pb-5 border-b border-border">
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
            <p className="text-sm leading-relaxed text-foreground/85">
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

        {/* Experience */}
        {cv?.experience?.length > 0 && (
          <Section title="Experience">
            <div className="space-y-4">
              {cv.experience.map((entry, idx) => (
                <div key={idx}>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      {entry.jobTitle || (
                        <span className="text-muted-foreground italic font-normal">
                          Untitled role
                        </span>
                      )}
                    </h3>
                    {(entry.startDate || entry.endDate) && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {entry.startDate}
                        {entry.startDate && entry.endDate && " – "}
                        {entry.endDate}
                      </span>
                    )}
                  </div>
                  {entry.company && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {entry.company}
                    </p>
                  )}
                  {entry.responsibilities?.filter((r) => r.trim()).length >
                    0 && (
                    <ul className="space-y-1 ml-4">
                      {entry.responsibilities
                        .filter((r) => r.trim())
                        .map((r, i) => (
                          <li
                            key={i}
                            className="text-sm text-foreground/85 leading-relaxed list-disc"
                          >
                            {r}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Education */}
        {cv?.education?.length > 0 && (
          <Section title="Education">
            <div className="space-y-3">
              {cv.education.map((entry, idx) => (
                <div key={idx}>
                  <div className="flex items-baseline justify-between gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-foreground">
                      {entry.degree || (
                        <span className="text-muted-foreground italic font-normal">
                          Untitled degree
                        </span>
                      )}
                    </h3>
                    {entry.year && (
                      <span className="text-xs text-muted-foreground">
                        {entry.year}
                      </span>
                    )}
                  </div>
                  {entry.school && (
                    <p className="text-sm text-muted-foreground">
                      {entry.school}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Projects */}
        {cv?.projects?.length > 0 && (
          <Section title="Projects">
            <div className="space-y-3">
              {cv.projects.map((entry, idx) => (
                <div key={idx}>
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">
                    {entry.title || (
                      <span className="text-muted-foreground italic font-normal">
                        Untitled project
                      </span>
                    )}
                  </h3>
                  {entry.description && (
                    <p className="text-sm text-foreground/85 leading-relaxed mb-1">
                      {entry.description}
                    </p>
                  )}
                  {entry.technologies?.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {entry.technologies.join(" · ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Certifications */}
        {cv?.certifications?.length > 0 && (
          <Section title="Certifications">
            <div className="space-y-2">
              {cv.certifications.map((entry, idx) => (
                <div
                  key={idx}
                  className="flex items-baseline justify-between gap-2"
                >
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {entry.name || (
                        <span className="text-muted-foreground italic font-normal">
                          Untitled certification
                        </span>
                      )}
                    </h3>
                    {entry.issuer && (
                      <p className="text-xs text-muted-foreground truncate">
                        {entry.issuer}
                      </p>
                    )}
                  </div>
                  {entry.date && (
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {entry.date}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Empty state */}
        {isEmpty && (
          <div className="text-center py-16 text-muted-foreground">
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
