import { createContext, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { getCookie } from "../../../shared/lib/utils";
import { IAuthProvider } from "./types";
import { useGetUser } from "../../../features";
import { IUserData } from "../../../features/user/models/types";

export const AuthContext = createContext<IAuthProvider | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);
  // const refUser = useRef<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData | undefined>(undefined);

  useEffect(() => {
    const token_auth = getCookie("auth_token");

    if (token_auth) {
      setToken(token_auth);
    }
  }, []);

  const { user } = useGetUser();

  const getUser = async () => {
    if (!token) return;

    try {
      const res = await user(token);

      if (res) {
        setUserData(res);
        if (isAuth !== true) setIsAuth(true);
      }; 
    }
    catch(error) {
      console.log('ошибка при получении данных о пользователе. ', error);

      setToken(null);
      setUserData(undefined);
      setIsAuth(true);
    }
  }

  useEffect(() => {
    if (token) {
      // refUser.current = true;
      // setUserData(undefined);
      // setIsAuth(false);
      
      // return;
      getUser();
    }
    
  }, [token]);

  const contextValue = useMemo(() => ({ isAuth, setIsAuth, setToken, token, userData, setUserData}), [isAuth, userData, token]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}