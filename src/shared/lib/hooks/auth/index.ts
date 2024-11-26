import { useContext } from "react";
import { AuthContext } from "../../../../app/providers";

export const useAuth = () => {
  const context = useContext(AuthContext);
  // console.log('AuthContext:', context)
  if (!context) {
    throw new Error("UseAuthContext error");
  }

  return context;
};