import React from 'react';
import Item from './Item';
import styles from '../styles/Main.module.scss';

export default function Main({ items }) {
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
export async function getStaticProps() {
  const res = await fetch('http:/localhost:1337/api/products?populate=*');
  const data = await res.json();
  const items = data.data;
  console.log(items);
  return {
    props: { items },
  };
}
