import { useState, useEffect } from "react";
import { get, set } from "idb-keyval";

export interface AddressEntry {
  id: string;
  name: string;
  address: string;
  taxId?: string;
  email?: string;
  phone?: string;
}

const ADDRESS_BOOK_KEY = "fast-invoice-generator-address-book";

export function useAddressBook() {
  const [addresses, setAddresses] = useState<AddressEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await get<AddressEntry[]>(ADDRESS_BOOK_KEY);
      if (data) {
        setAddresses(data);
      }
      setIsLoaded(true);
    }
    load();
  }, []);

  const saveAddress = async (entry: Omit<AddressEntry, "id">) => {
    const newEntry = { ...entry, id: crypto.randomUUID() };
    const updated = [...addresses, newEntry];
    setAddresses(updated);
    await set(ADDRESS_BOOK_KEY, updated);
    return newEntry;
  };

  const removeAddress = async (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    await set(ADDRESS_BOOK_KEY, updated);
  };

  return {
    addresses,
    isLoaded,
    saveAddress,
    removeAddress,
  };
}
