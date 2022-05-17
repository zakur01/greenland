import React, { useEffect } from 'react';
import styles from '../styles/Item.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddToFavorites,
  GetItems,
  AddToBin,
} from '../redux_slices/SavedBinSlice';
import { open, close } from '../redux_slices/ModalSlice';

import axios from 'axios';
function Item({ title, description, image, id, price, bin }) {
  const dispatch = useDispatch();
  const { saved_items } = useSelector((state) => state.savedbin);
  const { user_id, isAuthenticated, User } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.modal);
  // const { user_id } = useSelector((state) => {
  //   state.auth;
  // });
  const { token } = useSelector((state) => state.auth);
  const addToFavorites = async () => {
    // dispatch(AddToFavorites(title));
    // const formData = {
    //   saved_items: saved_items,
    // };
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    // const res = async () =>
    //   await axios.put(
    //     'http://localhost:1337/api/users/' + id,
    //     formData,
    //     config
    //   );
    // res();
    const item = await axios.get(
      'http://localhost:1337/api/products?filters[Name][$eq]=' +
        title +
        '&populate=*'
    );
    const formData = {
      saved_items: item.data,
    };
    const res = async () =>
      await axios.put(' http://localhost:1337/api/users/' + user_id, formData);
    res();
  };
  const addToBin = () => {
    const res = async () => {
      await axios
        .get(
          'http://localhost:1337/api/products?filters[id][$eq]=' +
            id +
            '&populate=*'
        )
        .then((res) => {
          let oldLocal = JSON.parse(localStorage.getItem('bin'));
          if (oldLocal == null) oldLocal = [];
          oldLocal.push(res.data.data);
          localStorage.setItem('bin', JSON.stringify(oldLocal));
        });
    };
    res();
    alert('hello');
  };
  //delete item
  const deleteItem = () => {
    const res = async () =>
      await axios.delete('http://localhost:1337/api/products/' + id);

    res();
    dispatch(open(`Вы удалили "${title}"`));
    setTimeout(() => {
      dispatch(close());
      dispatch(GetItems());
    }, 1000);
  };

  return (
    <>
      <div className={styles.item}>
        <h1>{title}</h1>
        <h2>{description ? description : <br></br>}</h2>
        <div className={styles.image_wrapper}>
          <Link href={`/${id}`}>
            <div className="">
              {image && (
                <Image
                  className={styles.image}
                  width="200px"
                  height="200px"
                  src={image}
                  // layout="responsive"
                  objectFit="cover"
                />
              )}
            </div>
          </Link>
        </div>
        <h2 className="font-bold text-lg">{price}</h2>
        {isAuthenticated && (
          <button onClick={addToFavorites}>В избранное</button>
        )}
        {bin && <button onClick={addToBin}>В корзину</button>}
        {User == 'alen3' && <button onClick={deleteItem}>Удалить</button>}
      </div>
    </>
  );
}

Item.defaultProps = {
  title: 'Название',
  description: 'Описание',
};

export default Item;
