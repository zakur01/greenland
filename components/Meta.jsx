import React from 'react';
import Head from 'next/head';

function Meta({ title, description, keywords }) {
  return (
    <Head>
      <style>
        @import
        url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap");
      </style>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
}

Meta.defaultProps = {
  title: 'Greenland',
  description: 'Онлайн магазин здоровья и красоты',
  keywords: 'косметика здоровье бишкек красота',
};
export default Meta;
