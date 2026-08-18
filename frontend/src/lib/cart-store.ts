import { useSyncExternalStore } from "react";
import { cartAPI } from "./api";

export interface CartItem {
  id: string;
  quantity: number;
}

type Listener = () => void;

const STORAGE_KEY = "pocketglow-cart";

const isBrowser = typeof window !== "undefined";

let items: CartItem[] = isBrowser
  ? (() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as CartItem[]) : [];
      } catch {
        return [];
      }
    })()
  : [];

const listeners = new Set<Listener>();

function persist() {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

const mapDbCartToLocal = (dbCart: any[]): CartItem[] => {
  return dbCart
    .map((item) => ({
      id: item.product?.id || item.product?._id || "",
      quantity: item.quantity,
    }))
    .filter((item) => item.id !== "");
};

export async function syncCartFromBackend() {
  if (!isBrowser) return;
  const token = localStorage.getItem("token");
  if (!token) return;
  
  try {
    const res = await cartAPI.get();
    if (res.success && res.data) {
      items = mapDbCartToLocal(res.data);
      emit();
    }
  } catch (err) {
    console.error("Failed to sync cart from backend:", err);
  }
}

// Automatically sync cart from backend on script load
if (isBrowser) {
  setTimeout(syncCartFromBackend, 100);
}

export const cartStore = {
  getItems: () => items,
  subscribe: (l: Listener) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  async add(id: string, quantity = 1) {
    const existing = items.find((i) => i.id === id);
    if (existing) {
      items = items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + quantity } : i,
      );
    } else {
      items = [...items, { id, quantity }];
    }
    emit();

    const token = isBrowser ? localStorage.getItem("token") : null;
    if (token) {
      try {
        await cartAPI.add(id, quantity);
      } catch (err) {
        console.error("Failed to sync cart add to backend:", err);
      }
    }
  },
  async setQty(id: string, quantity: number) {
    if (quantity <= 0) return cartStore.remove(id);
    items = items.map((i) => (i.id === id ? { ...i, quantity } : i));
    emit();

    const token = isBrowser ? localStorage.getItem("token") : null;
    if (token) {
      try {
        await cartAPI.updateQty(id, quantity);
      } catch (err) {
        console.error("Failed to sync cart qty to backend:", err);
      }
    }
  },
  async remove(id: string) {
    items = items.filter((i) => i.id !== id);
    emit();

    const token = isBrowser ? localStorage.getItem("token") : null;
    if (token) {
      try {
        await cartAPI.remove(id);
      } catch (err) {
        console.error("Failed to sync cart remove from backend:", err);
      }
    }
  },
  async clear() {
    items = [];
    emit();

    const token = isBrowser ? localStorage.getItem("token") : null;
    if (token) {
      try {
        await cartAPI.clear();
      } catch (err) {
        console.error("Failed to sync cart clear to backend:", err);
      }
    }
  },
};

export function useCart() {
  return useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getItems,
    () => [] as CartItem[],
  );
}

export function useCartCount() {
  const c = useCart();
  return c.reduce((sum, i) => sum + i.quantity, 0);
}
