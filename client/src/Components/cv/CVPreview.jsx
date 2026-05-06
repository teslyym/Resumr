import { motion } from "framer-motion";
import { getTemplate } from "./templates";

export default function CVPreview({ cv }) {
  const template = getTemplate(cv?.template);
  const Template = template.Component;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-secondary/30 border border-border rounded-lg overflow-hidden"
    >
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 12rem)" }}
      >
        {/* Wrapper that scales the A4 document to fit the column */}
        <div
          style={{
            transform: "scale(0.55)",
            transformOrigin: "top left",
            width: "210mm",
            height: "auto",
          }}
        >
          <Template cv={cv} />
        </div>
      </div>
    </motion.div>
  );
}
