import { fetchProducts } from '@/services/web/fetchProducts';
import { Product } from '@/types';
import { useEffect, useState } from 'react';

export function useProducts({ search }: { search?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const asyncGetProducts = async () => {
      try {
        const data = await fetchProducts({ search });
        setProducts(data);
      } catch (error) {
        setError('Ocurrio un error');
      } finally {
        setLoading(false);
      }
    };

    asyncGetProducts();
  }, [search]);

  return { products, loading, error };
}
