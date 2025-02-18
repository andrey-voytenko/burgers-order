import { Product } from '@/types/product';
import ProductItem from '@/components/ProductItem';
import React from 'react';

export default function ProductList({
  title,
  products,
  onCountChange,
  resetTrigger,
  isOpened = true,
}: {
  title: string;
  products: Product[];
  isOpened?: boolean;
  resetTrigger: boolean;
  onCountChange: (productId: number, count: number) => void;
}) {
  const [isProductsVisible, setIsProductsVisible] = React.useState(isOpened);

  return (
    <>
      {products.length > 0 && (
        <div className="flex flex-row w-full justify-between items-center cursor-pointer">
          <h2 className="text-xl my-6">{title}</h2>
          <span onClick={() => setIsProductsVisible(!isProductsVisible)}>
            {isProductsVisible ? '-' : '+'}
          </span>
        </div>
      )}
      {isProductsVisible &&
        products.map((burger) => (
          <ProductItem
            product={burger}
            key={burger.id}
            resetTrigger={resetTrigger}
            onCountChange={onCountChange}
          />
        ))}
    </>
  );
}
