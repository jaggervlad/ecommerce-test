import { Product } from '@/types';
interface CategoryCount {
  name: string;
  count: number;
}

export function calculateCategories(products: Product[]) {
  const categories = products.reduce(
    (accumulator: CategoryCount[], product: Product) => {
      const { category } = product;
      const existingCategory = accumulator.find(
        (item) => item.name === category
      );

      if (existingCategory) {
        existingCategory.count++;
      } else {
        accumulator.push({ name: category, count: 1 });
      }

      return accumulator;
    },
    []
  );

  return categories;
}
