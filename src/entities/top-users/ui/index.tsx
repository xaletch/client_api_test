import { UserListData } from "../module/types"
import './style.css'

export const TopUserCard = ({ email, username, last_name, first_name, points }: UserListData) => {
  return (
    <div className="top__user-card">
      <div>
        {username && <p className="card__username">{username}</p>}
        <span className="card__email">{email}</span>
      </div>
      <div>
        {last_name && first_name && (
          <div className="card__fio">
            <span className="card__fio-name">{last_name}</span>
            <span className="card__fio-name">{first_name}</span>
          </div>
        )}
        <h3 className="card__points">Кол-во поинтов: {points}</h3>
      </div>
    </div>
  )
}
