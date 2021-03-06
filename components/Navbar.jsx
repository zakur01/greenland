import React, { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.scss';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { reset, LogOut } from '../redux_slices/AuthSlice';
import { useRouter } from 'next/router';
let localBin = [];
if (typeof window !== 'undefined') {
  localBin = JSON.parse(localStorage.getItem('bin'));
  if (localBin == null) localBin = [];
}
function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { User, isAuthenticated } = useSelector((state) => state.auth);
  const { saved_lil } = useSelector((state) => state.savedbin);
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
        <Link href="/aboutus">
          <h1>О нас</h1>
        </Link>
        <Link href="/bin">
          <h1>Корзина</h1>
        </Link>
        {isAuthenticated && (
          <Link href="/saved">
            <h1>
              Сохранённые
              {/* {saved_lil.data.length > 0 ? saved_lil.data.length : ''}) */}
            </h1>
          </Link>
        )}
        {isAuthenticated ? (
          <div>
            <Link href="/profile">
              <h1>Профиль ({User})</h1>
            </Link>
          </div>
        ) : (
          <Link href="/register">
            <h1>Регистрация</h1>
          </Link>
        )}
        {User == 'admin' && (
          <Link href="/additem">
            <h1>Добавить товар</h1>
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
