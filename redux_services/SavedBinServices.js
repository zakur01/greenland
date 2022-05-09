import axios from 'axios';
const api_url = 'http://localhost:1337/api/';

const get = async () => {
  const res = await axios.get('http://localhost:1337/api/products?populate=*');
  return res;
};

const filter = async (filt) => {
  const res = await axios.get(
    'http://localhost:1337/api/products?filters[Category][$eq]=' +
      filt +
      '&populate=*'
  );
  return res;
};

const addToFavorites = async (title) => {
  const res = await axios.get(
    'http://localhost:1337/api/products?filters[Name][$eq]=' +
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

const savedbinservices = {
  get,
  filter,
  addToFavorites,
  // cleanFavorites,
};

export default savedbinservices;
