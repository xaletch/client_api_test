import { useState } from "react"
import { getUsers } from "../services";

export const useGetTopUsers = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getTopUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getUsers();

      if ('data' in res) {
        setData(res.data);
      }

      if ('error' in res) {
        setError(res.error.message);
      }
    }
    catch (error) {
      setError(error as Error);
    }
    finally {
      setLoading(false);
    }
  };

  return { getTopUser, data, loading, error };
}