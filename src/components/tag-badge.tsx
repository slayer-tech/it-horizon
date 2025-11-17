import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  className?: string;
}

export function TagBadge({ tag, className }: TagBadgeProps) {
  // In a real app, this would link to a search page: /search?tag=...
  const href = `/?topic=all&sort=newest&tag=${encodeURIComponent(tag)}`;

  return (
    <Badge
      variant="outline"
      className={cn("transition-colors hover:bg-accent hover:text-accent-foreground", className)}
    >
      <Link href={href}>#{tag}</Link>
    </Badge>
  );
}
