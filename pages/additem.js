import React from 'react';
import { useState } from 'react';
import styles from '../styles/AddItem.module.scss';
//добавление товара. название, описание, цена и фотография
function AddItem() {
  const [file, setFile] = useState();
  return (
    <div className={styles.additem}>
      <div>
        <h1>Название</h1>
        <textarea name="name" id="" cols="20" rows="2"></textarea>
      </div>
      <div>
        <h1>Описание</h1>
        <textarea name="name" id="" cols="20" rows="4"></textarea>
      </div>
      <div>
        <h1>Цена</h1>
        <textarea name="name" id="" cols="20" rows="2"></textarea>
      </div>
      <div>
        <h1>Фотография</h1>
        <input type="file" />
      </div>
    </div>
  );
}

export default AddItem;
