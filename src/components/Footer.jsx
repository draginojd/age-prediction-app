import React from 'react';
import '../App.css'; // Make sure to create a CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Created by - Armin Fazli Khan | All rights reserved.</p>
            <div className="footer-socials">
            <a href="https://www.linkedin.com/in/armin-fazli-khan-14858a243/" target="_blank"> LinkedIn</a>
                <a href="https://github.com/draginojd" target="_blank" rel="noopener noreferrer">Github</a>
                <a href="mailto:arminfazlikhan@gmail.com?subject=Hello%20Armin&body=I%20would%20like%20to%20connect%20with%20you" target="_blank" rel="noopener noreferrer">Email</a>
            </div>
        
        </footer>
    );
};

export default Footer;