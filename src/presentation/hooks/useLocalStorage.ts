import { useState } from "react";

type UseLocalStorage<T> = [
  storedValue: T,
  setValue: (value: T | ((value: T) => T)) => void,
];

/**
 * Abstração da API Window.localStorage em um hook.
 *
 * @see https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): UseLocalStorage<T> {
  const getLocalStorageKey = () => {
    return `@ProtocoloWeb__Key=${key}`;
  };

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(getLocalStorageKey());
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((value: T) => T)) => {
    try {
      // Permite que o parâmetro "value" seja uma função,
      // imitando o comportamento do useState.
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          getLocalStorageKey(),
          JSON.stringify(valueToStore),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
