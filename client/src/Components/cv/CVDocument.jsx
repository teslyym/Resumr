import { forwardRef } from "react";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

const CVDocument = forwardRef(function CVDocument({ cv }, ref) {
  const p = cv?.personalInfo || {};
  const hasContact =
    p.email || p.phone || p.location || p.linkedin || p.portfolio;

  return (
    <div
      ref={ref}
      className="bg-white text-[#0F172A]"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm 18mm",
        fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif",
        fontSize: "10.5pt",
        lineHeight: 1.5,
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <header
        style={{
          marginBottom: "16pt",
          paddingBottom: "12pt",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <h1
          style={{
            fontSize: "24pt",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            margin: 0,
            marginBottom: "2pt",
            color: "#0F172A",
          }}
        >
          {p.fullName || "Your Name"}
        </h1>
        {cv?.targetJobTitle && (
          <p
            style={{
              fontSize: "12pt",
              color: "#475569",
              margin: 0,
              marginBottom: "8pt",
            }}
          >
            {cv.targetJobTitle}
          </p>
        )}
        {hasContact && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4pt 12pt",
              fontSize: "9pt",
              color: "#475569",
            }}
          >
            {p.email && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "3pt",
                }}
              >
                <Mail size={10} /> {p.email}
              </span>
            )}
            {p.phone && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "3pt",
                }}
              >
                <Phone size={10} /> {p.phone}
              </span>
            )}
            {p.location && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "3pt",
                }}
              >
                <MapPin size={10} /> {p.location}
              </span>
            )}
            {p.linkedin && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "3pt",
                }}
              >
                <Link2 size={10} /> {p.linkedin}
              </span>
            )}
            {p.portfolio && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "3pt",
                }}
              >
                <Globe size={10} /> {p.portfolio}
              </span>
            )}
          </div>
        )}
      </header>

      {/* Summary */}
      {cv?.summary && (
        <DocSection title="Summary">
          <p style={{ margin: 0, fontSize: "10.5pt", color: "#1E293B" }}>
            {cv.summary}
          </p>
        </DocSection>
      )}

      {/* Skills */}
      {cv?.skills?.length > 0 && (
        <DocSection title="Skills">
          <p style={{ margin: 0, fontSize: "10.5pt", color: "#1E293B" }}>
            {cv.skills.join(" · ")}
          </p>
        </DocSection>
      )}

      {/* Experience */}
      {cv?.experience?.length > 0 && (
        <DocSection title="Experience">
          {cv.experience.map((entry, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: idx === cv.experience.length - 1 ? 0 : "10pt",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "8pt",
                  marginBottom: "1pt",
                }}
              >
                <h3
                  style={{
                    fontSize: "11pt",
                    fontWeight: 600,
                    color: "#0F172A",
                    margin: 0,
                  }}
                >
                  {entry.jobTitle}
                </h3>
                {(entry.startDate || entry.endDate) && (
                  <span
                    style={{
                      fontSize: "9pt",
                      color: "#64748B",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {entry.startDate}
                    {entry.startDate && entry.endDate && " – "}
                    {entry.endDate}
                  </span>
                )}
              </div>
              {entry.company && (
                <p
                  style={{
                    fontSize: "10pt",
                    color: "#475569",
                    margin: 0,
                    marginBottom: "4pt",
                  }}
                >
                  {entry.company}
                </p>
              )}
              {entry.responsibilities?.filter((r) => r.trim()).length > 0 && (
                <ul style={{ margin: 0, paddingLeft: "14pt" }}>
                  {entry.responsibilities
                    .filter((r) => r.trim())
                    .map((r, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: "10pt",
                          color: "#1E293B",
                          marginBottom: "2pt",
                          lineHeight: 1.45,
                        }}
                      >
                        {r}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </DocSection>
      )}

      {/* Education */}
      {cv?.education?.length > 0 && (
        <DocSection title="Education">
          {cv.education.map((entry, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: idx === cv.education.length - 1 ? 0 : "6pt",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "8pt",
                }}
              >
                <h3
                  style={{
                    fontSize: "11pt",
                    fontWeight: 600,
                    color: "#0F172A",
                    margin: 0,
                  }}
                >
                  {entry.degree}
                </h3>
                {entry.year && (
                  <span style={{ fontSize: "9pt", color: "#64748B" }}>
                    {entry.year}
                  </span>
                )}
              </div>
              {entry.school && (
                <p style={{ fontSize: "10pt", color: "#475569", margin: 0 }}>
                  {entry.school}
                </p>
              )}
            </div>
          ))}
        </DocSection>
      )}

      {/* Projects */}
      {cv?.projects?.length > 0 && (
        <DocSection title="Projects">
          {cv.projects.map((entry, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: idx === cv.projects.length - 1 ? 0 : "8pt",
              }}
            >
              <h3
                style={{
                  fontSize: "11pt",
                  fontWeight: 600,
                  color: "#0F172A",
                  margin: 0,
                  marginBottom: "1pt",
                }}
              >
                {entry.title}
              </h3>
              {entry.description && (
                <p
                  style={{
                    fontSize: "10pt",
                    color: "#1E293B",
                    margin: 0,
                    marginBottom: "2pt",
                  }}
                >
                  {entry.description}
                </p>
              )}
              {entry.technologies?.length > 0 && (
                <p style={{ fontSize: "9pt", color: "#64748B", margin: 0 }}>
                  {entry.technologies.join(" · ")}
                </p>
              )}
            </div>
          ))}
        </DocSection>
      )}

      {/* Certifications */}
      {cv?.certifications?.length > 0 && (
        <DocSection title="Certifications">
          {cv.certifications.map((entry, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "8pt",
                marginBottom: idx === cv.certifications.length - 1 ? 0 : "4pt",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <h3
                  style={{
                    fontSize: "10.5pt",
                    fontWeight: 600,
                    color: "#0F172A",
                    margin: 0,
                  }}
                >
                  {entry.name}
                </h3>
                {entry.issuer && (
                  <p style={{ fontSize: "9pt", color: "#64748B", margin: 0 }}>
                    {entry.issuer}
                  </p>
                )}
              </div>
              {entry.date && (
                <span
                  style={{
                    fontSize: "9pt",
                    color: "#64748B",
                    whiteSpace: "nowrap",
                  }}
                >
                  {entry.date}
                </span>
              )}
            </div>
          ))}
        </DocSection>
      )}
    </div>
  );
});

function DocSection({ title, children }) {
  return (
    <section style={{ marginBottom: "14pt" }}>
      <h2
        style={{
          fontSize: "9pt",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#0F172A",
          margin: 0,
          marginBottom: "6pt",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default CVDocument;
