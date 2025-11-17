
'use client';

import Link from "next/link";
import { Suspense } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getQuestions } from "@/lib/data.tsx";
import { PaginationControls } from "@/components/pagination-controls";
import { QuestionCard } from "@/components/question-card";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function QuestionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? '1');
  const sort = (searchParams.get('sort') ?? 'newest') as 'newest' | 'popular';
  
  const handleSortChange = (value: string) => {
    router.push(`/questions?sort=${value}`);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Вопросы
        </h1>
        <Button>Задать вопрос</Button>
      </div>
      
      <div className="flex justify-end mb-6">
        <Select value={sort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Сначала новые</SelectItem>
            <SelectItem value="popular">Сначала популярные</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Suspense fallback={<QuestionsSkeleton />}>
        <QuestionsList page={page} sort={sort} />
      </Suspense>
    </div>
  );
}

async function QuestionsList({ page, sort }: { page: number; sort: 'newest' | 'popular' }) {
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

function QuestionsSkeleton() {
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
