import axios from 'axios';
const api_url = 'http://localhost:1337/api/';

const get = async () => {
  const res = await axios.get(
    'https://greenlandstrapi.herokuapp.com/api/products?populate=*'
  );
  return res;
};

const getSaved = async (user_id) => {
  const res = await axios.get(
    `https://greenlandstrapi.herokuapp.com/api/users/${user_id}`
  );
  return res;
};

const filter = async (filt) => {
  const res = await axios.get(
    'https://greenlandstrapi.herokuapp.com/api/products?filters[Category][$eq]=' +
      filt +
      '&populate=*'
  );
  return res;
};

const addToFavorites = async (title) => {
  const res = await axios.get(
    'https://greenlandstrapi.herokuapp.com/api/products?filters[Name][$eq]=' +
      title +
      '&populate=*'
  );
  if (typeof window !== 'undefined') {
    let oldFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (oldFavorites == null) oldFavorites = [];
    console.log(oldFavorites);
    console.log(res.data.data[0]);
    oldFavorites.push(res.data.data[0]);
    localStorage.setItem('favorites', JSON.stringify(oldFavorites));
  }
  return res;
};

const addToDb = async (title) => {
  const item = await axios.get(
    'http://localhost:1337/api/products?filters[Name][$eq]=' +
      title +
      '&populate=*'
  );
  const formData = {
    saved_items: item.data,
  };
  const res = await axios.put('http://localhost:1337/api/users/7', formData);
  return res;
};

const savedbinservices = {
  get,
  getSaved,
  filter,
  addToFavorites,
  addToDb,
  // cleanFavorites,
};

export default savedbinservices;
