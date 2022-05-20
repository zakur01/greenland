import axios from 'axios';
const api_url = 'http://localhost:1337/api/';

const register = async (formData) => {
  const res = await axios.post(
    'https://greenlandstrapi.herokuapp.com/api/auth/local/register',
    formData
  );
  // if (res) localStorage.setItem('user', JSON.stringify(res.data));
  if (typeof window !== 'undefined') {
    if (res) localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res;
};

const login = async (formData) => {
  const res = await axios.post(
    'https://greenlandstrapi.herokuapp.com/api/auth/local/',
    formData
  );
  if (typeof window !== 'undefined') {
    if (res) localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res;
};

const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

const authServices = {
  register,
  logout,
  login,
};

export default authServices;
