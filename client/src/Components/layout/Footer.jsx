import { Link } from "react-router-dom";
import Logo from "@/components/shared/Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground max-w-sm">
              AI-powered resume builder that helps you craft CVs tailored to any
              job in seconds.
            </p>
          </div>

          {/* Product links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-medium">Product</h4>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Templates
            </Link>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Examples
            </Link>
          </div>

          {/* Company links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-medium">Company</h4>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} Resumr. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Built with care.</p>
        </div>
      </div>
    </footer>
  );
}
