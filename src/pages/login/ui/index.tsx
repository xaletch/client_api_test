import { useNavigate } from "react-router";
import { LoginForm } from "../../../features/auth"
import { useAuth } from "../../../shared/lib"
import { useEffect } from "react";

export const Login = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [])

  return (
    <div className="container">
      <div className="form-wrapper">
        <LoginForm />
      </div>
    </div>
  )
}
