import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="jp">
      <Head>
        <style>{`body {
            all: unset;
            overflow-y: hidden;
            font-family: 'Noto Serif JP', serif, Arial, Helvetica, sans-serif;
          }
          input {
            outline: 0;
          }`}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
