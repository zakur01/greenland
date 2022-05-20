import React from 'react';

function Admin({ user }) {
  return <div></div>;
}

// взять информацию о юзере
export async function getStaticProps() {
  const res = await fetch('https://greenlandstrapi.herokuapp.com/api/me');
  const data = res.json();
  const user = data.data;
  return {
    props: { user },
  };
}

export default Admin;
