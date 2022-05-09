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
  return res;
};

const savedbinservices = {
  get,
  filter,
  addToFavorites,
};

export default savedbinservices;
