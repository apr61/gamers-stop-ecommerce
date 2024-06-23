import { useEffect, useState } from "react";

export default function useLocalStorage(key: string, initialValue: unknown) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue) return JSON.parse(jsonValue);
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return { local: value, setLocal: setValue };
}
