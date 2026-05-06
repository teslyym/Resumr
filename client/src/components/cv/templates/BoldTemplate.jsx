export default function BoldTemplate({ cv }) {
  const p = cv?.personalInfo || {};
  const contactPieces = [p.email, p.phone, p.location, p.linkedin, p.portfolio]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif",
        fontSize: "10.5pt",
        lineHeight: 1.5,
        color: "#0F172A",
        backgroundColor: "#FFFFFF",
        boxSizing: "border-box",
      }}
    >
      {/* Banner header */}
      <header
        style={{
          backgroundColor: "#059669",
          color: "#FFFFFF",
          padding: "18mm 18mm 14mm",
        }}
      >
        <h1
          style={{
            fontSize: "28pt",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            margin: 0,
            marginBottom: "4pt",
          }}
        >
          {p.fullName || "Your Name"}
        </h1>
        {cv?.targetJobTitle && (
          <p
            style={{
              fontSize: "13pt",
              fontWeight: 400,
              opacity: 0.92,
              margin: 0,
              marginBottom: "10pt",
            }}
          >
            {cv.targetJobTitle}
          </p>
        )}
        {contactPieces && (
          <p style={{ fontSize: "9.5pt", opacity: 0.85, margin: 0 }}>
            {contactPieces}
          </p>
        )}
      </header>

      <div style={{ padding: "14mm 18mm" }}>
        {cv?.summary && (
          <BoldSection title="About">
            <p style={{ margin: 0 }}>{cv.summary}</p>
          </BoldSection>
        )}

        {cv?.skills?.length > 0 && (
          <BoldSection title="Skills">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4pt" }}>
              {cv.skills.map((s, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "9.5pt",
                    padding: "2pt 8pt",
                    backgroundColor: "#ECFDF5",
                    color: "#065F46",
                    borderRadius: "12pt",
                    fontWeight: 500,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </BoldSection>
        )}

        {cv?.experience?.length > 0 && (
          <BoldSection title="Experience">
            {cv.experience.map((entry, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  paddingLeft: "12pt",
                  marginBottom: idx === cv.experience.length - 1 ? 0 : "12pt",
                  borderLeft: "2px solid #ECFDF5",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "-4pt",
                    top: "4pt",
                    width: "6pt",
                    height: "6pt",
                    borderRadius: "50%",
                    backgroundColor: "#059669",
                  }}
                />
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
                      fontWeight: 700,
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
                      color: "#059669",
                      fontWeight: 500,
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
          </BoldSection>
        )}

        {cv?.education?.length > 0 && (
          <BoldSection title="Education">
            {cv.education.map((entry, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "8pt",
                  marginBottom: idx === cv.education.length - 1 ? 0 : "6pt",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "11pt",
                      fontWeight: 700,
                      color: "#0F172A",
                      margin: 0,
                    }}
                  >
                    {entry.degree}
                  </h3>
                  {entry.school && (
                    <p
                      style={{ fontSize: "10pt", color: "#475569", margin: 0 }}
                    >
                      {entry.school}
                    </p>
                  )}
                </div>
                {entry.year && (
                  <span style={{ fontSize: "9pt", color: "#64748B" }}>
                    {entry.year}
                  </span>
                )}
              </div>
            ))}
          </BoldSection>
        )}

        {cv?.projects?.length > 0 && (
          <BoldSection title="Projects">
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
                    fontWeight: 700,
                    color: "#0F172A",
                    margin: 0,
                    marginBottom: "1pt",
                  }}
                >
                  {entry.title}
                </h3>
                {entry.description && (
                  <p style={{ margin: 0, marginBottom: "2pt" }}>
                    {entry.description}
                  </p>
                )}
                {entry.technologies?.length > 0 && (
                  <p style={{ fontSize: "9pt", color: "#059669", margin: 0 }}>
                    {entry.technologies.join(" · ")}
                  </p>
                )}
              </div>
            ))}
          </BoldSection>
        )}

        {cv?.certifications?.length > 0 && (
          <BoldSection title="Certifications">
            {cv.certifications.map((entry, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "8pt",
                  marginBottom:
                    idx === cv.certifications.length - 1 ? 0 : "4pt",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "10.5pt",
                      fontWeight: 700,
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
                  <span style={{ fontSize: "9pt", color: "#64748B" }}>
                    {entry.date}
                  </span>
                )}
              </div>
            ))}
          </BoldSection>
        )}
      </div>
    </div>
  );
}

function BoldSection({ title, children }) {
  return (
    <section style={{ marginBottom: "14pt" }}>
      <h2
        style={{
          fontSize: "10pt",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#059669",
          margin: 0,
          marginBottom: "8pt",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
