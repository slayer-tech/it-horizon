
'use client';

import {
  Card,
  CardContent,
} from "@/components/ui/card"
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
import { PostCard } from "@/components/post-card";
import { getPosts, type PostTopic } from "@/lib/data.tsx";
import { PaginationControls } from "@/components/pagination-controls";
import Link from "next/link";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const TOPICS: { name: string, value: PostTopic | 'all' }[] = [
  { name: 'Все', value: 'all' },
  { name: 'Новости', value: 'news' },
  { name: 'Программирование', value: 'programming' },
  { name: 'Дизайн', value: 'design' },
  { name: 'Карьера', value: 'career' },
];

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? '1');
  const topic = (searchParams.get('topic') ?? 'all') as PostTopic | 'all';
  const sort = (searchParams.get('sort') ?? 'newest') as 'newest' | 'popular';

  const handleSortChange = (value: string) => {
    router.push(`/?topic=${topic}&sort=${value}`);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
        Статьи
      </h1>
      <Tabs value={topic} className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <TabsList>
            {TOPICS.map((t) => (
              <TabsTrigger value={t.value} key={t.value} asChild>
                <Link href={`/?topic=${t.value}&sort=${sort}`}>{t.name}</Link>
              </TabsTrigger>
            ))}
          </TabsList>

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

        <TabsContent value={topic}>
          <Suspense fallback={<PostsSkeleton />}>
            <PostsList page={page} topic={topic} sort={sort} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

async function PostsList({ page, topic, sort }: { page: number; topic: PostTopic | 'all'; sort: 'newest' | 'popular' }) {
  const { posts, totalPages } = await getPosts({ page, limit: 9, topic, sort });

  if (posts.length === 0) {
    return (
      <Card className="flex items-center justify-center h-96">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Статьи не найдены.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <PaginationControls
        className="mt-12"
        currentPage={page}
        totalPages={totalPages}
      />
    </>
  );
}

function PostsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <Card key={i}>
          <div className="animate-pulse">
            <div className="bg-muted h-48 w-full rounded-t-lg"></div>
            <div className="p-6 space-y-4">
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
              <div className="h-8 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
