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

  function manualCountChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let count = e.target.value.replace(/\D/g, ''); // Видаляємо нецифрові символи
    if (count.length > 2) count = count.slice(0, 2); // Обмежуємо 2 цифрами

    addProduct(product, +count);
  }
  return (
    <>
      <div className="flex flex-row items-baseline gap-x-2 text-sm">
        <button className="border p-1" onClick={decrease}>
          -
        </button>
        <input
          className="bg-transparent border-none outline-none max-w-4 text-center"
          type="number"
          value={order.get(product) ?? 0}
          onChange={(e) => manualCountChange(e)}
        />
        <button className="border p-1" onClick={increase}>
          +
        </button>
      </div>
    </>
  );
}
