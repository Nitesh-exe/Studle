// frontend/src/hooks/useLocalStorage.ts
import { useEffect, useState } from "react";
import { readStorage, writeStorage } from "../lib/storage";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
) {
  const [value, setValue] = useState<T>(() =>
    readStorage(key, initialValue),
  );

  useEffect(() => {
    writeStorage(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}