import '../styles/globals.css';
import Layout from '../components/Layout';
import LeftMenu from '../components/LeftMenu.jsx';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <div className="flex">
        <LeftMenu />

        <Component {...pageProps} />
      </div>
    </Layout>
  );
}

export default MyApp;
