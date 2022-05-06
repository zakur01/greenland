import React from 'react';
import styles from '../styles/LeftMenu.module.scss';

function LeftMenu() {
  return (
    <div className={styles.left}>
      <ul>
        <li>Косметика</li>
        <li>БАДы</li>
        <li>Для Дома</li>
        <li>Книги</li>
        <li>Разное</li>
      </ul>
    </div>
  );
}

export default LeftMenu;
