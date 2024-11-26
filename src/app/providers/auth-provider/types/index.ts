import { IUserData } from "../../../../features/user/models/types";

export type IAuthProvider = {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  setToken: (token: string | null) => void;
  userData: IUserData | undefined;
  setUserData: (userData: IUserData | undefined) => void;
}