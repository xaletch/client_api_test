import { API } from "../../../../shared/api"

export const getUsers = async () => {
  try {
    const res = await API.get({
      url: 'rating', 
      data: null, 
      token: undefined 
    });

    return res;
  }
  catch (error) {
    console.log('Произошла ошибка на стороне сервера: ', error);

    return { error };
  }
}