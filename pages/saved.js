import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CleanFavorites } from '../redux_slices/SavedBinSlice';

function Saved() {
  const dispatch = useDispatch();
  const { saved_items } = useSelector((state) => state.savedbin);
  const clean = () => {
    dispatch(CleanFavorites());
  };
  return (
    <div>
      {saved_items &&
        saved_items.map((item) => <h1>{item.attributes.Name}</h1>)}
      <button onClick={clean}>Очистить</button>
    </div>
  );
}

export default Saved;
