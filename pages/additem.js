import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { open, close } from '../redux_slices/ModalSlice';
import styles from '../styles/AddItem.module.scss';
//добавление товара. название, описание, цена и фотография
function AddItem() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user_id } = useSelector((state) => state.auth);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();

  const [file, setFile] = useState();
  const formData = new FormData();
  const data = {
    Name: name,
    Description: description,
    Price: price,
    Category: category,
    user_product: user_id,
  };
  formData.append('data', JSON.stringify(data));
  if (file) {
    formData.append('files.Photo', file, file.name);
  }

  const imageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const sendItem = () => {
    const res = async () =>
      await axios
        .post('https://greenlandstrapi.herokuapp.com/api/products', formData)
        .then((res) => console.log(res));
    res();
    dispatch(open(`Вы добавили "${name}"`));
    setTimeout(() => {
      dispatch(close());
    }, 1000);
    setTimeout(() => {
      router.push('/');
    }, 1600);
  };
  return (
    <div className={styles.additem}>
      <div>
        <h1>Название</h1>
        <textarea
          onChange={(e) => setName(e.target.value)}
          name="name"
          id=""
          cols="20"
          rows="2"
        ></textarea>
      </div>
      <div>
        <h1>Описание</h1>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          name="name"
          id=""
          cols="20"
          rows="4"
        ></textarea>
      </div>
      <div>
        <h1>Цена</h1>
        <textarea
          onChange={(e) => setPrice(e.target.value)}
          name="name"
          id=""
          cols="20"
          rows="2"
        ></textarea>
      </div>
      <div>
        <h1>Фотография</h1>
        <input
          type="file"
          name="file"
          id="file-upload"
          onChange={imageChange}
        />
      </div>
      <label htmlFor="category">Категория: </label>
      <select
        onChange={(e) => setCategory(e.target.value)}
        className="color black"
        name="category"
        id="category"
      >
        <option value="cosmetics">Косметика</option>
        <option value="supplements">БАДы</option>
        <option value="home">Для Дома</option>
        <option value="books">Книги</option>
        <option value="other">Разное</option>
        <button onClick={sendItem}>Отправить</button>
      </select>
      <button onClick={sendItem}>Добавить</button>
    </div>
  );
}

export default AddItem;
