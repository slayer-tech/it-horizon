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

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Имя пользователя должно содержать не менее 2 символов.',
    })
    .max(30, {
      message: 'Имя пользователя не должно превышать 30 символов.',
    }),
  email: z.string().email({ message: 'Пожалуйста, введите действительный email.' }),
  bio: z.string().max(160, { message: "Биография не должна превышать 160 символов." }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileSettingsPage() {
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: 'Алексей Вольнов',
      email: 'alex@example.com',
      bio: 'Frontend-разработчик, люблю React и красивые интерфейсы.',
    },
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'Профиль обновлен',
      description: 'Ваши изменения были успешно сохранены.',
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Профиль</h3>
        <p className="text-sm text-muted-foreground">
          Это то, как другие пользователи будут видеть вас на сайте.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя пользователя</FormLabel>
                <FormControl>
                  <Input placeholder="Ваше имя" {...field} />
                </FormControl>
                <FormDescription>
                  Это ваше публичное имя.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Ваш email" {...field} />
                </FormControl>
                <FormDescription>
                  Мы не будем делиться вашим email с кем-либо.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Биография</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Расскажите немного о себе"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Сохранить изменения</Button>
        </form>
      </Form>
    </div>
  );
}
