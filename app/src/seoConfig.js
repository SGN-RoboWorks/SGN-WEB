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
    logo: 'https://www.sgnroboworks.online/logo.png',
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
export const PROJECT_CATEGORIES = [
    {
        name: 'Robotics Mini Projects',
        desc: 'Line follower, obstacle avoider, pick-and-place arm, hexapod and Bluetooth or RF controlled robot kits for school and college students.',
    },
    {
        name: 'Embedded System Projects',
        desc: 'Arduino, ESP32, STM32, Raspberry Pi and 8051 based embedded mini and final year projects with source code and documentation.',
    },
    {
        name: 'IoT Projects',
        desc: 'Smart agriculture, weather monitoring, health monitoring, GPS tracking and industrial IoT project kits with cloud dashboards.',
    },
    {
        name: 'AI and Machine Learning Projects',
        desc: 'Computer vision, face recognition, object detection, chatbot and predictive analytics projects delivered with trained models.',
    },
    {
        name: 'Industrial Automation Projects',
        desc: 'PLC, SCADA, sensor driven process control and custom automation systems for SMEs and manufacturing units.',
    },
    {
        name: 'Electronics Components',
        desc: 'Sensors, microcontrollers, development boards, motor drivers, modules and wholesale electronic components delivered across Tamil Nadu.',
    },
];

/**
 * Per-route metadata.
 * Titles: front-load the keyword, brand last, so Google keeps the weight.
 * Descriptions: 150-160 chars, keyword-led, ending in a call to action.
 */
export const PAGES = {
    '/': {
        title: 'Buy Robotics, IoT, Embedded & AI Projects in Chennai | SGN RoboWorks',
        description:
            'Buy ready-made robotics, IoT, embedded and AI mini projects, final year project kits and electronic components in Chennai, Tamil Nadu. Delivered across India.',
        keywords: [
            'buy electronic project kits chennai', 'iot projects chennai', 'robotics projects chennai',
            'embedded projects for students', 'final year projects chennai', 'mini projects for college students',
            'ai projects chennai', 'electronic components chennai', 'arduino projects tamil nadu',
            'engineering project centre chennai', 'school science project kits chennai',
        ],
        image: '/logo.png',
    },
    '/about': {
        title: 'About SGN RoboWorks | Robotics & IoT Project Company, Chennai',
        description:
            'SGN RoboWorks is a Chennai based robotics, IoT, embedded and AI engineering company building student project kits, automation systems and supplying electronic components across Tamil Nadu.',
        keywords: [
            'sgn roboworks chennai', 'robotics company chennai', 'iot company tamil nadu',
            'embedded systems company chennai', 'project development centre chennai',
        ],
        image: '/logo.png',
    },
    '/service': {
        title: 'Robotics, IoT, Embedded & AI Mini Projects for Students | Chennai',
        description:
            'Order robotics, embedded, IoT and AI mini projects and final year projects for college and school. Custom builds, source code, documentation and components shipped from Chennai.',
        keywords: [
            'mini projects in robotics', 'embedded mini projects', 'iot mini projects for students',
            'ai mini projects', 'final year project centre chennai', 'buy project kits online india',
            'custom embedded project development', 'electronics component supply tamil nadu',
        ],
        image: '/logo.png',
    },
    '/contact': {
        title: 'Contact SGN RoboWorks Chennai | Order Project Kits & Components',
        description:
            'Contact SGN RoboWorks, Kodungaiyur, Chennai 600051. Call +91 99529 15707 to order robotics, IoT, embedded and AI project kits or electronic components anywhere in India.',
        keywords: [
            'sgn roboworks contact', 'buy electronic components online chennai',
            'project kit shop chennai', 'electronics shop kodungaiyur chennai',
        ],
        image: '/logo.png',
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
        q: 'Can I buy ready-made robotics, IoT, embedded and AI projects from SGN RoboWorks?',
        a: 'Yes. We supply ready-made and custom-built mini projects and final year projects in robotics, embedded systems, IoT and AI for college and school students. Every project ships assembled and tested, with source code, circuit diagrams and documentation. Tell us your topic, department and budget and we will quote it.',
    },
    {
        q: 'Do you sell electronic components, sensors and development boards in Chennai?',
        a: 'Yes. We supply sensors, microcontrollers, Arduino, ESP32, STM32 and Raspberry Pi boards, motor drivers, displays and modules at retail and wholesale rates. We are based in Kodungaiyur, Chennai and deliver across Chennai, Tamil Nadu and the rest of India. Bulk orders for colleges, schools and labs are welcome.',
    },
    {
        q: 'Do you deliver outside Chennai, and how do I place an order?',
        a: 'We have no walk-in showroom, so orders are placed by phone, WhatsApp or the contact form on this page, and shipped to you. We deliver across Chennai, Coimbatore, Madurai, Trichy, Salem and the whole of Tamil Nadu, and to the rest of India. Call +91 99529 15707 or email sgnroboworks@gmail.com to get started.',
    },
    {
        q: 'Do you build custom projects and industrial automation systems as well?',
        a: 'Yes. Beyond student project kits we design complete intelligent systems combining AI, IoT, automation, security and system architecture, including PLC and SCADA based industrial automation, smart agriculture and hydroponics. We work with startups, SMEs and enterprises, and scale the same core technology to different budgets.',
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
        'SGN RoboWorks builds and supplies robotics, IoT, embedded and AI mini projects, final year project kits, automation systems and electronic components for students, colleges, schools and industries across Chennai and Tamil Nadu.',
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
        name: 'Robotics, IoT, Embedded and AI Projects & Components',
        itemListElement: PROJECT_CATEGORIES.map((c, i) => ({
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
    const labels = { '/': 'Home', '/about': 'About', '/service': 'Services', '/contact': 'Contact' };
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

/** Rich result: the project categories offered. */
export const catalogSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Project categories available from SGN RoboWorks',
    itemListElement: PROJECT_CATEGORIES.map((c, i) => ({
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
            { property: 'og:image:alt', content: SITE.name + ', robotics, IoT, embedded and AI projects, Chennai' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: page.title },
            { name: 'twitter:description', content: page.description },
            { name: 'twitter:image', content: abs(page.image) },
        ],
        schemas: schemasFor(path),
    };
};
