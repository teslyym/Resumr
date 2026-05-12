import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";

export default function Privacy() {
  return (
    <Layout>
      <PageTransition>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-sm text-muted-foreground mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: May 12, 2026
          </p>

          <div className="space-y-8 text-foreground/85 leading-relaxed text-[15px]">
            <p>
              Resumr ("we", "our", "us") respects your privacy. This policy
              explains what data we collect, how we use it, and the choices you
              have.
            </p>

            <Section title="What we collect">
              <p>
                <strong className="text-foreground">
                  Account information.
                </strong>{" "}
                When you create an account, we collect your name, email address,
                and a hashed version of your password. We never store passwords
                in plain text.
              </p>
              <p>
                <strong className="text-foreground">CV content.</strong> The
                information you enter into your CV — contact details, work
                history, education, projects, and so on — is stored in our
                database so you can return to it later.
              </p>
              <p>
                <strong className="text-foreground">Usage data.</strong> We
                track basic usage metrics, including how many AI enhancements
                you generate per month, to enforce free-tier limits. We do not
                track your behaviour across the web.
              </p>
              <p>
                We do <em>not</em> collect payment card details (handled by our
                payment processor), tracking cookies for advertising, your IP
                address for marketing, or data from third-party services.
              </p>
            </Section>

            <Section title="How we use your data">
              <p>
                To provide and maintain the service. To authenticate you and
                keep your CVs accessible. To enforce usage limits on AI
                features. To improve the product based on aggregate, anonymised
                usage patterns.
              </p>
              <p>
                We do not sell your data. We do not share your CV content with
                third parties. We do not use your CV content to train AI models.
              </p>
            </Section>

            <Section title="AI processing">
              <p>
                When you use the "Enhance with AI" feature, the relevant CV text
                is sent to Anthropic (the provider of Claude AI) for processing.
                Anthropic processes this data on our behalf and does not store
                it for model training. Their privacy practices are available at{" "}
                <ExternalLink href="https://www.anthropic.com/legal/privacy">
                  anthropic.com/legal/privacy
                </ExternalLink>
                .
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                We use one cookie: an authentication cookie that keeps you
                logged in. It is encrypted, HTTP-only (cannot be accessed by
                JavaScript), and expires after 24 hours. We do not use tracking,
                advertising, or analytics cookies.
              </p>
            </Section>

            <Section title="Your rights">
              <p>
                You can export your CVs as PDF at any time. You can delete your
                account, which removes all your CVs and personal data from our
                database. You can request a copy of your data by emailing the
                address below.
              </p>
            </Section>

            <Section title="Data retention">
              <p>
                We keep your account and CV data as long as your account is
                active. Deleted accounts are permanently removed within 30 days.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions about this policy? Email{" "}
                <MailLink>layiteslim@gmail.com</MailLink>.
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

function ExternalLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="underline hover:text-foreground"
    >
      {children}
    </a>
  );
}

function MailLink({ children }) {
  return (
    <a href={`mailto:${children}`} className="underline hover:text-foreground">
      {children}
    </a>
  );
}
