import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import CVDocument from "@/components/cv/CVDocument";
import DownloadButton from "@/components/cv/DownloadButton";
import { cvService } from "@/services/cvService";

export default function CVDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const docRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      try {
        const data = await cvService.getById(id);
        if (!cancelled) {
          setCv(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || "Failed to load CV");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-3">Couldn't load this CV</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button asChild>
            <Link to="/dashboard">← Back to dashboard</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageTransition>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Top bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          >
            <div className="flex items-start gap-3 min-w-0">
              <Link
                to="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors mt-1"
                aria-label="Back to dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground mb-0.5">
                  CV preview
                </p>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight truncate">
                  {cv?.versionName || "Untitled CV"}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <Button
                variant="outline"
                onClick={() => navigate(`/cv/${id}/edit`)}
                className="gap-2"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
              <DownloadButton cv={cv} targetRef={docRef} />
            </div>
          </motion.div>

          {/* The document — wrapped so it's centered + has a paper drop shadow on the page */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex justify-center"
          >
            <div
              className="shadow-xl rounded-sm overflow-hidden bg-white"
              style={{ width: "fit-content" }}
            >
              <CVDocument cv={cv} ref={docRef} />
            </div>
          </motion.div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            This is exactly what your downloaded PDF will look like.
          </p>
        </div>
      </PageTransition>
    </Layout>
  );
}
