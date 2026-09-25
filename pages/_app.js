import Head from "next/head";
import { Playfair_Display, Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingButtons from "../components/FloatingButtons";
import GlobalSchema from "../components/GlobalSchema";
import { useEffect } from "react";
import Lenis from "lenis";
import { useRouter } from "next/router";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Super smooth "makhan" duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true, // Enable for mobile/iOS
      touchMultiplier: 2, // Make mobile feel responsive
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleRouteChange = () => {
      lenis.scrollTo(0, { immediate: true });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      lenis.destroy();
    };
  }, [router.events]);

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
        <meta property="og:title" content="Bizleap" key="og:title" />
        <meta
          property="og:description"
          content="Driven by Design. Backed by Results. Thoughtful design and digital experiences that help businesses grow."
          key="og:description"
        />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:url" content="https://bizleap.in/" key="og:url" />
        <meta
          property="og:image"
          content="https://bizleap.in/og-image.png"
          key="og:image"
        />
        <meta property="og:image:width" content="1200" key="og:image:width" />
        <meta property="og:image:height" content="630" key="og:image:height" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content="Bizleap" key="twitter:title" />
        <meta
          name="twitter:description"
          content="Driven by Design. Backed by Results."
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content="https://bizleap.in/og-image.png"
          key="twitter:image"
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
