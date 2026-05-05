export default function CVCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 animate-pulse">
      <div className="h-5 bg-secondary rounded w-3/4 mb-2" />
      <div className="h-4 bg-secondary/70 rounded w-1/2 mb-4" />
      <div className="flex gap-1 mb-3">
        <div className="h-1 flex-1 bg-secondary rounded-full" />
        <div className="h-1 flex-1 bg-secondary rounded-full" />
        <div className="h-1 flex-1 bg-secondary rounded-full" />
        <div className="h-1 flex-1 bg-secondary rounded-full" />
      </div>
      <div className="flex justify-between">
        <div className="h-3 bg-secondary/70 rounded w-16" />
        <div className="h-3 bg-secondary/70 rounded w-20" />
      </div>
    </div>
  );
}
