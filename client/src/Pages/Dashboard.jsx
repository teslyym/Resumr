import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <PageTransition>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <p className="text-sm text-muted-foreground mb-1">Welcome back,</p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {user?.name?.split(" ")[0] || "there"}.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="border border-dashed border-border rounded-xl p-12 text-center bg-secondary/30"
          >
            <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Your CVs will appear here</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              You haven't created any CVs yet. Click below to build your first
              one.
            </p>
            <Button asChild>
              <Link to="/create" className="gap-2">
                <Plus className="w-4 h-4" />
                Create your first CV
              </Link>
            </Button>
          </motion.div>
        </div>
      </PageTransition>
    </Layout>
  );
}
