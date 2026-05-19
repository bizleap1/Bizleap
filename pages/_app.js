import Head from "next/head";
import { Playfair_Display, Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingButtons from "../components/FloatingButtons";
import GlobalSchema from "../components/GlobalSchema";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${playfair.variable} ${inter.variable} font-sans`}>
      <GlobalSchema />
      <Head>
        {/* Primary SEO */}
        <title key="title">Bizleap</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="description" content="Driven by Design. Backed by Results. Bizleap creates thoughtful design and digital experiences that help businesses grow." key="description" />

        {/* International & Geographic Targeting (USA, UK, UAE) */}
        <link rel="alternate" href="https://bizleap.in/" hrefLang="en-us" />
        <link rel="alternate" href="https://bizleap.in/" hrefLang="en-gb" />
        <link rel="alternate" href="https://bizleap.in/" hrefLang="en-ae" />
        <link rel="alternate" href="https://bizleap.in/" hrefLang="x-default" />
        <meta name="geo.region" content="AE-DU, GB-LND, US-NY" />
        <meta name="geo.placename" content="Dubai, London, New York" />
        <meta name="geo.position" content="25.2048;55.2708;51.5074;-0.1278;40.7128;-74.0060" />
        <meta name="ICBM" content="25.2048, 55.2708, 51.5074, -0.1278, 40.7128, -74.0060" />

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
    </div>
  );
}
