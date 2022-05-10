import React, { useEffect } from 'react';
import styles from '../styles/Item.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AddToFavorites } from '../redux_slices/SavedBinSlice';
import axios from 'axios';
function Item({ title, description, image, id }) {
  const dispatch = useDispatch();
  const { saved_items } = useSelector((state) => state.savedbin);
  const { user_id } = useSelector((state) => state.auth);
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
    dispatch(AddToBin(title));
  };
  return (
    <>
      <div className={styles.item}>
        <h1>{title}</h1>
        <h2>{description}</h2>
        <div className={styles.image_wrapper}>
          <Link href={`/${id}`}>
            <div className="">
              <Image
                className={styles.image}
                width="200px"
                height="200px"
                src={image}
                // layout="responsive"
                objectFit="cover"
              />
            </div>
          </Link>
        </div>
        <button onClick={addToFavorites}>В избранное</button>
        <button onClick={addToBin}>В корзину</button>
      </div>
    </>
  );
}

Item.defaultProps = {
  title: 'Название',
  description: 'Описание',
};

export default Item;
