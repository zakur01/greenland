import React from 'react';
import styles from '../styles/Profile.module.scss';
import { useSelector } from 'react-redux';

function Profile() {
  const { User, user_id } = useSelector((state) => state.auth);
  return (
    <div className={styles.profile}>
      <div>
        <h1>{User}</h1>
        <h1>{user_id}</h1>
      </div>
    </div>
  );
}

export default Profile;
