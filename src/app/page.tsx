'use client'

import menu from '@/data/menu.json'
import Item from '@/components/item'
import React, { useState } from 'react'

export default function Home() {
  const [order, setOrder] = useState<{ [id: number]: number }>({});

  function onCountChange(id: number, count: number) {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [id]: count,
    }));
  }

  function saveOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Order:', order);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start">
        <form onSubmit={saveOrder} action="">
          <ol className="list-inside text-sm font-[monospace]">
            <h2 className="text-xl my-6">Бургери</h2>
            {menu.burgers.map((burger) => (
              <Item
                product={burger}
                key={burger.id}
                onCountChange={onCountChange}
              />
            ))}
            <h2 className="text-xl my-6">Комбо</h2>
            {menu.combos.map((combo) => (
              <Item
                product={combo}
                key={combo.id}
                onCountChange={onCountChange}
              />
            ))}

            <h2 className="text-xl my-6">Снеки</h2>
            {menu.snacks.map((snack) => (
              <Item
                product={snack}
                key={snack.id}
                onCountChange={onCountChange}
              />
            ))}
            <h2 className="text-xl my-6">Соуси</h2>
            {menu.sauces.map((sauce) => (
              <Item
                product={sauce}
                key={sauce.id}
                onCountChange={onCountChange}
              />
            ))}
          </ol>

          <button type="submit" className="float-right mt-8 border p-2">
            Замовити
          </button>
        </form>
      </main>
    </div>
  )
}
