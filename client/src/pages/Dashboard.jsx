import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import CVCard from "@/components/cv/CVCard";
import DeleteCVDialog from "@/components/cv/DeleteCVDialog";
import CVCardSkeleton from "@/components/shared/CVCardSkeleton";
import { useAuth } from "@/context/AuthContext";
import { cvService } from "@/services/cvService";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Create CV state
  const [creating, setCreating] = useState(false);

  // Fetch CVs on mount
  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      try {
        const data = await cvService.list();
        if (!cancelled) {
          setCvs(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Failed to load your CVs. Please try again.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const newCV = await cvService.create({
        versionName: "Untitled CV",
      });
      navigate(`/cv/${newCV._id}/edit`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create CV. Please try again.",
      );
      setCreating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await cvService.remove(deleteTarget._id);
      setCvs((prev) => prev.filter((c) => c._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete CV. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Layout>
      <PageTransition>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
          >
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Welcome back,
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {user?.name?.split(" ")[0] || "there"}.
              </h1>
            </div>

            {cvs.length > 0 && (
              <Button
                onClick={handleCreate}
                disabled={creating}
                className="gap-2 self-start sm:self-end"
              >
                <Plus className="w-4 h-4" />
                {creating ? "Creating…" : "New CV"}
              </Button>
            )}
          </motion.div>

          {/* Error banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-start gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Content */}
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <CVCardSkeleton />
              <CVCardSkeleton />
              <CVCardSkeleton />
            </div>
          ) : cvs.length === 0 ? (
            // Empty state
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="border border-dashed border-border rounded-xl p-12 sm:p-16 text-center bg-secondary/20"
            >
              <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center mx-auto mb-5">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Let's build your first CV
              </h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
                Fill in your experience, let AI polish the wording, and download
                a CV that gets interviews.
              </p>
              <Button
                onClick={handleCreate}
                disabled={creating}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                {creating ? "Creating…" : "Create your first CV"}
              </Button>
            </motion.div>
          ) : (
            // Grid of CVs
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {cvs.map((cv) => (
                  <CVCard
                    key={cv._id}
                    cv={cv}
                    onDelete={(target) => setDeleteTarget(target)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <DeleteCVDialog
          cv={deleteTarget}
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          onConfirm={handleDelete}
          loading={deleting}
        />
      </PageTransition>
    </Layout>
  );
}
