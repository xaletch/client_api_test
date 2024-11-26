import { FormData } from "../types/index";

export const validateLoginForm = (data: FormData): FormData => {
  return {
    email: data.email === "" ? "Обязательное поле" : "",
    password:
      data.password === ""
        ? "Обязательное поле"
        : data.password.length < 8
        ? "Пароль должен состоять не менее чем из 8 символов"
        : "",
  };
};