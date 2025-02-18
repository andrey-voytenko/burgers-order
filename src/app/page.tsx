'use client';

import { burgers, combos, snacks, sauces } from '@/data/menu.json';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Product } from '@/types/product';
import ConfirmOrderDialog from '@/components/ConfirmOrderDialog';
import ProductList from '@/components/ProductList';

export default function Home() {
  const [order, setOrder] = useState<{ [id: number]: number }>({});
  const [search, setSearch] = useState<string>('');
  const [filteredBurgersList, setFilteredBurgersList] = useState<Product[]>([]);
  const [filteredCombosList, setFilteredCombosList] = useState<Product[]>([]);
  const [filteredSnacksList, setFilteredSnacksList] = useState<Product[]>([]);
  const [filteredSaucesList, setFilteredSaucesList] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

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

  function onResetHandler() {
    setOrder({});
    setResetTrigger(!resetTrigger);
  }

  function onSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    setSearch(event.target.value);
  }

  function onCountChange(id: number, count: number) {
    setOrder((prevOrder) => {
      const order = {
        ...prevOrder,
        [id]: count,
      };

      if (count === 0) {
        delete order[id];
      }

      return order;
    });
  }

  function saveOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsModalOpen(true);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ConfirmOrderDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={order}
      />
      <main className="flex flex-col gap-8 row-start-2 items-start">
        <input
          className="bg-transparent border-b border-white focus:outline-none w-full"
          type="text"
          placeholder="Пошук"
          value={search}
          onChange={onSearchChange}
        />
        <form onSubmit={saveOrder} className="min-w-64">
          <ol className="list-inside text-sm font-[monospace]">
            <ProductList
              title="Бургери"
              products={filteredBurgersList}
              onCountChange={onCountChange}
              resetTrigger={resetTrigger}
            />

            <ProductList
              title="Комбо"
              products={filteredCombosList}
              onCountChange={onCountChange}
              resetTrigger={resetTrigger}
            />

            <ProductList
              title="Снеки"
              products={filteredSnacksList}
              onCountChange={onCountChange}
              isOpened={false}
              resetTrigger={resetTrigger}
            />

            <ProductList
              title="Соуси"
              products={filteredSaucesList}
              onCountChange={onCountChange}
              isOpened={false}
              resetTrigger={resetTrigger}
            />
          </ol>
          {!filteredSaucesList.length &&
            !filteredBurgersList.length &&
            !filteredBurgersList.length &&
            !filteredSnacksList.length && (
              <p className="text-center my-10">Спробуй ще раз...</p>
            )}

          <button
            type="submit"
            className="mt-8 ml-6 border p-2 disabled:text-gray-400 disabled:border-gray-400 float-right"
            disabled={Object.keys(order).length === 0}
          >
            Замовити
          </button>
          <button
            type="reset"
            className="mt-8 ml-6 border p-2 float-right"
            onClick={onResetHandler}
          >
            Очистити
          </button>
        </form>
      </main>
    </div>
  );
}
