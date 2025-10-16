// pages/_app.js
import Head from "next/head";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingButtons from "../components/FloatingButtons";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Tab Title */}
        <title>Bizleap</title>

        {/* Meta Description */}
        <meta name="description" content="Bizleap - Where Brands Leap Forward" />

        {/* Favicon */}
        <link rel="icon" href="/favicon2.png" />
      </Head>

      {/* Layout */}
      <Navbar />
      <main className="min-h-screen">
        <Component {...pageProps} />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
