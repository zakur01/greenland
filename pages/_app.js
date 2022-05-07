import '../styles/globals.css';
import Layout from '../components/Layout';
import LeftMenu from '../components/LeftMenu.jsx';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';

function MyApp({ Component, pageProps }) {
  const [list, setList] = useState();
  return (
    <Provider store={store}>
      <Layout>
        <div className="flex">
          <LeftMenu />

          <Component {...pageProps} />
        </div>
      </Layout>
    </Provider>
  );
}

export default MyApp;
