import React from 'react';
import styles from '../styles/Bin.module.scss';
import Item from '../components/Item';

let localBin = [];
if (typeof window !== 'undefined') {
  localBin = JSON.parse(localStorage.getItem('bin'));
  if (localBin == null) localBin = [];
}
function Bin() {
  return (
    <div className={styles.container}>
      <div className={styles.bin}>
        {localBin && localBin.length > 0
          ? localBin.map((item) => (
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
            ))
          : 'nothing'}
      </div>
      <div className={styles.checkout}>
        <div className={styles.left}>
          {localBin &&
            localBin.length > 0 &&
            localBin.map((item) => <h2>{item[0].attributes.Name}</h2>)}
        </div>
        <div className={styles.right}>
          {localBin.length > 0 &&
            localBin.map((item) => <h2>{item[0].attributes.Price}</h2>)}
          Итого:{' '}
          {localBin
            .map((item) => parseInt(item[0].attributes.Price))
            .reduce((acc, amount) => acc + amount)}
        </div>
      </div>
    </div>
  );
}

export default Bin;
