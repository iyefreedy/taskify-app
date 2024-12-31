import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [state, setState] = useState<string | T>(defaultValue);

  useEffect(() => {
    const fetchLocalStorage = () => {
      if (typeof window !== undefined) {
        const currentValue = window.localStorage.getItem(key);
        setState(currentValue as T);
      }
    };

    fetchLocalStorage();
  }, [defaultValue, key]);

  const setValue = (value: T) => {
    if (typeof window !== undefined) {
      if (value === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, value as string);
      }
    }
    setState(value);
  };

  return { value: state, setValue };
};
