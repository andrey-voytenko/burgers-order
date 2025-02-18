import { Product } from '@/types/product';
import React, { useEffect, useState } from 'react';

export default function ProductItem({
  product,
  onCountChange,
  resetTrigger,
}: {
  product: Product;
  onCountChange: (id: number, count: number) => void;
  resetTrigger: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [resetTrigger]);

  function increase(e: React.MouseEvent) {
    e.preventDefault();
    const newCount = count + 1;
    setCount(newCount);
    onCountChange(product.id, newCount);
  }

  function decrease(e: React.MouseEvent) {
    e.preventDefault();
    if (count === 0) {
      return;
    }
    const newCount = count - 1;
    setCount(newCount);
    onCountChange(product.id, newCount);
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
          <span>{count}</span>
          <button className="border p-1" onClick={increase}>
            +
          </button>
        </div>
      </div>
    </li>
  );
}
