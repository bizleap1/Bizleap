import Head from "next/head";
import AboutSection from "../components/AboutSection";
import ClientsSection from "../components/ClientsSection";
import StickyHeroSection from "../components/StickyHeroSection";
import MediaSection from "../components/MediaSection";
import PortfolioCard from "../components/PortfolioCard";
import ServicesSection2 from "../components/Services";
import Stats from "../components/Stats";

import Work from "../components/Work";
import BrandSlider from "../components/Logo";

export default function Home() {
  return (
    <>
    <Head>
        <title key="title">Bizleap - Where Brands Leap Forward</title>
        <meta name="description" content="Bizleap is a digital marketing and web development agency helping brands grow online through SEO, modern websites, creative design, and technology-driven solutions." key="description" />
        <link rel="canonical" href="https://bizleap.in/" />
        <meta
          name="keywords"
          content="bizleap, digital marketing, web development, branding, seo services, B2B web design USA, creative design London UK, SEO agency Dubai UAE, global brand growth"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://bizleap.in/#webpage",
                  "url": "https://bizleap.in/",
                  "name": "Bizleap - Where Brands Leap Forward",
                  "description": "Bizleap is a digital marketing and web development agency helping brands grow online through SEO, modern websites, creative design, and technology-driven solutions.",
                  "isPartOf": { "@id": "https://bizleap.in/#website" },
                  "about": { "@id": "https://bizleap.in/#organization" },
                  "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bizleap.in/" }
                    ]
                  }
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What services does Bizleap offer?",
                      "acceptedAnswer": { "@type": "Answer", "text": "Bizleap offers UI/UX & Web Design, Brand Identity Design, SEO & Website Audits, Social Media Marketing, AI Services, and Influencer Marketing." }
                    },
                    {
                      "@type": "Question",
                      "name": "Where is Bizleap located?",
                      "acceptedAnswer": { "@type": "Answer", "text": "Bizleap is located at 8, Wardha Rd, Near Sai Mandir, Sawarkar Nagar, Gajanan Nagar, Nagpur, Maharashtra 440015, India." }
                    },
                    {
                      "@type": "Question",
                      "name": "How can I contact Bizleap?",
                      "acceptedAnswer": { "@type": "Answer", "text": "You can reach Bizleap at +91 70970 95152 or via email at bizleapinc@gmail.com." }
                    }
                  ]
                }
              ]
            })
          }}
        />
      </Head>
    <section>
      <StickyHeroSection/>
      <BrandSlider/>
      <AboutSection/>
      <Stats/>
      
      <ServicesSection2/>
      
      
      <Work/>
      <MediaSection/>
      <ClientsSection/>
      
    
    </section>
    </>
  )
}
