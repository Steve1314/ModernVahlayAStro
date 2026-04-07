import React from 'react';
import './login.css';

export default function Login({ onBack }) {
    return (
        <section className="login-sec">
            <div className="login-card">
                <div className="login-header">
                    <span className="login-badge">Celestial Access</span>
                    <h2 className="login-title">Vahlay <span>Astro</span></h2>
                </div>
                
                <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <label>Your Email</label>
                        <input type="email" placeholder="Enter your email" required />
                    </div>
                    
                    <div className="input-group">
                        <label>Your Password</label>
                        <input type="password" placeholder="Enter your password" required />
                    </div>
                    
                    <button type="submit" className="login-btn">
                        Connect with Cosmic
                    </button>
                </form>
                
                <div className="back-btn">
                    <button className="back-link" onClick={onBack}>
                        <span>←</span> Back to the Stars
                    </button>
                </div>
                
                <div className="login-footer">
                    Don't have a celestial account? <a href="#">Create One</a>
                </div>
            </div>
        </section>
    );
}
