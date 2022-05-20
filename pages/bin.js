import React, { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Bin.module.scss';
import Item from '../components/Item';
import Meta from '../components/Meta';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { open, close } from '../redux_slices/ModalSlice';

let localBin = [];
if (typeof window !== 'undefined') {
  localBin = JSON.parse(localStorage.getItem('bin'));
  if (localBin == null) localBin = [];
}

function Bin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [local, setLocal] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocal(JSON.parse(localStorage.getItem('bin')));
    }
  }, []);

  const deleteItem = (e) => {
    const index = e.target.getAttribute('id');
    setLocal(
      local.filter((_, i) => {
        return i !== parseInt(index);
      })
    );

    if (typeof window !== 'undefined') {
      let oldLocal = JSON.parse(localStorage.getItem('bin'));
      oldLocal.splice(e.target.getAttribute('id'), 1);
      localStorage.setItem('bin', JSON.stringify(oldLocal));
    }
  };
  const sendPurchase = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    dispatch(open('Спасибо, вы оставили свой заказ'));
    setTimeout(() => {
      dispatch(close());
    }, 1200);
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };
  return (
    <>
      <Meta title="Корзина" />
      <div className={styles.container}>
        <div className={styles.bin}>
          {local && local.length > 0
            ? local.map((item, index) => (
                <div id={index} className={styles.bin_item}>
                  <Item
                    title={item[0].attributes.Name}
                    description={item[0].attributes.Description}
                    image={
                      `http://localhost:1337` +
                      item[0].attributes.Photo.data.attributes.url
                    }
                    id={item[0].id}
                    price={item[0].attributes.Price}
                    bin="false"
                  />
                  <button id={index} onClick={deleteItem}>
                    Удалить из корзины
                  </button>
                </div>
              ))
            : 'nothing'}
        </div>
        <div className={styles.checkout}>
          <div className={styles.left}>
            {local &&
              local.length > 0 &&
              local.map((item) => (
                <div>
                  <h2>{item[0].attributes.Name}</h2>
                </div>
              ))}
          </div>
          <div className={styles.right}>
            {local &&
              local.length > 0 &&
              local.map((item) => <h2>{item[0].attributes.Price}c</h2>)}
            <h2 className={styles.sum}>
              {local &&
                local.length > 0 &&
                local
                  .map((item) => parseInt(item[0].attributes.Price))
                  .reduce((acc, amount) => acc + amount) + 'c'}
            </h2>
          </div>
        </div>

        <div className={styles.form}>
          <label htmlFor="phone">Ваш номер телефона: </label>
          <input type="text" name="phone" id="phone" />
          <label htmlFor="address">Ваш адрес:</label>
          <input type="text" name="address" id="address" />
          <input type="submit" value="Отправить" onClick={sendPurchase} />
        </div>
      </div>
    </>
  );
}

export default Bin;
