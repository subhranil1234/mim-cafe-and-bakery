import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface OrderBagItem {
  key: string;
  itemId: string;
  name: string;
  categoryLabel: string;
  variantLabel?: string;
  unitPrice: number;
  quantity: number;
}

interface OrderContextValue {
  items: OrderBagItem[];
  totalItems: number;
  subtotal: number;
  addItem: (payload: Omit<OrderBagItem, 'key' | 'quantity'>) => void;
  updateQuantity: (key: string, delta: number) => void;
  removeItem: (key: string) => void;
  clearBag: () => void;
  getItemQuantity: (itemId: string, variantLabel?: string) => number;
}

const STORAGE_KEY = 'mim-order-bag-v1';

const OrderContext = createContext<OrderContextValue | null>(null);

export function makeOrderKey(itemId: string, variantLabel?: string): string {
  return `${itemId}::${variantLabel ?? 'standard'}`;
}

function readStoredBag(): OrderBagItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<OrderBagItem[]>(readStoredBag);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage write errors
    }
  }, [items]);

  const addItem = useCallback((payload: Omit<OrderBagItem, 'key' | 'quantity'>) => {
    const key = makeOrderKey(payload.itemId, payload.variantLabel);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...payload, key, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((key: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearBag = useCallback(() => {
    setItems([]);
  }, []);

  const getItemQuantity = useCallback(
    (itemId: string, variantLabel?: string) => {
      const key = makeOrderKey(itemId, variantLabel);
      return items.find((i) => i.key === key)?.quantity ?? 0;
    },
    [items],
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  );

  const value = useMemo<OrderContextValue>(
    () => ({
      items,
      totalItems,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearBag,
      getItemQuantity,
    }),
    [items, totalItems, subtotal, addItem, updateQuantity, removeItem, clearBag, getItemQuantity],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used inside OrderProvider');
  return ctx;
}
