import React from 'react';
import { useEffect } from 'react';
import Item from './Item';
import styles from '../styles/Main.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { GetItems, GetSaved } from '../redux_slices/SavedBinSlice';
export default function Main({ items }) {
  const { user_id, isAuthenticated } = useSelector((state) => state.auth);
  const { main_items } = useSelector((state) => state.savedbin);
  const dispatch = useDispatch();
  // console.log(items);
  useEffect(() => {
    if (isAuthenticated) dispatch(GetSaved(user_id));
    dispatch(GetItems());
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.right}>
        {main_items &&
          main_items.map((item) => (
            <Item
              id={item.id}
              title={item.attributes.Name}
              description={item.attributes.Description}
              price={item.attributes.Price}
              image={
                `https://greenlandstrapi.herokuapp.com` +
                item.attributes.Photo.data.attributes.url
              }
              bin="true"
            />
          ))}
      </div>
    </div>
  );
}
