import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { posts, questions, users } from '@/lib/data.tsx';
import { PostCard } from '@/components/post-card';
import { QuestionCard } from '@/components/question-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
  const user = users[0]; // Assuming current user is the first user
  const userPosts = posts.filter((p) => p.author.id === user.id);
  const userQuestions = questions.filter((q) => q.author.id === user.id);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Card className="overflow-hidden">
        <div className="h-32 w-full bg-muted" />
        <CardContent className="p-6">
          <div className="relative -mt-16 flex items-end gap-4">
            <Avatar className="h-24 w-24 border-4 border-card">
              <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.imageHint} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">alex@example.com</p>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">
            Frontend-разработчик, люблю React и красивые интерфейсы.
          </p>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Статьи ({userPosts.length})</TabsTrigger>
          <TabsTrigger value="questions">
            Вопросы ({userQuestions.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {userPosts.length > 0 ? (
              userPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <p className="text-muted-foreground col-span-2 text-center">
                У пользователя еще нет статей.
              </p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="questions" className="mt-6">
          <div className="space-y-4">
            {userQuestions.length > 0 ? (
              userQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))
            ) : (
              <p className="text-muted-foreground text-center">
                У пользователя еще нет вопросов.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
