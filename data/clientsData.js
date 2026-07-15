

const contextBackgrounds = {
  "Food & Beverages": [
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
  ],
  "Education & Technology": [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
  ],
  "Fitness & Health": [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80"
  ],
  "Corporate & Industries": [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
  ],
  "Fashion, Cosmetics & Jewellery": [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80"
  ],
  "Real Estate": [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
  ],
  "Export": [
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80",
    "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
    "https://images.unsplash.com/photo-1501523461466-41712a832bc9?w=800&q=80"
  ]
};

const categoryBackgrounds = {
  "Food & Beverages": "/images/food_bg.png",
  "Education & Technology": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
  "Fitness & Health": "/images/fitness_bg.png",
  "Corporate & Industries": "/images/at_buildcon_bg.png",
  "Fashion, Cosmetics & Jewellery": "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&q=80",
  "Real Estate": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "Export": "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
};

const rawCategories = [
  {
    title: "Food & Beverages",
    clients: [
      { 
        name: "Barcode", logo: "/clients/barcode.png", slug: "barcode", 
        problemStatement: "Barcode needed a vibrant, energetic digital identity to match their modern pub vibe and attract younger crowds.",
        solution: "We designed a dynamic, visually stunning website and integrated a robust table reservation system.",
        results: ["30% increase in weekend reservations", "Higher social media engagement", "Streamlined booking process"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://barcode.example.com"
      },
      { 
        name: "Tuli", logo: "/clients/tuli-grand.png", slug: "tuli", 
        problemStatement: "Tuli aimed to transition its premium dining experience into the digital space without losing its classic elegance.",
        solution: "Developed an elegant, high-end website focusing on rich visuals and seamless menu navigation.",
        results: ["Enhanced brand perception", "Increase in corporate event inquiries", "Mobile-optimized menu browsing"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://tuli.example.com"
      },
      { 
        name: "Lord Of The Drinks", logo: "/clients/lord-of-the-drinks.png", slug: "lord-of-the-drinks", 
        problemStatement: "As a popular franchise, they needed a localized marketing push and a website that handled high traffic volumes.",
        solution: "Created a high-performance landing page tailored for their specific outlet with fast load times.",
        results: ["Faster page load speed by 40%", "Increased local footfall", "Better SEO rankings"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://lotd.example.com"
      },
      { 
        name: "YO FO BO", logo: "/clients/yo-fo-bo.png", slug: "yo-fo-bo", 
        problemStatement: "YO FO BO struggled with online ordering integration and wanted a custom platform to bypass aggregator fees.",
        solution: "Built a fully functional e-commerce menu with direct payment gateways and order tracking.",
        results: ["Reduced commission costs by 15%", "Direct customer engagement", "Smooth checkout process"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://yofobo.example.com"
      },
      { 
        name: "Crispy Crowns", logo: "/clients/crispy-crowns.png", slug: "crispy-crowns", 
        problemStatement: "A fast-food startup needing a catchy, fun, and engaging brand identity and website to stand out.",
        solution: "Designed playful branding assets and a colorful, interactive website to showcase their menu.",
        results: ["Strong brand recall", "Increased online orders", "High user retention"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://crispycrowns.example.com"
      },
      { 
        name: "Masato", logo: "/clients/masato.png", slug: "masato", 
        problemStatement: "Masato required a sophisticated digital presence to reflect their authentic Pan-Asian culinary expertise.",
        solution: "Crafted a minimalist, culturally inspired website design emphasizing their unique dishes.",
        results: ["Elevated brand prestige", "Increase in premium bookings", "Improved mobile experience"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://masato.example.com"
      },
      { 
        name: "Masala & Morsels", logo: "/clients/masala-and-morsels.png", slug: "masala-and-morsels", 
        problemStatement: "They wanted to highlight their rich Indian heritage while appealing to a modern demographic.",
        solution: "Developed a vibrant website blending traditional motifs with modern UI/UX principles.",
        results: ["Broader audience reach", "Higher engagement on food blogs", "Improved local search visibility"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://masalamorsels.example.com"
      },
      { 
        name: "Hotel Anantara", logo: "/clients/hotel-anantara.png", slug: "hotel-anantara", 
        problemStatement: "Anantara needed an integrated platform for room bookings and dining reservations in one place.",
        solution: "Delivered a comprehensive hospitality suite with a unified booking engine.",
        results: ["20% boost in direct bookings", "Simplified user journey", "Centralized management dashboard"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://anantara.example.com"
      },
      { 
        name: "Rasoi Express", logo: "/clients/rasoi-express.png", slug: "rasoi-express", 
        problemStatement: "A cloud kitchen struggling to showcase its diverse menu items effectively on mobile devices.",
        solution: "Built a mobile-first, app-like website focused entirely on speed and easy ordering.",
        results: ["50% increase in mobile conversions", "Lower bounce rate", "Instant menu loading"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://rasoiexpress.example.com"
      },
    ],
  },
  {
    title: "Education & Technology",
    clients: [
      { 
        name: "SSit", logo: "/clients/ssit.png", slug: "ssit", 
        problemStatement: "SSit lacked a professional portal to showcase their IT training programs and handle student registrations.",
        solution: "Built a fully integrated LMS portal with seamless course browsing, video hosting, and student dashboards.",
        results: ["40% increase in online enrollments", "Reduced admin workload", "Better student retention"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://ssit.example.com"
      },
      { 
        name: "Amity", logo: "/clients/amity-unviersity.png", slug: "amity", 
        problemStatement: "Amity needed a modernized alumni network platform to connect thousands of graduates globally.",
        solution: "Developed a scalable, secure community platform featuring forums, job boards, and event management.",
        results: ["10k+ active users in month one", "High alumni engagement", "Secure data handling"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://amity.example.com"
      },
      { 
        name: "Academy Path", logo: "/clients/academypath.png", slug: "academy-path", 
        problemStatement: "Academy Path struggled with managing student counseling queries manually through emails.",
        solution: "Implemented an AI-driven chatbot and a dedicated counseling CRM tailored for educational consultants.",
        results: ["Faster query resolution", "3x more leads processed", "24/7 student support"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://academypath.example.com"
      },
      { 
        name: "Hi Tech Pathshala", logo: "/clients/hi-tech-pathshala.png", slug: "hi-tech-pathshala", 
        problemStatement: "They wanted to transition their offline tutoring business into a hybrid model with live virtual classrooms.",
        solution: "Integrated a WebRTC-based live streaming platform directly into their customized educational website.",
        results: ["Seamless remote learning", "Expanded student base across cities", "Zero third-party app dependency"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://hitechpathshala.example.com"
      },
      { 
        name: "Universal", logo: "/clients/universal-education-cosultants.png", slug: "universal", 
        problemStatement: "Universal needed a robust platform to help students search for international universities based on specific criteria.",
        solution: "Built an advanced search and filtering engine with a vast, easily updatable university database.",
        results: ["Highly intuitive user experience", "Significant traffic increase", "Higher lead conversion rate"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://universal.example.com"
      },
      { 
        name: "Takshila", logo: "/clients/takshila.png", slug: "takshila", 
        problemStatement: "Takshila sought to digitize their vast library of study materials and offer them via a secure subscription model.",
        solution: "Created a paywalled digital library with DRM protection for their proprietary PDFs and video lectures.",
        results: ["Successful monetization of content", "Zero piracy incidents", "Growing subscriber base"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://takshila.example.com"
      },
    ],
  },
  {
    title: "Fitness & Health",
    clients: [
      { 
        name: "Doc's Fitness", logo: "/clients/docs-fitness.png", slug: "docs-fitness", 
        problemStatement: "Doc's Fitness wanted a modern app-like website to allow members to book classes and track workout schedules.",
        solution: "Built a responsive, dynamic web application integrating a bespoke scheduling and membership management system.",
        results: ["50% reduction in front-desk inquiries", "Increased class attendance", "Seamless mobile experience"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://docsfitness.example.com"
      },
      { 
        name: "Marvel FItness", logo: "/clients/m.png", slug: "marvel-fitness", 
        problemStatement: "They needed a visually intense, motivating brand presence to attract serious bodybuilders and athletes.",
        solution: "Designed a dark-themed, high-energy website with video backgrounds and automated membership sign-ups.",
        results: ["Stronger brand identity", "Higher online conversion rate", "Enhanced user engagement"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://marvel.example.com"
      },
      { 
        name: "NTSW", logo: "/clients/ntsw.png", slug: "ntsw", 
        problemStatement: "NTSW required a digital platform to sell their specialized nutrition plans and fitness merchandise.",
        solution: "Developed a custom e-commerce solution tailored for digital downloads and physical product shipping.",
        results: ["New revenue stream unlocked", "Streamlined order fulfillment", "Better inventory tracking"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://ntsw.example.com"
      },
      { 
        name: "NTX", logo: "/clients/ntx.png", slug: "ntx", 
        problemStatement: "NTX, a boutique yoga studio, wanted a calming, minimalist website to reflect their wellness philosophy.",
        solution: "Crafted a serene, accessibility-focused website featuring smooth scroll animations and easy retreat bookings.",
        results: ["Improved brand perception", "Fully booked weekend retreats", "Lower bounce rate"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://ntx.example.com"
      },
      { 
        name: "Metro Dental Care", logo: "/clients/metro.png", slug: "metro-dental-care", 
        problemStatement: "Metro Dental Care lacked a patient-friendly way to schedule appointments online and view available slots.",
        solution: "Integrated a HIPAA-compliant scheduling tool into a fresh, trustworthy clinical website design.",
        results: ["30% increase in new patient bookings", "Reduced phone traffic", "Improved patient trust"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://metrodental.example.com"
      },

      { 
        name: "Fitness Kickstart", logo: "/clients/fitness-kickstart.png", slug: "fitness-kickstart", 
        problemStatement: "A new gym needing an aggressive launch campaign and a landing page optimized for lead generation.",
        solution: "Created a high-converting landing page with A/B tested copy, embedded video tours, and exit-intent popups.",
        results: ["Generated 500+ pre-launch leads", "High conversion rate", "Successful grand opening"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://fitnesskickstart.example.com"
      },
      { 
        name: "Aashwas Homoeo Care", logo: "/clients/aashwas-homeo-care.png", slug: "aashwas-homoeo-care", 
        problemStatement: "They wanted to offer tele-consultations and sell homeopathic remedies directly to patients.",
        solution: "Developed an integrated platform combining video consultation booking with a specialized e-pharmacy.",
        results: ["Expanded patient reach nationally", "Secure tele-health operations", "Steady online sales"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://aashwas.example.com"
      },
    ],
  },
  {
    title: "Fashion, Cosmetics & Jewellery",
    clients: [
      { 
        name: "AYRAK", logo: "/clients/ayrak-pharma.png", slug: "ayrak", 
        problemStatement: "AYRAK needed a B2B portal for distributors to view their cosmetic product catalogs and place bulk orders securely.",
        solution: "Built a secure, authenticated wholesale portal with tiered pricing and dynamic cosmetic inventory display.",
        results: ["Faster order processing", "Reduced manual errors", "Higher distributor satisfaction"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://ayrak.example.com"
      },
      { 
        name: "Tanvi Bhandari", logo: "/clients/tanvii.png", slug: "tanvi-bhandari", 
        problemStatement: "Fashion designer Tanvi Bhandari needed a visually stunning portfolio site to showcase her latest couture collections.",
        solution: "Created an image-centric, high-performance portfolio featuring infinite scroll and high-res image optimization.",
        results: ["Stunning visual presentation", "Faster image loading", "Increased global inquiries"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://tanvibhandari.example.com"
      },
      { 
        name: "Snuggle", logo: "/clients/snuggle.png", slug: "snuggle", 
        problemStatement: "Snuggle required a friendly, approachable e-commerce presence for their line of organic baby clothing.",
        solution: "Designed a soft-toned, highly accessible e-commerce store with secure checkout and inventory syncing.",
        results: ["High conversion rate among parents", "Seamless checkout experience", "Increased return customers"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://snuggle.example.com"
      },
      { 
        name: "Ellipses", logo: "/clients/ellipses.png", slug: "ellipses", 
        problemStatement: "Ellipses wanted to elevate their luxury cosmetics brand with an interactive AR try-on feature.",
        solution: "Integrated a cutting-edge web AR module allowing users to virtually test lipstick and eyeshadow shades.",
        results: ["40% boost in product sales", "High user engagement time", "Reduced product returns"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://ellipses.example.com"
      },
      { 
        name: "ISHIRRA", logo: "/clients/ishira.png", slug: "ishirra", 
        problemStatement: "ISHIRRA needed a bespoke e-commerce platform that felt exclusive and premium for their designer jewelry.",
        solution: "Developed a custom e-commerce solution with subtle animations and personalized shopping experiences.",
        results: ["Elevated brand prestige", "Higher average order value", "Smooth browsing experience"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://ishirra.example.com"
      },
      { 
        name: "Mahalaxmi", logo: "/clients/mahalaxmi.png", slug: "mahalaxmi", 
        problemStatement: "Mahalaxmi Jewellers wanted to digitize their vast catalog of traditional jewelry without losing their heritage feel.",
        solution: "Created a comprehensive digital catalog with advanced filtering by metal, occasion, and price.",
        results: ["Wider regional reach", "Increase in store footfall", "Simplified inventory showcase"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://mahalaxmi.example.com"
      },
      { 
        name: "Makeover Kajal", logo: "/clients/kp.png", slug: "makeover-kajal", 
        problemStatement: "A bridal makeup artist seeking to streamline appointment bookings and display before-and-after galleries.",
        solution: "Built a visually appealing booking site featuring interactive image sliders and integrated calendaring.",
        results: ["Fully booked wedding season", "Easier portfolio viewing", "Zero double-bookings"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://makeoverkajal.example.com"
      },
      { 
        name: "SEOUlUXE NAILS", logo: "/clients/seouluxe.png", slug: "seouluxe-nails", 
        problemStatement: "They wanted a trendy, Korean-inspired aesthetic for their nail salon's booking and service list website.",
        solution: "Designed a pastel-themed, highly interactive site with a live Instagram feed and online booking.",
        results: ["Strong local brand presence", "High social media interaction", "Streamlined appointments"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://seouluxenails.example.com"
      },
    ],
  },
  {
    title: "Corporate & Industries",
    clients: [
      { 
        name: "Solar Ark", logo: "/images/Solar.png", slug: "solar-ark", 
        problemStatement: "Solar Ark struggled to clearly convey their complex renewable energy solutions to commercial clients.",
        solution: "Developed a clean, corporate website with interactive ROI calculators and clear service breakdowns.",
        results: ["Increased B2B lead generation", "Better communication of value proposition", "Higher trust factor"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://solarark.example.com"
      },
      { 
        name: "Tiger Brand", logo: "/clients/tiger-brand.png", slug: "tiger-brand", 
        problemStatement: "Tiger Brand needed a robust corporate portal to manage stakeholder communications and investor relations.",
        solution: "Built a secure, enterprise-grade portal featuring real-time financial dashboards and secure document sharing.",
        results: ["Improved stakeholder transparency", "Streamlined reporting", "High security compliance"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://tigerbrand.example.com"
      },
      { 
        name: "KE", logo: "/clients/ke.png", slug: "ke", 
        problemStatement: "KE manufacturing wanted to digitalize their product catalogs and provide an online quoting system for B2B buyers.",
        solution: "Created a B2B catalog with an automated RFQ (Request for Quote) system.",
        results: ["Faster quote turnaround", "Increased global inquiries", "Reduced manual data entry"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://ke.example.com"
      },
      { 
        name: "ECE India", logo: "/clients/ece-india.png", slug: "ece-india", 
        problemStatement: "ECE India needed a professional overhaul of their outdated website to reflect their engineering expertise.",
        solution: "Redesigned the site with a modern, technical aesthetic, highlighting case studies and engineering capabilities.",
        results: ["Enhanced corporate image", "Increase in project inquiries", "Better mobile responsiveness"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://eceindia.example.com"
      },
    ],
  },
  {
    title: "Real Estate",
    clients: [
      { 
        name: "Meher Infra", logo: "/clients/meher.png", slug: "meher-infra", 
        problemStatement: "Meher Infra lacked an engaging way to present their ongoing construction projects to potential buyers.",
        solution: "Developed a dynamic real estate portfolio site with 360-degree virtual tours and interactive floor plans.",
        results: ["Higher engagement from buyers", "Increased site visits", "Premium brand positioning"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://meherinfra.example.com"
      },
      { 
        name: "A & T buildcon", logo: "/clients/a-and-t.png", slug: "a-and-t", 
        problemStatement: "They needed a reliable CRM-integrated website to capture and manage leads for their new residential towers.",
        solution: "Built a lead-generation focused landing page with deep integration into their existing Salesforce CRM.",
        results: ["30% lower cost-per-lead", "Automated lead assignment", "Improved sales pipeline"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://atbuildcon.example.com"
      },
      { 
        name: "Green Acres", logo: "/clients/greenacres.png", slug: "green-acres", 
        problemStatement: "Green Acres wanted to highlight the eco-friendly aspects of their luxury farmhouses.",
        solution: "Designed a nature-inspired, visually immersive website emphasizing sustainability and luxury living.",
        results: ["Stronger niche positioning", "Increased high-net-worth inquiries", "Beautiful visual storytelling"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://greenacres.example.com"
      },
    ],
  },
  {
    title: "Export",
    clients: [
      { 
        name: "NEW India Export", logo: "/clients/new-india-export.png", slug: "new-india", 
        problemStatement: "They required a multilingual platform to communicate with international buyers across different time zones.",
        solution: "Created a globally optimized, multilingual B2B platform with localized content and integrated logistics tracking.",
        results: ["Expanded reach into European markets", "Improved communication with buyers", "Faster load times globally"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://newindiaexport.example.com"
      },
      { 
        name: "Jain Brokers", logo: "/clients/jb.png", slug: "jain-brokers", 
        problemStatement: "Jain Brokers needed a digital trading board to display real-time commodity prices to their clients.",
        solution: "Developed a secure, real-time dashboard integrating live market data feeds and secure client login.",
        results: ["Real-time data accuracy", "High client satisfaction", "Reduced phone inquiries"],
        technologies: ['Brand Strategy', 'Web Design', 'Development'], website: "https://jainbrokers.example.com"
      },
    ],
  }
];

export const CLIENT_CATEGORIES = rawCategories.map((category) => {
  let fallbackCounter = 0;
  
  const mappedClients = category.clients.map((client, idx) => {
    let bgImage = "";
    if (idx === 0 || idx === 2) {
      bgImage = categoryBackgrounds[category.title] || "/images/food_bg.png";
    } else {
      const fallbacks = contextBackgrounds[category.title] || contextBackgrounds["Corporate & Industries"];
      bgImage = fallbacks[fallbackCounter % fallbacks.length];
      fallbackCounter++;
    }

    // Amity exception just like in work.js
    const isAmity = client.name.includes("Amity");
    if (isAmity) bgImage = client.logo;

    return {
      ...client,
      image: bgImage, // newly assigned property so [slug].js can use it!
    };
  });
  
  return {
    title: category.title,
    clients: mappedClients
  };
});

export const getAllClients = () => {
  return CLIENT_CATEGORIES.flatMap((category) => category.clients);
};

export const getClientBySlug = (slug) => {
  return getAllClients().find((client) => client.slug === slug) || null;
};
