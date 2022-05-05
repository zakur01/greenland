import React from 'react';
import styles from '../styles/Navbar.module.scss';
import Link from 'next/link';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/">
          <h1>GreenLand</h1>
        </Link>
      </div>
      <div className={styles.right}>
        <Link href="">
          <h1>О нас</h1>
        </Link>
        <Link href="">
          <h1>Корзина</h1>
        </Link>
        <Link href="">
          <h1>Сохранённые</h1>
        </Link>
        <Link href="">
          <h1>Войти</h1>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
