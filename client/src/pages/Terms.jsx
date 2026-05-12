import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";

export default function Terms() {
  return (
    <Layout>
      <PageTransition>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-sm text-muted-foreground mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: May 12, 2026
          </p>

          <div className="space-y-8 text-foreground/85 leading-relaxed text-[15px]">
            <p>By using Resumr, you agree to these terms.</p>

            <Section title="The service">
              <p>
                Resumr is an online CV builder that helps you create, edit, and
                download resumes, with optional AI enhancement powered by
                Anthropic's Claude.
              </p>
            </Section>

            <Section title="Your account">
              <p>
                You must be at least 16 years old to use Resumr. You are
                responsible for keeping your password secure. You agree to
                provide accurate information when registering.
              </p>
            </Section>

            <Section title="Acceptable use">
              <p>You may not use Resumr to:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Create CVs containing false or misleading information about
                  another person.
                </li>
                <li>
                  Attempt to break, abuse, or reverse engineer the service.
                </li>
                <li>
                  Scrape or automate access to the service without permission.
                </li>
                <li>Share your account credentials with others.</li>
              </ul>
            </Section>

            <Section title="Content you create">
              <p>
                You own everything you create on Resumr. We claim no rights over
                your CV content. By using the service, you grant us a limited
                licence to store and display your content to you.
              </p>
            </Section>

            <Section title="AI-generated content">
              <p>
                Resumr uses AI to suggest improvements to your CV. AI
                suggestions are starting points, not professional advice. Always
                review and verify AI-generated content for accuracy before
                submitting your CV to employers. We are not responsible for any
                consequences of using AI-generated content in your applications.
              </p>
            </Section>

            <Section title="Free and Pro plans">
              <p>
                The free plan includes limited AI enhancements per month. The
                Pro plan, when available, offers expanded usage and additional
                features. Plan limits and pricing may change with reasonable
                notice.
              </p>
            </Section>

            <Section title="Warranty and liability">
              <p>
                Resumr is provided "as is" without warranty of any kind. We do
                our best to keep the service available and your data safe, but
                we cannot guarantee uninterrupted access or freedom from errors.
                To the maximum extent permitted by law, we are not liable for
                any indirect or consequential damages arising from your use of
                the service.
              </p>
            </Section>

            <Section title="Termination">
              <p>
                You can delete your account at any time. We reserve the right to
                suspend or terminate accounts that violate these terms.
              </p>
            </Section>

            <Section title="Changes to these terms">
              <p>
                We may update these terms from time to time. Continued use of
                the service after changes are posted constitutes acceptance of
                the updated terms.
              </p>
            </Section>

            <Section title="Governing law">
              <p>
                These terms are governed by the laws of the United Kingdom,
                without regard to conflict-of-laws principles.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Email <MailLink>layiteslim@gmail.com</MailLink> with questions.
              </p>
            </Section>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

function MailLink({ children }) {
  return (
    <a href={`mailto:${children}`} className="underline hover:text-foreground">
      {children}
    </a>
  );
}
