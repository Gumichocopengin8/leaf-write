import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="jp">
      <Head>
        <style>{`body {
            all: unset;
            font-family: 'Noto Serif JP', serif, Arial, Helvetica, sans-serif;
            overflow-y: scroll;
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
