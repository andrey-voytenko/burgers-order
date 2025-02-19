import { create } from 'zustand';
import { Product } from '@/types/product';

type OrderStore = {
  name: string;
  searchText: string;
  order: Map<Product, number>;
  resetOrder: () => void;
  addProduct: (product: Product, count: number) => void;
  removeProduct: (product: Product) => void;
  setSearchText: (searchText: string) => void;
  setName: (name: string) => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  name: '',
  searchText: '',
  order: new Map<Product, number>(),
  resetOrder: () =>
    set(() => ({ name: '', order: new Map<Product, number>() })),
  setName: (name: string) => set(() => ({ name: name })),
  setSearchText: (searchText: string) =>
    set(() => ({ searchText: searchText.toLowerCase() })),
  addProduct: (product: Product, count: number) =>
    set((state) => ({
      order: state.order.set(product, count),
    })),
  removeProduct: (product: Product) =>
    set((state) => {
      state.order.delete(product);
      return {
        order: state.order,
      };
    }),
}));
