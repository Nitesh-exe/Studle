// frontend/src/lib/storage.ts
export function readStorage<T>(
  key: string,
  fallback: T,
): T {
  try {
    const value = localStorage.getItem(key);

    if (!value) return fallback;

    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(
  key: string,
  value: T,
): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorage(key: string): void {
  localStorage.removeItem(key);
}