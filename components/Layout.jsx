// import React from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import NavbarMobile from '../components/NavbarMobile';
import LeftMenu from '../components/LeftMenu.jsx';
import styles from '../styles/Layout.module.scss';

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <NavbarMobile />
      <Meta />
      <div className="">{children}</div>
    </div>
  );
}
