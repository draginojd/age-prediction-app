import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
            
            </div>
            <div className="navbar-socials">
                <a href="https://www.linkedin.com/in/armin-fazli-khan-14858a243/" target="_blank"> LinkedIn</a>
                <a href="https://github.com/draginojd" target="_blank" rel="noopener noreferrer">Github</a>
                <a href="mailto:arminfazlikhan@gmail.com?subject=Hello%20Armin&body=I%20would%20like%20to%20connect%20with%20you" target="_blank" rel="noopener noreferrer">Email</a>
            </div>
        </nav>
    );
};

export default NavBar;
