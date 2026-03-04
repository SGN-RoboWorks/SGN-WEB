import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// ── Asset Imports ──
import gallery1 from './assets/gallery-1.png';
import gallery2 from './assets/gallery-2.png';
import gallery3 from './assets/gallery-3.png';
import gallery4 from './assets/gallery-4.png';
import gallery5 from './assets/gallery-5.png';
import gallery6 from './assets/gallery-6.png';
import gallery7 from './assets/gallery-7.png';
import gallery8 from './assets/gallery-8.png';
import gallery9 from './assets/gallery-9.png';
import gallery11 from './assets/gallery-11.png';
import gallery12 from './assets/gallery-12.png';
import gallery10 from './assets/gallery-10.png';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

// ── Animation Variants ──
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.15 } },
};

// ── Nav Links ──
const navLinks = ['Home', 'About', 'Service', 'Contact'];

// ── Services Data ──
const services = [
    { title: 'IoT & Robotics', location: 'Tamil Nadu', desc: 'Hardware-based installation across TN.', img: gallery1 },
    { title: 'AI-Based Products', location: 'Global', desc: 'Custom Software solutions available worldwide.', img: gallery5 },
    { title: 'Smart Home Automation', location: 'Tamil Nadu', desc: 'Direct installation & consultation across TN.', img: gallery3 },
    { title: 'Sustainable Hydro-ponics', location: 'Tamil Nadu', desc: 'Commercial & home farm setup across TN.', img: gallery2 },
    { title: 'Electronics Component Supply', location: 'Tamil Nadu', desc: 'Wholesale supply & dealer network across TN.', img: gallery12 },
];

function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Sets to true if user scrolls more than 50px
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const heroRef = useRef(null);

    // InView hooks
    const welcomeRef = useRef(null);
    const welcomeInView = useInView(welcomeRef, { once: true, margin: '-100px' });
    const aboutCardsRef = useRef(null);
    const aboutCardsInView = useInView(aboutCardsRef, { once: true, margin: '-100px' });
    const companyRef = useRef(null);
    const companyInView = useInView(companyRef, { once: true, margin: '-100px' });
    const mvRef = useRef(null);
    const mvInView = useInView(mvRef, { once: true, margin: '-100px' });
    const servicesRef = useRef(null);
    const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
    const limitedRef = useRef(null);
    const limitedInView = useInView(limitedRef, { once: true, margin: '-100px' });
    const contactRef = useRef(null);
    const contactInView = useInView(contactRef, { once: true, margin: '-100px' });
    const footerRef = useRef(null);
    const footerInView = useInView(footerRef, { once: true, margin: '-50px' });

    // Hero parallax
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);



    return (
        <div className="min-h-screen bg-white text-[#1a1a1a] overflow-x-hidden">

            {/* ═══════════════════════════════════════ */}
            {/* HERO SECTION — Full Screen Robot Head   */}
            {/* ═══════════════════════════════════════ */}
            <section ref={heroRef} className="relative h-screen overflow-hidden">
                {/* Background Image */}
                <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
                    <img
                        src={gallery9}
                        alt="SGN Robot"
                        className="w-full h-[160vh] object-cover"
                    />
                </motion.div>

                {/* Top Navbar — Glassmorphic Pill */}
                <motion.nav
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    // Switch from absolute to fixed so it follows the user
                    className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-300 w-[90%] md:w-auto ${isScrolled ? "top-4" : "top-8"
                        }`}
                >
                    <div className={`nav-pill flex items-center justify-center font-medium px-8 py-2 rounded-full transition-all duration-300 w-full md:w-auto ${isScrolled
                        ? "bg-white/90 backdrop-blur-md shadow-md border border-gray-200"
                        : "bg-transparent"
                        }`}>
                        <div className="flex items-center gap-6">
                            <div className="hidden md:flex items-center gap-6">
                                {navLinks.map((link) => (
                                    <a
                                        key={link}
                                        href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                                        className={`text-[17px] tracking-wide transition-colors duration-300 ${isScrolled ? "text-black hover:text-gray-600" : "text-white hover:opacity-70"
                                            } drop-shadow-sm`}
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                            <a
                                href="https://aquponics-amig.vercel.app/Aquaponics.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-[17px] font-[Playfair_Display] tracking-wide transition-colors duration-300 ${isScrolled ? "text-black" : "text-white"} drop-shadow-sm`}
                            >
                                SGN Agritech
                            </a>
                        </div>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className={`md:hidden absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isScrolled ? "text-black" : "text-white"}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            {mobileMenuOpen ? (
                                <path d="M6 6l12 12M6 18L18 6" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                    {/* Mobile menu dropdown */}
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`absolute top-[120%] left-0 right-0 p-6 flex flex-col gap-4 rounded-3xl md:hidden ${isScrolled
                                ? "bg-white/95 backdrop-blur-md shadow-lg border border-gray-200"
                                : "glass-card border border-white/20"
                                }`}
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link}
                                    href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                                    className={`text-lg font-medium transition-colors ${isScrolled ? "text-gray-800 hover:text-black" : "text-white hover:text-gray-300"}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link}
                                </a>
                            ))}
                            <a
                                href="https://aquponics-amig.vercel.app/Aquaponics.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-lg font-semibold ${isScrolled ? "text-black" : "text-white"}`}
                            >
                                SGN Agritech
                            </a>
                        </motion.div>
                    )}
                </motion.nav>

                {/* Hero Content - Left Side Overlay */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    // Adjusted positioning to be "little bottom left"
                    className="absolute z-20 flex flex-col items-center justify-center bottom-8 left-6 md:left-12 shadow-2xl"
                    style={{
                        width: '320px',
                        padding: '60px 0',
                        background: 'rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        // Matches 1st image: top-left, top-right, bottom-right are rounded; bottom-left is sharp
                        borderRadius: '60px 60px 4px 60px',
                        border: '1px solid rgba(255, 255, 255, 0.25)'
                    }}
                >
                    {/* SGN Text - Adjusted size and tracking to match Image 1 */}
                    <div className="font-[Playfair_Display] text-white text-[130px] leading-[0.75] text-center tracking-tighter">
                        SGN
                    </div>

                    {/* RoboWorks Text - Switched to Serif-style look to match Image 1 */}
                    <div className="font-[Playfair_Display] text-white text-[34px] mt-2 mb-8 text-center font-normal ">
                        RoboWorks
                    </div>

                    {/* Contact Button - Keeping your requested style */}
                    <motion.a
                        href="/contact"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="flex items-center justify-center border border-white text-white font-medium hover:bg-white hover:text-black hover:scale-105 transition-all shadow-md backdrop-blur-sm"
                        style={{ width: '160px', height: '44px', borderRadius: '22px', fontSize: '15px' }}
                    >
                        Contact
                    </motion.a>
                </motion.div>
                {/* Explore Button Component */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2.0, delay: 1.2 }}
                    className="absolute z-20 bottom-12 left-1/2 -translate-x-1/2"
                >
                    <a
                        href="#welcome"
                        className="explore-capsule shadow-sm hover:scale-105 transition-all flex items-center justify-center gap-3"
                        style={{ padding: '16px 48px' }}
                    >
                        <span className="text-[18px] font-normal tracking-wide text-white drop-shadow-sm">Explore</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-sm">
                            <path d="M12 4v16m0 0l6-6m-6 6l-6-6" />
                        </svg>
                    </a>
                </motion.div>
            </section>


            {/* ═══════════════════════════════════════ */}
            {/* WELCOME SECTION                         */}
            {/* ═══════════════════════════════════════ */}
            <section id="welcome" className="py-24 bg-white  relative" ref={welcomeRef}>
                <div className="max-w-11xl mx-auto px-4 md:px-8 text-center relative z-10 w-full">
                    <motion.div
                        initial="hidden"
                        animate={welcomeInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                    >
                        <h2 className="font-[Inter] text-[2.2rem] md:text-[3.2rem] font-[300] text-[#1a1a1a] mb-[2px] md:leading-tight tracking-wide">
                            Hola ! Welcome to the world of
                        </h2>
                        <h1 className="font-[Inter] text-[3.5rem] md:text-[5rem] font-[300] tracking-[0.4em] text-[#1a1a1a] leading-none mb-20 uppercase ml-4">
                            SGN
                        </h1>
                    </motion.div>

                    {/* Feature Cards — Alternating Horizontal */}
                    <div className="flex flex-col gap-6 relative z-20 w-full px-4" ref={aboutCardsRef}>

                        {/* Card 1: Agritech */}
                        <motion.div
                            initial="hidden"
                            animate={aboutCardsInView ? 'visible' : 'hidden'}
                            variants={fadeUp}
                            className="w-full max-w-[1100px] mx-auto bg-[#d9d9d9] rounded-[45px] p-4 md:p-5 flex flex-col md:flex-row items-stretch gap-4 md:gap-5 md:h-[420px] shadow-sm"
                        >
                            {/* Image Side with thick frame */}
                            <div className="w-full md:w-[40%] h-[250px] md:h-full rounded-[35px] overflow-hidden border-[8px] border-[#a1a1a1] shrink-0 bg-[#333] shadow-md">
                                <img src={gallery11} alt="Agritech" className="w-full h-full object-cover" />
                            </div>

                            {/* Text Side - perfectly aligned white box */}
                            <div className="flex-1 bg-white rounded-[35px] p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-inner">
                                <h3 className="font-[Playfair_Display] text-[32px] md:text-[52px] font-normal text-black mb-1 border-b-[3px] border-black pb-1 leading-none inline-block">
                                    SGN Agritech
                                </h3>
                                <p className="text-[14px] md:text-[15px] text-gray-500 leading-relaxed mt-8 mb-10 max-w-[520px] font-medium">
                                    SGN Aquaponics is a sustainable way of growing food by combining fish
                                    farming and plant cultivation in one shared system. The fish provide
                                    natural nutrients through their waste, which feeds the plants, while the
                                    plants filter and clean the water that returns to the fish. This creates a
                                    balanced, low-waste cycle that uses less water, avoids chemical
                                    fertilizers, and produces fresh vegetables and fish in a natural, efficient
                                    way.
                                </p>
                                <a
                                    href="/about"
                                    className="px-10 py-1.5 rounded-full border border-black/30 text-[12px] md:text-[13px] font-medium text-black hover:bg-black hover:text-white transition-all transform hover:scale-105 tracking-wider shadow-sm"
                                >
                                    explore
                                </a>
                            </div>
                        </motion.div>

                        {/* Card 2: Roboworks */}
                        <motion.div
                            initial="hidden"
                            animate={aboutCardsInView ? 'visible' : 'hidden'}
                            variants={fadeUp}
                            className="w-full max-w-[1100px] mx-auto bg-[#d9d9d9] rounded-[45px] p-4 md:p-5 flex flex-col-reverse md:flex-row items-stretch gap-4 md:gap-5 md:h-[450px] shadow-sm"
                        >
                            {/* Text Side - perfectly aligned white box */}
                            <div className="flex-1 bg-white rounded-[35px] p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-inner">
                                <h3 className="font-[Playfair_Display] text-[32px] md:text-[52px] font-normal text-black mb-1 border-b-[3px] border-black pb-1 leading-none inline-block">
                                    SGN Roboworks
                                </h3>
                                <p className="text-[14px] md:text-[15px] text-gray-500 leading-relaxed mt-8 mb-10 max-w-[580px] font-medium">
                                    SGN Roboworks is the field where robots are designed, built, and
                                    programmed to help humans do work more efficiently and safely. It
                                    combines engineering, software, and artificial intelligence to create
                                    machines that can sense, think, and act in the real world. From factories
                                    and hospitals to homes and research labs, roboworks focuses on using
                                    robotics to solve problems, improve productivity, and support people in
                                    everyday life.
                                </p>
                                <a
                                    href="https://aquponics-amig.vercel.app/Aquaponics.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-10 py-1.5 rounded-full border border-black/30 text-[12px] md:text-[13px] font-medium text-black hover:bg-black hover:text-white transition-all transform hover:scale-105 tracking-wider shadow-sm"
                                >
                                    learn more
                                </a>
                            </div>

                            {/* Image Side with thick frame */}
                            <div className="w-full md:w-[40%] h-[250px] md:h-full rounded-[35px] overflow-hidden border-[8px] border-[#a1a1a1] shrink-0 bg-[#333] shadow-md">
                                <img src={gallery10} alt="Roboworks" className="w-full h-full object-cover" />
                            </div>
                        </motion.div>
                    </div>

                    {/* SGN Roboworks Centered Description Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-center max-w-[900px] mx-auto py-24 px-6"
                    >
                        <h2 className="font-[Playfair_Display] text-[52px] md:text-[84px] font-normal text-[#1a1a1a] mb-12">
                            SGN Roboworks
                        </h2>
                        <p className="text-[#1a1a1a] text-[15px] md:text-[17px] font-normal leading-[1.6] text-center">
                            SGN RoboWorks is a future-focused technology company engineering intelligent,
                            secure, and sustainable systems for real-world industries. Operating at the
                            intersection of AI, IoT, automation, and secure digital infrastructure, the company
                            transforms complex operational challenges into data-driven, self-optimizing
                            ecosystems, enabling industries to operate with greater efficiency, resilience, and
                            long-term sustainability in an increasingly connected world.
                        </p>
                    </motion.div>

                    {/* Mission and Vision Redesign */}
                    <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12 mt-12">
                        {/* Mission Card */}
                        <motion.div
                            initial="hidden"
                            animate={aboutCardsInView ? 'visible' : 'hidden'}
                            variants={fadeUp}
                            className="bg-[#d9d9d9] pt-4 pb-10 px-0 rounded-[50px] w-full max-w-[440px] shadow-lg flex flex-col items-center overflow-hidden"
                        >
                            {/* Capsule Header */}
                            <div className="bg-white rounded-full py-3 mb-6 w-[75%] flex justify-center shadow-md -mt-1">
                                <span className="text-[28px] md:text-[34px] font-normal text-[#1a1a1a] font-[Playfair_Display]">Our Mission</span>
                            </div>

                            {/* Image Container - Full Width */}
                            <div className="w-full h-[280px] overflow-hidden mb-8 shadow-sm">
                                <img src={gallery8} alt="Our Mission" className="w-full h-full object-cover" />
                            </div>

                            {/* Mission List */}
                            <div className="px-8 w-full">
                                <ul className="space-y-4 text-left">
                                    {[
                                        "Engineer intelligent, secure, and sustainable systems for real-world industries",
                                        "Transform complex industrial operations into data-driven, self-optimizing ecosystems",
                                        "Leverage AI, IoT, automation, and secure digital infrastructure to deliver precision and resilience",
                                        "Build scalable, energy-efficient, and economically viable solutions for global markets",
                                        "Enable long-term operational intelligence rather than short-term technology adoption"
                                    ].map((item, idx) => (
                                        <li key={idx} className="text-[13px] md:text-[14px] text-gray-800 leading-snug font-normal flex items-start gap-2">
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Vision Card */}
                        <motion.div
                            initial="hidden"
                            animate={aboutCardsInView ? 'visible' : 'hidden'}
                            variants={fadeUp}
                            className="bg-[#d9d9d9] pt-4 pb-10 px-0 rounded-[50px] w-full max-w-[440px] shadow-lg flex flex-col items-center overflow-hidden"
                        >
                            {/* Capsule Header */}
                            <div className="bg-white rounded-full py-3 mb-6 w-[75%] flex justify-center shadow-md -mt-1">
                                <span className="text-[28px] md:text-[34px] font-normal text-[#1a1a1a] font-[Playfair_Display]">Our Vision</span>
                            </div>

                            {/* Image Container - Full Width */}
                            <div className="w-full h-[280px] overflow-hidden mb-8 shadow-sm">
                                <img src={gallery7} alt="Our Vision" className="w-full h-full object-cover" />
                            </div>

                            {/* Vision List */}
                            <div className="px-8 w-full">
                                <ul className="space-y-4 text-left">
                                    {[
                                        "Lead the future of industrial intelligence across food systems, infrastructure, and digital ecosystems",
                                        "Create autonomous, climate-resilient, and secure operational environments",
                                        "Redefine how industries adapt, optimize, and scale through intelligent systems",
                                        "Bridge physical and digital worlds into unified, self-aware infrastructures",
                                        "Shape a future where technology drives sustainability, trust, and continuous innovation"
                                    ].map((item, idx) => (
                                        <li key={idx} className="text-[13px] md:text-[14px] text-gray-800 leading-snug font-normal flex items-start gap-2">
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* SERVICES LIST                           */}
            {/* ═══════════════════════════════════════ */}
            <section id="service" className="relative py-24 bg-white" ref={servicesRef}>
                {/* Sticky Header - Moved outside max-w-6xl for better sticky behavior relative to the whole section */}
                <div className="sticky top-24 md:top-32 z-30 w-full pointer-events-none flex justify-center h-0">
                    <motion.div
                        initial="hidden"
                        animate={servicesInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        className="text-center pt-10"
                    >
                        <h2 className="font-[Playfair_Display] text-6xl md:text-8xl font-normal text-[#1a1a1a] drop-shadow-sm">
                            The SGN&apos;s Services
                        </h2>
                    </motion.div>
                </div>

                <div className="max-w-6xl mx-auto px-6 pt-40">
                    <ScrollStack
                        useWindowScroll={true}
                        itemDistance={400}
                        itemStackDistance={35}
                        stackPosition="15%"
                        baseScale={0.92}
                        itemScale={0.02}
                    >
                        {services.map((svc, i) => (
                            <ScrollStackItem key={i}>
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 bg-[#e8e8e8] rounded-[44px] p-8 md:p-12 md:px-16 min-h-[320px] shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex-1 text-left flex flex-col items-start">
                                        <h4 className="text-2xl md:text-[36px] font-semibold mb-3 text-[#1a1a1a]">
                                            {svc.title} ({svc.location})
                                        </h4>
                                        <p className="text-gray-600 text-base md:text-[18px] mb-8 max-w-[420px]">
                                            {svc.desc}
                                        </p>
                                        <a
                                            href="/service"
                                            className="w-[149px] h-[43px] flex items-center justify-center rounded-[20.5px] bg-white border border-black/10 text-[15px] font-medium text-black hover:bg-black hover:text-white transition-all shadow-sm"
                                        >
                                            View Service
                                        </a>
                                    </div>
                                    <div className="w-40 h-40 md:w-60 md:h-60 shrink-0 flex items-center justify-center p-4  rounded-[30px]">
                                        <img src={svc.img} alt={svc.title} className="w-full h-full object-contain drop-shadow-2xl" />
                                    </div>
                                </div>
                            </ScrollStackItem>
                        ))}
                    </ScrollStack>
                </div>
            </section >

            {/* ═══════════════════════════════════════ */}
            {/* WE ARE NOT LIMITED SECTION               */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-24 bg-white " ref={limitedRef}>
                <motion.div
                    initial="hidden"
                    animate={limitedInView ? 'visible' : 'hidden'}
                    variants={fadeIn}
                    className="max-w-5xl mx-auto px-6 text-center"
                >
                    <h2 className="font-[Playfair_Display] text-5xl mt-20 md:text-7xl font-normal text-[#1a1a1a] mb-8" style={{ fontVariant: 'small-caps' }}>
                        We Are Not Limited !
                    </h2>
                    <p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto">
                        we are not limited with these services, but we are upgrading ourselves
                        greater with more upcoming new services.
                    </p>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* CONTACT BANNER                           */}
            {/* ═══════════════════════════════════════ */}
            <section id="contact" className="py-16" ref={contactRef}>
                <div className="relative w-full max-w-[1195px] md:h-[500px] bg-black rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl mx-auto">

                    {/* Background Image Layer */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={gallery6}
                            alt="Office Setup"
                            className="w-full h-full object-cover object-left  md:object-left"
                        />
                        {/* Gradient Overlay: Darker on the right to make text pop */}
                        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-black/20 to-black/90 pointer-events-none" />
                    </div>

                    {/* Left Side (Empty spacer to let the laptop image show) */}
                    <div className="hidden md:block w-1/2 z-10"></div>

                    {/* Right Side (Content) */}
                    <div className="relative z-20 w-full md:w-1/2 flex flex-col justify-center items-center md:items-start px-8 md:px-12 py-16 md:py-0">

                        {/* Header Text */}
                        <div className="mb-6 text-center md:text-left">
                            <h3 className="font-[serif] text-white text-[32px] md:text-[44px] leading-tight tracking-[0.1em] uppercase">
                                Book Your <br />
                                <span className="tracking-[0.3em]">Appointments</span>
                            </h3>
                        </div>

                        {/* Paragraph */}
                        <div className="max-w-[450px] mb-10">
                            <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed font-light text-center md:text-left">
                                Our team is just a call away. Whether you need expert guidance,
                                quick support, or a personalized solution, we're here to help
                                you every step of the way. Reach out today and experience
                                professional service designed around your needs.
                            </p>
                        </div>

                        {/* Capsule Button */}
                        <div className="w-full flex justify-center md:justify-start">
                            <a
                                href="/contact"
                                className="px-10 py-3 rounded-full border border-white/40 text-white text-[14px] font-medium 
                    bg-white/10 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300 shadow-xl"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* FOOTER                                   */}
            {/* ═══════════════════════════════════════ */}
            <footer className="py-16 bg-white border-t border-gray-100" ref={footerRef}>
                <motion.div
                    initial="hidden"
                    animate={footerInView ? 'visible' : 'hidden'}
                    variants={fadeIn}
                    className="max-w-6xl mx-auto px-6"
                >
                    <div className="flex flex-col md:flex-row justify-between gap-12">
                        {/* Left — Brand */}
                        <div>
                            <div className="flex items-center gap-4">
                                <img src={gallery4} alt="SGN Logo" className="w-12 h-12 rounded-full" />
                                <div>
                                    <h4 className="font-[Playfair_Display] text-8xl  tracking-wider">
                                        SGN
                                    </h4>
                                    <p className="font-[Playfair_Display] text-lg">Roboworks</p>
                                </div>
                            </div>
                            <p className="mt-6 text-gray-500 text-sm">@ 2026 Roboworks</p>
                        </div>

                        {/* Right — Quick Access */}
                        <div>
                            <h5 className="text-lg font-bold mb-6">Quick access</h5>
                            <ul className="space-y-5">
                                <li><a href="/" className="text-black hover:text-gray transition-colors">Home</a></li>
                                <li><a href="/about" className="text-black hover:text-gray transition-colors">About us</a></li>
                                <li><a href="/service" className="text-black hover:text-gray transition-colors">Services</a></li>
                                <li><a href="/contact" className="text-black hover:text-gray transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom credit */}
                    <div className="mt-16 text-center">
                        <p className="text-gray-400 text-sm">Designed & Developed by</p>
                        <p className="text-gray-600 text-sm font-semibold tracking-[0.15em] mt-1">TECHLON</p>
                    </div>
                </motion.div>
            </footer>
        </div >
    );
}

export default Home;
