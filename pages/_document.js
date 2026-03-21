import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Basic SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Bizleap Team" />
        <meta name="publisher" content="Bizleap" />
        <meta name="google-site-verification" content="XuetXPhZawkYQinUNS-qbpYv5vrNEV4voDgVVGuAPxQ" />

        {/* Google Analytics (GA4) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=G-6Z90883EN6`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6Z90883EN6', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

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
