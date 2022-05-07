import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector, useRef } from 'react-redux';
import { useRouter } from 'next/router';
import { RegAuth } from '../redux_slices/AuthSlice';
import styles from '../styles/Register.module.scss';
import axios from 'axios';

function Registration({ setModule, changeHovered }) {
  const router = useRouter();
  //   const { User } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { email, password, username } = formData;
  const inputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const regPayload = {
    username: username,
    email: email,
    password: password,
  };
  //   const initialMount = useRef(true);
  //   useEffect(() => {
  //     if (initialMount.current) {
  //       initialMount.current = false;
  //     } else {
  //       setModule(true);
  //       setTimeout(() => {
  //         setModule(false);
  //       }, 2500);

  //       setTimeout(() => {
  //         navigate('/');
  //       }, 2550);
  //     }
  //   }, [User]);
  const regSubmit = async (e) => {
    e.preventDefault();
    dispatch(RegAuth(regPayload));
    router.push('/');
  };

  return (
    <div className={styles.reg_container}>
      <form action="" onSubmit={regSubmit}>
        <label htmlFor="">Юзернейм</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={inputChange}
        />
        <label htmlFor="">Почта</label>

        <input type="email" name="email" value={email} onChange={inputChange} />
        <label htmlFor="">Пароль</label>

        <input
          type="password"
          name="password"
          value={password}
          onChange={inputChange}
        />

        <button type="submit" className="login_button">
          Регистрация
        </button>
      </form>
    </div>
  );
}

export default Registration;
