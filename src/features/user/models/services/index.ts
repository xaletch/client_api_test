import { API } from "../../../../shared/api";

export const GetUser = async (token: string | null) => {
  try {
    const res = await API.get({
      url: 'user',
      token: token,
    });

    return res;
  }
  catch (error) {
    console.log('не удалось получить данные о пользователе.', error);

    return {error};
  }
}