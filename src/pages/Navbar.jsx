import "./navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">Vahlay Astro</div>

            <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#wheel">Wheel</a></li>
                <li><a href="#horoscope">Horoscope</a></li>
                <li><a href="#about">About</a></li>
            </ul>

            <button className="cta">Get Reading</button>
        </nav>
    );
}