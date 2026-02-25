import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Assets
import gallery4 from './assets/gallery-4.png';
import gallery6 from './assets/gallery-6.png';
import gallery7 from './assets/gallery-7.png';
import gallery8 from './assets/gallery-8.png';
import directorSarath from './assets/director-sarath.jpg';
import directorGokulnath from './assets/director-gokulnath.jpg';
import directorNaveen from './assets/director-naveen.jpg';
import projectsHandshake from './assets/projects-handshake.jpg';

// Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

// Nav Links
const navLinks = ['Home', 'About', 'Service', 'Contact'];

const team = [
    { name: 'Sarath Kumar Sk', role: 'Managing Director', img: directorSarath },
    { name: 'N. Gokulnath', role: 'Co-Founder & Director', img: directorGokulnath },
    { name: 'Naveen NG', role: 'Co-Founder & Director', img: directorNaveen },
];

const missionPoints = [
    'Engineer intelligent, secure, and sustainable systems for real-world industries',
    'Transform complex industrial operations into data-driven, self-optimizing ecosystems',
    'Leverage AI, IoT, automation, and secure digital infrastructure to deliver precision and resilience',
    'Build scalable, energy-efficient, and economically viable solutions for global markets',
    'Enable long-term operational intelligence rather than short-term technology adoption',
];

const visionPoints = [
    'Lead the future of industrial intelligence across food systems, infrastructure, and digital ecosystems',
    'Create autonomous, climate-resilient, and secure operational environments',
    'Redefine how industries adapt, optimize, and scale through intelligent systems',
    'Bridge physical and digital worlds into unified, self-aware infrastructures',
    'Shape a future where technology drives sustainability, trust, and continuous innovation',
];

const directorBios = [
    {
        name: 'Sarath Kumar Sk',
        role: 'Managing Director',
        desc: 'Expert in Robotic Operations and Machine Learning Integration for Industrial Automation. Holds a Master\'s in Robotics Engineering from the University of Manchester, specializing in intelligent automation and sustainable ecosystems.'
    },
    {
        name: 'N. Gokulnath',
        role: 'Co-Founder & Director',
        desc: 'Visionary Leader in Industrial IoT and Smart Factory Innovations. 13X Patent Holder in IoT and Robotics Applications, specializing in advanced Electronics, Home Automation, and Adaptive Automation Systems for production.'
    },
    {
        name: 'Naveen NG',
        role: 'Co-Founder & Director',
        desc: '5X Patent Holder and Expert in AR/VR Design and minimalist Mechanical Innovation. Specializes in developing optimized solutions in pneumatic, hydraulics, and advanced product engineering for next-generation systems.'
    }
];

function About() {
    const heroRef = useRef(null);

    // Unicorn Studio Initialization & Branding Cleanup
    useEffect(() => {
        // Initialize Unicorn Studio with a slight delay if needed
        if (window.UnicornStudio) {
            window.UnicornStudio.init();
        }

        // Active cleanup for persistent watermarks (Shadow DOM aware)
        const cleanup = () => {
            const findAndRemove = (root) => {
                if (!root) return;

                // 1. Text-based search (even if obscured)
                const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
                let node;
                while (node = walker.nextNode()) {
                    if (node.textContent.includes('Unicorn Studio') ||
                        node.textContent.includes('Made with') ||
                        node.textContent.includes('hiunicorn')) {
                        const parent = node.parentElement;
                        if (parent && !['SCRIPT', 'STYLE'].includes(parent.tagName)) {
                            parent.style.setProperty('display', 'none', 'important');
                            parent.style.setProperty('opacity', '0', 'important');
                            parent.style.setProperty('visibility', 'hidden', 'important');
                            parent.remove();
                        }
                    }
                }

                // 2. Selector-based search
                const selectors = [
                    '[href*="unicornStudio"]',
                    '[href*="unicorn.studio"]',
                    '[class*="watermark"]',
                    '[id*="watermark"]',
                    '.watermark',
                    '#unicorn-studio-watermark',
                    '.us-watermark',
                    '[class*="us-brand"]',
                    '[id*="us-brand"]',
                    'div[style*="z-index: 2147483647"]',
                    'div[style*="z-index:2147483647"]',
                    'iframe[src*="unicorn"]',
                    'a[href*="unicorn"]',
                    'div[style*="fixed"][style*="bottom: 0"][style*="right: 0"]',
                    'div[style*="fixed"][style*="bottom:0"][style*="right:0"]'
                ];

                selectors.forEach(selector => {
                    try {
                        const elements = root.querySelectorAll(selector);
                        elements.forEach(el => {
                            el.style.setProperty('display', 'none', 'important');
                            el.style.setProperty('opacity', '0', 'important');
                            el.style.setProperty('visibility', 'hidden', 'important');
                            el.remove();
                        });
                    } catch (e) { }
                });

                // 3. Recursive Shadow DOM pierce
                const all = root.querySelectorAll('*');
                all.forEach(el => {
                    if (el.shadowRoot) findAndRemove(el.shadowRoot);
                });
            };

            findAndRemove(document.body);
        };

        // Run immediately
        cleanup();

        // MutationObserver for real-time removal
        const observer = new MutationObserver((mutations) => {
            cleanup();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Fail-safe interval
        const intervalId = setInterval(cleanup, 500);

        return () => {
            clearInterval(intervalId);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="bg-[#f5f5f5] min-h-screen">
            {/* ═══════════════════════════════════════ */}
            {/* HERO SECTION — Centered Animation        */}
            {/* ═══════════════════════════════════════ */}
            <section
                id="about-hero"
                ref={heroRef}
                className="relative w-full h-screen flex justify-center items-center bg-black overflow-hidden"
            >
                {/* Animation Container (Background) */}
                <div
                    className="absolute inset-0 z-0 flex items-center justify-center p-0 m-0"
                    data-us-project="gcNwfvcVtYZDlhVdfUiA"
                ></div>

                {/* Hero Text — "ABOUT US" (Overlay - Bottom Left) */}
                <div className="absolute bottom-16 left-8 md:left-16 z-10 pointer-events-none">
                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="font-[Playfair_Display] text-white text-6xl md:text-8xl font-normal tracking-wider"
                    >
                        ABOUT US
                    </motion.h1>
                </div>

                {/* Top Navbar — Glassmorphic Pill */}
                <motion.nav
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 z-20 w-max"
                >
                    <div className="nav-pill px-8 py-3 rounded-full flex items-center gap-6 bg-white/10 backdrop-blur-md border border-white/20">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                                className="text-white text-sm font-medium tracking-wide hover:text-gray-300 transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                        <span className="text-white text-sm font-semibold tracking-wide ml-4">SGN Agritech</span>
                    </div>
                </motion.nav>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* VISION SHAPING SECTION                  */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-24 bg-[#f5f5f5]">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-center mb-20"
                    >
                        <h2 className="font-[Playfair_Display] text-5xl md:text-7xl font-normal text-black leading-tight">
                            The Visions Shaping SGN <br /> Roboworks
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="bg-[#d9d9d9] rounded-[40px] p-6 pt-8 text-center"
                            >
                                <div className="w-full h-80 rounded-[30px] overflow-hidden mb-6 shadow-xl grayscale hover:grayscale-0 transition-all duration-500">
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-4">{member.name}</h4>
                                <button className="px-6 py-2 rounded-full bg-white text-black text-xs font-semibold shadow-sm hover:bg-black hover:text-white transition-all">
                                    View Service
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* DIVERSITY & INCLUSION                   */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <h2 className="text-6xl md:text-8xl font-normal text-black mb-12">
                            Diversity & Inclusion
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                            At SGN Roboworks, we believe innovation thrives on diverse perspectives. We are committed to building an inclusive environment where individuals are valued for their skills, ideas, and contributions—regardless of background or identity. By fostering equal opportunity and interdisciplinary collaboration, we strengthen our ability to engineer intelligent, resilient, and future-ready systems for global industries.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* MISSION & VISION SECTION                */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-24 bg-[#f5f5f5]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        {/* Mission */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="bg-white rounded-[40px] overflow-hidden shadow-sm"
                        >
                            <div className="px-10 pt-10 pb-6">
                                <span className="bg-[#f5f5f5] rounded-full px-8 py-3 text-lg font-semibold inline-block">
                                    Our Mission
                                </span>
                            </div>
                            <div className="h-[280px] overflow-hidden p-6 pt-0">
                                <div className="w-full h-full rounded-[30px] overflow-hidden">
                                    <img src={gallery8} alt="Mission" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="px-10 py-8 pt-0">
                                <ul className="space-y-4">
                                    {missionPoints.map((pt, i) => (
                                        <li key={i} className="text-gray-600 text-sm leading-relaxed flex items-start">
                                            <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-black/20 rounded-full shrink-0" />
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="bg-white rounded-[40px] overflow-hidden shadow-sm"
                        >
                            <div className="px-10 pt-10 pb-6 flex justify-end">
                                <span className="bg-[#f5f5f5] rounded-full px-8 py-3 text-lg font-semibold inline-block">
                                    Our Vision
                                </span>
                            </div>
                            <div className="h-[280px] overflow-hidden p-6 pt-0">
                                <div className="w-full h-full rounded-[30px] overflow-hidden">
                                    <img src={gallery7} alt="Vision" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="px-10 py-8 pt-0">
                                <ul className="space-y-4">
                                    {visionPoints.map((pt, i) => (
                                        <li key={i} className="text-gray-600 text-sm leading-relaxed flex items-start">
                                            <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-black/20 rounded-full shrink-0" />
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* PROJECTS of DIRECTORS                  */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-24 bg-[#f5f5f5]">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="bg-white rounded-[40px] overflow-hidden shadow-sm"
                    >
                        <div className="relative h-[400px]">
                            <img src={projectsHandshake} alt="Handshake" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/10 flex items-center px-12">
                                <h2 className="font-[Playfair_Display] text-white text-6xl md:text-8xl font-normal drop-shadow-lg">
                                    PROJECTS of <br /> DIRECTORS
                                </h2>
                            </div>
                        </div>

                        <div className="p-12 md:p-16 grid md:grid-cols-3 gap-12">
                            {directorBios.map((bio, i) => (
                                <div key={i}>
                                    <h4 className="text-2xl font-bold mb-1">{bio.name}</h4>
                                    <p className="text-gray-400 text-sm mb-6">{bio.role}</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {bio.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* APPOINTMENT SECTION (Match Home)        */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-24 bg-[#f5f5f5]">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        style={{ background: '#111', borderRadius: '40px', overflow: 'hidden', position: 'relative', minHeight: '450px', display: 'flex' }}
                        className="flex-col md:flex-row"
                    >
                        {/* Background image — left half */}
                        <div className="hidden md:block md:w-1/2 relative overflow-hidden">
                            <img src={gallery6} alt="Contact" className="w-full h-full object-cover opacity-70" />
                        </div>
                        {/* Text — right half */}
                        <div className="flex-1 p-12 md:p-16 flex flex-col justify-center">
                            <h3 className="font-[Playfair_Display] text-white text-5xl font-bold tracking-wider mb-2">
                                BOOK YOUR
                            </h3>
                            <h3 className="font-[Playfair_Display] text-white text-4xl font-bold tracking-[0.2em] mb-8">
                                APPOINTMENTS
                            </h3>
                            <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-sm">
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
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* FOOTER                                   */}
            {/* ═══════════════════════════════════════ */}
            <footer className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-6">
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

                    <div className="mt-16 text-center">
                        <p className="text-gray-400 text-sm">Designed & Developed by</p>
                        <p className="text-gray-600 text-sm font-semibold tracking-[0.15em] mt-1">TECHLON</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default About;
