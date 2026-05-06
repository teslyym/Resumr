import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

export default function ModernTemplate({ cv }) {
  const p = cv?.personalInfo || {};
  const hasContact =
    p.email || p.phone || p.location || p.linkedin || p.portfolio;

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm 18mm",
        fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif",
        fontSize: "10.5pt",
        lineHeight: 1.5,
        color: "#0F172A",
        backgroundColor: "#FFFFFF",
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
            {p.email && <ContactItem icon={Mail} text={p.email} />}
            {p.phone && <ContactItem icon={Phone} text={p.phone} />}
            {p.location && <ContactItem icon={MapPin} text={p.location} />}
            {p.linkedin && <ContactItem icon={Link2} text={p.linkedin} />}
            {p.portfolio && <ContactItem icon={Globe} text={p.portfolio} />}
          </div>
        )}
      </header>

      {cv?.summary && (
        <Section title="Summary">
          <p style={{ margin: 0, color: "#1E293B" }}>{cv.summary}</p>
        </Section>
      )}

      {cv?.skills?.length > 0 && (
        <Section title="Skills">
          <p style={{ margin: 0, color: "#1E293B" }}>{cv.skills.join(" · ")}</p>
        </Section>
      )}

      {cv?.experience?.length > 0 && (
        <Section title="Experience">
          {cv.experience.map((entry, idx) => (
            <ExperienceEntry
              key={idx}
              entry={entry}
              isLast={idx === cv.experience.length - 1}
            />
          ))}
        </Section>
      )}

      {cv?.education?.length > 0 && (
        <Section title="Education">
          {cv.education.map((entry, idx) => (
            <EducationEntry
              key={idx}
              entry={entry}
              isLast={idx === cv.education.length - 1}
            />
          ))}
        </Section>
      )}

      {cv?.projects?.length > 0 && (
        <Section title="Projects">
          {cv.projects.map((entry, idx) => (
            <ProjectEntry
              key={idx}
              entry={entry}
              isLast={idx === cv.projects.length - 1}
            />
          ))}
        </Section>
      )}

      {cv?.certifications?.length > 0 && (
        <Section title="Certifications">
          {cv.certifications.map((entry, idx) => (
            <CertEntry
              key={idx}
              entry={entry}
              isLast={idx === cv.certifications.length - 1}
            />
          ))}
        </Section>
      )}
    </div>
  );
}

function ContactItem({ icon: Icon, text }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "3pt" }}>
      <Icon size={10} /> {text}
    </span>
  );
}

function Section({ title, children }) {
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

function ExperienceEntry({ entry, isLast }) {
  return (
    <div style={{ marginBottom: isLast ? 0 : "10pt" }}>
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
            style={{ fontSize: "9pt", color: "#64748B", whiteSpace: "nowrap" }}
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
  );
}

function EducationEntry({ entry, isLast }) {
  return (
    <div style={{ marginBottom: isLast ? 0 : "6pt" }}>
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
  );
}

function ProjectEntry({ entry, isLast }) {
  return (
    <div style={{ marginBottom: isLast ? 0 : "8pt" }}>
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
  );
}

function CertEntry({ entry, isLast }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: "8pt",
        marginBottom: isLast ? 0 : "4pt",
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
          style={{ fontSize: "9pt", color: "#64748B", whiteSpace: "nowrap" }}
        >
          {entry.date}
        </span>
      )}
    </div>
  );
}
