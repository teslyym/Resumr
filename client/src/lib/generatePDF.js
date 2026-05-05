import html2pdf from "html2pdf.js";

/**
 * Generates a PDF from a DOM element and downloads it.
 * @param {HTMLElement} element — the element to convert
 * @param {string} filename — the download filename
 */
export async function generatePDF(element, filename = "cv.pdf") {
  if (!element) throw new Error("No element provided to generatePDF");

  const opt = {
    margin: 0,
    filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2, // higher resolution
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: { mode: ["css", "legacy"] },
  };

  await html2pdf().set(opt).from(element).save();
}

/**
 * Generates a safe filename from CV data.
 */
export function buildCVFilename(cv) {
  const name = cv?.personalInfo?.fullName?.trim() || "CV";
  const role = cv?.targetJobTitle?.trim() || "";
  const safe = (s) =>
    s
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "_");
  const parts = [safe(name), role && safe(role)].filter(Boolean);
  return `${parts.join("_")}.pdf`;
}
