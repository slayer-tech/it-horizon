
import { getPosts, type PostTopic } from "@/lib/data.tsx";
import { Card, CardContent } from "@/components/ui/card";
import { PostCard } from "@/components/post-card";
import { PaginationControls } from "@/components/pagination-controls";

export async function PostsList({ page, topic, sort }: { page: number; topic: PostTopic | 'all'; sort: 'newest' | 'popular' }) {
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

export function PostsSkeleton() {
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
