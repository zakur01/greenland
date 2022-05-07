import React from 'react';

function Admin({ user }) {
  return <div></div>;
}

// взять информацию о юзере
export async function getStaticProps() {
  const res = await fetch('http://localhost:1337/api/me');
  const data = res.json();
  const user = data.data;
  return {
    props: { user },
  };
}

export default Admin;
