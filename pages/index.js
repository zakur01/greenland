import Head from 'next/head';

import Image from 'next/image';
import Link from 'next/link';
import Main from '../components/Main.jsx';

import styles from '../styles/Home.module.css';

export default function Home({ items }) {
  return (
    <div className={styles.container}>
      <Main items={items} />
      {/* <h1>Hello world</h1>
      <div className="">
        {products &&
          products.map((product) => (
            <Link href={`/${product.id}`} key={product.id}>
              <a>
                <p>{product.id}</p>
                <p>{product.attributes.Name}</p>
                <p>
                  {product.attributes.user_product.data &&
                    product.attributes.user_product.data.attributes.username}
                </p>
              </a>
            </Link>
          ))}
      </div> */}
    </div>
  );
}
export async function getStaticProps() {
  const res = await fetch(
    'https:/greenlandstrapi.herokuapp.com/api/products?populate=*'
  );
  const data = await res.json();
  const items = data.data;
  // console.log
  return {
    props: { items },
  };
}

// export async function getStaticProps() {
//   // продукция
//   const res = await fetch('http://localhost:1337/api/products?populate=*');
//   const data = await res.json();
//   const products = data.data;
//   console.log(products.data);

//   return {
//     props: { products },
//   };
// }
