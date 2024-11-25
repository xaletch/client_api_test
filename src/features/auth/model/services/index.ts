import { API } from "../../../../shared/api"

class Auth {
  async login(data: { email: string, password: string }) {
    try {
      const res = await API.post({
        url: 'email/login',
        data: {
          email: data.email,
          password: data.password
        },
        token: undefined
      });

      return res;
    }
    catch (error) {
      console.log('Не удалось авторизоваться. ', error);

      return { error };
    }
  }
  async register(data: { email: string, password: string }) {
    try {
      const res = await API.post({
        url: 'email/register',
        data: {
          email: data.email,
          password: data.password
        },
      });

      return res;
    }
    catch (error) {
      console.log('Не удалось зарегистрироваться. ', error);

      return { error };
    }
  }
}

export const AuthService = new Auth();