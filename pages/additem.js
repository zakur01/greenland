import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/AddItem.module.scss';
//добавление товара. название, описание, цена и фотография
function AddItem() {
  const { user_id } = useSelector((state) => state.auth);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  const [file, setFile] = useState();
  const formData = new FormData();
  const data = {
    Name: name,
    Description: description,
    Price: price,
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
        .post('http://localhost:1337/api/products', formData)
        .then((res) => console.log(res));
    res();
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
      <p className="p-4 bg-gray-500 w-21">{file ? file.name : 'nothing'}</p>
      <button onClick={sendItem}>Отправить</button>
    </div>
  );
}

export default AddItem;
