import { Product } from '@/types/product';
import ProductItem from '@/components/ProductItem';
import React from 'react';

export default function ProductList({
  title,
  products,
  isOpened = true,
  isNew = false,
}: {
  title: string;
  products: Product[];
  isOpened?: boolean;
  isNew?: boolean;
}) {
  const [isProductsVisible, setIsProductsVisible] = React.useState(isOpened);

  return (
    <>
      {products.length > 0 && (
        <div className="flex flex-row w-full justify-between items-center cursor-pointer">
          <h2 className="text-xl my-6 relative">
            {title}{' '}
            {isNew && (
              <span className="text-yellow-400 text-xs absolute -right-6 -top-1">
                NEW
              </span>
            )}
          </h2>
          <span onClick={() => setIsProductsVisible(!isProductsVisible)}>
            {isProductsVisible ? '-' : '+'}
          </span>
        </div>
      )}
      {isProductsVisible &&
        products.map((burger) => (
          <ProductItem product={burger} key={burger.id} />
        ))}
    </>
  );
}
