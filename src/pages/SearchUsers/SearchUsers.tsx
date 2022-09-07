import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import type { RootState } from '../../app/store';
import { searchUsers } from '../../features/searchUsers/searchUsersSlice';
import { fetchUsers, searchUsersData } from '../../features/users/usersSlice';
import { fetchAllUsers, searchAllUsersData } from '../../features/allUsers/allUsersSlice';

import SearchInput from '../../componets/SearchInput/SearchInput';
import { Preloader } from '../../componets/Preloader/Preloader';
import { Error } from '../../componets/Error/Error';

import { UserItem } from '../../componets/UserItem/UserItem';

export const SearchUsers = () => {
  const dispatch = useAppDispatch();
  const searchUsersValue = useAppSelector((state: RootState) => state.searchUsers.value);

  const { users, status } = useAppSelector(searchUsersData);
  const { allusers } = useAppSelector(searchAllUsersData);

  useEffect(() => {
    if (searchUsersValue.length) {
      dispatch(fetchUsers(searchUsersValue));
    }
  }, [dispatch, searchUsersValue]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <h1 className="page-title">SearchUsers</h1>
      <SearchInput
        placeholder="Search Users"
        onChange={(e) => dispatch(searchUsers(e.target.value))}
        value={searchUsersValue}
      />
      {status === 'loading' ? <Preloader /> : null}
      {status === 'idle' && searchUsersValue.length ? (
        <div className="collection">
          {users.map((user) => (
            <UserItem key={user.id} {...user} />
          ))}
        </div>
      ) : (
        <div className="collection">
          {allusers.map((user) => (
            <UserItem key={user.id} {...user} />
          ))}
        </div>
      )}
      {status === 'failed' ? <Error /> : null}
    </>
  );
};
