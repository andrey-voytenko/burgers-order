'use client';

import { burgers, combos, snacks, sauces } from '@/data/menu.json';
import React, { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import ConfirmOrderDialog from '@/components/ConfirmOrderDialog';
import ProductList from '@/components/ProductList';
import { useOrderStore } from '@/store/order';

export default function Home() {
  const { order, searchText, setSearchText, resetOrder } = useOrderStore();

  const [filteredBurgersList, setFilteredBurgersList] = useState<Product[]>([]);
  const [filteredCombosList, setFilteredCombosList] = useState<Product[]>([]);
  const [filteredSnacksList, setFilteredSnacksList] = useState<Product[]>([]);
  const [filteredSaucesList, setFilteredSaucesList] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFilteredBurgersList(
      burgers.filter((x) => x.name.toLowerCase().includes(searchText)),
    );
    setFilteredSaucesList(
      sauces.filter((x) => x.name.toLowerCase().includes(searchText)),
    );
    setFilteredCombosList(
      combos.filter((x) => x.name.toLowerCase().includes(searchText)),
    );
    setFilteredSnacksList(
      snacks.filter((x) => x.name.toLowerCase().includes(searchText)),
    );
  }, [searchText]);

  function saveOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsModalOpen(true);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ConfirmOrderDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <main className="flex flex-col gap-8 row-start-2 items-start">
        <input
          className="bg-transparent border-b border-white focus:outline-none w-full"
          type="text"
          placeholder="Пошук"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <form onSubmit={saveOrder} className="min-w-64">
          <ol className="list-inside text-sm font-[monospace]">
            <ProductList title="Бургери" products={filteredBurgersList} />

            <ProductList title="Комбо" products={filteredCombosList} />

            <ProductList
              title="Снеки"
              products={filteredSnacksList}
              isOpened={false}
            />

            <ProductList
              title="Соуси"
              products={filteredSaucesList}
              isOpened={false}
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
            disabled={order.size === 0}
          >
            Замовити
          </button>
          <button
            type="reset"
            className="mt-8 ml-6 border p-2 float-right"
            onClick={() => resetOrder()}
          >
            Очистити
          </button>
        </form>
      </main>
    </div>
  );
}
