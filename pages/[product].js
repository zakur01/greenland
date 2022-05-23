import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import styles from '../styles/ItemSingle.module.scss';
import { useRouter } from 'next/router';
import { Router } from 'react-router-dom';
export default function Product({ prod }) {
  const router = useRouter();
  const addToBin = () => {
    const res = async () => {
      await axios
        .get(
          'https://greenlandstrapi.herokuapp.com/api/products?filters[id][$eq]=' +
            prod.id +
            '&populate=*'
        )
        .then((res) => {
          let oldLocal = JSON.parse(localStorage.getItem('bin'));
          if (oldLocal == null) oldLocal = [];
          oldLocal.push(res.data.data);
          localStorage.setItem('bin', JSON.stringify(oldLocal));
        });
    };
    res();
    if (typeof window !== 'undefined') {
      localStorage.getItem('bin');
    }
    // alert('hello');
  };
  return (
    <div className={styles.item_single}>
      <div className={styles.item}>
        <div href="/" onClick={() => router.back()}>
          Назад
        </div>
        <h1>{prod.attributes.Name}</h1>
        <h1>{prod.attributes.Description}</h1>
        <h1>{prod.attributes.Price}c.</h1>

        <Link href={prod.attributes.Photo.data.attributes.url}>
          <Image
            src={prod.attributes.Photo.data.attributes.url}
            objectFit="cover"
            width="300px"
            height="300px"
          ></Image>
        </Link>
        <button onClick={addToBin}>В корзину</button>
      </div>
    </div>
  );
}
// // сколько страниц надо создать
export async function getStaticPaths() {
  const res = await fetch(
    'https://greenlandstrapi.herokuapp.com/api/products?populate=*'
  );
  const data = await res.json();
  const products = data.data;
  const paths = products.map((item) => ({
    params: { product: item.id.toString() },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}

// // собрать данные на каждую страницу
export async function getStaticProps({ params }) {
  const { product } = params;
  const res = await fetch(
    `https://greenlandstrapi.herokuapp.com/api/products?filters[id][$eq]=${product}&populate=*`
  );
  const data = await res.json();
  const prod = data.data[0];
  return {
    props: { prod },
    revalidate: 30,
  };
}
