
import { getQuestions } from "@/lib/data.tsx";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionCard } from "@/components/question-card";
import { PaginationControls } from "@/components/pagination-controls";

export async function QuestionsList({ page, sort }: { page: number; sort: 'newest' | 'popular' }) {
  const { questions, totalPages } = await getQuestions({ page, limit: 10, sort });

  if (questions.length === 0) {
    return (
      <Card className="flex items-center justify-center h-96">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Вопросы не найдены.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
      <PaginationControls
        className="pt-8"
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
}

export function QuestionsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="p-6">
          <div className="animate-pulse flex gap-6">
            <div className="flex flex-col items-center gap-2 text-sm text-center w-20">
              <div className="h-5 bg-muted rounded w-10"></div>
              <div className="h-5 bg-muted rounded w-16"></div>
              <div className="h-5 bg-muted rounded w-12"></div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-muted rounded-full"></div>
                  <div className="h-6 w-20 bg-muted rounded-full"></div>
                </div>
                <div className="h-8 w-24 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
