import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, FileText, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const values = [
  {
    icon: FileText,
    title: "Built around real job hunting",
    body: "Auto-save so you never lose work. Multiple CVs so you can tailor each application. Free downloads so you can actually use what you build.",
  },
  {
    icon: Sparkles,
    title: "AI that helps, not invents",
    body: "Powered by Anthropic's Claude. Resumr rewrites your bullet points to be sharper and more impactful — without inventing anything that isn't true.",
  },
  {
    icon: Zap,
    title: "Fast and focused",
    body: "No bloat, no upsells in your face. One job: help you build a polished, professional CV — and get out of the way.",
  },
];

export default function About() {
  return (
    <Layout>
      <PageTransition>
        <section className="relative">
          <div
            className="absolute inset-0 dot-grid mask-fade-radial"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-sm text-muted-foreground mb-3"
            >
              About Resumr
            </motion.p>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              Building a great CV is harder than it should be.
            </motion.h1>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              <p>
                Most online CV builders are bloated, charge you to download your
                own work, and produce documents that look like they came from
                2008.
              </p>
              <p>We thought we could do better. So we built Resumr.</p>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-border/60">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-10"
            >
              What we care about
            </motion.h2>

            <div className="grid gap-px sm:grid-cols-3 bg-border rounded-xl overflow-hidden border border-border">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={i}
                  className="p-6 sm:p-8 bg-background"
                >
                  <div className="w-9 h-9 rounded-md bg-foreground text-background flex items-center justify-center mb-5">
                    <v.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/60">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-4"
            >
              Who built this
            </motion.h2>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={1}
              className="space-y-4 text-base text-muted-foreground leading-relaxed"
            >
              <p>
                Resumr was built by Teslim Salahudeen, a software engineer who
                got tired of the existing options.
              </p>
              <p>
                Have feedback? Found a bug? Have a feature idea? Email{" "}
                <MailLink>layiteslim@gmail.com</MailLink>. I read everything.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
            >
              Ready to give it a try?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base text-muted-foreground mb-7 max-w-md mx-auto"
            >
              Build your first AI-enhanced CV in under 5 minutes. It's free.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" asChild className="h-12 px-7 text-base">
                <Link to="/register">Get Started</Link>
              </Button>
            </motion.div>
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
