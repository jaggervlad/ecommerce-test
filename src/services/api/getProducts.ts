import { Product } from '@/types';
import data from 'products.json';
export async function getProducts({
  search,
  category,
}: {
  search?: string;
  category?: string;
} = {}): Promise<Product[]> {
  try {
    let products = data.products;

    if (category) {
      products = products.filter((p) =>
        p.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (search && search !== '') {
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase()) ||
          p.brand.toLowerCase().includes(search.toLowerCase())
      );
    }

    return products;
  } catch (error) {
    console.error(error);
    throw new Error('Error obteniendo productos');
  }
}
