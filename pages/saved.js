import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { CleanFavorites, GetSaved } from '../redux_slices/SavedBinSlice';

function Saved() {
  const dispatch = useDispatch();
  const { saved_lil } = useSelector((state) => state.savedbin);
  const { user_id } = useSelector((state) => state.auth);
  const clean = () => {
    dispatch(CleanFavorites());
    if (typeof window !== 'undefined') {
      localStorage.removeItem('favorites');
    }
    const formData = {
      saved_items: [],
    };
    const res = async () =>
      await axios.put('http://localhost:1337/api/users/' + user_id, formData);
    res();
  };
  useEffect(() => {
    dispatch(GetSaved(user_id));
  }, [clean]);
  return (
    <div>
      {saved_lil.data &&
        saved_lil.data.map((item) => <h1>{item.attributes.Name}</h1>)}
      <button onClick={clean}>Очистить</button>
    </div>
  );
}

export default Saved;
