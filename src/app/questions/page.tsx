
'use client';

import Link from "next/link";
import { Suspense } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { QuestionsList, QuestionsSkeleton } from "@/components/questions-list";

function Questions() {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page') ?? '1');
    const sort = (searchParams.get('sort') ?? 'newest') as 'newest' | 'popular';

    return (
        <Suspense fallback={<QuestionsSkeleton />}>
            <QuestionsList page={page} sort={sort} />
        </Suspense>
    );
}

export default function QuestionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

      <Questions />
    </div>
  );
}
