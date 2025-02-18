'use client';

import { burgers, combos, snacks, sauces } from '@/data/menu.json';
import Item from '@/components/item';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Product } from '@/types/product';

export default function Home() {
  const [order, setOrder] = useState<Map<number, number>>(new Map([]));
  const [search, setSearch] = useState<string>('');
  const [filteredBurgersList, setFilteredBurgersList] = useState<Product[]>([]);
  const [filteredCombosList, setFilteredCombosList] = useState<Product[]>([]);
  const [filteredSnacksList, setFilteredSnacksList] = useState<Product[]>([]);
  const [filteredSaucesList, setFilteredSaucesList] = useState<Product[]>([]);

  useEffect(() => {
    setFilteredBurgersList(
      burgers.filter((x) =>
        x.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
    setFilteredSaucesList(
      sauces.filter((x) => x.name.toLowerCase().includes(search.toLowerCase())),
    );
    setFilteredCombosList(
      combos.filter((x) => x.name.toLowerCase().includes(search.toLowerCase())),
    );
    setFilteredSnacksList(
      snacks.filter((x) => x.name.toLowerCase().includes(search.toLowerCase())),
    );
  }, [search]);

  function onSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    setSearch(event.target.value);
  }

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
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start">
        <input
          className="bg-transparent border-b border-white focus:outline-none w-full"
          type="text"
          placeholder="Пошук"
          value={search}
          onChange={onSearchChange}
        />
        <form onSubmit={saveOrder} action="" className="min-w-64">
          <ol className="list-inside text-sm font-[monospace]">
            {filteredBurgersList.length > 0 && (
              <h2 className="text-xl my-6">Бургери</h2>
            )}
            {filteredBurgersList.map((burger) => (
              <Item
                product={burger}
                key={burger.id}
                onCountChange={onCountChange}
              />
            ))}

            {filteredCombosList.length > 0 && (
              <h2 className="text-xl my-6">Комбо</h2>
            )}
            {filteredCombosList.map((combo) => (
              <Item
                product={combo}
                key={combo.id}
                onCountChange={onCountChange}
              />
            ))}

            {filteredSnacksList.length > 0 && (
              <h2 className="text-xl my-6">Снеки</h2>
            )}
            {filteredSnacksList.map((snack) => (
              <Item
                product={snack}
                key={snack.id}
                onCountChange={onCountChange}
              />
            ))}

            {filteredSaucesList.length > 0 && (
              <h2 className="text-xl my-6">Соуси</h2>
            )}
            {filteredSaucesList.map((sauce) => (
              <Item
                product={sauce}
                key={sauce.id}
                onCountChange={onCountChange}
              />
            ))}
          </ol>
          {!filteredSaucesList.length &&
            !filteredBurgersList.length &&
            !filteredBurgersList.length &&
            !filteredSnacksList.length && (
              <p className="text-center my-10">Спробуй ще раз...</p>
            )}
          <button
            type="submit"
            className="mt-8 border p-2 disabled:text-gray-400 disabled:border-gray-400 float-right"
            disabled={order.size === 0}
          >
            Замовити
          </button>
        </form>
      </main>
    </div>
  );
}
