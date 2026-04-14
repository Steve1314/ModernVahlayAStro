import React, { useState, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
} from "framer-motion";
import "./aboutUs.css";

// Import planet textures (replace with your actual assets)
import mercuryImg from "../assets/jupiter.webp";
import venusImg from "../assets/jupiter.webp";
import earthImg from "../assets/jupiter.webp";
import marsImg from "../assets/jupiter.webp";
import jupiterImg from "../assets/jupiter.webp";
import saturnImg from "../assets/jupiter.webp";
import uranusImg from "../assets/jupiter.webp";
import neptuneImg from "../assets/jupiter.webp";
import plutoImg from "../assets/jupiter.webp";

const planetsData = [
    { name: "PLUTO", au: "39.5 AU", desc: "The distant dwarf planet.", texture: plutoImg },
    { name: "NEPTUNE", au: "30.07 AU", desc: "The farthest planet with the fastest winds.", texture: neptuneImg },
    { name: "URANUS", au: "19.18 AU", desc: "Rotates on its side.", texture: uranusImg },
    { name: "SATURN", au: "9.539 AU", desc: "Ringed beauty.", texture: saturnImg },
    { name: "JUPITER", au: "5.203 AU", desc: "Largest gas giant.", texture: jupiterImg },
    { name: "MARS", au: "1.524 AU", desc: "Red dusty planet.", texture: marsImg },
    { name: "EARTH", au: "1 AU", desc: "Our home.", texture: earthImg },
    { name: "VENUS", au: "0.723 AU", desc: "Hottest planet.", texture: venusImg },
    { name: "MERCURY", au: "0.39 AU", desc: "Closest to sun.", texture: mercuryImg },
];

const PlanetPanel = ({ planet, index, total, scrollYProgress }) => {
    const steps = total + 1;
    const inArr = Array.from({ length: steps + 1 }, (_, i) => i / steps);

    const yArr = [];
    const scaleArr = [];
    const opacityArr = [];
    const textOpacityArr = [];

    for (let i = 0; i <= steps; i++) {
        const progress = i / steps;
        const planetPosition = progress * total;
        const diff = planetPosition - index;

        if (diff < -1.2) {
            yArr.push(500);
            scaleArr.push(0.7);
            opacityArr.push(0);
            textOpacityArr.push(0);
        } else if (diff < -0.3) {
            const t = (diff + 1.2) / 0.9;
            yArr.push(350 - t * 350);
            scaleArr.push(0.8 + t * 0.8);
            opacityArr.push(0 + t);
            textOpacityArr.push(0 + t);
        } else if (diff < 0.3) {
            yArr.push(0);
            scaleArr.push(1.6);
            opacityArr.push(1);
            textOpacityArr.push(1);
        } else if (diff < 1.2) {
            const t = (diff - 0.3) / 0.9;
            yArr.push(0 - t * 400);
            scaleArr.push(1.6 - t * 0.9);
            opacityArr.push(1 - t);
            textOpacityArr.push(1 - t);
        } else {
            yArr.push(-500);
            scaleArr.push(0.6);
            opacityArr.push(0);
            textOpacityArr.push(0);
        }
    }

    const y = useTransform(scrollYProgress, inArr, yArr);
    const scale = useTransform(scrollYProgress, inArr, scaleArr);
    const opacity = useTransform(scrollYProgress, inArr, opacityArr);
    const textOpacity = useTransform(scrollYProgress, inArr, textOpacityArr);

    return (
        <section className="panel">
            <motion.div
                className="planet-wrapper"
                style={{
                    scale,
                    y,
                    opacity,
                    zIndex: total - index + 10,
                }}
            >
                <div
                    className="planet spin"
                    style={{ backgroundImage: `url(${planet.texture})` }}
                />
            </motion.div>

            <motion.div className="planet-info" style={{ opacity: textOpacity }}>
                <h4 className="planet-sub">PLANET</h4>
                <h1 className="planet-title">{planet.name}</h1>
                <p className="planet-desc">{planet.desc}</p>
                <button className="planet-btn">READ MORE</button>
            </motion.div>
        </section>
    );
};

const AboutUs = () => {
    const { scrollYProgress } = useScroll();
    const [activeIndex, setActiveIndex] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const rawIndex = latest * (planetsData.length - 1);
        const rounded = Math.round(rawIndex);
        setActiveIndex(Math.min(rounded, planetsData.length - 1));
    });

    const scrollToPlanet = (index) => {
        const totalSections = planetsData.length;
        const targetProgress = index / (totalSections - 1);
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const targetScroll = targetProgress * scrollHeight;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
    };

    // Reverse the planets array for display in nav (to match reference image order: PLUTO at top, MERCURY at bottom)
    const reversedPlanets = [...planetsData].reverse();

    return (
        <div className="solar-system-container">
            <div className="space-background" />

            {/* LEFT NAVIGATION - REVERSED ORDER to match reference image */}
            <nav className="planets-nav">
                <ul>
                    {reversedPlanets.map((p, i) => {
                        // Find original index for active state
                        const originalIndex = planetsData.findIndex(planet => planet.name === p.name);
                        return (
                            <li
                                key={p.name}
                                className={activeIndex === originalIndex ? "active" : ""}
                                onClick={() => scrollToPlanet(originalIndex)}
                            >
                                <div className="nav-icon">
                                    <img src={p.texture} alt={p.name} />
                                </div>
                                <div className="nav-text-container">
                                    <span className="nav-name">{p.name}</span>
                                    <span className="nav-au">{p.au}</span>
                                </div>
                                {activeIndex === originalIndex && (
                                    <motion.div
                                        layoutId="nav-line"
                                        className="nav-active-line"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* SCROLL AREA */}
            <div
                className="scroll-track"
                style={{ height: `${planetsData.length * 100}vh` }}
            >
                <div className="sticky-viewport">
                    {planetsData.map((planet, i) => (
                        <PlanetPanel
                            key={planet.name}
                            planet={planet}
                            index={i}
                            total={planetsData.length - 1}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;