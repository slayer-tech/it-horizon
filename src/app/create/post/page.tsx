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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const postFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: 'Заголовок должен содержать не менее 5 символов.',
    })
    .max(100, {
      message: 'Заголовок не должен превышать 100 символов.',
    }),
  topic: z.string({
    required_error: 'Пожалуйста, выберите тему.',
  }),
  tags: z.string().optional(),
  content: z.string().min(50, {
    message: 'Содержимое должно содержать не менее 50 символов.',
  }),
});

type PostFormValues = z.infer<typeof postFormSchema>;

export default function CreatePostPage() {
  const { toast } = useToast();
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      tags: '',
      content: '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: PostFormValues) {
    toast({
      title: 'Статья отправлена на модерацию!',
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
        Создать новую статью
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
                  <Input placeholder="Введите заголовок статьи..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тема</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тему для вашей статьи" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="news">Новости</SelectItem>
                    <SelectItem value="programming">Программирование</SelectItem>
                    <SelectItem value="design">Дизайн</SelectItem>
                    <SelectItem value="career">Карьера</SelectItem>
                  </SelectContent>
                </Select>
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
                    placeholder="react, nextjs, tailwindcss"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Введите теги через запятую.
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
                <FormLabel>Содержимое статьи</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Напишите здесь свою статью. Поддерживается Markdown."
                    className="min-h-[300px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Опубликовать</Button>
        </form>
      </Form>
    </div>
  );
}
