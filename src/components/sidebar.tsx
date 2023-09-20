import { useProducts } from '@/hooks/useProducts';
import { calculateCategories } from '@/lib/calculate-categories';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

export function Sidebar() {
  const { products } = useProducts();
  const categories = calculateCategories(products ?? []);
  return (
    <aside className="border-r w-56 h-screen fixed px-4 py-6 space-y-6">
      <Link href="/">
        <h1 className="text-4xl font-extrabold">Bazar</h1>
      </Link>

      <ul>
        <li>
          <Link
            href={`/items?${new URLSearchParams({
              category: '',
            })}`}
            className={cn(
              buttonVariants({
                variant: 'link',
                className: 'px-0 capitalize w-full !justify-start',
              })
            )}
          >
            Todos ({categories.reduce((acc, c) => (acc += c.count), 0)})
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.name}>
            <Link
              href={`/items?${new URLSearchParams({
                category: c.name,
              })}`}
              className={cn(
                buttonVariants({
                  variant: 'link',
                  className: 'px-0 capitalize w-full !justify-start',
                })
              )}
            >
              {c.name.split('-').join(' ')} ({c.count})
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
