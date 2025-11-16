import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/AuthContext";
import { LanguageProvider } from "../contexts/LanguageContext";

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Head>
          <title>
            ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ ಅನ್ವೇಷಣೆ - Karnataka Tourism Discovery
          </title>
          <meta
            name="description"
            content="ಕರ್ನಾಟಕದ ವೈವಿಧ್ಯಮಯ ಆಕರ್ಷಣೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ - Discover Karnataka's diverse attractions"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default MyApp;
