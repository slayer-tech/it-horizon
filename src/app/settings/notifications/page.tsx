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
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const notificationsFormSchema = z.object({
  newAnswers: z.boolean().default(false),
  newComments: z.boolean().default(true),
  mentions: z.boolean().default(true),
  digest: z.boolean().default(false),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

export default function NotificationsSettingsPage() {
  const { toast } = useToast();

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      newAnswers: false,
      newComments: true,
      mentions: true,
      digest: false,
    },
  });

  function onSubmit(data: NotificationsFormValues) {
    toast({
      title: 'Настройки уведомлений обновлены.',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Уведомления</h3>
        <p className="text-sm text-muted-foreground">
          Настройте, как вы хотите получать уведомления.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-md font-medium">Email уведомления</h4>
            <FormField
              control={form.control}
              name="newAnswers"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Новые ответы</FormLabel>
                    <FormDescription>
                      Получать уведомления, когда на ваш вопрос отвечают.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newComments"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Новые комментарии</FormLabel>
                    <FormDescription>
                      Получать уведомления о новых комментариях к вашим статьям.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mentions"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Упоминания</FormLabel>
                    <FormDescription>
                      Получать уведомления, когда вас упоминают.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="digest"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Еженедельный дайджест</FormLabel>
                    <FormDescription>
                      Получать еженедельную подборку лучших материалов.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Сохранить</Button>
        </form>
      </Form>
    </div>
  );
}
