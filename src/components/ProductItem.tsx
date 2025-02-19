import { Product } from '@/types/product';
import React from 'react';
import ProductCounter from '@/components/ProductCounter';

export default function ProductItem({ product }: { product: Product }) {
  return (
    <li className="pt-2">
      <div className="flex flex-row justify-between items-center gap-8">
        <div className="flex flex-col w-full max-w-96">
          <p className="text-base">
            {product.name}{' '}
            <span className="text-xs text-gray-400">
              {product.count ?? product.weight ?? ''}
            </span>
            <span className="text-sm float-right">
              <span className="text-yellow-400">{product.prices.gold}</span>{' '}
              <span className="line-through">{product.prices.regular}</span>
            </span>
          </p>
          <p className="text-xs text-gray-400 opacity-50">
            {product.description}
          </p>
        </div>
        <ProductCounter product={product} />
      </div>
    </li>
  );
}
