// import React from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import NavbarMobile from '../components/NavbarMobile';
import LeftMenu from '../components/LeftMenu.jsx';
import styles from '../styles/Layout.module.scss';
import Modal from '../components/Modal';
import { useSelector } from 'react-redux';
import { modalSlice } from '../redux_slices/ModalSlice';

export default function Layout({ children }) {
  const { open } = useSelector((state) => state.modal);
  return (
    <div className={styles.layout}>
      {open && <Modal />}

      <Navbar />
      <NavbarMobile />
      <Meta />
      <div className="">{children}</div>
    </div>
  );
}
