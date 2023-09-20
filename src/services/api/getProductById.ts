import { Product } from '@/types';
import data from 'products.json';

export async function getProductById({ id }: { id: number }): Promise<Product> {
  try {
    const products = data.products;

    const product = products.find((p) => p.id === id);

    if (!product) throw new Error(`Error obteniendo producto ${id}`);

    return product;
  } catch (error) {
    console.error(error);
    throw new Error(`Error obteniendo producto ${id}`);
  }
}
