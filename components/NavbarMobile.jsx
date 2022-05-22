import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/NavbarMobile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { reset, LogOut } from '../redux_slices/AuthSlice';
import { FilterItems, GetItems } from '../redux_slices/SavedBinSlice';

import { useRouter } from 'next/router';

function NavbarMobile() {
  const router = useRouter();
  const [navVisibility, setNavVisibility] = useState(false);
  const { isAuthenticated, User } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logginout = () => {
    dispatch(reset());
    dispatch(LogOut());
    router.push('/');
  };
  const filter = (e) => {
    router.push('/');
    setTimeout(() => {
      const filt = e.target.id;
      dispatch(FilterItems(filt));
    }, 100);
  };
  return (
    <div className={styles.navbar_mobile}>
      <div
        className={styles.hamburgericon}
        onClick={() => setNavVisibility(!navVisibility)}
        id="icon"
      >
        <div
          className={navVisibility ? styles.icon1a : styles.icon1}
          id="a"
        ></div>
        <div
          className={navVisibility ? styles.icon2c : styles.icon2}
          id="b"
        ></div>
        <div
          className={navVisibility ? styles.icon3b : styles.icon3}
          id="c"
        ></div>
        <div className={styles.clear}></div>
      </div>
      <div className={navVisibility ? styles.nav2 : styles.nav}>
        <div>
          <Link href="/">
            <h1>GreenLand</h1>
          </Link>
        </div>
        <div className={styles.nav_list}>
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
        <div className={styles.leftmenu}>
          <ul>
            <Link href="/">
              <li id="cosmetics" onClick={filter}>
                Косметика
              </li>
            </Link>
            <li id="supplements" onClick={filter}>
              БАДы
            </li>
            <li id="home" onClick={filter}>
              Для дома
            </li>
            <li id="books" onClick={filter}>
              Книги
            </li>
            <li id="other" onClick={filter}>
              Разное
            </li>
            <li onClick={() => dispatch(GetItems())}>Всё</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavbarMobile;
