import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Basic SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Bizleap Team" />
        <meta name="publisher" content="Bizleap" />

        {/* Canonical */}
        <link rel="canonical" href="https://bizleap.in/" />

        {/* Favicon */}
        <link rel="icon" href="/favicon2.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
