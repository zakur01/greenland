import React from 'react';
import styles from '../styles/LeftMenu.module.scss';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { FilterItems, GetItems } from '../redux_slices/SavedBinSlice';

function LeftMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const filter = (e) => {
    router.push('/');
    setTimeout(() => {
      const filt = e.target.id;
      dispatch(FilterItems(filt));
    }, 100);
  };
  return (
    <div className={styles.left}>
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
  );
}

export default LeftMenu;
