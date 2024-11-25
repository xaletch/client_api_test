export const setCookie = (key: string, value: string, day: number): void => {
  const date = new Date();
  
  date.setTime(date.getTime() + day + 24 + 60 * 60 * 1000);
  
  const expires = 'expires=' + date.toUTCString();
  document.cookie = `${key}=${value}; ${expires}; path=/;`;
}

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length, +1);
    }
  };

  return null;
}

export const removeCookie = (key: string): void => {
  setCookie(key, '', -1);
}