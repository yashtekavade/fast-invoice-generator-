import { useState, useEffect } from "react";
import { get, set } from "idb-keyval";

export interface CatalogItem {
  id: string;
  name: string;
  amount: number;
  unit?: string;
  netPrice: number;
  vat: string | number;
}

const ITEM_CATALOG_KEY = "fast-invoice-generator-item-catalog";

export function useItemCatalog() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await get<CatalogItem[]>(ITEM_CATALOG_KEY);
      if (data) {
        setItems(data);
      }
      setIsLoaded(true);
    }
    load();
  }, []);

  const saveItem = async (entry: Omit<CatalogItem, "id">) => {
    const newEntry = { ...entry, id: crypto.randomUUID() };
    const updated = [...items, newEntry];
    setItems(updated);
    await set(ITEM_CATALOG_KEY, updated);
    return newEntry;
  };

  const removeItem = async (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    await set(ITEM_CATALOG_KEY, updated);
  };

  return {
    items,
    isLoaded,
    saveItem,
    removeItem,
  };
}
