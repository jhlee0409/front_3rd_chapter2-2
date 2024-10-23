import { useCallback, useState } from "react";

const storeToStorage = <T>(key: string, value: T, store: Storage) => {
  store.setItem(key, JSON.stringify(value));
};

const getFromStorage = <T>(key: string, store: Storage): T | null => {
  const item = store.getItem(key);
  return item ? JSON.parse(item) : null;
};

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = getFromStorage<T>(key, window.localStorage);
      if (item) return item;
      storeToStorage(key, initialValue, window.localStorage);
      return initialValue;
    } catch (error) {
      console.error("해당 키는 로컬스토리지를 불러오는데 실패했습니다.", key, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (key: string) => (value: T | ((val: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const valueToStore = value instanceof Function ? value(prev) : value;
          storeToStorage(key, valueToStore, window.localStorage);
          return valueToStore;
        });
      } catch (error) {
        console.error("해당 키로 로컬스토리지 저장에 실패했습니다", key, error);
      }
    },
    [],
  );

  return [storedValue, setValue(key)] as const;
}

export default useLocalStorage;
