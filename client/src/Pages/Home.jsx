import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Layout as LayoutIcon,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";

const features = [
  {
    icon: Sparkles,
    title: "AI-powered writing",
    description:
      "Rewrite your summary and bullet points with Claude AI for maximum impact.",
  },
  {
    icon: Target,
    title: "Tailored to any job",
    description:
      "Paste a job description and get a CV optimized for that exact role.",
  },
  {
    icon: LayoutIcon,
    title: "Beautiful templates",
    description:
      "Choose from clean, professional templates that recruiters actually like.",
  },
  {
    icon: Zap,
    title: "ATS-friendly",
    description:
      "Built to pass applicant tracking systems with the right keywords.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Home() {
  return (
    <Layout>
      <PageTransition>
        {/* HERO */}
        <section className="relative">
          {/* Dotted grid background, faded at edges */}
          <div
            className="absolute inset-0 dot-grid-strong mask-fade-radial"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
            <div className="max-w-4xl">
              {/* Eyebrow */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6"
              >
                Resumr — AI-powered resume builder
              </motion.p>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
              >
                Build a CV
                <br />
                that lands{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">interviews.</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: 0.7,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-[hsl(var(--emerald))] origin-left"
                    style={{ transformOrigin: "left" }}
                  />
                </span>
              </motion.h1>

              {/* Sub */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
              >
                Polished, AI-enhanced resumes tailored to any job in seconds.
                Free to start, no credit card required.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button
                  size="lg"
                  asChild
                  className="h-12 px-7 text-base font-medium gap-2 rounded-md"
                >
                  <Link to="/register">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="h-12 px-7 text-base font-medium rounded-md"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
              </motion.div>

              {/* Quiet trust line */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-12 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4" />
                  ATS optimised
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI-enhanced
                </div>
                <div className="flex items-center gap-2">
                  <LayoutIcon className="w-4 h-4" />
                  Beautiful templates
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-2xl mb-12 sm:mb-16"
            >
              <p className="text-sm font-medium text-muted-foreground mb-3">
                Features
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
                Built for the way people actually job hunt.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Every feature exists because someone applying to jobs would
                actually use it. No fluff.
              </p>
            </motion.div>

            <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4 bg-border rounded-xl overflow-hidden border border-border">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={i}
                  className="group p-6 sm:p-8 bg-background hover:bg-secondary/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded-md bg-foreground text-background flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--emerald))] transition-colors">
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold mb-2 text-base">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/60 relative">
          <div
            className="absolute inset-0 dot-grid mask-fade-radial"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-tight"
            >
              Your next role starts here.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto"
            >
              Build your first AI-enhanced CV in under 5 minutes. It's free.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" asChild className="h-12 px-7 text-base gap-2">
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
