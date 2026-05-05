import { useState } from "react";
import { Download, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { generatePDF, buildCVFilename } from "@/lib/generatePDF";

export default function DownloadButton({ cv, targetRef, size = "default" }) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    if (!targetRef.current) {
      setError("CV not ready yet. Please try again in a moment.");
      return;
    }
    setDownloading(true);
    setError(null);
    try {
      await generatePDF(targetRef.current, buildCVFilename(cv));
    } catch (err) {
      console.error("PDF generation failed:", err);
      setError("Could not generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={handleDownload}
        disabled={downloading}
        size={size}
        className="gap-2"
      >
        {downloading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating PDF…
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download PDF
          </>
        )}
      </Button>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full left-0 right-0 mt-2 flex items-start gap-2 p-2.5 bg-destructive/10 border border-destructive/20 rounded-md text-xs text-destructive z-10"
          >
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
