import { BASE_URL_API } from '@/lib/constants';
import { Product } from '@/types';
import axios from 'axios';

export async function fetchProductById({
  id,
}: {
  id: string;
}): Promise<Product> {
  try {
    const { data } = await axios.get(`${BASE_URL_API}/api/items/${id}`);

    return data.data;
  } catch (error) {
    console.error(error);

    throw new Error('Error obteniendo productos');
  }
}
