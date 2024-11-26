import { useEffect, useState } from "react";
import { useLoginMutation } from "../../model/hooks/login-mutation";
import { FormData } from "../../model/types";
import { setCookie } from "../../../../shared/lib/utils";
import { useNavigate } from "react-router";
import { validateLoginForm } from "../../model/hooks/login-validation";

import { Input, Button } from "../../../../shared/ui";

import '../form-style.css';
import { useAuth } from "../../../../shared/lib";

export const LoginForm = () => {
  const { setIsAuth, isAuth, setToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState<FormData>({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});

    if (name === 'email' && value === '') {
      setFormErrors(prev => ({ ...prev, email: "обязательное поле" }));
    } else if (name === 'password' && value.length < 8) {
      setFormErrors(prev => ({ ...prev, password: "Пароль должен состоять не менее чем из 8 символов" }));
    } else {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const { auth, data, loading, error } = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateLoginForm(formData);
    setFormErrors(errors);

    const isFormValid = Object.values(formErrors).every((error) => error === '') && Object.values(formData).every((value) => value !== "");

    if (!isFormValid) return;

    try {
      await auth(formData.email, formData.password);

      setFormErrors({ email: "", password: "" });
    }
    catch (error) {
      console.log('ошибка авторизации: ', error);
    }
  };

  useEffect(() => {
    if (data) {
      const { jwt } = data;
      setCookie("auth_token", jwt, 1);
      setIsAuth(true);
      setToken(jwt);

      navigate("/");
    }
    if (error) {
      console.log('ошибка авторизации: ', error);
    }
  }, [data, error]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__inner">
        <div className="form__input">
          <Input type={"email"} name={"email"} value={formData.email} placeholder={"Email"} onChange={handleChange} error={formErrors.email} />
          {formErrors.email && <span className="form__input-error">{formErrors.email}</span>}
        </div>

        <div className="form__input">
          <Input type={"password"} name={"password"} value={formData.password} placeholder={"Password"} onChange={handleChange} error={formErrors.password} />
          {formErrors.password && <span className="form__input-error">{formErrors.password}</span>}
        </div>
        <div className="form__bottom">
          <Button type={"submit"}>{!loading ? 'Войти' : 'Авторизация...'}</Button>
          {error && <p className="form-error">{error.message}</p>}
        </div>
      </div>
    </form>
  )
}
