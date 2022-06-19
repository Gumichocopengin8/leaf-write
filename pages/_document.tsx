import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="jp">
      <Head>
        <style>{`
          body {
            all: unset;
            overflow-y: hidden;
          }
          input {
            outline: 0;
          }
          `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
