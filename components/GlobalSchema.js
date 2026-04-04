import Head from 'next/head';

const GlobalSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://bizleap.in/#organization",
        "name": "Bizleap",
        "url": "https://bizleap.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bizleap.in/2.png",
          "width": "140",
          "height": "50"
        },
        "sameAs": [
          "https://www.instagram.com/bizleap.in/",
          "https://www.linkedin.com/company/bizleap1/"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-70970-95152",
          "contactType": "customer service",
          "email": "bizleapinc@gmail.com"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://bizleap.in/#website",
        "url": "https://bizleap.in",
        "name": "Bizleap",
        "publisher": { "@id": "https://bizleap.in/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://bizleap.in/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://bizleap.in/#localbusiness",
        "name": "Bizleap Studio",
        "image": "https://bizleap.in/og-image.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, Wardha Rd, Near Sai Mandir, Sawarkar Nagar, Gajanan Nagar",
          "addressLocality": "Nagpur",
          "addressRegion": "Maharashtra",
          "postalCode": "440015",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "21.107778",
          "longitude": "79.055833"
        },
        "url": "https://bizleap.in",
        "telephone": "+91-70970-95152",
        "priceRange": "$$",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "10:00",
          "closes": "19:00"
        }
      },
      {
        "@type": "Service",
        "name": "UI/UX & Web Design",
        "provider": { "@id": "https://bizleap.in/#organization" },
        "description": "End-to-end digital design from wireframes to polished interfaces. We create intuitive, visually appealing experiences for websites and apps."
      },
      {
        "@type": "Service",
        "name": "Social Media Marketing",
        "provider": { "@id": "https://bizleap.in/#organization" },
        "description": "Full-service social media management—from organic content creation to paid campaigns. We build engaging narratives and measurable strategies."
      },
      {
        "@type": "Service",
        "name": "SEO & Website Audits",
        "provider": { "@id": "https://bizleap.in/#organization" },
        "description": "Data-driven SEO audits and optimizations to improve rankings. We analyze technical health, content gaps, and backlink profiles."
      }
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

export default GlobalSchema;
