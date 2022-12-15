import React from 'react';
import { Data } from '../../App';
import Skeleton from './Skeleton';
import User from './User';

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  data: Data[];
  invites: number[];
  onClickInvite: (id: number) => void;
  onClickSendInvites: () => void;
};

export const Users = ({
  search,
  setSearch,
  isLoading,
  data,
  invites,
  onClickInvite,
  onClickSendInvites,
}: Props) => {
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Найти пользователя..."
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {data
            .filter((obj) => {
              const name = obj.first_name.toLowerCase() + ' ' + obj.last_name.toLowerCase();

              return name.includes(search.toLowerCase());
            })
            .map((obj) => (
              <User
                data={obj}
                isUserInvited={invites.includes(obj.id)}
                onClickInvite={onClickInvite}
              />
            ))}
        </ul>
      )}
      {invites.length > 0 && (
        <button className="send-invite-btn" onClick={onClickSendInvites}>
          Отправить приглашение
        </button>
      )}
    </>
  );
};
