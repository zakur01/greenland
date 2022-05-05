import React from 'react';
import styles from '../styles/Item.module.scss';
import Image from 'next/image';
function Item({ title, description, image }) {
  return (
    <div className={styles.item}>
      <h1>{title}</h1>
      <h2>{description}</h2>
      <div className={styles.image_wrapper}>
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
      </div>
    </div>
  );
}

Item.defaultProps = {
  title: 'Название',
  description: 'Описание',
};

export default Item;
