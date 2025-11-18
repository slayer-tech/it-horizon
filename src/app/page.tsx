'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type PostTopic } from "@/lib/data.tsx";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PostsList, PostsSkeleton } from "@/components/posts-list";

const TOPICS: { name: string, value: PostTopic | 'all' }[] = [
  { name: 'Все', value: 'all' },
  { name: 'Новости', value: 'news' },
  { name: 'Программирование', value: 'programming' },
  { name: 'Дизайн', value: 'design' },
  { name: 'Карьера', value: 'career' },
];

function Posts() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const topic = (searchParams.get('topic') ?? 'all') as PostTopic | 'all';
  const sort = (searchParams.get('sort') ?? 'newest') as 'newest' | 'popular';

  return (
    <Suspense fallback={<PostsSkeleton />}>
      <PostsList page={page} topic={topic} sort={sort} />
    </Suspense>
  )
}


export default function HomePage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const topic = (searchParams.get('topic') ?? 'all') as PostTopic | 'all';
  const sort = (searchParams.get('sort') ?? 'newest') as 'newest' | 'popular';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    router.push(`?${params.toString()}`);
  };

  const handleTopicChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('topic', value);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Статьи
        </h1>
        <Select value={sort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Сначала новые</SelectItem>
            <SelectItem value="popular">Сначала популярные</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={topic} onValueChange={handleTopicChange} className="w-full">
        <ScrollArea className="w-full sm:w-auto mb-6">
            <TabsList>
              {TOPICS.map((t) => (
                <TabsTrigger value={t.value} key={t.value}>
                  {t.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {TOPICS.map(t => (
          <TabsContent value={t.value} key={t.value}>
            {children}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
