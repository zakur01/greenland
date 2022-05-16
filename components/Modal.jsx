import React from 'react';
import styles from '../styles/Modal.module.scss';
import { useSelector } from 'react-redux';

function Modal() {
  const { message } = useSelector((state) => state.modal);
  return (
    <div className={styles.modal}>
      <h1>{message}</h1>
      {/* <h1>Привет</h1> */}
    </div>
  );
}

export default Modal;
