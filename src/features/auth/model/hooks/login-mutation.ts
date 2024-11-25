import { useState } from "react"
import { AuthService } from "../services";

export const useLoginMutation = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const auth = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = { email, password };
      const res = await AuthService.login(data);

      if (res.status === 'success') {
        setData(res);
      };

      if (res.status === 'error') {
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

  return { auth, data, loading, error };
}
