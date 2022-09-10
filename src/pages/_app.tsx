//Components
import Head from "next/head";

//Styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../../styles/globals.css";
import "../../styles/taildwind.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href={"/data-curso-frontend/favicon.png"} />
        <title>Data curso CRUD Users</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="Data curso CRUD Users"
          content="Web site created using NextJs, and own API on Strapi"
        />
        <meta name="theme-color" content="#000000" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
