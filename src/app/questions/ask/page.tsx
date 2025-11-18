
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const askQuestionFormSchema = z.object({
  title: z
    .string()
    .min(10, {
      message: 'Заголовок должен содержать не менее 10 символов.',
    })
    .max(150, {
      message: 'Заголовок не должен превышать 150 символов.',
    }),
  tags: z.string().optional(),
  content: z.string().min(30, {
    message: 'Описание вопроса должно содержать не менее 30 символов.',
  }),
});

type AskQuestionFormValues = z.infer<typeof askQuestionFormSchema>;

export default function AskQuestionPage() {
  const { toast } = useToast();
  const form = useForm<AskQuestionFormValues>({
    resolver: zodResolver(askQuestionFormSchema),
    defaultValues: {
      title: '',
      tags: '',
      content: '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: AskQuestionFormValues) {
    toast({
      title: 'Ваш вопрос опубликован!',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
        Задать вопрос
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Заголовок</FormLabel>
                <FormControl>
                  <Input placeholder="Например: Как отцентрировать div в CSS?" {...field} />
                </FormControl>
                <FormDescription>
                  Сформулируйте вопрос так, чтобы он был понятен другим.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подробное описание вопроса</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Опишите проблему, с которой вы столкнулись, и что уже пробовали сделать."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Теги</FormLabel>
                <FormControl>
                  <Input
                    placeholder="react, typescript, nextjs"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Введите до 5 тегов через запятую, чтобы классифицировать ваш вопрос.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Опубликовать вопрос</Button>
        </form>
      </Form>
    </div>
  );
}
