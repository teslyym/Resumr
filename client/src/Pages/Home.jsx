import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 p-3 bg-primary/10 rounded-2xl"
        >
          <FileText className="w-8 h-8 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-5xl font-semibold tracking-tight mb-4"
        >
          Build a CV that <span className="text-primary">stands out</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-muted-foreground mb-8"
        >
          AI-powered resume builder that tailors your CV to any job in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex gap-3"
        >
          <Button size="lg" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            Sign In
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
