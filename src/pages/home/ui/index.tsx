import { useEffect, useRef, useState } from "react";
import { TopUserCard, useGetTopUsers, UserListData } from "../../../entities/top-users";

import "./style.css";
import { Loading } from "../../../shared/ui";
import { Link } from "react-router";

export const Home = () => {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <Link to={'/login'}>Войти</Link>
      {usersList.length > 0 && (
        <div className="card__list">
          {usersList.map((data, index) => <TopUserCard {...data}  key={index} />)}
        </div>
      )}
      {usersList.length === 0 && <div className="card__list-notfound">Нет списка пользователей</div>}
    </div>
  )
}
