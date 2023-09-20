import { Product } from '@/types';
import axios from 'axios';

export async function fetchProducts({
  search,
}: {
  search?: string;
}): Promise<Product[]> {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/items?${new URLSearchParams({
        q: search ?? '',
      })}`
    );

    return data.data;
  } catch (error) {
    console.error(error);

    throw new Error('Error obteniendo productos');
  }
}
