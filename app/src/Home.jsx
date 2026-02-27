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
import gallery10 from './assets/gallery-10.png';
import gallery11 from './assets/gallery-11.png';
import gallery12 from './assets/gallery-12.png';
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
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const heroRef = useRef(null);
    const stickyNavRef = useRef(null);

    // Scroll listener for sticky nav
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.85);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] overflow-x-hidden">

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
                    className="absolute z-20 left-1/2 -translate-x-1/2 top-8"
                >
                    <div className="nav-pill flex items-center justify-center font-medium">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                                className="text-white text-[17px] tracking-wide hover:opacity-70 transition-opacity drop-shadow-sm"
                            >
                                {link}
                            </a>
                        ))}
                        <span className="text-white text-[17px] font-[Playfair_Display] tracking-wide ml-2 drop-shadow-sm">SGN Agritech</span>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 text-white"
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
                </motion.nav>

                {/* Mobile menu dropdown */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed top-20 left-4 right-4 z-30 glass-card p-6 flex flex-col gap-4 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                                className="text-white text-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link}
                            </a>
                        ))}
                        <span className="text-white text-lg font-semibold">SGN Agritech</span>
                    </motion.div>
                )}

                {/* Hero Content - Left Side Overlay */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute z-20 glass-card flex flex-col items-center justify-center bottom-[15%] left-[5%] md:left-[10%]"
                    style={{ width: '320px', padding: '40px 0' }}
                >
                    {/* SGN Text */}
                    <div className="font-[Playfair_Display] text-white drop-shadow-md text-[95px] leading-none text-center tracking-wide">
                        SGN
                    </div>
                    {/* RoboWorks Text */}
                    <div className="font-[Inter] text-white tracking-[0.15em] drop-shadow-md text-[24px] mt-2 mb-8 text-center uppercase font-light">
                        RoboWorks
                    </div>
                    {/* Contact Button */}
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
            {/* STICKY NAVBAR (appears after hero)      */}
            {/* ═══════════════════════════════════════ */}
            <div
                ref={stickyNavRef}
                className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex justify-center py-4 transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="nav-pill nav-pill-white">
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                            className="text-black text-xs font-semibold tracking-wider hover:opacity-60 transition-opacity"
                        >
                            {link}
                        </a>
                    ))}
                    <div className="h-4 w-[1px] bg-black/10 mx-2"></div>
                    <span className="text-black text-xs font-bold tracking-wider">SGN Agritech</span>
                </div>
            </div>

            {/* ═══════════════════════════════════════ */}
            {/* WELCOME SECTION                         */}
            {/* ═══════════════════════════════════════ */}
            <section id="welcome" className="py-24 bg-[#f5f5f5] relative" ref={welcomeRef}>
                <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10 w-full">
                    <motion.div
                        initial="hidden"
                        animate={welcomeInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                    >
                        <h2 className="font-[Inter] text-[2.2rem] md:text-[3.2rem] font-[300] text-[#1a1a1a] mb-[2px] md:leading-tight tracking-wide">
                            Hola ! Welcome to the world of
                        </h2>
                        <h1 className="font-[Inter] text-[3.5rem] md:text-[5rem] font-[300] tracking-[0.4em] text-[#1a1a1a] leading-none mb-20 uppercase ml-4">
                            S G N
                        </h1>
                    </motion.div>

                    {/* Feature Cards — Alternating Horizontal */}
                    <div className="flex flex-col gap-8 md:gap-12 relative z-20" ref={aboutCardsRef}>
                        {/* Shadow blob for center background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-black/10 blur-[140px] -z-10 rounded-full"></div>

                        {/* Card 1: Agritech */}
                        <motion.div
                            initial="hidden"
                            animate={aboutCardsInView ? 'visible' : 'hidden'}
                            variants={fadeUp}
                            className="bg-[#e9e9e9] p-3 md:p-4 rounded-[40px] shadow-md flex flex-col md:flex-row gap-4"
                        >
                            <div className="md:w-[45%] h-64 md:h-auto rounded-[30px] overflow-hidden border-2 border-white/50 relative shadow-sm">
                                <img src={gallery11} alt="Agritech" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] rounded-[30px] pointer-events-none"></div>
                            </div>
                            <div className="md:w-[55%] bg-white rounded-[30px] p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-sm">
                                <h3 className="text-3xl md:text-[2.5rem] font-medium text-[#1a1a1a] mb-4 border-b-[2.5px] border-black pb-1 inline-block">
                                    SGN Agritech
                                </h3>
                                <p className="text-gray-500 text-[12px] md:text-[13px] leading-relaxed mb-8 max-w-[400px]">
                                    SGN Aquaponics is a sustainable way of growing food by combining fish farming and plant cultivation in one shared system. The fish provide natural nutrients through their waste, which feeds the plants, while the plants filter and clean the water that returns to the fish. This creates a balanced, low-waste cycle that uses less water, avoids chemical fertilizers, and produces fresh vegetables and fish in a natural, efficient way.
                                </p>
                                <a href="/about" className="px-6 py-[2px] rounded-full border border-black/80 text-[11px] font-semibold text-black hover:bg-black hover:text-white transition-all transform hover:scale-105">
                                    explore
                                </a>
                            </div>
                        </motion.div>

                        {/* Card 2: Roboworks */}
                        <motion.div
                            initial="hidden"
                            animate={aboutCardsInView ? 'visible' : 'hidden'}
                            variants={fadeUp}
                            className="bg-[#e9e9e9] p-3 md:p-4 rounded-[40px] shadow-md flex flex-col-reverse md:flex-row gap-4"
                        >
                            <div className="md:w-[55%] bg-white rounded-[30px] p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-sm">
                                <h3 className="text-3xl md:text-[2.5rem] font-medium text-[#1a1a1a] mb-4 border-b-[2.5px] border-black pb-1 inline-block">
                                    SGN Roboworks
                                </h3>
                                <p className="text-gray-500 text-[12px] md:text-[13px] leading-relaxed mb-8 max-w-[400px]">
                                    SGN Roboworks is the field where robots are designed, built, and programmed to help humans do work more efficiently and safely. It combines engineering, software, and artificial intelligence to create machines that can sense, think, and act in the real world. From factories and hospitals to homes and research labs, roboworks focuses on using robotics to solve problems, improve productivity, and support people in everyday life.
                                </p>
                                <a href="/about" className="px-6 py-[2px] rounded-full border border-black/80 text-[11px] font-semibold text-black hover:bg-black hover:text-white transition-all transform hover:scale-105">
                                    learn more
                                </a>
                            </div>
                            <div className="md:w-[45%] h-64 md:h-auto rounded-[30px] overflow-hidden border-2 border-white/50 relative shadow-sm">
                                <img src={gallery10} alt="Roboworks" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] rounded-[30px] pointer-events-none"></div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Intro paragraph below cards */}
                    <motion.div
                        initial="hidden"
                        animate={aboutCardsInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        className="mt-32 max-w-4xl mx-auto"
                    >
                        <h2 className="font-[Playfair_Display] text-[2.5rem] md:text-[3.25rem] text-[#1a1a1a] mb-8 font-normal">
                            SGN Roboworks
                        </h2>
                        <p className="text-[#333] text-[13px] md:text-[15px] leading-relaxed font-medium">
                            SGN RoboWorks is a future-focused technology company engineering intelligent, secure, and sustainable systems for real-world industries. Operating at the intersection of AI, IoT, automation, and secure digital infrastructure, the company transforms complex operational challenges into data-driven, self-optimizing ecosystems, enabling industries to operate with greater efficiency, resilience, and long-term sustainability in an increasingly connected world.
                        </p>
                    </motion.div>

                    {/* Mission and Vision Cards */}
                    <div className="mt-24 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-14">
                        {/* Mission */}
                        <motion.div
                            initial="hidden"
                            animate={aboutCardsInView ? 'visible' : 'hidden'}
                            variants={fadeUp}
                            className="bg-[#e4e4e4] p-4 pb-6 rounded-[35px] w-full max-w-[340px] shadow-sm flex flex-col"
                        >
                            <div className="bg-white rounded-[24px] py-2 mb-4 w-[90%] mx-auto shadow-sm">
                                <span className="text-[20px] font-normal text-[#1a1a1a]">Our Mission</span>
                            </div>
                            <div className="w-full h-[200px] rounded-[18px] overflow-hidden mb-5">
                                <img src={gallery8} alt="Our Mission" className="w-full h-full object-cover" />
                            </div>
                            <div className="px-3 text-left">
                                <ul className="text-[11px] text-gray-800 space-y-3 leading-snug font-medium">
                                    <li>Engineer intelligent, secure, and sustainable systems for real-world industries</li>
                                    <li>Transform complex industrial operations into data-driven, self-optimizing ecosystems</li>
                                    <li>Leverage AI, IoT, automation, and secure digital infrastructure to deliver precision and resilience</li>
                                    <li>Build scalable, energy-efficient, and economically viable solutions for global markets</li>
                                    <li>Enable long-term operational intelligence rather than short-term technology adoption</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Arrow Icon */}
                        <motion.div
                            initial="hidden"
                            animate={aboutCardsInView ? 'visible' : 'hidden'}
                            variants={fadeUp}
                            className="hidden md:flex flex-col items-center justify-center transform -translate-y-12"
                        >
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black rotate-45 transform">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            initial="hidden"
                            animate={aboutCardsInView ? 'visible' : 'hidden'}
                            variants={fadeUp}
                            className="bg-[#e4e4e4] p-4 pb-6 rounded-[35px] w-full max-w-[340px] shadow-sm flex flex-col"
                        >
                            <div className="bg-white rounded-[24px] py-2 mb-4 w-[90%] mx-auto shadow-sm">
                                <span className="text-[20px] font-normal text-[#1a1a1a]">Our Vision</span>
                            </div>
                            <div className="w-full h-[200px] rounded-[18px] overflow-hidden mb-5">
                                <img src={gallery7} alt="Our Vision" className="w-full h-full object-cover" />
                            </div>
                            <div className="px-3 text-left">
                                <ul className="text-[11px] text-gray-800 space-y-2.5 leading-snug font-medium">
                                    <li>Lead the future of industrial intelligence across food systems, infrastructure, and digital ecosystems</li>
                                    <li>Create autonomous, climate-resilient, and secure operational environments</li>
                                    <li>Redefine how industries adapt, optimize, and scale through intelligent systems</li>
                                    <li>Bridge physical and digital worlds into unified, self-aware infrastructures</li>
                                    <li>Shape a future where technology drives sustainability, trust, and continuous innovation</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>


            {/* ═══════════════════════════════════════ */}
            {/* SERVICES LIST                           */}
            {/* ═══════════════════════════════════════ */}
            <section id="service" className="py-24 bg-[#f5f5f5]" ref={servicesRef}>
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        animate={servicesInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        className="text-center mb-20"
                    >
                        <h2 className="font-[Playfair_Display] text-6xl md:text-8xl font-normal text-[#1a1a1a]">
                            The SGN&apos;s Services
                        </h2>
                    </motion.div>

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
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 bg-[#e8e8e8] rounded-[40px] p-8 md:p-12 md:px-16 min-h-[320px] shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex-1 text-left">
                                        <h4 className="text-2xl md:text-3xl font-bold mb-3">
                                            {svc.title} <span className="font-bold">({svc.location})</span>
                                        </h4>
                                        <p className="text-gray-600 text-base md:text-lg mb-8">
                                            {svc.desc}
                                        </p>
                                        <a href="/service" className="px-8 py-2.5 rounded-full bg-white border border-black/10 text-[10px] font-extrabold tracking-widest lowercase hover:bg-black hover:text-white transition-all inline-block">
                                            view service
                                        </a>
                                    </div>
                                    <div className="w-40 h-40 md:w-60 md:h-60 shrink-0 flex items-center justify-center p-4 bg-white/30 rounded-[30px]">
                                        <img src={svc.img} alt={svc.title} className="w-full h-full object-contain drop-shadow-2xl" />
                                    </div>
                                </div>
                            </ScrollStackItem>
                        ))}
                    </ScrollStack>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* WE ARE NOT LIMITED SECTION               */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-24 bg-[#f5f5f5]" ref={limitedRef}>
                <motion.div
                    initial="hidden"
                    animate={limitedInView ? 'visible' : 'hidden'}
                    variants={fadeIn}
                    className="max-w-5xl mx-auto px-6 text-center"
                >
                    <h2 className="font-[Playfair_Display] text-5xl md:text-7xl font-normal text-[#1a1a1a] mb-8" style={{ fontVariant: 'small-caps' }}>
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
            <section id="contact" className="py-16 bg-[#f5f5f5]" ref={contactRef}>
                <motion.div
                    initial="hidden"
                    animate={contactInView ? 'visible' : 'hidden'}
                    variants={fadeUp}
                    className="max-w-6xl mx-auto px-6"
                >
                    <div className="flex flex-col md:flex-row bg-[#111] rounded-[40px] overflow-hidden min-h-[400px] md:min-h-[500px]">
                        {/* Background image — left half */}
                        <div className="md:flex-1 h-64 md:h-auto relative overflow-hidden">
                            <img src={gallery6} alt="Contact" className="w-full h-full object-cover opacity-70" />
                        </div>
                        {/* Text — right half */}
                        <div className="md:flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                            <h3 className="font-[Playfair_Display] text-white text-3xl md:text-5xl font-bold tracking-wider mb-2">
                                BOOK YOUR
                            </h3>
                            <h3 className="font-[Playfair_Display] text-white text-2xl md:text-4xl font-bold tracking-[0.2em] mb-8">
                                APPOINTMENTS
                            </h3>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-sm">
                                Our team is just a call away. Whether you need expert
                                guidance, quick support, or a personalized solution, we're
                                here to help you every step of the way. Reach out today
                                and experience professional service designed around your
                                needs.
                            </p>
                            <div>
                                <a href="/contact" className="px-10 py-3 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white hover:text-black transition-all inline-block">
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
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
                                    <h4 className="font-[Playfair_Display] text-3xl font-bold tracking-wider">
                                        S G N
                                    </h4>
                                    <p className="font-[Playfair_Display] text-lg">Roboworks</p>
                                </div>
                            </div>
                            <p className="mt-6 text-gray-500 text-sm">@ 2026 Roboworks</p>
                        </div>

                        {/* Right — Quick Access */}
                        <div>
                            <h5 className="text-lg font-bold mb-6">Quick access</h5>
                            <ul className="space-y-4">
                                <li><a href="/" className="text-gray-700 hover:text-black transition-colors">Home</a></li>
                                <li><a href="/about" className="text-gray-700 hover:text-black transition-colors">About us</a></li>
                                <li><a href="/service" className="text-gray-700 hover:text-black transition-colors">Services</a></li>
                                <li><a href="/contact" className="text-gray-700 hover:text-black transition-colors">Contact</a></li>
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
        </div>
    );
}

export default Home;
