import { useEffect, useState } from 'react';

type KeyFn<T> = (item: T) => string;

export function useLocalList<T>(storageKey: string, getKey: KeyFn<T>) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as T[];
        setItems(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      setItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // ignore quota/storage errors
    }
  }, [items, storageKey]);

  const add = (item: T) => {
    setItems((prev) => {
      const key = getKey(item);
      const without = prev.filter((it) => getKey(it) !== key);
      return [...without, item];
    });
  };

  const removeByKey = (key: string) => {
    setItems((prev) => prev.filter((it) => getKey(it) !== key));
  };

  return { items, add, removeByKey };
}
