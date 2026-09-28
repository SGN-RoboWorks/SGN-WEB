/**
 * ─────────────────────────────────────────────────────────────
 *  SGN RoboWorks — Single source of truth for all SEO metadata.
 * ─────────────────────────────────────────────────────────────
 *  Consumed by BOTH:
 *    1. src/Seo.jsx              → applies tags at runtime (client-side nav)
 *    2. scripts/generate-seo.mjs → bakes tags into static HTML at build time
 *
 *  Plain JS (no JSX / no React) so Node can import it during the build.
 * ─────────────────────────────────────────────────────────────
 */

export const SITE = {
    name: 'SGN RoboWorks',
    legalName: 'SGN RoboWorks',
    url: 'https://www.sgnroboworks.online',
    logo: 'https://www.sgnroboworks.online/IMG-20260903-WA0018.jpg',
    email: 'sgnroboworks@gmail.com',
    phones: ['+919952915707', '+918610284297', '+916381207641'],
    locality: 'Kodungaiyur, Chennai',
    region: 'Tamil Nadu',
    postalCode: '600051',
    country: 'IN',
    // Approximate centroid of Kodungaiyur, Chennai. Replace with the exact
    // pin from your Google Business Profile once it is verified.
    geo: { lat: 13.1408, lng: 80.2497 },
    foundingYear: '2024',
    social: [
        'https://www.linkedin.com/company/sgn-roboworks/',
        'https://www.instagram.com/_.s.g.n.robo.works._/',
        'https://www.facebook.com/sgnroboworks',
        'https://www.youtube.com/@SGNRoboWorks',
    ],
};

/** Places we sell to / deliver to — drives local relevance signals. */
export const AREAS_SERVED = [
    'Chennai', 'Tamil Nadu', 'Coimbatore', 'Madurai', 'Tiruchirappalli',
    'Salem', 'Tirunelveli', 'Vellore', 'Erode', 'Puducherry', 'India',
];

/** Catalogue used for the Store / ItemList structured data. */
export const SERVICE_CATEGORIES = [
    {
        name: 'IoT & Robotics Consultation Solutions',
        desc: 'Expert consultation and custom robotics, IoT and embedded systems for industrial, business and institutional applications.',
    },
    {
        name: 'AI-Based Products',
        desc: 'Natural Language Processing, Machine Learning, Deep Learning, Reinforcement Learning and Large Language Model solutions for real-world applications.',
    },
    {
        name: 'Industrial Automation',
        desc: 'PLC, SCADA, sensor-driven process control and custom automation systems for SMEs and manufacturing units.',
    },
    {
        name: 'Hydroponics, Aeroponics & Aquaponics',
        desc: 'Custom agritech systems for commercial and home food production.',
    },
    {
        name: 'Electronics & Components Supply for Automation, Robotics, IoT & Embedded Systems',
        desc: 'Electronics, sensors, microcontrollers, development boards, motor drivers and modules supplied for automation, robotics, IoT and embedded systems across Tamil Nadu.',
    },
];

/**
 * Per-route metadata.
 * Titles: front-load the keyword, brand last, so Google keeps the weight.
 * Descriptions: 150-160 chars, keyword-led, ending in a call to action.
 */
export const PAGES = {
    '/': {
        title: 'Robotics, IoT, AI & Automation Services in Chennai | SGN RoboWorks',
        description:
            'SGN RoboWorks delivers robotics, IoT, embedded, AI, industrial automation and electronics and components supply from Chennai across Tamil Nadu and India.',
        keywords: [
            'robotics company chennai', 'iot solutions chennai', 'industrial automation tamil nadu',
            'embedded systems chennai', 'ai solutions tamil nadu', 'electronics components supply chennai',
            'aquaponics systems tamil nadu', 'hydroponics chennai', 'aeroponics tamil nadu',
        ],
        image: '/IMG-20260903-WA0018.jpg',
    },
    '/about': {
        title: 'About SGN RoboWorks | Robotics & IoT Solutions, Chennai',
        description:
            'SGN RoboWorks is a Chennai based robotics, IoT, embedded and AI engineering company delivering automation, agritech and electronics and components supply across Tamil Nadu.',
        keywords: [
            'sgn roboworks chennai', 'robotics company chennai', 'iot company tamil nadu',
            'embedded systems company chennai', 'industrial automation company chennai',
        ],
        image: '/IMG-20260903-WA0018.jpg',
    },
    '/service': {
        title: 'Robotics, IoT, AI & Automation Services | Chennai',
        description:
            'Explore robotics, IoT, embedded, AI, industrial automation, agritech and electronics and components supply from SGN RoboWorks in Chennai.',
        keywords: [
            'robotics services chennai', 'embedded systems services tamil nadu', 'industrial automation chennai',
            'ai products chennai', 'electronics components supply tamil nadu', 'aquaponics systems chennai',
            'custom embedded system development', 'aeroponics tamil nadu',
        ],
        image: '/IMG-20260903-WA0018.jpg',
    },
        '/components': {
        title: 'Hydroponics & Aquaponics Components | SGN RoboWorks Chennai',
        description:
            'Explore essential hydroponic, aquaponics, mariculture and biofloc components, sensors, pumps and filters supplied by SGN RoboWorks in Chennai, Tamil Nadu.',
        keywords: [
            'aquaponics components chennai', 'hydroponics components tamil nadu', 'ph sensor aquaponics',
            'tds ec sensor hydroponics', 'dissolved oxygen sensor', 'aquaponics water pump',
            'settling filter biofloc', 'nft grow bed channels chennai',
        ],
        image: '/IMG-20260903-WA0018.jpg',
    },
    '/contact': {
        title: 'Contact SGN RoboWorks Chennai | Technology & Automation Services',
        description:
            'Contact SGN RoboWorks, Kodungaiyur, Chennai 600051, for robotics, IoT, embedded, AI, automation and electronics and components supply across Tamil Nadu and India.',
        keywords: [
            'sgn roboworks contact', 'electronics components supply chennai',
            'automation company kodungaiyur chennai', 'robotics services chennai',
        ],
        image: '/IMG-20260903-WA0018.jpg',
    },
};

export const ROUTES = Object.keys(PAGES);

/**
 * FAQ content for /contact.
 *
 * Lives here, not in Contact.jsx, so the text on the page and the FAQPage
 * structured data are the same strings. Google demotes FAQ rich results when
 * the markup does not match the visible answer, so they must not drift.
 */
export const FAQS = [
    {
        q: 'What technology solutions does SGN RoboWorks provide?',
        a: 'We design and deliver custom robotics, embedded systems, IoT, AI, industrial automation and agritech solutions. Each solution is tailored to the application, with the required hardware, software, documentation and support.',
    },
    {
        q: 'Do you supply electronics and components for automation, robotics, IoT and embedded systems in Chennai?',
        a: 'Yes. We supply electronics and components for automation, robotics, IoT and embedded systems, including sensors, microcontrollers, Arduino, ESP32, STM32 and Raspberry Pi boards, motor drivers, displays and modules. We are based in Kodungaiyur, Chennai and deliver across Tamil Nadu and the rest of India.',
    },
    {
        q: 'Do you deliver outside Chennai, and how do I place an order?',
        a: 'We have no walk-in showroom, so orders are placed by phone, WhatsApp or the contact form on this page, and shipped to you. We deliver across Chennai, Coimbatore, Madurai, Trichy, Salem and the whole of Tamil Nadu, and to the rest of India. Call +91 99529 15707 or email sgnroboworks@gmail.com to get started.',
    },
    {
        q: 'Do you build custom technology and industrial automation systems?',
        a: 'Yes. We design complete intelligent systems combining AI, IoT, automation, security and system architecture, including PLC and SCADA based industrial automation, smart agriculture, hydroponics, aeroponics and aquaponics. We work with startups, SMEs and enterprises and tailor every solution to its specific purpose.',
    },
];

export const faqSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
});

const abs = (path) => (path.startsWith('http') ? path : SITE.url + path);

/* ── Structured data ────────────────────────────────────────── */

/**
 * OnlineStore, not LocalBusiness: SGN RoboWorks has no walk-in storefront —
 * orders are taken remotely and delivered. Declaring a physical store you do
 * not operate is what gets local listings suppressed.
 */
export const organizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    '@id': SITE.url + '/#organization',
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: { '@type': 'ImageObject', url: SITE.logo },
    image: SITE.logo,
    email: SITE.email,
    telephone: SITE.phones[0],
    foundingDate: SITE.foundingYear,
    description:
        'SGN RoboWorks delivers robotics, IoT, embedded, AI, industrial automation, agritech and electronics and components supply for industries, startups and institutions across Chennai and Tamil Nadu.',
    address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.locality,
        addressRegion: SITE.region,
        postalCode: SITE.postalCode,
        addressCountry: SITE.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: AREAS_SERVED.map((a) => ({ '@type': 'Place', name: a })),
    contactPoint: SITE.phones.map((tel) => ({
        '@type': 'ContactPoint',
        telephone: tel,
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['en', 'ta'],
    })),
    sameAs: SITE.social,
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Bank Transfer',
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Robotics, IoT, Embedded, AI and Automation Services',
        itemListElement: SERVICE_CATEGORIES.map((c, i) => ({
            '@type': 'Offer',
            position: i + 1,
            itemOffered: {
                '@type': 'Service',
                name: c.name,
                description: c.desc,
                areaServed: { '@type': 'Country', name: 'India' },
                provider: { '@id': SITE.url + '/#organization' },
            },
        })),
    },
});

export const websiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE.url + '/#website',
    url: SITE.url,
    name: SITE.name,
    inLanguage: 'en-IN',
    publisher: { '@id': SITE.url + '/#organization' },
});

export const breadcrumbSchema = (path) => {
    const labels = { '/': 'Home', '/about': 'About', '/service': 'Services', '/components': 'Components', '/contact': 'Contact' };
    const items = [{ name: 'Home', item: SITE.url + '/' }];
    if (path !== '/') items.push({ name: labels[path] || path, item: abs(path) });
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: it.name,
            item: it.item,
        })),
    };
};

/** Rich result: the service categories offered. */
export const catalogSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Service categories available from SGN RoboWorks',
        itemListElement: SERVICE_CATEGORIES.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        description: c.desc,
    })),
});

/** Assembles every JSON-LD block a given route should emit. */
export const schemasFor = (path) => {
    const blocks = [organizationSchema(), websiteSchema(), breadcrumbSchema(path)];
    if (path === '/service' || path === '/') blocks.push(catalogSchema());
    if (path === '/contact') blocks.push(faqSchema());
    return blocks;
};

/** Flat list of head tags for a route — used by both consumers. */
export const metaFor = (path) => {
    const page = PAGES[path] || PAGES['/'];
    const canonical = path === '/' ? SITE.url + '/' : abs(path);
    return {
        title: page.title,
        canonical,
        meta: [
            { name: 'description', content: page.description },
            { name: 'keywords', content: page.keywords.join(', ') },
            { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
            { name: 'author', content: SITE.name },
            { name: 'geo.region', content: 'IN-TN' },
            { name: 'geo.placename', content: 'Chennai' },
            { name: 'geo.position', content: SITE.geo.lat + ';' + SITE.geo.lng },
            { name: 'ICBM', content: SITE.geo.lat + ', ' + SITE.geo.lng },
            { property: 'og:type', content: path === '/' ? 'website' : 'article' },
            { property: 'og:site_name', content: SITE.name },
            { property: 'og:locale', content: 'en_IN' },
            { property: 'og:title', content: page.title },
            { property: 'og:description', content: page.description },
            { property: 'og:url', content: canonical },
            { property: 'og:image', content: abs(page.image) },
            { property: 'og:image:alt', content: SITE.name + ', robotics, IoT, embedded and AI solutions, Chennai' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: page.title },
            { name: 'twitter:description', content: page.description },
            { name: 'twitter:image', content: abs(page.image) },
        ],
        schemas: schemasFor(path),
    };
};
