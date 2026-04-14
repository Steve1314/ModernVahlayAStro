import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Vahlay Astro</div>

            <ul className="nav-links">
                <li><NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                <li><NavLink to="/courses" className={({ isActive }) => isActive ? "active" : ""}>Courses</NavLink></li>
                <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink></li>
                <li><a href="/#wheel">Wheel</a></li>
            </ul>

            <button className="cta" onClick={() => navigate('/login')}>Get Reading</button>
        </nav>
    );
}