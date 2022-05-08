import React from 'react';
import { useEffect } from 'react';
import Item from './Item';
import styles from '../styles/Main.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { GetItems } from '../redux_slices/SavedBinSlice';
export default function Main({ items }) {
  const { main_items } = useSelector((state) => state.savedbin);
  const dispatch = useDispatch();
  console.log(items);
  useEffect(() => {
    dispatch(GetItems());
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.right}>
        {items &&
          items.map((item) => (
            <Item
              id={item.id}
              title={item.attributes.Name}
              description={item.attributes.Description}
              image={
                `http://localhost:1337` +
                item.attributes.Photo.data.attributes.url
              }
            />
          ))}
      </div>
    </div>
  );
}
