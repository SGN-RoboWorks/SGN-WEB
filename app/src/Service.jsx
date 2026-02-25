import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// ── Asset Imports ──
import gallery1 from './assets/gallery-1.png';
import gallery2 from './assets/gallery-2.png';
import gallery3 from './assets/gallery-3.png';
import gallery4 from './assets/gallery-4.png';
import gallery12 from './assets/gallery-12.png';

// Hero asset — metallic swirl
import newServiceHero from './assets/553ca5ba58dd3cf4ad1b16dbfaf9c28f56db29ad.jpg';

// Why Choosing section — real photo assets
import whyImgLeft from './assets/19a25da78dcd6cc1c69e6275ce99ea0380a1e727.jpg';  // 3 professionals
import whyImgTopR from './assets/21d2df3d2f6548dbe2c8e5c69b6d11ff166b3670.jpg';  // warehouse + hardware
import whyImgBotM from './assets/adfda7168d5e5495c59670fb92a804c351eabe6b.jpg'; // laptop meeting room
import whyImgBotR from './assets/59d5145a665116b455cfcd5f7ca676eaaf2fcf9f.jpg'; // green office + plants

// Contact section dark background
import gallery6 from './assets/gallery-6.png';

// ── Components ──
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
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

// ── Nav Links ──
const navLinks = ['Home', 'About', 'Service', 'Contact'];

// ── Tech Solutions Grid Data (text-only cards) ──
const techSolutions = [
    { name: 'IoT & Robotics' },
    { name: 'AI-Based Products' },
    { name: 'Smart Home Automation' },
    { name: 'Sustainable Hydro-ponics' },
    { name: 'Electronics Component Supply' },
];

// ── Why Choosing Cards — real photo assets from video ──
// Layout: left = tall single card, right = top large + bottom 2 small

// ── ScrollStack Services ──
const services = [
    { title: 'IoT & Robotics', location: 'Tamil Nadu', desc: 'Hardware-based installation across TN.', img: gallery1, color: '#f0f0f0' },
    { title: 'AI-Based Products', location: 'Global', desc: 'Custom Software solutions available worldwide.', img: gallery12, color: '#e8e8e8' },
    { title: 'Electronics Component Supply', location: 'Tamil Nadu', desc: 'Wholesale supply & dealer network across TN.', img: gallery2, color: '#e0e0e0' },
    { title: 'Smart Home Automation', location: 'Tamil Nadu', desc: 'Direct installation & consultation across TN.', img: gallery3, color: '#d8d8d8' },
    { title: 'Sustainable Hydro-ponics', location: 'Tamil Nadu', desc: 'Commercial & home farm setup across TN.', img: gallery1, color: '#d0d0d0' },
];

function Service() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const heroRef = useRef(null);
    const stickyNavRef = useRef(null);
    const footerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.85);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] overflow-x-hidden">

            {/* ═══════════════════════════════════════ */}
            {/* HERO — Dark bg + metallic swirl asset   */}
            {/* ═══════════════════════════════════════ */}
            <section id="home" ref={heroRef} className="relative h-screen overflow-hidden bg-black">
                <motion.div className="absolute inset-0 z-0" style={{ y: heroY, scale: heroScale }}>
                    <img
                        src={newServiceHero}
                        alt="SGN Services"
                        className="w-full h-full object-cover opacity-80"
                    />
                </motion.div>

                {/* Top Navbar — Glassmorphic Pill */}
                <motion.nav
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute top-6 left-1/2 -translate-x-1/2 z-20"
                >
                    <div className="nav-pill">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                                className="text-white text-sm font-medium tracking-wide hover:opacity-70 transition-opacity"
                            >
                                {link}
                            </a>
                        ))}
                        <span className="text-white text-sm font-semibold tracking-wide">SGN Agritech</span>
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

                {/* Hero bottom-left text */}
                <div className="absolute inset-0 flex items-end justify-start p-10 md:p-16 z-10 pointer-events-none">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="font-[Playfair_Display] text-white text-6xl md:text-8xl font-normal tracking-wide"
                    >
                        OUR SERVICES
                    </motion.h1>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* STICKY NAVBAR (appears after hero)      */}
            {/* ═══════════════════════════════════════ */}
            <div
                ref={stickyNavRef}
                className={`sticky top-0 z-40 flex justify-center py-4 transition-all duration-500 bg-[#f5f5f5] ${scrolled ? 'shadow-sm' : ''}`}
            >
                <div className="nav-pill nav-pill-solid">
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                            className="text-[#1a1a1a] text-sm font-medium tracking-wide hover:opacity-60 transition-opacity"
                        >
                            {link}
                        </a>
                    ))}
                    <span className="text-[#1a1a1a] text-sm font-semibold tracking-wide">SGN Agritech</span>
                </div>
            </div>

            {/* ═══════════════════════════════════════ */}
            {/* INTRO PARAGRAPH                         */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ margin: '-100px' }}
                    variants={stagger}
                    className="max-w-4xl mx-auto text-center px-6"
                >
                    <motion.p
                        variants={fadeUp}
                        className="text-gray-700 text-base md:text-lg leading-relaxed"
                    >
                        SGN RoboWorks delivers services through a structured engineering process—
                        analyzing client requirements, designing intelligent system architectures, integrating
                        AI, IoT, automation, and secure networks, and deploying fully optimized solutions.
                        The company ensures real-world performance through testing, monitoring, and
                        ongoing technical support.
                    </motion.p>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* OUR MAIN TECH SOLUTIONS — 3-col grid    */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-[#f5f5f5]">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ margin: '-100px' }}
                    variants={staggerContainer}
                    className="max-w-6xl mx-auto px-6"
                >
                    <div className="flex flex-col md:flex-row gap-12">
                        {/* Left label */}
                        <motion.div variants={fadeUp} className="md:w-1/4 flex flex-col justify-start pt-2">
                            <h2 className="font-[Playfair_Display] text-2xl md:text-3xl font-normal">
                                Our Main <span className="font-bold">Tech Solutions</span>
                            </h2>
                            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                                Delivering Hardware Automation across Tamil Nadu and Custom AI/Software solutions globally.
                            </p>
                        </motion.div>

                        {/* Right: 3-column grid of bordered cards */}
                        <div className="md:w-3/4 grid grid-cols-2 md:grid-cols-3 gap-4">
                            {techSolutions.map((sol, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
                                    whileHover={{
                                        backgroundColor: '#1a1a1a',
                                        transition: { duration: 0.3 }
                                    }}
                                    className="group border border-gray-300 rounded-2xl p-6 flex items-end min-h-[160px] bg-white hover:shadow-lg transition-shadow cursor-default"
                                >
                                    <span className="font-medium text-base text-[#1a1a1a] group-hover:text-white transition-colors duration-300">
                                        {sol.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* WHY CHOOSING SGN ROBOWORKS?             */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ margin: '-100px' }}
                    variants={staggerContainer}
                    className="max-w-6xl mx-auto px-6"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="font-[Playfair_Display] text-4xl md:text-5xl font-normal text-left mb-12"
                    >
                        Why Choosing SGN Roboworks?
                    </motion.h2>

                    {/* Asymmetric layout: LEFT = 1 tall card | RIGHT = 1 large top + 2 small bottom */}
                    <div className="flex flex-col md:flex-row gap-6">

                        {/* LEFT — tall card: office professionals */}
                        <motion.div
                            variants={fadeUp}
                            className="md:w-[35%] border border-gray-200 rounded-2xl overflow-hidden bg-white flex flex-col"
                        >
                            <div className="flex-1 min-h-[280px] overflow-hidden">
                                <img
                                    src={whyImgLeft}
                                    alt="Value-Driven Automation"
                                    className="w-full h-full object-cover"
                                    style={{ minHeight: '280px' }}
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-semibold text-lg text-[#1a1a1a]">Value-Driven Automation</h3>
                                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                                    Cutting-edge technology, including affordable automation solutions, customized to deliver maximum ROI for SMEs and large enterprises.
                                </p>
                            </div>
                        </motion.div>

                        {/* RIGHT — column: 1 large on top + 2 small on bottom */}
                        <div className="md:w-[65%] flex flex-col gap-6">

                            {/* Top large card: warehouse + hardware */}
                            <motion.div
                                variants={fadeUp}
                                className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={whyImgTopR}
                                        alt="Global AI, Local Hardware"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-semibold text-lg text-[#1a1a1a]">Global AI, Local Hardware</h3>
                                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                                        Offering world-class Custom Software &amp; AI Development globally, backed by reliable, on-site hardware installation across Tamil Nadu.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Bottom row: 2 smaller cards side by side */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Holistic Tech Integration */}
                                <motion.div
                                    variants={fadeUp}
                                    className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
                                >
                                    <div className="h-40 overflow-hidden">
                                        <img
                                            src={whyImgBotM}
                                            alt="Holistic Tech Integration"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-semibold text-base text-[#1a1a1a]">Holistic Tech Integration</h3>
                                        <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                                            Comprehensive expertise in IoT, AI, and Robotics, delivering holistic, seamless, and integrated hardware and software solutions.
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Sustainability Focus */}
                                <motion.div
                                    variants={fadeUp}
                                    className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
                                >
                                    <div className="h-40 overflow-hidden">
                                        <img
                                            src={whyImgBotR}
                                            alt="Sustainability Focus"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-semibold text-base text-[#1a1a1a]">Sustainability Focus</h3>
                                        <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                                            Committed to building smarter, greener futures through eco-friendly systems like Hydro/Aqua-ponics and energy-efficient Smart Home solutions.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* OUR LOCATIONS                           */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-24 md:py-32 bg-white">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ margin: '-100px' }}
                    variants={stagger}
                    className="max-w-4xl mx-auto text-center px-6"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="font-[Playfair_Display] text-5xl md:text-7xl font-normal text-[#1a1a1a]"
                    >
                        Our Locations
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="mt-12 text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
                    >
                        Hardware Installation and Direct Services are focused on Tamil Nadu and nearby
                        regions, where we proudly provide on-site installation, consulting, and electronics
                        delivery across key areas within Tamil Nadu, India.
                    </motion.p>
                    <motion.div
                        variants={fadeUp}
                        className="mt-12 inline-flex items-center gap-3 px-8 py-3 rounded-md bg-[#e0e0e0] text-[#1a1a1a] text-sm font-medium"
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                            <circle cx="12" cy="9" r="2.5" />
                        </svg>
                        Chennai, Kanchipuram, Tiruvallur, Chengalpattu
                    </motion.div>
                    <motion.p
                        variants={fadeUp}
                        className="mt-16 text-lg md:text-xl text-[#1a1a1a]"
                    >
                        while <span className="font-semibold">Software Solutions</span> are available <span className="font-semibold">Worldwide.</span>
                    </motion.p>
                </motion.div>
            </section>



            {/* ═══════════════════════════════════════ */}
            {/* BOOK YOUR APPOINTMENTS — dark card      */}
            {/* ═══════════════════════════════════════ */}
            <section id="contact" className="py-16 md:py-24 bg-white">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ margin: '-100px' }}
                    variants={fadeUp}
                    className="max-w-6xl mx-auto px-6"
                >
                    <div className="relative overflow-hidden rounded-[40px] bg-black min-h-[480px]">
                        <img
                            src={gallery6}
                            alt="Contact Background"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                        <div className="relative z-10 p-12 md:p-24 flex flex-col items-center md:items-start justify-center h-full min-h-[480px]">
                            <div className="md:w-1/2" />
                            <div className="md:w-1/2 text-white flex flex-col items-center md:items-start">
                                <h3 className="font-[Playfair_Display] text-5xl md:text-6xl font-normal tracking-wide text-center md:text-left">
                                    BOOK YOUR
                                </h3>
                                <h3 className="font-[Playfair_Display] text-5xl md:text-6xl font-normal tracking-[0.1em] mt-3 mr-[-0.1em] text-center md:text-left">
                                    APPOINTMENTS
                                </h3>
                                <a href="#contact" className="mt-12 px-12 py-3 rounded-full border border-white/40 hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium tracking-widest uppercase">
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
                    whileInView="visible"
                    viewport={{ margin: '-50px' }}
                    variants={fadeIn}
                    className="max-w-6xl mx-auto px-6"
                >
                    <div className="flex flex-col md:flex-row justify-between gap-12">
                        {/* Left — Brand */}
                        <div>
                            <div className="flex items-center gap-4">
                                <img src={gallery4} alt="SGN Logo" className="w-12 h-12 rounded-full" />
                                <div>
                                    <h4 className="font-[Playfair_Display] text-3xl font-bold tracking-wider">S G N</h4>
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
                        <p className="text-gray-400 text-sm">Designed &amp; Developed by</p>
                        <p className="text-gray-600 text-sm font-semibold tracking-[0.15em] mt-1">TECHLON</p>
                    </div>
                </motion.div>
            </footer>
        </div>
    );
}

export default Service;
