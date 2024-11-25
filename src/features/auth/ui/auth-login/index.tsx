import { useEffect, useState } from "react";
import { useLoginMutation } from "../../model/hooks/login-mutation";
import { FormData } from "../../model/types";
import { getCookie, setCookie } from "../../../../shared/lib/utils";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  });

  // временно
  const [isAuth, setIsAuth] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const { auth, data, loading, error } = useLoginMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // надо использовать trim 
    if (formData.email === "" || formData.password === "") {
      console.log('formData error');

      return
    }

    await auth(formData.email, formData.password);
  }

  useEffect(() => {
    if (data) {
      const { jwt } = data;
      setCookie("auth_token", jwt, 1);

      navigate("/");
    }
    if (error) {
      console.log('ошибка авторизации: ', error);
    }
  }, [data, error]);

  useEffect(() => {
    if (getCookie("auth_token")) {
      setIsAuth(true);
    }
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" name={"email"} value={formData.email} onChange={handleChange} placeholder="Email" disabled={isAuth} />
        <input type="password" name={"password"} value={formData.password} onChange={handleChange} placeholder="Password" disabled={isAuth} />
      </div>
      <button type="submit" disabled={isAuth}>Войти</button>
      {loading && <p>Загрузка...</p>}
      {error && <p>{error.message}</p>}
      {isAuth && <p>Вы авторизованы</p>}
    </form>
  )
}
