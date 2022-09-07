import React from 'react';
import styles from './NotFound.module.scss';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <h1 className="page-title">
        <div>😕</div>
        Nothing found
      </h1>
      <button
        onClick={() => navigate('/')}
        style={{ marginTop: '1rem' }}
        className="waves-effect waves-light btn-small">
        Home
      </button>
    </div>
  );
};

export default NotFound;
