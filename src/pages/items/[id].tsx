import { Header } from '@/components/header';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { fetchProductById } from '@/services/web/fetchProductById';
import { Product } from '@/types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import StarRatings from 'react-star-ratings';
import * as z from 'zod';

const searchSchema = z.object({
  search: z.string(),
});

export default function ItemsPage({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <Layout>
      <section id="list-of-products" className="pt-6 pb-14 space-y-6">
        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
          <div
            aria-label="Product image carousel"
            className={cn('flex flex-col gap-2 w-full md:w-1/2')}
          >
            <div className="relative aspect-square  w-full">
              <Image
                fill
                key={selectedImage}
                role="group"
                className="h-full w-full"
                aria-roledescription="slide"
                src={selectedImage || ''}
                alt={selectedImage || ''}
                priority
                quality={100}
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square max-h-72 cursor-pointer"
                  onClick={(e) => setSelectedImage(image)}
                >
                  <Image
                    key={image}
                    role="group"
                    aria-roledescription="slide"
                    src={image || ''}
                    alt={image || ''}
                    className="w-full h-full object-cover object-center"
                    fill
                    priority
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full gap-4 md:w-1/2">
            <div className="space-y-8">
              <h2 className="text-2xl text-center mb-6 font-bold line-clamp-1 lg:text-4xl">
                {product.title} - {product.brand}
              </h2>

              <div className="flex justify-around">
                <p className="flex flex-col items-center gap-2">
                  <span className="text-2xl font-extrabold">
                    {product.price}
                  </span>
                  <span>disponibles: {product.stock}</span>
                </p>

                <StarRatings
                  rating={product.rating}
                  numberOfStars={5}
                  starDimension="15px"
                  starSpacing="3px"
                  starRatedColor="yellow"
                />
              </div>

              <p>{product.description}</p>
            </div>

            <Button>Comprar</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps = (async (context) => {
  const id = (context?.params?.id as string) ?? '';

  const product = await fetchProductById({ id });

  return { props: { product } };
}) satisfies GetServerSideProps<{
  product: Product;
}>;
