import { ApiProps } from "./types";

const API_URL = 'https://api.great-habits.ru/api/v1/';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const API_MASK = async (url: string, data: any, token?: string): Promise<any> => {
  try {
    const res = await fetch(API_URL + url, {
      method: data.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + token
      },
      // ...data,
      // data: data.body,
      body: JSON.stringify(data.body),
    });

    console.log('data', data.body)

    return res.json();
  }
  catch (err) {
    console.log('Не удалось выполнить запрос. ', err)
  }
};

export const API = {
  get: (param: ApiProps) => API_MASK(param.url, { method: "GET" }, param.token),
  post: (param: ApiProps) => API_MASK(param.url, { method: "POST", body: param.data,}, param.token),
  put: (param: ApiProps) => API_MASK(param.url, { method: "PUT", body: param.data, }, param.token),
  delete: (param: ApiProps) => API_MASK(param.url, { method: "DELETE", body: param.data, }, param.token),
}