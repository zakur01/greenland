import React from 'react';
import Item from './Item';
import styles from '../styles/Main.module.scss';

export default function Main({ items }) {
  console.log(items);
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
