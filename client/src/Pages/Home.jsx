import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Layout as LayoutIcon,
  FileCheck,
  Star,
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
  hidden: { opacity: 0, y: 20 },
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
        <section className="relative overflow-hidden">
          <div className="mesh-bg" aria-hidden="true" />
          <div
            className="absolute inset-0 grid-bg opacity-60"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-light text-[hsl(var(--emerald))] text-xs sm:text-sm font-medium mb-6 border border-[hsl(var(--emerald)/0.2)]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Powered by Claude AI
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight mb-5 leading-[1.05]"
              >
                Build a CV that{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[hsl(var(--emerald))]">
                    stands out
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                    className="absolute bottom-1 left-0 right-0 h-3 bg-emerald-light origin-left -z-0"
                    style={{ transformOrigin: "left" }}
                  />
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
              >
                Create polished, AI-enhanced resumes tailored to any job in
                seconds. Free to start, no credit card required.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  asChild
                  className="gap-2 h-12 px-6 text-base shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <Link to="/register">
                    Get Started
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="h-12 px-6 text-base"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-xs sm:text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-[hsl(var(--emerald))]" />
                  ATS optimised
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-[hsl(var(--emerald))] text-[hsl(var(--emerald))]" />
                  Free templates
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[hsl(var(--emerald))]" />
                  AI-enhanced
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12 sm:mb-16"
            >
              <p className="text-sm font-medium text-[hsl(var(--emerald))] mb-3 uppercase tracking-wider">
                Features
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                Everything you need to land the job
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                From AI-powered writing to ATS optimization, we've built every
                tool you'd actually use.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={i}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group p-6 rounded-xl bg-background border border-border/60 hover:border-[hsl(var(--emerald)/0.4)] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5 text-[hsl(var(--emerald))]" />
                  </div>
                  <h3 className="font-medium mb-2 text-base">
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

        <section className="border-t border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-8 sm:p-12 lg:p-16 text-center"
            >
              <div
                className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--emerald)/0.3)] blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"
                aria-hidden="true"
              />

              <div className="relative">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                  Ready to land your next role?
                </h2>
                <p className="text-base sm:text-lg text-primary-foreground/70 mb-8 max-w-xl mx-auto">
                  Build your first AI-enhanced CV in under 5 minutes. It's free.
                </p>
                <Button
                  size="lg"
                  asChild
                  className="bg-[hsl(var(--emerald))] text-white hover:bg-[hsl(var(--emerald)/0.9)] h-12 px-8 text-base shadow-lg shadow-[hsl(var(--emerald)/0.3)] hover:-translate-y-0.5 transition-all"
                >
                  <Link to="/register" className="gap-2">
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
