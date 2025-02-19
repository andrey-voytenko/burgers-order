import { Product } from '@/types/product';
import React from 'react';
import { useOrderStore } from '@/store/order';

export default function ProductItem({ product }: { product: Product }) {
  const { addProduct, removeProduct, order } = useOrderStore();

  function increase(e: React.MouseEvent) {
    e.preventDefault();
    const newCount = (order.get(product) ?? 0) + 1;
    addProduct(product, newCount);
  }

  function decrease(e: React.MouseEvent) {
    e.preventDefault();
    const count = order.get(product);

    if (count === undefined) {
      return;
    } else if (count <= 1) {
      removeProduct(product);
      return;
    }

    const newCount = (count ?? 0) - 1;
    addProduct(product, newCount);
  }

  return (
    <li className="pt-2">
      <div className="flex flex-row justify-between items-center gap-8">
        <div className="flex flex-col w-full max-w-96">
          <p className="text-base">
            {product.name}{' '}
            <span className="text-sm text-gray-400">{product.weight}</span>
            <span className="text-sm float-right">
              <span className="text-yellow-400">{product.prices.gold}</span>{' '}
              <span className="line-through">{product.prices.regular}</span>
            </span>
          </p>
          <p className="text-xs text-gray-400 opacity-50">
            {product.description}
          </p>
        </div>
        <div className="flex flex-row items-baseline gap-x-2 text-white text-sm">
          <button className="border p-1" onClick={decrease}>
            -
          </button>
          <span>{order.get(product) ?? 0}</span>
          <button className="border p-1" onClick={increase}>
            +
          </button>
        </div>
      </div>
    </li>
  );
}
