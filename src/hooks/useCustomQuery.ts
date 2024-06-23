import { useEffect, useState } from "react";


const useCustomQuery = <T>(fn: () => Promise<T>, defaultLoading: boolean = false) => {
  const [loading, setLoading] = useState(defaultLoading);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fn();
      setData(response as T);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return {
    loading,
    data,
    error,
  };
};

export { useCustomQuery };
