import { useState } from "react";
import { GetUser } from "../services";
import { IUserData } from "../types";

export const useGetUser = () => {
  const [data, setData] = useState<IUserData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const user = async (token: string | null) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await GetUser(token);

      if ('data' in res) {
        setData(res.data);

        return res.data;
      };

      if ('error' in res) {
        setError(res);
      }
    }
    catch(error) {
      setError(error as Error);
    }
    finally {
      setLoading(false)
    }
  }

  return { user, data, loading, error };
}