"use client"

import { useState } from 'react';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import type { Answer } from '@/lib/data.tsx';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AnswerCardProps {
  answer: Answer;
}

export function AnswerCard({ answer }: AnswerCardProps) {
  const [vote, setVote] = useState(0); // -1 for downvote, 0 for neutral, 1 for upvote
  const [currentVotes, setCurrentVotes] = useState(answer.votes);

  const handleVote = (newVote: number) => {
    if (newVote === vote) {
      // Unvoting
      setVote(0);
      setCurrentVotes(currentVotes - newVote);
    } else {
      // Changing vote or new vote
      setCurrentVotes(currentVotes - vote + newVote);
      setVote(newVote);
    }
  };

  return (
    <div className="flex items-start gap-4 sm:gap-6">
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8 rounded-full", vote === 1 && "text-primary bg-accent")}
          onClick={() => handleVote(1)}
        >
          <ArrowBigUp className="h-5 w-5" />
        </Button>
        <span className="text-xl font-bold">{currentVotes}</span>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8 rounded-full", vote === -1 && "text-destructive bg-destructive/10")}
          onClick={() => handleVote(-1)}
        >
          <ArrowBigDown className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1">
        <div className="prose prose-base dark:prose-invert max-w-none">
          {answer.content}
        </div>
        <div className="mt-6 flex items-center justify-end">
          <div className="bg-accent/50 rounded-md p-3 text-sm">
             <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={answer.author.avatarUrl} alt={answer.author.name} data-ai-hint={answer.author.imageHint} />
                  <AvatarFallback>{answer.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
                    <span className="font-medium text-primary">{answer.author.name}</span>
                    <span className='text-muted-foreground'>
                        ответил {new Date(answer.createdAt).toLocaleString('ru-RU')}
                    </span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
