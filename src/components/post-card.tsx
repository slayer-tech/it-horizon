import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, MessageSquare } from "lucide-react";
import type { Post } from "@/lib/data.tsx";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {

  const topicDisplayNames: { [key in Post['topic']]: string } = {
    news: 'Новость',
    programming: 'Программирование',
    design: 'Дизайн',
    career: 'Карьера',
  };

  return (
    <Card className={cn("flex flex-col overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-xl", className)}>
      <Link href={`/posts/${post.id}`} className="block">
        <div className="relative h-48 w-full">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={post.imageHint}
            />
          ) : <div className="bg-muted h-full w-full"></div>}
           <Badge variant="secondary" className="absolute top-3 right-3">{topicDisplayNames[post.topic]}</Badge>
        </div>
      </Link>
      <CardHeader>
        <CardTitle className="text-xl font-bold leading-tight">
          <Link href={`/posts/${post.id}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
         <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint={post.author.imageHint} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString("ru-RU", {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between text-muted-foreground text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" />
            <span>{post.commentsCount}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Eye className="h-4 w-4" />
          <span>{(post.views / 1000).toFixed(1)}k</span>
        </div>
      </CardFooter>
    </Card>
  );
}
