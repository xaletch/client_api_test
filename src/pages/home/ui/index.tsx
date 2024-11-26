import { useAuth } from "../../../shared/lib";
import { useEffect, useRef, useState } from "react";
import { TopUserCard, useGetTopUsers, UserListData } from "../../../entities/top-users";

import "./style.css";
import { Button, Loading } from "../../../shared/ui";
import { Link } from "react-router";
import { removeCookie } from "../../../shared/lib/utils";

export const Home = () => {
  const { isAuth, userData, setToken, setUserData, setIsAuth } = useAuth();
  const [usersList, setUserList] = useState<UserListData[]>([]);

  const { getTopUser, data, loading, error } = useGetTopUsers();
  const usersListRef = useRef(false);

  useEffect(() => {
    if (!loading && !data && !error && !usersListRef.current) {
      getTopUser();

      usersListRef.current = true;
    }
  }, [loading, data, error, usersListRef]);

  useEffect(() => {
    if (data && !error) {
      setUserList(data);
    }
  }, [data, error]);

  const handleLogout = () => {
    removeCookie('auth_token');
    setToken(null);
    setUserData(undefined);
    setIsAuth(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      {!isAuth && <Link to={'/login'}>Войти</Link>}
      {isAuth && userData && <h3>{userData.email}</h3>}
      {isAuth && <Button type={"button"} onClick={handleLogout}>Выйти</Button>}
      {usersList.length > 0 && (
        <div className="card__list">
          {usersList.map((data, index) => <TopUserCard {...data}  key={index} />)}
        </div>
      )}
      {usersList.length === 0 && <div className="card__list-notfound">Нет списка пользователей</div>}
    </div>
  )
}
