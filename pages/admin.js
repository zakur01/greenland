import React from 'react';
import { useSelector } from 'react-redux';

function Admin({}) {
  const { User } = useSelector((state) => state.auth);
  return (
    <div>
      <h1>{User ? User : ''}</h1>
    </div>
  );
}

export default Admin;
