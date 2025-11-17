'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FormEvent } from 'react';

export function AnswerForm() {
    const { toast } = useToast();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const content = formData.get('answer');

        if (typeof content === 'string' && content.trim().length > 10) {
            toast({
                title: "Ответ отправлен",
                description: "Спасибо за ваш вклад! Ваш ответ будет виден после модерации.",
            });
            (e.target as HTMLFormElement).reset();
        } else {
            toast({
                variant: "destructive",
                title: "Ошибка",
                description: "Ответ должен содержать не менее 10 символов.",
            });
        }
    };

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle>Ваш ответ</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Textarea name="answer" placeholder="Напишите свой развернутый ответ..." rows={8} />
          <Button type="submit" className="mt-4">
            Отправить ответ
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
