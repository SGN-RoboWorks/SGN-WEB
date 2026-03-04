"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, easeOut, useAnimationFrame } from "framer-motion";
import { animate } from "framer-motion";

// Simple cn utility since src/lib/utils might not exist
const cn = (...classes) => classes.filter(Boolean).join(' ');

export function ThreeDImageRing({
    images,
    titles = [],
    width = 300,
    height,
    perspective = 5000,
    imageDistance = 500,
    initialRotation = 170,
    animationDuration = 1.5,
    staggerDelay = 0.1,
    hoverOpacity = 0.5,
    containerClassName,
    ringClassName,
    imageClassName,
    backgroundColor,
    draggable = true,
    ease = "easeOut",
    mobileBreakpoint = 768,
    mobileScaleFactor = 0.8,
    inertiaPower = 0.8, // Default power for inertia
    inertiaTimeConstant = 300, // Default time constant for inertia
    inertiaVelocityMultiplier = 20, // Default multiplier for initial spin
    autoRotate = true,
    autoRotateSpeed = 0.1,
}) {
    const containerRef = useRef(null);
    const ringRef = useRef(null);

    const rotationY = useMotionValue(initialRotation);
    const startX = useRef(0);
    const currentRotationY = useRef(initialRotation);
    const isDragging = useRef(false);
    const velocity = useRef(0); // To track drag velocity

    const [currentScale, setCurrentScale] = useState(1);
    const [showImages, setShowImages] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const isInertiaActive = useRef(false);

    const angle = useMemo(() => 360 / images.length, [images.length]);

    const getBgPos = (imageIndex, currentRot, scale) => {
        return `50% 50%`;
    };

    useEffect(() => {
        const unsubscribe = rotationY.on("change", (latestRotation) => {
            if (ringRef.current) {
                Array.from(ringRef.current.children).forEach((imgElement, i) => {
                    imgElement.style.backgroundPosition = getBgPos(
                        i,
                        latestRotation,
                        currentScale
                    );
                });
            }
            currentRotationY.current = latestRotation;

            // Shift the rotation by the initial rotation to align index 0 with the front
            const initialRotationOffset = 170;
            const rawIndex = Math.round(-(latestRotation - initialRotationOffset) / angle);
            const correctedIndex = (rawIndex % images.length + images.length) % images.length;
            setActiveIndex(correctedIndex);
        });
        return () => unsubscribe();
    }, [rotationY, images.length, imageDistance, currentScale, angle]);

    useEffect(() => {
        const handleResize = () => {
            const viewportWidth = window.innerWidth;
            const newScale = viewportWidth <= mobileBreakpoint ? mobileScaleFactor : 1;
            setCurrentScale(newScale);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [mobileBreakpoint, mobileScaleFactor]);

    useEffect(() => {
        setShowImages(true);
    }, []);

    const handleDragStart = (event) => {
        if (!draggable) return;
        isDragging.current = true;
        const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
        startX.current = clientX;
        // Stop any ongoing animation instantly when drag starts
        rotationY.stop();
        velocity.current = 0; // Reset velocity
        if (ringRef.current) {
            ringRef.current.style.cursor = "grabbing";
        }
        // Attach global move and end listeners to document when dragging starts
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", handleDragEnd);
        document.addEventListener("touchmove", handleDrag);
        document.addEventListener("touchend", handleDragEnd);
    };

    const handleDrag = (event) => {
        // Only proceed if dragging is active
        if (!draggable || !isDragging.current) return;

        const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
        const deltaX = clientX - startX.current;

        // Update velocity based on deltaX
        velocity.current = -deltaX * 0.5; // Factor of 0.5 to control sensitivity

        rotationY.set(currentRotationY.current + velocity.current);

        startX.current = clientX;
    };

    const handleDragEnd = () => {
        isDragging.current = false;
        if (ringRef.current) {
            ringRef.current.style.cursor = "grab";
            currentRotationY.current = rotationY.get();
        }

        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("mouseup", handleDragEnd);
        document.removeEventListener("touchmove", handleDrag);
        document.removeEventListener("touchend", handleDragEnd);

        const initial = rotationY.get();
        const velocityBoost = velocity.current * inertiaVelocityMultiplier;
        const target = initial + velocityBoost;

        // Animate with inertia manually using `animate()`
        isInertiaActive.current = true;
        animate(initial, target, {
            type: "inertia",
            velocity: velocityBoost,
            power: inertiaPower,
            timeConstant: inertiaTimeConstant,
            restDelta: 0.5,
            modifyTarget: (target) => Math.round(target / angle) * angle,
            onUpdate: (latest) => {
                rotationY.set(latest);
            },
            onComplete: () => {
                isInertiaActive.current = false;
            }
        });

        velocity.current = 0;
    };

    useAnimationFrame(() => {
        if (autoRotate && !isDragging.current && !isInertiaActive.current) {
            rotationY.set(rotationY.get() + autoRotateSpeed);
        }
    });


    // Corrected imageVariants: no function for 'visible' state
    const imageVariants = {
        hidden: { y: 200, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            // Transition properties will be defined directly on the motion.div using `custom` prop
        },
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "w-full h-full overflow-hidden select-none relative",
                containerClassName
            )}
            style={{
                backgroundColor,
                transform: `scale(${currentScale})`,
                transformOrigin: "center center",
            }}
            // Attach initial drag start listeners only
            onMouseDown={draggable ? handleDragStart : undefined}
            onTouchStart={draggable ? handleDragStart : undefined}
        >
            {/* Title Display */}
            <div className="absolute bottom-2 left-0 w-full z-10 flex justify-center pointer-events-none">
                <AnimatePresence mode="wait">
                    {titles[activeIndex] && (
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight text-center px-4"
                            style={{
                                textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                fontFamily: 'var(--font-outfit), sans-serif'
                            }}
                        >
                            {titles[activeIndex]}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div
                style={{
                    perspective: `${perspective}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <motion.div
                    ref={ringRef}
                    className={cn(
                        "w-full h-full absolute",
                        ringClassName
                    )}
                    style={{
                        transformStyle: "preserve-3d",
                        rotateY: rotationY,
                        cursor: draggable ? "grab" : "default",
                    }}
                >
                    <AnimatePresence>
                        {showImages && images.map((imageUrl, index) => (
                            <motion.div
                                key={index}
                                className={cn(
                                    "w-full h-full absolute rounded-[15px] overflow-hidden shadow-lg",
                                    imageClassName
                                )}
                                style={{
                                    transformStyle: "preserve-3d",
                                    backgroundImage: `url(${imageUrl})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backfaceVisibility: "hidden",
                                    rotateY: index * -angle,
                                    z: -imageDistance * currentScale,
                                    transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
                                    backgroundPosition: "50% 50%",
                                }}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={imageVariants} // Use the simplified variants object
                                custom={index} // Pass the index as a custom prop
                                transition={{
                                    delay: index * staggerDelay, // Use index directly in transition
                                    duration: animationDuration,
                                    ease: easeOut, // Apply ease for entrance animation
                                }}
                                whileHover={{ opacity: 1, transition: { duration: 0.15 } }}
                                onHoverStart={() => {
                                    // Prevent hover effects while dragging
                                    if (isDragging.current) return;
                                    if (ringRef.current) {
                                        Array.from(ringRef.current.children).forEach((imgEl, i) => {
                                            if (i !== index) {
                                                imgEl.style.opacity = `${hoverOpacity}`;
                                            }
                                        });
                                    }
                                }}
                                onHoverEnd={() => {
                                    // Prevent hover effects while dragging
                                    if (isDragging.current) return;
                                    if (ringRef.current) {
                                        Array.from(ringRef.current.children).forEach((imgEl) => {
                                            imgEl.style.opacity = `1`;
                                        });
                                    }
                                }}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

export default ThreeDImageRing;
