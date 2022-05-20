import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoginAuth } from '../redux_slices/AuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/Register.module.scss';
import { unwrapResult } from '@reduxjs/toolkit';

function Login({ setModule, changeHovered }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token, User, message, user_id, isLoading, isAuthenticated } =
    useSelector((state) => state.auth);

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const inputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // !
  const loginPayload = {
    identifier: email,
    password: password,
  };
  const RegSubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginAuth(loginPayload))
      .then(unwrapResult)
      .catch((obj) => setError(obj.data.error.message));
    router.push('/');
  };
  // const initialMount = useRef(true);

  // useEffect(() => {
  //   if (initialMount.current) {
  //     initialMount.current = false;
  //   } else {
  //     // alert(`${User} is here`);

  //     setModule(true);
  //     setTimeout(() => {
  //       setModule(false);
  //     }, 2500);

  //     setTimeout(() => {
  //       navigate('/music');
  //     }, 2550);
  //   }
  // }, [User]);

  return (
    <div className={styles.reg_container}>
      <form action="" onSubmit={RegSubmit}>
        <label htmlFor="">Почта</label>

        <input
          type="email"
          name="email"
          value={email}
          onChange={inputChange}
          className="mb-4"
        />
        <label htmlFor="">Пароль</label>

        <input
          type="password"
          name="password"
          value={password}
          onChange={inputChange}
        />
        <button className="login_button" type="submit">
          Логин
        </button>
        <p className="text-red-500">
          {error && error == 'Invalid identifier or password'
            ? 'Неправильный пароль или логин'
            : null}
        </p>
      </form>
    </div>
  );
}

export default Login;
