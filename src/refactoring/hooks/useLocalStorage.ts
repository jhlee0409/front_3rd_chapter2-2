import { useEffect, useState } from "react";

type StorageKey = "cart" | "coupon" | "product" | "user";

const storageKey: Record<StorageKey, string> = {
  cart: "cart",
  coupon: "coupon",
  product: "product",
  user: "user",
};

const useLocalStorage = () => {
  const [storage, setStorage] = useState(new Map());

  const get = (key: StorageKey) => {
    return storage.get(key);
  };

  const set = (key: StorageKey, value: string) => {
    storage.set(key, value);
  };

  useEffect(() => {
    const getAllLocalStorageValues = (): Record<StorageKey, any> => {
      return Object.keys(localStorage).reduce((acc, key) => {
        const value = localStorage.getItem(key);
        const isValidKey = Object.values(storageKey).includes(key as StorageKey);
        if (value !== null && isValidKey) {
          try {
            acc[key as StorageKey] = JSON.parse(value);
          } catch {
            acc[key as StorageKey] = value;
          }
        }
        return acc;
      }, {} as Record<StorageKey, any>);
    };

    const localStorageValues = new Map(Object.entries(getAllLocalStorageValues()));
    setStorage(localStorageValues);

    return () => {
      storage.forEach((value, key) => {
        localStorage.setItem(key, value);
      });
    };
  }, []);

  return { get, set, storage };
};

export default useLocalStorage;
