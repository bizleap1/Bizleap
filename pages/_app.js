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
        {/* Primary SEO */}
        <title>Bizleap</title>
        <meta
          name="description"
          content="Driven by Design. Backed by Results. Bizleap creates thoughtful design and digital experiences that help businesses grow."
        />

        {/* Open Graph (Google / WhatsApp / LinkedIn) */}
        <meta property="og:title" content="Bizleap" />
        <meta
          property="og:description"
          content="Driven by Design. Backed by Results. Thoughtful design and digital experiences that help businesses grow."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bizleap.in/" />
        <meta
          property="og:image"
          content="https://bizleap.in/og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bizleap" />
        <meta
          name="twitter:description"
          content="Driven by Design. Backed by Results."
        />
        <meta
          name="twitter:image"
          content="https://bizleap.in/og-image.png"
        />

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
