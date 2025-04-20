"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
  size?: string;
  color?: string;
  variant?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            total: get().total + product.price,
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
            total: get().total + product.price,
          });
        }
      },
      removeItem: (productId) => {
        const items = get().items;
        const item = items.find((item) => item.id === productId);
        if (item) {
          set({
            items: items.filter((item) => item.id !== productId),
            total: get().total - item.price * item.quantity,
          });
        }
      },
      updateQuantity: (productId, quantity) => {
        const items = get().items;
        const item = items.find((item) => item.id === productId);
        if (item) {
          const priceDiff = (quantity - item.quantity) * item.price;
          set({
            items: items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
            total: get().total + priceDiff,
          });
        }
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: "cart-storage",
    }
  )
);
