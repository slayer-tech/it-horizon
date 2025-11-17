import Link from "next/link";
import { Eye, MessageSquare, ThumbsUp } from "lucide-react";
import type { Question } from "@/lib/data.tsx";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { TagBadge } from "./tag-badge";

interface QuestionCardProps {
  question: Question;
  className?: string;
}

export function QuestionCard({ question, className }: QuestionCardProps) {
  return (
    <Card className={cn("transition-shadow hover:shadow-md", className)}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0 flex sm:flex-col items-center justify-end sm:justify-start gap-2 sm:gap-1 text-sm text-center sm:w-24 order-2 sm:order-1">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-bold">{question.votes}</span>
              <span className="text-muted-foreground">голосов</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-primary">
              <span className="font-bold">{question.answersCount}</span>
              <span className="text-muted-foreground">ответов</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-bold">{(question.views / 1000).toFixed(1)}k</span>
              <span className="text-muted-foreground">просмотров</span>
            </div>
          </div>

          <div className="flex-1 order-1 sm:order-2">
            <h3 className="text-lg font-semibold leading-snug mb-2">
              <Link href={`/questions/${question.id}`} className="hover:text-primary transition-colors">
                {question.title}
              </Link>
            </h3>
            
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
              <div className="flex flex-wrap items-center gap-2">
                {question.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={question.author.avatarUrl} alt={question.author.name} data-ai-hint={question.author.imageHint}/>
                  <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{question.author.name}</span>
                <span>
                  задал {new Date(question.createdAt).toLocaleDateString("ru-RU", {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
