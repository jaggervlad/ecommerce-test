import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const searchSchema = z.object({
  search: z.string().min(3, {
    message: 'Username must be at least 2 characters.',
  }),
});

export default function Home() {
  const router = useRouter();

  const form = useForm<z.infer<typeof searchSchema>>({
    // @ts-ignore
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof searchSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { search } = values;

    router.push(
      `/items?${new URLSearchParams({
        search: search,
      })}`
    );

    form.reset();
  }
  return (
    <main className="flex justify-center items-center min-h-screen max-w-md px-6 lg:px-8 mx-auto">
      <section className="w-full flex justify-center flex-col items-center">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold">Bazar Online</h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex max-w-md w-full justify-center flex-col"
          >
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        autoComplete="off"
                        placeholder="Buscador de productos... (samsung, iPhone, etc)"
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
            <Button type="submit" className="self-center">
              Buscar
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
