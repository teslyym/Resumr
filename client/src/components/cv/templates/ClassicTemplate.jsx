export default function ClassicTemplate({ cv }) {
  const p = cv?.personalInfo || {};
  const contactPieces = [p.email, p.phone, p.location, p.linkedin, p.portfolio]
    .filter(Boolean)
    .join("  •  ");

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "22mm 22mm",
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: "11pt",
        lineHeight: 1.55,
        color: "#1A1A1A",
        backgroundColor: "#FFFFFF",
        boxSizing: "border-box",
      }}
    >
      {/* Centered header */}
      <header style={{ textAlign: "center", marginBottom: "14pt" }}>
        <h1
          style={{
            fontSize: "22pt",
            fontWeight: 400,
            letterSpacing: "0.05em",
            margin: 0,
            marginBottom: "4pt",
            textTransform: "uppercase",
          }}
        >
          {p.fullName || "Your Name"}
        </h1>
        {cv?.targetJobTitle && (
          <p
            style={{
              fontSize: "11pt",
              fontStyle: "italic",
              color: "#444",
              margin: 0,
              marginBottom: "6pt",
            }}
          >
            {cv.targetJobTitle}
          </p>
        )}
        {contactPieces && (
          <p style={{ fontSize: "9.5pt", color: "#555", margin: 0 }}>
            {contactPieces}
          </p>
        )}
        <hr
          style={{
            border: 0,
            borderTop: "1px solid #1A1A1A",
            marginTop: "10pt",
            marginBottom: 0,
          }}
        />
      </header>

      {cv?.summary && (
        <ClassicSection title="Summary">
          <p style={{ margin: 0, textAlign: "justify" }}>{cv.summary}</p>
        </ClassicSection>
      )}

      {cv?.experience?.length > 0 && (
        <ClassicSection title="Experience">
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
                  marginBottom: "2pt",
                }}
              >
                <div>
                  <span style={{ fontWeight: 700 }}>{entry.jobTitle}</span>
                  {entry.company && (
                    <span style={{ fontStyle: "italic" }}>
                      , {entry.company}
                    </span>
                  )}
                </div>
                {(entry.startDate || entry.endDate) && (
                  <span style={{ fontSize: "10pt", color: "#444" }}>
                    {entry.startDate}
                    {entry.startDate && entry.endDate && " – "}
                    {entry.endDate}
                  </span>
                )}
              </div>
              {entry.responsibilities?.filter((r) => r.trim()).length > 0 && (
                <ul style={{ margin: 0, paddingLeft: "16pt" }}>
                  {entry.responsibilities
                    .filter((r) => r.trim())
                    .map((r, i) => (
                      <li
                        key={i}
                        style={{ marginBottom: "2pt", lineHeight: 1.5 }}
                      >
                        {r}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </ClassicSection>
      )}

      {cv?.education?.length > 0 && (
        <ClassicSection title="Education">
          {cv.education.map((entry, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: idx === cv.education.length - 1 ? 0 : "4pt",
              }}
            >
              <div>
                <span style={{ fontWeight: 700 }}>{entry.degree}</span>
                {entry.school && (
                  <span style={{ fontStyle: "italic" }}>, {entry.school}</span>
                )}
              </div>
              {entry.year && (
                <span style={{ fontSize: "10pt", color: "#444" }}>
                  {entry.year}
                </span>
              )}
            </div>
          ))}
        </ClassicSection>
      )}

      {cv?.skills?.length > 0 && (
        <ClassicSection title="Skills">
          <p style={{ margin: 0 }}>{cv.skills.join(", ")}</p>
        </ClassicSection>
      )}

      {cv?.projects?.length > 0 && (
        <ClassicSection title="Projects">
          {cv.projects.map((entry, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: idx === cv.projects.length - 1 ? 0 : "6pt",
              }}
            >
              <p style={{ margin: 0, marginBottom: "1pt" }}>
                <span style={{ fontWeight: 700 }}>{entry.title}</span>
                {entry.technologies?.length > 0 && (
                  <span style={{ fontStyle: "italic", color: "#444" }}>
                    {" "}
                    — {entry.technologies.join(", ")}
                  </span>
                )}
              </p>
              {entry.description && (
                <p style={{ margin: 0, lineHeight: 1.5 }}>
                  {entry.description}
                </p>
              )}
            </div>
          ))}
        </ClassicSection>
      )}

      {cv?.certifications?.length > 0 && (
        <ClassicSection title="Certifications">
          {cv.certifications.map((entry, idx) => (
            <p
              key={idx}
              style={{
                margin: 0,
                marginBottom: idx === cv.certifications.length - 1 ? 0 : "3pt",
              }}
            >
              <span style={{ fontWeight: 700 }}>{entry.name}</span>
              {entry.issuer && <span>, {entry.issuer}</span>}
              {entry.date && (
                <span style={{ color: "#444" }}> ({entry.date})</span>
              )}
            </p>
          ))}
        </ClassicSection>
      )}
    </div>
  );
}

function ClassicSection({ title, children }) {
  return (
    <section style={{ marginBottom: "14pt" }}>
      <h2
        style={{
          fontSize: "11pt",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          margin: 0,
          marginBottom: "6pt",
          paddingBottom: "2pt",
          borderBottom: "1px solid #888",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
