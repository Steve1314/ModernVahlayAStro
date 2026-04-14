import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import AboutUs from "./pages/AboutUs";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // ── Intersection Observer for Reveal (rv) classes ──
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const revealItems = document.querySelectorAll('.rv');
    revealItems.forEach(item => observer.observe(item));

    // Scroll to top on route change
    window.scrollTo(0, 0);

    return () => observer.disconnect();
  }, [location.pathname]); // Re-run when route changes

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login onBack={() => window.history.back()} />} />
      </Routes>
    </>
  );
}
