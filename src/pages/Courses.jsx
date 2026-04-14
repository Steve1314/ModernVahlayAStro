import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import "./courses.css";

import Basics from "../assets/Basics.png";
import Foundation from "../assets/Foundation of  Vedic Astrology.png";
import Narad from "../assets/Narad Puran.png";
import New from "../assets/New edge Bhadvad Geeta.png";
import Essentials from "../assets/The Essentials of Self-Discovery(Panchang and Basic Astrology).png";

const coursesData = [
    {
        image: Basics,
        title: "BASICS",
        description: "Start your cosmic journey with the fundamental principles of astrology and celestial mechanics."
    },
    {
        image: Foundation,
        title: "FOUNDATION OF VEDIC ASTROLOGY",
        description: "Deep dive into the ancient Indian system of astrology, houses, and planetary influences."
    },
    {
        image: Essentials,
        title: "ESSENTIALS OF SELF-DISCOVERY",
        description: "Explore the internal cosmic mirror through the study of Panchang and advanced planetary alignments."
    },
    {
        image: Narad,
        title: "NARAD PURAN",
        description: "Master the profound spiritual insights and historical wisdom contained within the Narad Puran."
    },
    {
        image: New,
        title: "NEW EDGE BHAGWAD GEETA",
        description: "A modern, philosophical exploration of the Geeta's eternal wisdom applied to the cosmic path."
    }
];

export default function RotatingGallery() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const itemsCount = coursesData.length;
    const theta = 360 / itemsCount; // e.g., 72 degrees

    // Maps scroll from 0-1 to rotation from 0 to max angle (e.g., -288 deg)
    const maxRotation = -(itemsCount - 1) * theta;
    const rotateY = useTransform(scrollYProgress, [0, 1], [0, maxRotation]);

    // Update active focus item based on scroll progress
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const exactIndex = latest * (itemsCount - 1);
        const closestIndex = Math.round(exactIndex);
        if (closestIndex !== activeIndex) {
            setActiveIndex(closestIndex);
        }
    });

    return (
        <section className="courses-interactive-section" ref={containerRef}>
            <div className="sticky-carousel-wrapper">
                <div className="carousel-view-container">

                    {/* Header to help define the section */}
                    <div className="courses-scroll-header">
                        <h1 className="header-main-title">VAHLAY ASTRO COURSE</h1>
                        <p>Scroll to explore the cosmic journey</p>
                    </div>

                    {/* 3D Carousel */}
                    <div className="scene">
                        <motion.div
                            className="carousel-3d"
                            initial={false}
                            animate={{ rotateY: activeIndex * -theta }}
                            transition={{ type: "spring", stiffness: 120, damping: 25, mass: 1 }}
                        >
                            {coursesData.map((course, i) => {
                                const angle = theta * i;
                                const isActive = i === activeIndex;

                                return (
                                    <div
                                        key={i}
                                        className={`carousel-card ${isActive ? 'active' : ''}`}
                                        style={{
                                            transform: `rotateY(${angle}deg) translateZ(250px)`
                                        }}
                                    >
                                        <img src={course.image} alt={course.title} />
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Content Panel for the Focused Course */}
                    <div className="course-content-panel">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="active-course-info"
                            >
                                <h2>{coursesData[activeIndex].title}</h2>
                                <p>{coursesData[activeIndex].description}</p>
                                <button className="enroll-btn-large">Enroll Now</button>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}