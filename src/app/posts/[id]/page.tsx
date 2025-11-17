import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostById, users } from '@/lib/data.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TagBadge } from '@/components/tag-badge';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export async function generateStaticParams() {
  // In a real app, you'd fetch all post IDs. For this demo, we can pre-render a few.
  const posts = [{ id: 'post-1' }, { id: 'post-2' }, { id: 'post-3' }];
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }
  
  const dummyCommentsContent = [
    'Отличная статья, очень подробно!',
    'Спасибо, как раз разбираюсь с этой темой.',
    'Очень полезная информация, автор молодец!',
    'А есть примеры на Vue.js?',
    'Жду продолжения!'
  ];

  const comments = Array.from({ length: Math.min(post.commentsCount, 5) }).map((_, i) => ({
    id: `c${i + 1}`,
    author: users[i % users.length],
    content: dummyCommentsContent[i % dummyCommentsContent.length],
    createdAt: new Date(new Date(post.createdAt).getTime() + (i + 1) * 300000) // 5 minutes apart
  }));

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <article>
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
             <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5 мин на чтение</span>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mt-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint={post.author.imageHint} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-lg">{post.author.name}</p>
              <p className="text-muted-foreground">Автор</p>
            </div>
          </div>
        </header>

        {post.imageUrl && (
          <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg mb-8">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={post.imageHint}
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.content}
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-sm font-medium">Теги:</span>
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        
        {/* Comments Section */}
        <section id="comments">
          <Card>
            <CardHeader>
              <CardTitle>Комментарии ({post.commentsCount})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} data-ai-hint={comment.author.imageHint} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{comment.author.name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleTimeString('ru-RU')}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
              {/* Comment Form could go here */}
            </CardContent>
          </Card>
        </section>

      </article>
    </div>
  );
}
