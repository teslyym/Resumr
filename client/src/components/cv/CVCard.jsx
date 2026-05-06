import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MoreHorizontal, Pencil, Trash2, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatRelative } from "@/lib/formatDate";

export default function CVCard({ cv, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-card border border-border rounded-xl p-5 hover:border-foreground/20 transition-colors"
    >
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="p-1.5 rounded-md hover:bg-secondary transition-colors"
              aria-label="More options"
              onClick={(e) => e.preventDefault()}
            >
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem asChild>
              <Link to={`/cv/${cv._id}`} className="cursor-pointer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/cv/${cv._id}/edit`} className="cursor-pointer">
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete?.(cv)}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Link to={`/cv/${cv._id}`} className="block">
        <h3 className="font-semibold text-base mb-1 truncate pr-8">
          {cv.versionName || "Untitled CV"}
        </h3>
        <p className="text-sm text-muted-foreground truncate mb-4">
          {cv.targetJobTitle || "No target role set"}
        </p>

        <div className="flex gap-1 mb-3">
          <div className="h-1 flex-1 bg-foreground rounded-full" />
          <div className="h-1 flex-1 bg-foreground rounded-full" />
          <div className="h-1 flex-1 bg-secondary rounded-full" />
          <div className="h-1 flex-1 bg-secondary rounded-full" />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="capitalize">{cv.template || "modern"}</span>
          <span>Updated {formatRelative(cv.updatedAt)}</span>
        </div>
      </Link>
    </motion.div>
  );
}
