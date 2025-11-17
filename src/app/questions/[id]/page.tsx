import { notFound } from 'next/navigation';
import { getQuestionById, getAnswersByQuestionId } from '@/lib/data.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TagBadge } from '@/components/tag-badge';
import { AnswerCard } from '@/components/answer-card';
import { Separator } from '@/components/ui/separator';
import { AnswerForm } from '@/components/answer-form';

export async function generateStaticParams() {
  const questions = [{ id: 'q-1' }, { id: 'q-2' }];
  return questions.map((q) => ({
    id: q.id,
  }));
}

export default async function QuestionPage({ params }: { params: { id: string } }) {
  const question = await getQuestionById(params.id);

  if (!question) {
    notFound();
  }

  const answers = await getAnswersByQuestionId(params.id);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground md:text-4xl mb-4">
          {question.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span>
            Задан: {new Date(question.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span>Просмотров: {question.views}</span>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={question.author.avatarUrl} alt={question.author.name} data-ai-hint={question.author.imageHint} />
              <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{question.author.name}</span>
          </div>
        </div>
      </header>
      
      <Separator />

      <div className="py-6">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {question.content}
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {question.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>
      
      <Separator />
      
      <section id="answers" className="mt-8">
        <h2 className="text-2xl font-bold mb-6">
          {answers.length} {answers.length === 1 ? 'Ответ' : (answers.length > 1 && answers.length < 5) ? 'Ответа' : 'Ответов'}
        </h2>
        <div className="space-y-8">
          {answers.map((answer) => (
            <AnswerCard key={answer.id} answer={answer} />
          ))}
        </div>
      </section>

      <AnswerForm />

    </div>
  );
}
