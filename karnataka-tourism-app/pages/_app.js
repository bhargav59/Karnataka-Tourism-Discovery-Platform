import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Karnataka Tourism Discovery</title>
        <meta
          name="description"
          content="Discover Karnataka's diverse attractions - from ancient temples to modern quirky landmarks"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
