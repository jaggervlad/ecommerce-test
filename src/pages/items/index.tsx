import { Layout } from '@/components/layout';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { calculateCategories } from '@/lib/calculate-categories';
import { fetchProducts } from '@/services/web/fetchProducts';
import { Product } from '@/types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Ratings from 'react-star-ratings';

export default function ItemsPage({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const search = (router.query.search as string) ?? '';
  const categoriesResults = calculateCategories(products);

  return (
    <Layout>
      <section id="list-of-products" className="pt-6 pb-14 space-y-6">
        <h2 className="text-2xl font-bold">
          Resultados de búsqueda de &quot;{search}&quot;: {products.length}
        </h2>
        <div className="flex gap-2 flex-wrap">
          {categoriesResults.map((c) => (
            <Badge key={c.name} className="py-2 text-sm">
              {c.name} - {c.count}
            </Badge>
          ))}
        </div>

        <div className="grid xs:gap-x-4 grid-cols-1 sm:gap-x-4 gap-y-5">
          {products.map((p) => (
            <Link href={`/items/${p.id}`} key={p.id}>
              <Card className="grid lg:grid-cols-2">
                <div className="relative w-full h-80 lg:max-h-96 lg:aspect-[16/9]">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    className="rounded-t-lg lg:rounded-t-none lg:rounded-tl-lg lg:rounded-bl-lg h-full w-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                  />
                </div>
                <div className="flex flex-col my-4">
                  <CardHeader>
                    <CardTitle>{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{p.description}</CardContent>
                  <CardFooter className="flex text-lg justify-between mt-auto">
                    <span>$ {p.price.toFixed(2)}</span>
                    <Ratings
                      rating={p.rating}
                      numberOfStars={5}
                      starDimension="15px"
                      starSpacing="3px"
                      starRatedColor="yellow"
                    />
                  </CardFooter>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps = (async (context) => {
  const search = (context.query.search as string) ?? '';

  const products = await fetchProducts({ search });

  return { props: { products: products ?? [] } };
}) satisfies GetServerSideProps<{
  products: Product[];
}>;
