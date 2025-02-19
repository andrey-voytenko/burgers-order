import React from 'react';
import { useOrderStore } from '@/store/order';
import { Product } from '@/types/product';

export default function ProductCounter({ product }: { product: Product }) {
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
    <>
      <div className="flex flex-row items-baseline gap-x-2 text-sm">
        <button className="border p-1" onClick={decrease}>
          -
        </button>
        <span>{order.get(product) ?? 0}</span>
        <button className="border p-1" onClick={increase}>
          +
        </button>
      </div>
    </>
  );
}
