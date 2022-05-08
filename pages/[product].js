import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/ItemSingle.module.scss';
export default function Product({ prod }) {
  return (
    <div className={styles.item_single}>
      <div>
        <Link href="/">
          <a href="/">Назад</a>
        </Link>
        <h1>{prod.attributes.Name}</h1>
        <h1>{prod.attributes.Description}</h1>

        <Image
          src={`http://localhost:1337${prod.attributes.Photo.data.attributes.url}`}
          objectFit="cover"
          width="300px"
          height="300px"
        ></Image>
      </div>
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
    `http://localhost:1337/api/products?filters[id][$eq]=${product}&populate=*`
  );
  const data = await res.json();
  const prod = data.data[0];
  return {
    props: { prod },
  };
}
