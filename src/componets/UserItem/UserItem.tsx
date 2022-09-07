import { Link } from 'react-router-dom';
import { User } from '../../features/users/usersSlice';
import style from './UserItem.module.scss';

export const UserItem = ({ id, name, login, public_repos, avatar_url }: User) => {
  return (
    <Link to={`/${login}`} className={`collection-item ${style['user-item']}`}>
      <img className={style['user-img']} src={avatar_url} alt="user_foto" />
      {name ? name : login}
      {public_repos ? <span className={style['user-repo']}>Repo: {public_repos}</span> : null}
    </Link>
  );
};
