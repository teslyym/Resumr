import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "@/components/shared/Logo";

export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <div
        className="absolute inset-0 dot-grid mask-fade-radial pointer-events-none"
        aria-hidden="true"
      />

      <header className="relative z-10 px-6 py-6">
        <Logo />
      </header>

      {/* Centered card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>

            {children}
          </div>

          {footer && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              {footer}
            </p>
          )}
        </motion.div>
      </main>

      {/* Quiet footer link */}
      <footer className="relative z-10 px-6 py-6 text-center">
        <Link
          to="/"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to home
        </Link>
      </footer>
    </div>
  );
}
