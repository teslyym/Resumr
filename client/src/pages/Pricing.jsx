import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";

const freeFeatures = [
  "Up to 3 saved CVs",
  "All 4 templates",
  "5 AI enhancements per month",
  "1 AI cover letter per month",
  "PDF download — no watermark",
  "Auto-save and live preview",
];

const proFeatures = [
  "Unlimited CVs",
  "Unlimited AI enhancements",
  "Unlimited cover letters",
  "Job description tailoring",
  "Full ATS keyword analysis",
  "DOCX export",
  "Priority AI processing",
];

const faqs = [
  {
    q: "Do I need to enter a credit card for the free plan?",
    a: "No. The free plan is genuinely free. No card, no trial, no surprises.",
  },
  {
    q: "Can I download my CV on the free plan?",
    a: "Yes. PDF downloads are free and come with no watermark.",
  },
  {
    q: "What happens when I hit the AI enhancement limit?",
    a: "You can still edit and download your CV — just without AI rewriting. Limits reset on the first of each month.",
  },
  {
    q: "When does Pro launch?",
    a: "Soon. We'll email you if you sign up to be notified.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. When Pro launches, you'll be able to cancel from your account settings at any time.",
  },
];

export default function Pricing() {
  return (
    <Layout>
      <PageTransition>
        <section className="relative">
          <div
            className="absolute inset-0 dot-grid mask-fade-radial"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm text-muted-foreground mb-3"
            >
              Pricing
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-5"
            >
              Simple, honest pricing.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Most people use Resumr free, forever. Pro is for active job
              seekers who need more.
            </motion.p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
            <div className="grid gap-5 md:grid-cols-2">
              {/* Free */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="border border-border rounded-xl bg-background p-6 sm:p-8"
              >
                <div className="mb-5">
                  <h2 className="text-lg font-semibold mb-1">Free</h2>
                  <p className="text-sm text-muted-foreground">
                    For anyone applying to a few jobs.
                  </p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold tracking-tight">$0</span>
                  <span className="text-muted-foreground ml-2">forever</span>
                </div>
                <Button asChild className="w-full mb-6 h-11">
                  <Link to="/register">Get started</Link>
                </Button>
                <ul className="space-y-2.5">
                  {freeFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-[hsl(var(--emerald))] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Pro */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative border-2 border-foreground rounded-xl bg-background p-6 sm:p-8"
              >
                <span className="absolute top-0 right-6 -translate-y-1/2 inline-flex items-center gap-1 px-2.5 py-0.5 bg-foreground text-background text-xs font-medium rounded-full">
                  <Sparkles className="w-3 h-3" />
                  Coming soon
                </span>

                <div className="mb-5">
                  <h2 className="text-lg font-semibold mb-1">Pro</h2>
                  <p className="text-sm text-muted-foreground">
                    For active job seekers tailoring every application.
                  </p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold tracking-tight text-muted-foreground">
                    TBD
                  </span>
                  <span className="text-muted-foreground ml-2">/ month</span>
                </div>
                <Button variant="outline" className="w-full mb-6 h-11" disabled>
                  Notify me when it launches
                </Button>
                <ul className="space-y-2.5">
                  {proFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-[hsl(var(--emerald))] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Want to be notified when Pro launches? Email{" "}
              <MailLink>layiteslim@gmail.com</MailLink>.
            </p>
          </div>
        </section>

        <section className="border-t border-border/60">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-8"
            >
              Common questions
            </motion.h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <h3 className="font-semibold mb-1.5">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}

function MailLink({ children }) {
  return (
    <a href={`mailto:${children}`} className="underline hover:text-foreground">
      {children}
    </a>
  );
}
