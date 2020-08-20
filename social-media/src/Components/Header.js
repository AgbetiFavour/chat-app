import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="header-login-signup">
            <div className="header-limiter">
                <h1><a href="/">Coding<span>Cafe</span></a></h1>

                <nav>
                    <Link to="/">Home</Link>
                    <a className="selected"><Link to="/">About App</Link></a>
                    <a><Link to="/">Contact Us</Link></a>
                </nav>

                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign up</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header;
