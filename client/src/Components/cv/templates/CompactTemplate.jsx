export default function CompactTemplate({ cv }) {
  const p = cv?.personalInfo || {};

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif",
        fontSize: "10pt",
        lineHeight: 1.45,
        color: "#1A202C",
        backgroundColor: "#FFFFFF",
        boxSizing: "border-box",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "70mm",
          padding: "18mm 12mm",
          backgroundColor: "#F8FAFC",
          fontSize: "9.5pt",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: "18pt",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            margin: 0,
            marginBottom: "4pt",
            color: "#0F172A",
          }}
        >
          {p.fullName || "Your Name"}
        </h1>
        {cv?.targetJobTitle && (
          <p
            style={{
              fontSize: "10pt",
              color: "#475569",
              margin: 0,
              marginBottom: "14pt",
            }}
          >
            {cv.targetJobTitle}
          </p>
        )}

        {/* Contact */}
        <SidebarSection title="Contact">
          {p.email && <p style={contactStyle}>{p.email}</p>}
          {p.phone && <p style={contactStyle}>{p.phone}</p>}
          {p.location && <p style={contactStyle}>{p.location}</p>}
          {p.linkedin && (
            <p style={{ ...contactStyle, wordBreak: "break-all" }}>
              {p.linkedin}
            </p>
          )}
          {p.portfolio && (
            <p style={{ ...contactStyle, wordBreak: "break-all" }}>
              {p.portfolio}
            </p>
          )}
        </SidebarSection>

        {cv?.skills?.length > 0 && (
          <SidebarSection title="Skills">
            {cv.skills.map((s, i) => (
              <p key={i} style={contactStyle}>
                {s}
              </p>
            ))}
          </SidebarSection>
        )}

        {cv?.education?.length > 0 && (
          <SidebarSection title="Education">
            {cv.education.map((entry, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: idx === cv.education.length - 1 ? 0 : "8pt",
                }}
              >
                <p style={{ margin: 0, fontWeight: 600, color: "#0F172A" }}>
                  {entry.degree}
                </p>
                {entry.school && (
                  <p style={{ ...contactStyle, marginTop: "1pt" }}>
                    {entry.school}
                  </p>
                )}
                {entry.year && (
                  <p style={{ ...contactStyle, color: "#94A3B8" }}>
                    {entry.year}
                  </p>
                )}
              </div>
            ))}
          </SidebarSection>
        )}

        {cv?.certifications?.length > 0 && (
          <SidebarSection title="Certifications">
            {cv.certifications.map((entry, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom:
                    idx === cv.certifications.length - 1 ? 0 : "6pt",
                }}
              >
                <p style={{ margin: 0, fontWeight: 600, color: "#0F172A" }}>
                  {entry.name}
                </p>
                {entry.issuer && <p style={contactStyle}>{entry.issuer}</p>}
                {entry.date && (
                  <p style={{ ...contactStyle, color: "#94A3B8" }}>
                    {entry.date}
                  </p>
                )}
              </div>
            ))}
          </SidebarSection>
        )}
      </aside>

      {/* Main */}
      <main
        style={{
          flex: 1,
          padding: "18mm 16mm",
          boxSizing: "border-box",
        }}
      >
        {cv?.summary && (
          <MainSection title="Summary">
            <p style={{ margin: 0 }}>{cv.summary}</p>
          </MainSection>
        )}

        {cv?.experience?.length > 0 && (
          <MainSection title="Experience">
            {cv.experience.map((entry, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: idx === cv.experience.length - 1 ? 0 : "10pt",
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
                <p
                  style={{
                    fontSize: "9.5pt",
                    color: "#475569",
                    margin: 0,
                    marginBottom: "4pt",
                  }}
                >
                  {entry.company}
                  {(entry.startDate || entry.endDate) && (
                    <span style={{ color: "#94A3B8" }}>
                      {" · "}
                      {entry.startDate}
                      {entry.startDate && entry.endDate && " – "}
                      {entry.endDate}
                    </span>
                  )}
                </p>
                {entry.responsibilities?.filter((r) => r.trim()).length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: "14pt" }}>
                    {entry.responsibilities
                      .filter((r) => r.trim())
                      .map((r, i) => (
                        <li
                          key={i}
                          style={{ marginBottom: "2pt", lineHeight: 1.45 }}
                        >
                          {r}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </MainSection>
        )}

        {cv?.projects?.length > 0 && (
          <MainSection title="Projects">
            {cv.projects.map((entry, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: idx === cv.projects.length - 1 ? 0 : "8pt",
                }}
              >
                <h3
                  style={{
                    fontSize: "10.5pt",
                    fontWeight: 600,
                    color: "#0F172A",
                    margin: 0,
                  }}
                >
                  {entry.title}
                </h3>
                {entry.description && (
                  <p style={{ margin: 0, marginBottom: "1pt" }}>
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
          </MainSection>
        )}
      </main>
    </div>
  );
}

const contactStyle = {
  fontSize: "9.5pt",
  color: "#475569",
  margin: 0,
  marginBottom: "2pt",
};

function SidebarSection({ title, children }) {
  return (
    <section style={{ marginBottom: "14pt" }}>
      <h2
        style={{
          fontSize: "8.5pt",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#94A3B8",
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

function MainSection({ title, children }) {
  return (
    <section style={{ marginBottom: "14pt" }}>
      <h2
        style={{
          fontSize: "11pt",
          fontWeight: 700,
          color: "#0F172A",
          margin: 0,
          marginBottom: "8pt",
          paddingBottom: "3pt",
          borderBottom: "2px solid #0F172A",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
