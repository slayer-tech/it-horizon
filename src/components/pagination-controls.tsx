"use client"

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

export function PaginationControls({
  currentPage,
  totalPages,
  className,
}: {
  currentPage: number;
  totalPages: number;
  className?: string;
}) {
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  const paginationItems = useMemo(() => {
    const pages = [];
    const delta = 2;
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    const range = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }, [currentPage, totalPages]);


  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={cn('flex items-center justify-center', className)}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
             <PaginationPrevious href={createPageURL(currentPage - 1)} aria-disabled={currentPage <= 1} />
          </PaginationItem>

          {paginationItems.map((page, index) => (
            <PaginationItem key={`${page}-${index}`}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <Link href={createPageURL(page as number)} passHref legacyBehavior>
                  <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                </Link>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href={createPageURL(currentPage + 1)} aria-disabled={currentPage >= totalPages} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </nav>
  );
}
