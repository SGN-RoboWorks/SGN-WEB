import React, { useEffect, useRef, useState } from 'react';
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
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const stickyNavRef = useRef(null);
    const heroRef = useRef(null);

    // Scroll listener for sticky nav
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.85);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                    'a[href*="unicorn"]'
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
            {/* INTRO PARAGRAPH                         */}
            {/* ═══════════════════════════════════════ */}
            <section className="pt-24 pb-16 bg-[#f5f5f5]">
                <div className="max-w-[48rem] mx-auto px-6 text-center">
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-[#1a1a1a] text-[13px] md:text-[15px] font-medium leading-relaxed"
                    >
                        Incorporated in 30th July 2025, SGN Roboworks is a rapid prototyping venture with a
                        clear goal to deliver high-quality IoT ,Robotics etc.. services. And we are evolving
                        ourselves better to become a renowned people trusted company.
                    </motion.p>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* VISION SHAPING SECTION                  */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-12 bg-[#f5f5f5]">
                <div className="max-w-[56rem] mx-auto px-4 md:px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="mb-10 pl-2 md:pl-4"
                    >
                        <h2 className="font-[Playfair_Display] text-[2.5rem] md:text-[3.5rem] font-normal text-black leading-tight tracking-wide">
                            The Visions Shaping SGN <br /> Roboworks
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="bg-[#e9e9e9] rounded-[40px] p-6 md:p-10 flex flex-col items-center shadow-md"
                    >
                        <div className="grid md:grid-cols-3 gap-6 md:gap-8 w-full mb-8">
                            {team.map((member, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col w-full h-[320px] md:h-[340px] rounded-[24px] bg-[#898989] p-2 md:p-3 pb-0 overflow-hidden shadow-md transform transition-all duration-300 hover:scale-[1.03]"
                                >
                                    <div className="flex-1 w-full rounded-t-[18px] rounded-b-[4px] md:rounded-t-[20px] overflow-hidden border border-black/10">
                                        <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="py-3 text-center">
                                        <h4 className="text-[#1a1a1a] text-[15px] font-semibold tracking-wide">{member.name}</h4>
                                        <p className="text-gray-200 text-[9px] mt-0.5 tracking-wider">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="px-5 py-1.5 rounded-full border border-black/20 bg-[#f0f0f0] text-black text-[10px] font-medium hover:bg-black hover:text-white transition-all shadow-sm">
                            View Service
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* PROJECTS of DIRECTORS                  */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-12 bg-[#f5f5f5]">
                <div className="max-w-[56rem] mx-auto px-4 md:px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="bg-[#e9e9e9] rounded-[40px] p-5 md:p-8 shadow-md"
                    >
                        <div className="relative h-[250px] md:h-[320px] w-full rounded-[30px] overflow-hidden shadow-sm mb-10">
                            <img src={projectsHandshake} alt="Handshake" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:p-12">
                                <h2 className="font-[Playfair_Display] text-white text-3xl md:text-[3.25rem] font-normal leading-tight tracking-wide drop-shadow-md">
                                    PROJECTS of <br /> DIRECTORS
                                </h2>
                            </div>
                        </div>

                        <div className="px-2 md:px-6 grid md:grid-cols-3 gap-8 md:gap-12 mb-4">
                            {directorBios.map((bio, i) => (
                                <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left h-full">
                                    <div className="mb-4 text-center w-full md:text-left">
                                        <h4 className="text-[#1a1a1a] text-lg font-medium">{bio.name}</h4>
                                        <p className="text-gray-500 text-[10px] mt-0.5">{bio.role}</p>
                                    </div>
                                    <p className="text-[#333] text-[9.5px] md:text-[10px] font-medium leading-[1.6] mb-8 flex-1 w-full max-w-[280px] mx-auto md:mx-0">
                                        {bio.desc}
                                    </p>
                                    <div className="w-full flex justify-center mt-auto">
                                        <button className="px-5 py-1 rounded-full bg-white border border-gray-300 text-black text-[9px] font-bold hover:bg-black hover:text-white transition-all shadow-sm tracking-wide">
                                            View Project
                                        </button>
                                    </div>
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
