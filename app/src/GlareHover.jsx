import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const GlareHover = ({
    children,
    glareColor = "#ffffff",
    glareOpacity = 0.4,
    glareAngle = 0,
    glareSize = 400,
    transitionDuration = 400,
    className = "",
    containerStyle = {},
    glow = true
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);

    // Mouse positions
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smoother spring animations for the glare position
    const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
    const glareX = useSpring(mouseX, springConfig);
    const glareY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            // Center the glare on the mouse
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden group ${className}`}
            style={{
                ...containerStyle,
                isolation: 'isolate' // Ensures glare stays within bounds and doesn't bleed weirdly
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* The actual content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>

            {/* The Glare Layer */}
            <motion.div
                initial={false}
                animate={{
                    opacity: isHovered ? glareOpacity : 0,
                    scale: isHovered ? 1 : 0.8
                }}
                transition={{
                    duration: transitionDuration / 1000,
                    ease: "easeOut"
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: glareSize,
                    height: glareSize,
                    borderRadius: '50%',
                    background: glow
                        ? `radial-gradient(circle, ${glareColor}, transparent 80%)`
                        : `linear-gradient(${glareAngle}deg, transparent, ${glareColor}, transparent)`,
                    pointerEvents: 'none',
                    zIndex: 5,
                    x: glareX,
                    y: glareY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />

            {/* Subtle base glow effect when hovered */}
            <motion.div
                animate={{ opacity: isHovered ? 0.05 : 0 }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: glareColor,
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />
        </div>
    );
};

export default GlareHover;
