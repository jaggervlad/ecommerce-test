import { Product } from '@/types';
import data from 'products.json';
export async function getProducts({
  search,
}: { search?: string } = {}): Promise<Product[]> {
  try {
    let products = data.products;

    if (search && search !== '') {
      products = products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return products;
  } catch (error) {
    console.error(error);
    throw new Error('Error obteniendo productos');
  }
}
