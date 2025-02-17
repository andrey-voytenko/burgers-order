import { Product } from '@/types/product'
import React, { useState } from 'react'

export default function Item({
  product,
  onCountChange,
}: {
  product: Product
  onCountChange: (id: number, count: number) => void
}) {
  const [count, setCount] = useState(0);

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
      <div className="flex flex-row justify-between gap-8">
        <div className="flex flex-col max-w-96">
          <p className="text-base">
            {product.name}{' '}
            <span className="text-sm text-gray-400">{product.weight}</span> -{' '}
            <span className="text-sm">
              {product.prices.gold}{' '}
              <span className="line-through">{product.prices.regular}</span>
            </span>
          </p>
          <p className="text-xs text-gray-400 opacity-50">
            {product.description}
          </p>
        </div>
        <div className="flex flex-row items-baseline gap-x-2 text-white text-sm">
          <button onClick={decrease}>-</button>
          <span>{count}</span>
          <button onClick={increase}>+</button>
        </div>
      </div>
    </li>
  )
}
