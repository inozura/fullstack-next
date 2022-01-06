import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <Head>
        <title>JOBpost</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
