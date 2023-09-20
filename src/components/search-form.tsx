import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
const searchSchema = z.object({
  search: z.string(),
});
export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = (searchParams?.get('search') as string) ?? '';
  const defaultCategory = (searchParams?.get('category') as string) ?? '';
  const form = useForm<z.infer<typeof searchSchema>>({
    // @ts-ignore
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof searchSchema>) {
    const { search } = values;

    router.push(
      `/items?${new URLSearchParams({
        search: search,
        category: defaultCategory,
      })}`
    );
  }
  return (
    <Form {...form}>
      <form className="max-w-xs w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    autoComplete="off"
                    placeholder="Buscador de productos"
                    {...field}
                  ></Input>
                  <SearchIcon
                    onClick={form.handleSubmit(onSubmit)}
                    className="absolute right-2 top-2 cursor-pointer"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
