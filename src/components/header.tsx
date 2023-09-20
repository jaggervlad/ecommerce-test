import { FilterXIcon } from 'lucide-react';
import { SearchForm } from './search-form';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Header() {
  return (
    <header className="h-24 sticky top-0 bg-background z-10 px-6 lg:px-8 flex items-center border-b">
      <div className="flex gap-4 items-center w-full">
        <SearchForm />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/items">
                <FilterXIcon />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Limpiar filtros</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div></div>
    </header>
  );
}
