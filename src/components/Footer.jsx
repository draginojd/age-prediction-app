import React from 'react';
import '../App.css'; // Make sure to create a CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Created by - Armin Fazli Khan | All rights reserved.</p>
            <div className="footer-socials">
                <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://www.linkedin.com/in/armin-fazli-khan-14858a243/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/draginojd" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
        
        </footer>
    );
};

export default Footer;