import Head from 'next/head';

const GlobalSchema = () => {
    const siteUrl = "https://bizleap.in";
    const brandName = "Bizleap";
    
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${siteUrl}/#organization`,
                "name": brandName,
                "url": siteUrl,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${siteUrl}/2.png`,
                    "width": "140",
                    "height": "50"
                },
                "sameAs": [
                    "https://www.instagram.com/bizleap.in/",
                    "https://www.linkedin.com/company/bizleap1/",
                    "https://www.facebook.com/bizleap.in/"
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-70970-95152",
                    "contactType": "customer service",
                    "email": "bizleapinc@gmail.com",
                    "areaServed": "IN",
                    "availableLanguage": ["English", "Hindi"]
                }
            },
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                "url": siteUrl,
                "name": brandName,
                "description": "Bizleap is a digital marketing and web development agency helping brands grow online through SEO, modern websites, creative design, and technology-driven solutions.",
                "publisher": { "@id": `${siteUrl}/#organization` },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${siteUrl}/?s={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "ProfessionalService",
                "@id": `${siteUrl}/#localbusiness`,
                "name": `${brandName} Studio`,
                "image": `${siteUrl}/og-image.png`,
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
                "url": siteUrl,
                "telephone": "+91-70970-95152",
                "priceRange": "$$",
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        "opens": "10:00",
                        "closes": "19:00"
                    }
                ]
            },
            {
                "@type": "Service",
                "name": "UI/UX & Web Design",
                "serviceType": "Design",
                "provider": { "@id": `${siteUrl}/#organization` },
                "description": "End-to-end digital design from wireframes to polished interfaces. We create intuitive, visually appealing experiences for websites and apps.",
                "url": `${siteUrl}/webdesign`
            },
            {
                "@type": "Service",
                "name": "Brand Identity Design",
                "serviceType": "Branding",
                "provider": { "@id": `${siteUrl}/#organization` },
                "description": "Comprehensive branding packages including logos, style guides, and asset kits. We craft cohesive visual identities that communicate your brand’s essence.",
                "url": `${siteUrl}/brandidentity`
            },
            {
                "@type": "Service",
                "name": "Social Media Marketing",
                "serviceType": "Marketing",
                "provider": { "@id": `${siteUrl}/#organization` },
                "description": "Full-service social media management—from organic content creation to paid campaigns. We build engaging narratives and measurable strategies.",
                "url": `${siteUrl}/socialmedia`
            },
            {
                "@type": "Service",
                "name": "SEO & Website Audits",
                "serviceType": "SEO",
                "provider": { "@id": `${siteUrl}/#organization` },
                "description": "Data-driven SEO audits and optimizations to improve rankings. We analyze technical health, content gaps, and backlink profiles.",
                "url": `${siteUrl}/seowebsite`
            },
            {
                "@type": "Service",
                "name": "AI Services",
                "serviceType": "Technology",
                "provider": { "@id": `${siteUrl}/#organization` },
                "description": "Integrating cutting-edge AI into business workflows—from intelligent chatbots to generative content engines.",
                "url": `${siteUrl}/aiservices`
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
