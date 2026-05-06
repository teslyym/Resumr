import { forwardRef } from "react";
import { getTemplate } from "./templates";

const CVDocument = forwardRef(function CVDocument({ cv }, ref) {
  const template = getTemplate(cv?.template);
  const Template = template.Component;

  return (
    <div ref={ref}>
      <Template cv={cv} />
    </div>
  );
});

export default CVDocument;
