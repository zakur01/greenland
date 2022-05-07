import React from 'react';
import styles from '../styles/Navbar.module.scss';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { reset, LogOut } from '../redux_slices/AuthSlice';
import { useRouter } from 'next/router';

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { User, isAuthenticated } = useSelector((state) => state.auth);
  const logginout = () => {
    dispatch(reset());
    dispatch(LogOut());
    router.push('/');
  };

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
        <Link href="/bin">
          <h1>Корзина</h1>
        </Link>
        <Link href="/saved">
          <h1>Сохранённые</h1>
        </Link>
        {isAuthenticated ? (
          <Link href="/profile">
            <h1>Профиль ({User})</h1>
          </Link>
        ) : (
          <Link href="/register">
            <h1>Регистрация</h1>
          </Link>
        )}
        {isAuthenticated ? null : (
          <Link href="/login">
            <h1>Логин</h1>
          </Link>
        )}
        {isAuthenticated && (
          // <Link href="/register">
          <h1 onClick={logginout}>Выйти</h1>
          // </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
