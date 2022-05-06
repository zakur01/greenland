// import Link from 'next/link';
// import styles from '../styles/Product.module.scss';
// export default function Product({ prod }) {
//   return (
//     <div className={styles.product}>
//       <Link href="/">
//         <a href="">Go home</a>
//       </Link>
//       <h1>{prod.attributes.Name}</h1>
//       <h1>{prod.id}</h1>
//     </div>
//   );
// }

import Link from 'next/link';
import styles from '../styles/ItemSingle.module.scss';
export default function Product({ prod }) {
  return (
    <div className={styles.item_single}>
      <Link href="/">
        <a href="/">Назад</a>
      </Link>
      <h1>{prod.attributes.Name}</h1>
      <h1>{prod.attributes.Description}</h1>
    </div>
  );
}
// // сколько страниц надо создать
export async function getStaticPaths() {
  const res = await fetch('http://localhost:1337/api/products?populate=*');
  const data = await res.json();
  const products = data.data;
  const paths = products.map((item) => ({
    params: { product: item.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

// // собрать данные на каждую страницу
export async function getStaticProps({ params }) {
  const { product } = params;
  const res = await fetch(
    `http://localhost:1337/api/products?filters[id][$eq]=${product}`
  );
  const data = await res.json();
  console.log(data);
  const prod = data.data[0];
  return {
    props: { prod },
  };
}
