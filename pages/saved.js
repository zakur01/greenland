import React from 'react';
import { useSelector } from 'react-redux';

function Saved() {
  const { saved_items } = useSelector((state) => state.savedbin);
  return (
    <div>
      {saved_items &&
        saved_items.map((item) => <h1>{item.attributes.Name}</h1>)}
    </div>
  );
}

export default Saved;
