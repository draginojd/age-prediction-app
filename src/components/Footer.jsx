import React from 'react';
import '../App.css'; // Make sure to create a CSS file for styling
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Created by - Armin Fazli Khan | All rights reserved.</p>
            <div className="footer-socials">
                <a href="https://www.linkedin.com/in/armin-fazli-khan-14858a243/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin style={{ marginRight: '6px', color: '#0A66C2' }} /> LinkedIn
                </a>
                <a href="https://github.com/draginojd" target="_blank" rel="noopener noreferrer">
                    <FaGithub style={{ marginRight: '6px', color: '#fff' }} /> Github
                </a>
                <a href="mailto:arminfazlikhan@gmail.com?subject=Hello%20Armin&body=I%20would%20like%20to%20connect%20with%20you" target="_blank" rel="noopener noreferrer">
                    <FaEnvelope style={{ marginRight: '6px', color: '#D44638' }} /> Email
                </a>
            </div>
        
        </footer>
    );
};

export default Footer;