import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';

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

// ── ScrollStack Services (Removed as per video) ──

const AnimatedCard = ({ children, className, variants }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [2, -2]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-2, 2]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const widthMatch = className?.match(/w-full|md:w-\[[^\]]+\]/);
    const widthClass = widthMatch ? widthMatch[0] : 'w-full';
    const innerClass = className?.replace(widthClass, '').trim();

    return (
        <motion.div
            variants={variants}
            style={{ perspective: 1200 }}
            className={`${widthClass} flex flex-col`}
        >
            <motion.div
                ref={ref}
                className={`${innerClass} flex-1 w-full`}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

function Service() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const heroRef = useRef(null);
    const footerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.25]);

    return (
        <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] overflow-x-hidden">

            {/* ═══════════════════════════════════════ */}
            {/* HERO — Dark bg + metallic swirl asset   */}
            {/* ═══════════════════════════════════════ */}
            <section id="home" ref={heroRef} className="relative h-screen overflow-hidden bg-black">
                <motion.div className="absolute inset-0 z-0 origin-top-left" style={{ y: heroY, scale: heroScale }}>
                    <img
                        src={newServiceHero}
                        alt="SGN Services"
                        className="w-full h-full object-cover object-right md:object-center opacity-80"
                    />
                </motion.div>

                {/* Hero Title — Positioned bottom-left */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-10 md:p-20 z-10 pointer-events-none">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="font-[Playfair_Display] text-white text-5xl md:text-8xl font-normal tracking-wide"
                    >
                        OUR SERVICES
                    </motion.h1>
                </div>

                {/* Top Navbar — Glassmorphic Pill */}
                <motion.nav
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    // Switch from absolute to fixed so it follows the user
                    className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-300 w-[90%] md:w-auto ${isScrolled ? "top-4" : "top-8"
                        }`}
                >
                    <div className={`nav-pill flex items-center justify-center font-medium px-4 md:px-8 py-2 rounded-full transition-all duration-300 w-full md:w-auto ${isScrolled
                        ? "bg-white/90 backdrop-blur-md shadow-md border border-gray-200"
                        : "bg-transparent"
                        }`}>
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className="flex items-center gap-4 md:gap-6">
                                {navLinks.map((link) => (
                                    <a
                                        key={link}
                                        href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                                        className={`text-[15px] md:text-[17px] tracking-wide transition-colors duration-300 ${isScrolled ? "text-black hover:text-gray-600" : "text-white hover:opacity-70"
                                            } drop-shadow-sm ${link === 'Service' ? 'flex' : 'hidden md:flex'}`}
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
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
                        </motion.div>
                    )}
                </motion.nav>

            </section>


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
                        className="text-gray-600 text-[16px] md:text-xl leading-relaxed font-normal"
                    >
                        SGN RoboWorks delivers services through a structured engineering process—
                        analyzing client requirements, designing intelligent system architectures, integrating
                        AI, IOT, automation, and secure networks, and deploying fully optimized solutions.
                        The company ensures real-world performance through testing, monitoring, and
                        ongoing technical support.
                    </motion.p>
                </motion.div>
            </section>



            {/* ═══════════════════════════════════════ */}
            {/* OUR MAIN TECH SOLUTIONS — 3-col grid    */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-[1440px] mx-auto px-6">
                    {/* Main Grid: 3 columns on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

                        {/* Cell 1: Header Text Block */}
                        <div className="flex flex-col justify-start pt-0 pl-0 pb-12 md:pt-0 md:pl-0">
                            <h2 className="font-normal text-[32px] md:text-[36px] font-normal leading-tight text-[#1a1a1a]">
                                Our Main <span className="font-bold">Tech Solutions</span>
                            </h2>
                            <p className="text-[#1a1a1a] text-[16px] mt-4 leading-relaxed max-w-[300px]">
                                Delivering Hardware Automation across Tamil Nadu and Custom AI/Software solutions globally.
                            </p>
                        </div>

                        {/* Map through the solution cards */}
                        {techSolutions.map((sol, i) => (
                            <motion.div
                                key={i}
                                whileHover={{
                                    backgroundColor: '#1a1a1a',
                                    transition: { duration: 0.2, ease: 'easeOut' }
                                }}
                                className="group rounded-[20px] p-8 md:p-10 flex flex-col justify-end min-h-[200px] md:min-h-[290px] bg-white border border-black transition-colors duration-200 cursor-pointer"
                            >
                                <span className="font-medium text-[20px] md:text-[24px] leading-[1.2] text-[#1a1a1a] group-hover:text-white transition-colors duration-200 max-w-[180px]">
                                    {sol.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
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
                    className="max-w-[1196px] mx-auto px-6"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="font-[Playfair_Display] text-[2.5rem] md:text-[3.5rem] font-normal text-left mb-12 md:mb-16 tracking-tight"
                    >
                        Why Choosing SGN Roboworks?
                    </motion.h2>

                    {/* Asymmetric layout: LEFT = 1 tall card | RIGHT = 1 large top + 2 small bottom */}
                    <div className="flex flex-col md:flex-row gap-10">

                        {/* LEFT — tall card: Value-Driven Automation */}
                        <AnimatedCard
                            variants={fadeUp}
                            className="md:w-[38%] border border-black/[0.12] rounded-[32px] overflow-hidden bg-white flex flex-col shadow-sm"
                        >
                            <div className="flex-1 overflow-hidden">
                                <img
                                    src={whyImgLeft}
                                    alt="Value-Driven Automation"
                                    className="w-full h-full object-cover scale-[1.2] md:scale-[1.1] origin-left"
                                />
                            </div>
                            <div className="p-10">
                                <h3 className="text-[28px] font-semibold text-[#1a1a1a] leading-tight mb-4">Value-Driven Automation</h3>
                                <p className="text-[#666] text-[15px] leading-relaxed">
                                    Cutting-edge technology, including affordable automation solutions, customized to deliver maximum ROI for SMEs and large enterprises.
                                </p>
                            </div>
                        </AnimatedCard>

                        {/* RIGHT — column: Global AI + Bottom 2 */}
                        <div className="md:w-[62%] flex flex-col gap-10">

                            {/* Top large card: Global AI, Local Hardware */}
                            <AnimatedCard
                                variants={fadeUp}
                                className="border border-black/[0.12] rounded-[32px] overflow-hidden bg-white shadow-sm flex flex-col"
                            >
                                <div className="h-[200px] md:h-[260px] overflow-hidden">
                                    <img
                                        src={whyImgTopR}
                                        alt="Global AI, Local Hardware"
                                        className="w-full h-full object-cover scale-[1.4]"
                                    />
                                </div>
                                <div className="p-10">
                                    <h3 className="text-[28px] font-semibold text-[#1a1a1a] leading-tight mb-4">Global AI, Local Hardware</h3>
                                    <p className="text-[#666] text-[15px] leading-relaxed">
                                        Offering world-class Custom Software & AI Development globally, backed by reliable, on-site hardware installation across Tamil Nadu.
                                    </p>
                                </div>
                            </AnimatedCard>

                            {/* Bottom row: Holistic + Sustainability */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <AnimatedCard
                                    variants={fadeUp}
                                    className="border border-black/[0.12] rounded-[32px] overflow-hidden bg-white shadow-sm flex flex-col"
                                >
                                    <div className="h-[180px] overflow-hidden">
                                        <img
                                            src={whyImgBotM}
                                            alt="Holistic Tech Integration"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-10">
                                        <h3 className="text-[24px] font-semibold text-[#1a1a1a] leading-tight mb-4">Holistic Tech Integration</h3>
                                        <p className="text-[#666] text-[14px] leading-relaxed">
                                            Comprehensive expertise in IoT, AI, and Robotics, delivering holistic, seamless, and integrated hardware and software solutions.
                                        </p>
                                    </div>
                                </AnimatedCard>

                                <AnimatedCard
                                    variants={fadeUp}
                                    className="border border-black/[0.12] rounded-[32px] overflow-hidden bg-white shadow-sm flex flex-col"
                                >
                                    <div className="h-[180px] overflow-hidden">
                                        <img
                                            src={whyImgBotR}
                                            alt="Sustainability Focus"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-10">
                                        <h3 className="text-[24px] font-semibold text-[#1a1a1a] leading-tight mb-4">Sustainability Focus</h3>
                                        <p className="text-[#666] text-[14px] leading-relaxed">
                                            Committed to building smarter, greener futures through eco-friendly systems like Hydro/Aqua-ponics and energy-efficient Smart Home solutions.
                                        </p>
                                    </div>
                                </AnimatedCard>
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
                        className="font-[Playfair_Display] text-4xl md:text-7xl font-normal text-[#1a1a1a]"
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
                        className="mt-12 inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#e0e0e0] text-[#1a1a1a] text-sm font-medium"
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
                    <div className="relative w-full max-w-[1195px] h-auto md:h-[582px] bg-[#0a0a0a] rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl mx-auto">
                        {/* Background Image Layer */}
                        <div className="absolute inset-0 z-0">
                            <img src={gallery6} alt="Contact" className="w-full h-full object-cover md:object-[center_left] opacity-80 border-none" />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#000000] via-[#000000]/60 to-transparent md:from-transparent md:via-[#000000]/40 md:to-[#000000]/90 pointer-events-none"></div>
                        </div>

                        {/* Spacer for left half */}
                        <div className="hidden md:block w-[420px] shrink-0 z-10"></div>

                        {/* Right Content Container */}
                        <div className="relative z-10 flex-1 flex flex-col pt-12 md:pt-[80.89px] px-8 md:px-0 items-center md:items-start pb-12 md:pb-0">

                            {/* Title area */}
                            <div className="md:ml-[0px] flex flex-col items-center justify-center w-full max-w-[488px] h-auto md:h-[120px] mb-8 md:mb-[43px]">
                                <h3 className="font-[Playfair_Display] text-white text-[26px] md:text-[38.5px] font-normal leading-none tracking-[0.05em] md:tracking-[0.1em]">
                                    BOOK YOUR
                                </h3>
                                <h3 className="font-[Playfair_Display] text-white text-[20px] md:text-[32px] font-normal leading-none mt-2 md:mt-4 ml-1 md:ml-[14px] tracking-[0.15em] md:tracking-[0.35em]">
                                    APPOINTMENTS
                                </h3>
                            </div>

                            {/* Description area */}
                            <div className="w-full max-w-[592px] h-auto md:h-[149.18px] mb-8 md:mb-[50px]">
                                <p className="text-[#dfdfdf] text-[15px] md:text-[16px] leading-[1.8] font-[Inter] font-light text-center md:text-left">
                                    Our team is just a call away. Whether you need expert
                                    guidance, quick support, or a personalized solution, we're
                                    here to help you every step of the way. Reach out today
                                    and experience professional service designed around your
                                    needs.
                                </p>
                            </div>

                            {/* Button area */}
                            <div className="md:ml-[205px]">
                                <a href="/contact" className="w-[149px] h-[43.07px] flex items-center justify-center rounded-[21.5px] border border-white/60 text-white text-[14.5px] font-[Inter] font-medium hover:bg-white hover:text-black transition-all bg-white/5 backdrop-blur-md shadow-sm hover:shadow-md">
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
                                <img src={gallery4} alt="SGN Logo" className="w-14 h-14 rounded-full border border-gray-100 p-1" />
                                <div>
                                    <h4 className="font-[Playfair_Display] text-6xl md:text-8xl tracking-tighter  leading-none">S G N</h4>
                                    <p className="font-[Playfair_Display] text-base md:text-xl text-gray-800 tracking-wide mt-1">Roboworks</p>
                                </div>
                            </div>
                            <p className="mt-8 text-gray-400 text-sm font-medium">@ 2026 Roboworks</p>
                        </div>

                        {/* Right — Quick Access */}
                        <div>
                            <h5 className="text-lg font-bold mb-6">Quick access</h5>
                            <ul className="space-y-5">
                                {navLinks.map((link) => (
                                    <li key={link}>
                                        <a
                                            href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                                            className="text-black hover:text-gray transition-colors"
                                        >
                                            {link === 'About' ? 'About us' : link === 'Service' ? 'Services' : link}
                                        </a>
                                    </li>
                                ))}
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
        </div >
    );
}

export default Service;
