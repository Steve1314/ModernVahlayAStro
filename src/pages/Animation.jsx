import { useEffect, useState, useRef } from "react";
import Wheel from "../assets/new_wheel_s5ozry.png";
import './animation.css'
import aries from "../assets/aries.png";
import taurus from "../assets/taurus.png";
import gemini from "../assets/gemini.png";
import cancer from "../assets/cancer.png";
import leo from "../assets/leo.png";
import virgo from "../assets/virgo.png";
import libra from "../assets/libra.png";
import scorpio from "../assets/scorpio.png";
import sagittarius from "../assets/sagittarius.png";
import capricorn from "../assets/capricorn.png";
import aquarius from "../assets/aquarius.png";
import pisces from "../assets/pisces.png";

export default function Animation({ onGetDetails }) {
    const [rotation, setRotation] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef(null);
    const lastScrollTime = useRef(0);
    const COOLDOWN = 300; // Reduced for rapid successive scrolls

    const zodiacs = [
        {
            name: "Aries",
            icon: aries,
            element: "Fire",
            traits: "Bold, energetic, fearless",
            description:
                "Aries is the pioneer of the zodiac, driven by passion, courage, and a relentless desire to lead. People born under Aries are natural initiators who thrive in fast-paced environments and love taking on new challenges. Their fiery energy makes them confident, competitive, and action-oriented."
        },
        {
            name: "Taurus",
            icon: taurus,
            element: "Earth",
            traits: "Stable, loyal, sensual",
            description:
                "Taurus represents stability, comfort, and grounded energy. These individuals value security, loyalty, and the pleasures of life, often surrounding themselves with beauty and luxury. Known for their patience and persistence, Taurus people are reliable in all relationships."
        },
        {
            name: "Gemini",
            icon: gemini,
            element: "Air",
            traits: "Curious, adaptable, witty",
            description:
                "Gemini is the communicator of the zodiac, full of curiosity and intellectual energy. These individuals are highly adaptable, quick thinkers, and love engaging in conversations. Their dual nature allows them to see multiple perspectives, making them versatile."
        },
        {
            name: "Cancer",
            icon: cancer,
            element: "Water",
            traits: "Emotional, protective, intuitive",
            description:
                "Cancer is deeply connected to emotions, family, and home. These individuals are nurturing, compassionate, and highly intuitive, often sensing the feelings of others without words. They value emotional security and form strong bonds with loved ones."
        },
        {
            name: "Leo",
            icon: leo,
            element: "Fire",
            traits: "Confident, charismatic, bold",
            description:
                "Leo is the natural leader and performer of the zodiac, radiating confidence, warmth, and charisma. These individuals love being in the spotlight and have a strong desire to express themselves creatively. They are generous, passionate, and fiercely loyal."
        },
        {
            name: "Virgo",
            icon: virgo,
            element: "Earth",
            traits: "Analytical, practical, perfectionist",
            description:
                "Virgo is detail-oriented, thoughtful, and highly analytical. These individuals strive for perfection and take pride in their ability to organize, improve, and refine everything. They are practical problem-solvers who approach life with logic and precision."
        },
        {
            name: "Libra",
            icon: libra,
            element: "Air",
            traits: "Balanced, charming, diplomatic",
            description:
                "Libra seeks harmony, balance, and beauty in all aspects of life. These individuals are naturally charming, social, and skilled at maintaining peace. They value fairness and often act as mediators, bringing people together with their diplomatic nature."
        },
        {
            name: "Scorpio",
            icon: scorpio,
            element: "Water",
            traits: "Intense, mysterious, powerful",
            description:
                "Scorpio is known for its depth, intensity, and magnetic presence. These individuals are highly passionate and emotionally powerful, often experiencing life on a profound level. They are determined, strategic, and unafraid of transformation."
        },
        {
            name: "Sagittarius",
            icon: sagittarius,
            element: "Fire",
            traits: "Adventurous, optimistic, free-spirited",
            description:
                "Sagittarius is the explorer of the zodiac, always seeking knowledge, truth, and new experiences. These individuals are optimistic and driven by a love for freedom. They enjoy exploring different cultures, ideas, and philosophies."
        },
        {
            name: "Capricorn",
            icon: capricorn,
            element: "Earth",
            traits: "Disciplined, ambitious, responsible",
            description:
                "Capricorn is focused, disciplined, and goal-oriented. These individuals are driven by ambition and have a strong sense of responsibility. They are excellent planners who value structure, hard work, and long-term success."
        },
        {
            name: "Aquarius",
            icon: aquarius,
            element: "Air",
            traits: "Innovative, independent, visionary",
            description:
                "Aquarius is forward-thinking, unique, and highly independent. These individuals are visionaries who enjoy challenging norms and bringing new ideas. They value individuality and often think outside the box."
        },
        {
            name: "Pisces",
            icon: pisces,
            element: "Water",
            traits: "Dreamy, compassionate, artistic",
            description:
                "Pisces is deeply intuitive, emotional, and imaginative. These individuals are compassionate souls who connect easily with others on an emotional level. They are often drawn to art, creativity, and spirituality."
        }
    ];

    const [isInView, setIsInView] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const activeIndexRef = useRef(activeIndex);
    const isHoveringRef = useRef(isHovering);

    // Keep refs in sync with state to avoid re-attaching the event listener
    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    useEffect(() => {
        isHoveringRef.current = isHovering;
    }, [isHovering]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.1 } // Immediate capture as it enters view
        );

        if (scrollContainerRef.current) {
            observer.observe(scrollContainerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleWheel = (e) => {
            if (!isHoveringRef.current) return; // Don't intercept if we're not hovering on it

            const currentIndex = activeIndexRef.current;
            const isAtEnd = currentIndex === zodiacs.length - 1;
            const isAtStart = currentIndex === 0;

            if (e.deltaY > 0 && isAtEnd) {
                // At the last sign, scrolling down -> Allow natural scroll
                return;
            }

            if (e.deltaY < 0 && isAtStart) {
                // At the first sign, scrolling up -> Allow natural scroll
                return;
            }

            // Otherwise, we are interacting with the wheel, so prevent default
            e.preventDefault();

            if (Date.now() - lastScrollTime.current < COOLDOWN) return;
            const delta = Math.abs(e.deltaY);
            if (delta < 15) return;

            // Calculate steps based on intensity (minimum 1, maximum 4)
            const power = Math.min(Math.max(Math.floor(delta / 100), 1), 4);

            if (e.deltaY > 0) {
                // Scroll down (Next)
                const nextIndex = Math.min(currentIndex + power, zodiacs.length - 1);
                if (nextIndex !== currentIndex) {
                    const actualSteps = nextIndex - currentIndex;
                    setActiveIndex(nextIndex);
                    setRotation(prev => prev - (actualSteps * 30));
                    lastScrollTime.current = Date.now();
                }
            } else if (e.deltaY < 0) {
                // Scroll up (Prev)
                const prevIndex = Math.max(currentIndex - power, 0);
                if (prevIndex !== currentIndex) {
                    const actualSteps = currentIndex - prevIndex;
                    setActiveIndex(prevIndex);
                    setRotation(prev => prev + (actualSteps * 30));
                    lastScrollTime.current = Date.now();
                }
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, []); // Empty dependency array prevents detaching/reattaching!

    return (
        <section className="zodiac-section" id="wheel" ref={scrollContainerRef}>
            <div className="zodiac-top-decoration">

                <h1 className="stitle">Explore Your <span>Cosmic Path</span></h1>
                <span className="sbadge">Vahlay Astro</span>
            </div>

            <div className="zodiac-container">
                {/* Information Panel - Left */}
                <div className="zodiac-info-panel left">
                    <div className="zodiac-header" key={`name-${activeIndex}`}>
                        <div className="zodiac-symbol-bg">
                            <img
                                src={zodiacs[activeIndex].icon}
                                alt={zodiacs[activeIndex].name}
                                className="zodiac-active-icon-mini"
                            />
                        </div>
                        <h2 className="zodiac-name">{zodiacs[activeIndex].name}</h2>
                        <span className="zodiac-traits">{zodiacs[activeIndex].traits}</span>
                    </div>
                </div>

                {/* Central Wheel */}
                <div 
                    className="zodiac-wheel-wrapper"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div className="zodiac-wheel-outer" style={{ transform: `rotate(${rotation}deg)` }}>
                        <img src={Wheel} alt="Zodiac Wheel" className="zodiac-wheel-image" />
                    </div>

                    <div className="zodiac-pointer">
                        <div className="pointer-glow"></div>
                    </div>

                    <div className="zodiac-center-display">
                        <div className="active-zodiac-card" key={`card-${activeIndex}`}>
                            <div className="card-inner">
                                <img
                                    src={zodiacs[activeIndex].icon}
                                    alt=""
                                    className="active-icon-large"
                                />
                                <div className="zodiac-glow"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Information Panel - Right */}
                <div className="zodiac-info-panel right" key={`desc-${activeIndex}`}>
                    <div className="element-badge">
                        <span className="element-dot"></span>
                        {zodiacs[activeIndex].element} Element
                    </div>
                    <p className="zodiac-description">
                        {zodiacs[activeIndex].description}
                    </p>
                    <button className="read-more-btn" onClick={onGetDetails}>
                        Get Detailed Horoscope <span className="arrow">→</span>
                    </button>
                </div>
            </div>

            <div className="scroll-hint">
                <div className="mouse-wheel"></div>
                <span>Scroll to Rotate the Heavens</span>
            </div>
        </section>
    );
}