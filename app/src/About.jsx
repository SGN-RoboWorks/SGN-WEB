import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Assets
import gallery4 from './assets/gallery-4.png';
import gallery6 from './assets/gallery-6.png';
import gallery7 from './assets/gallery-7.png';
import gallery8 from './assets/gallery-8.png';
import directorSarath from './assets/director-sarath.jpg';
import directorGokulnath from './assets/director-gokulnath.jpg';
import directorNaveen from './assets/direct.jpg';
import projectsHandshake from './assets/projects-handshake.jpg';
import gemini1 from './assets/Gemini_Generated_Image_3id6v53id6v53id6.png';
import gemini2 from './assets/Gemini_Generated_Image_9ubis89ubis89ubi.png';
import gemini3 from './assets/Gemini_Generated_Image_bui6kcbui6kcbui6.png';
import gemini4 from './assets/Gemini_Generated_Image_jbe4bkjbe4bkjbe4.png';
import gemini5 from './assets/Gemini_Generated_Image_t7i1rrt7i1rrt7i1.png';
import ThreeDImageRing from './ThreeDImageRing';
import GlareHover from './GlareHover';

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
    { name: 'Sarath Kumar Sk', role: 'Managing Director', img: directorGokulnath },
    { name: 'N. Gokulnath', role: 'Co-Founder & Director', img: directorNaveen },
    { name: 'Naveen NG', role: 'Co-Founder & Director', img: directorSarath },
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
        desc: "Expert in Robotic Operations and Machine Learning Integration for Industrial Automation. Holds a Master's in Robotics Engineering from the University of Manchester, specializing in intelligent automation and sustainable technology solutions across India.",
        link: 'https://sarath-online.vercel.app/'
    },
    {
        name: 'N. Gokulnath',
        role: 'Co-Founder & Director',
        desc: 'Visionary Leader in Industrial IoT and Smart Factory Innovations. 13X Patent Holder in IoT and Robotics Applications, specializing in advanced Electronics, Home Automation, and Adaptive Automation Systems for diverse industrial environments.',
        link: 'https://ngokulnath.vercel.app/experience.html'
    },
    {
        name: 'Naveen NG',
        role: 'Co-Founder & Director',
        desc: '5X Patent Holder and Expert in AR/VR Design and minimalist Mechanical Innovation. Specializes in developing optimized solutions in pneumatic, hydraulics, and advanced product engineering for next-generation smart systems.',
        link: '#'
    }
];

function About() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const heroRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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
                    'a[href*="unicorn"]',
                    '[style*="2147483647"]',
                    '#us-canvas-container + div'
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

            // 4. Force hide any top-level body children that aren't #root
            Array.from(document.body.children).forEach(el => {
                if (el.id !== 'root' &&
                    !['SCRIPT', 'STYLE'].includes(el.tagName) &&
                    (el.textContent.toLowerCase().includes('unicorn') ||
                        el.innerHTML.toLowerCase().includes('unicorn') ||
                        el.getAttribute('href')?.includes('unicorn'))) {
                    el.style.setProperty('display', 'none', 'important');
                    el.remove();
                }
            });
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
        <div className="relative bg-[#f5f5f5] min-h-screen overflow-x-hidden">


            {/* ═══════════════════════════════════════ */}
            {/* HERO SECTION — Centered Animation        */}
            {/* ═══════════════════════════════════════ */}
            <section
                id="about-hero"
                ref={heroRef}
                className="relative w-full h-screen flex justify-center items-center bg-black overflow-hidden"
            >
                {/* Optimized 3D Animation Container — "Goldilocks" ratio for mobile: 82vh vertical height removes big black empty gaps, while 180vw horizontal width forces the intrinsic 3D camera to zoom out enough to perfectly reveal both ears. */}
                <div
                    data-us-project="gcNwfvcVtYZDlhVdfUiA"
                    className="absolute top-[9vh] left-1/2 -translate-x-1/2 h-[82vh] w-[180vw] md:inset-0 md:h-screen md:w-full md:left-0 md:transform-none md:translate-x-[5%] z-0 flex items-center justify-center p-0 m-0"
                ></div>

                {/* Mobile Edge Fade Overlay to seamlessly blend the animation boundaries into the black background */}
                <div
                    className="absolute inset-0 pointer-events-none z-[1] md:hidden"
                    style={{ background: 'linear-gradient(to bottom, #000 10%, transparent 20%, transparent 80%, #000 90%)' }}
                ></div>

                <motion.nav
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-300 w-[95%] md:w-auto ${isScrolled ? "top-4" : "top-8"}`}
                >
                    <div className={`nav-pill flex items-center justify-center font-medium px-6 md:px-8 py-2 rounded-full transition-all duration-300 w-full md:w-auto ${isScrolled
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
                                            } drop-shadow-sm ${link === 'About' ? 'flex' : 'hidden md:flex'}`}
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

            {/* Hero Text — "ABOUT US" (Overlay) - Pushed down slightly via pb-8 on mobile to clear the face */}
            <div className="absolute top-0 left-0 w-full h-screen pointer-events-none z-[1000] flex flex-col items-center md:items-start justify-end p-10 pb-8 md:pb-36 md:p-20">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="font-[Playfair_Display] text-white text-[3rem] md:text-8xl font-normal tracking-wide drop-shadow-2xl z-20 relative"
                >
                    ABOUT US
                </motion.h1>
            </div>


            {/* ═══════════════════════════════════════ */}
            {/* INTRO PARAGRAPH                         */}
            {/* ═══════════════════════════════════════ */}
            <section className="pt-24 pb-16 bg-white">
                <div className="max-w-[50rem] mx-auto px-6 text-center">
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-[#1a1a1a] text-[18px] md:text-[24px]  leading-relaxed"
                    >
                        Incorporated in 30th July 2025, SGN Roboworks is a rapid prototyping venture with a
                        clear goal to deliver high-quality IoT Robotics etc.. services. And we are evolving
                        ourselves better to become a renowned people trusted company.
                    </motion.p>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* VISION SHAPING & DIRECTORS PROJECTS     */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-12 bg-white">
                <div className="max-w-[1196px] mx-auto px-4 md:px-6">
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
                        className="bg-[#e9e9e9] rounded-[44px] p-6 md:p-10 shadow-md flex flex-col"
                    >
                        <div className="relative h-[250px] md:h-[350px] w-full rounded-[30px] mb-12">
                            <GlareHover
                                width="100%"
                                height="100%"
                                background="transparent"
                                borderRadius="30px"
                                borderColor="transparent"
                                glareColor="#ffffff"
                                glareOpacity={0.3}
                                glareSize={300}
                                transitionDuration={800}
                                className="w-full h-full shadow-sm"
                            >
                                <img src={projectsHandshake} alt="Handshake" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-end p-8 md:p-12 z-10">
                                    <h2 className="font-[Playfair_Display] text-white text-3xl md:text-[3.25rem] font-normal leading-tight tracking-wide drop-shadow-md">
                                        PROJECTS of <br /> DIRECTORS
                                    </h2>
                                </div>
                            </GlareHover>
                        </div>

                        <div className="px-2 md:px-4 grid md:grid-cols-3 gap-8 md:gap-10 mb-4">
                            {team.map((member, i) => {
                                const bio = directorBios[i];
                                return (
                                    <div key={i} className="flex flex-col items-center text-center">
                                        <div className="w-full max-w-[320px] aspect-[4/5] rounded-[24px] bg-[#757575] p-[10px] shadow-sm mb-6 mx-auto transform transition-all duration-300 hover:scale-[1.03]">
                                            <div className="w-full h-full rounded-[16px] overflow-hidden border border-black/10">
                                                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <h4 className="text-[#1a1a1a] text-[24px] font-normal leading-tight">{member.name}</h4>
                                            <p className="text-gray-500 text-[12px] mt-1 tracking-wider">{member.role}</p>
                                        </div>
                                        <div className={`flex-1 w-full max-w-[280px] mx-auto flex flex-col ${i === 0 ? 'items-start' : i === 2 ? 'items-end' : 'items-center'}`}>
                                            <p className={`text-[#1a1a1a] text-[12px] font-medium leading-[1.6] mb-8 text-opacity-80 ${i === 0 ? 'text-left' : i === 2 ? 'text-right' : 'text-center'}`}>
                                                {bio.desc}
                                            </p>
                                            <div className="w-full mt-auto mb-2 flex justify-center">
                                                <a
                                                    href={bio.link}
                                                    target={bio.link !== '#' ? '_blank' : '_self'}
                                                    rel="noopener noreferrer"
                                                    className="bg-white border border-gray-200 text-[#1a1a1a] text-[11px] font-semibold hover:bg-black hover:text-white transition-all shadow-sm tracking-wide flex items-center justify-center px-8 py-2.5 rounded-full"
                                                >
                                                    View Project
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* DIVERSITY & INCLUSION SECTION           */}
            {/* ═══════════════════════════════════════ */}
            <section className="pt-24 pb-20 bg-white">
                <div className="max-w-[48rem] mx-auto px-6 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <h2 className="font-[Playfair_Display] text-[2.5rem] md:text-[3.5rem] font-normal text-black leading-tight tracking-wide mb-12">
                            Diversity & Inclusion
                        </h2>
                        <p className="text-[#1a1a1a] text-[15px] md:text-[18px] font-medium leading-relaxed">
                            At SGN Roboworks, we believe innovation thrives on diverse perspectives. We are
                            committed to building an inclusive environment where individuals are valued for their
                            skills, ideas, and contributions—regardless of background or identity. By fostering
                            equal opportunity and interdisciplinary collaboration, we strengthen our ability to
                            engineer intelligent, resilient, and future-ready systems for global industries.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 3D IMAGE RING SECTION */}
            {/* 3D IMAGE RING SECTION */}
            <section className="py-10 bg-white overflow-hidden">
                <div className="max-w-10xl mx-auto px-6 h-[500px] flex items-center justify-center">
                    <ThreeDImageRing
                        images={[gemini1, gemini2, gemini3, gemini4, gemini5]}
                        titles={[
                            "IoT & Robotics",
                            "AI-Based Products",
                            "Smart Home Automation",
                            "Sustainable Hydro-ponics",
                            "Electronics Component Supply"
                        ]}
                        width={850}
                        height={450}
                        imageDistance={900}
                        autoRotate={true}
                        autoRotateSpeed={0.15}
                        borderRadius={40}
                    />
                </div>
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
            <footer className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between gap-12">
                        {/* Left — Brand */}
                        <div>
                            <div className="flex items-center gap-4">
                                <img src={gallery4} alt="SGN Logo" className="w-12 h-12 rounded-full border border-gray-100 p-1" />
                                <div>
                                    <h4 className="font-[Playfair_Display] text-6xl md:text-8xl tracking-wider leading-none">
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
                                <li><a href="/" className="text-black-700 hover:text-gray transition-colors">Home</a></li>
                                <li><a href="/about" className="text-black-700 hover:text-gray transition-colors">About us</a></li>
                                <li><a href="/service" className="text-black-700 hover:text-gray transition-colors">Services</a></li>
                                <li><a href="/contact" className="text-black-700 hover:text-gray transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-gray-400 text-sm">Designed & Developed by</p>
                        <p className="text-gray-600 text-sm font-semibold tracking-[0.15em] mt-1">TECHLON</p>
                    </div>
                </div>
            </footer>
        </div >
    );
}

export default About;
