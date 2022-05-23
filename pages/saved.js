import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { CleanFavorites, GetSaved } from '../redux_slices/SavedBinSlice';

function Saved() {
  const dispatch = useDispatch();
  const { saved_lil } = useSelector((state) => state.savedbin);
  const { user_id } = useSelector((state) => state.auth);
  const [savedlist, setSavedlist] = useState([]);
  const clean = () => {
    const formData = {
      saved_items: [],
    };
    const res = async () =>
      await axios.put(
        'https://greenlandstrapi.herokuapp.com/api/users/' + user_id,
        formData
      );
    res();
    const res2 = async () => {
      return await axios
        .get(
          `https://greenlandstrapi.herokuapp.com/api/users/${user_id}?populate=*`
        )
        .then((ress) => setSavedlist(ress.data.saved_items));
    };
    setTimeout(() => {
      res2();
    }, 1500);
  };

  useEffect(() => {
    // dispatch(GetSaved(user_id));
    const res = async () => {
      return await axios
        .get(
          `https://greenlandstrapi.herokuapp.com/api/users/${user_id}?populate=*`
        )
        .then((ress) => setSavedlist(ress.data.saved_items));
    };
    res();
    console.log(savedlist);
    // setSavedlist(res.data.saved_items);
  }, []);

  return (
    <div>
      {savedlist.data == null && savedlist.data == undefined
        ? '2'
        : savedlist.data.map((item, index) => (
            <h1 key={index}>{item.attributes.Name}</h1>
          ))}
      <button onClick={clean}>Очистить</button>
    </div>
  );
}

export default Saved;
