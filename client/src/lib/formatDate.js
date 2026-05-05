/**
 * Returns a human-friendly relative time string.
 * Example: "just now", "3 hours ago", "2 days ago", "Mar 15"
 */
export function formatRelative(isoDate) {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;

  // Older than a week — show date
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
