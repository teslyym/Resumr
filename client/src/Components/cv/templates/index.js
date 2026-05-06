import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import CompactTemplate from "./CompactTemplate";
import BoldTemplate from "./BoldTemplate";

export const TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean, minimal, professional. Great default.",
    Component: ModernTemplate,
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional serif typography. Conservative roles.",
    Component: ClassicTemplate,
  },
  {
    id: "compact",
    name: "Compact",
    description: "Two-column layout. Fits more on one page.",
    Component: CompactTemplate,
  },
  {
    id: "bold",
    name: "Bold",
    description: "Strong banner header. Modern, distinctive.",
    Component: BoldTemplate,
  },
];

export const getTemplate = (id) =>
  TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
