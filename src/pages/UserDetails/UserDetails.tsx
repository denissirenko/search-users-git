import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import type { RootState } from '../../app/store';
import { Preloader } from '../../componets/Preloader/Preloader';
import { fetchInfo, infoData } from '../../features/userDetails/userDetailsSlice';
import { searchRepo } from '../../features/searchRepo/searchRepoSlice';
import SearchInput from '../../componets/SearchInput/SearchInput';

import style from './UserDetails.module.scss';

export const UserDetails = () => {
  const [repo, setRepo] = useState([]);
  const [filteredRepo, setFilteredRepo] = useState(repo);
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { info, status } = useAppSelector(infoData);
  const searchRepoValue = useAppSelector((state: RootState) => state.searchRepo.value);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchInfo(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (info) {
      axios.get(info.repos_url).then((resp) => {
        setRepo(resp.data);
      });
    }
  }, [info]);

  useEffect(() => {
    filteredDate();
  }, [searchRepoValue, repo]);

  const filteredDate = () => {
    let data = [...repo];
    data = data.filter((c: any) => c.name.toLowerCase().includes(searchRepoValue.toLowerCase()));
    setFilteredRepo(data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchRepo(e.target.value));
    filteredDate();
  };

  return (
    <>
      <button
        onClick={() => navigate('/')}
        style={{ marginTop: '1.5rem' }}
        className="waves-effect waves-light btn-small">
        Back
      </button>
      <h1 className="page-title">UserDetails</h1>
      {status === 'loading' ? <Preloader /> : null}
      <div className={style['user-info-block']}>
        <div className={style['user-img-wrap']}>
          <img src={info?.avatar_url} alt="user-img" />
        </div>
        <div className={style['user-info-wrap']}>
          {info?.name ? <div>{info.name}</div> : <div>{info?.login}</div>}
          {info?.email ? <div>{info.email}</div> : null}
          {info?.location ? <div>{info.location}</div> : null}
          {info?.created_at ? <div>{info.created_at.slice(0, 10)}</div> : null}
          {info?.followers ? <div>{info.followers} Followers</div> : null}
          {info?.following ? <div>Following {info.following}</div> : null}
        </div>
      </div>
      {info?.bio ? <div className={style['user-bio']}>{info.bio}</div> : null}
      <SearchInput
        placeholder="Search for User's Repositories"
        onChange={handleSearch}
        value={searchRepoValue}
      />
      <div className="collection">
        {filteredRepo.map(({ name, html_url, forks_count, stargazers_count, id }) => (
          <a
            key={id}
            href={html_url}
            className={`collection-item ${style['repo-link']}`}
            target="_blank"
            rel="noopener noreferrer">
            <span className={style['repo-name']}>{name}</span>
            <span className={style['repo-info']}>
              <span>{forks_count} Forks</span>
              <span>{stargazers_count} Stars</span>
            </span>
          </a>
        ))}
      </div>
    </>
  );
};
