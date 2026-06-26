import React from 'react';
import { Leaf, Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'var(--primary-dark)',
            color: 'var(--text-inverse)',
            padding: '4rem 0 2rem'
        }}>
            <div className="container grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                <div>
                    <div className="flex items-center mb-4" style={{ gap: '0.5rem' }}>
                        <Leaf size={28} />
                        <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>Tech Farmer</span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
                        Connecting farmers directly to consumers for fresher produce, fairer prices, and stronger communities.
                    </p>
                    <div className="flex" style={{ gap: '1rem' }}>
                        <a href="#" style={{ padding: '0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', transition: 'background-color var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}><Facebook size={20} /></a>
                        <a href="#" style={{ padding: '0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', transition: 'background-color var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}><Twitter size={20} /></a>
                        <a href="#" style={{ padding: '0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', transition: 'background-color var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}><Instagram size={20} /></a>
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Quick Links</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li><a href="/" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.8)'}>Home</a></li>
                        <li><a href="/marketplace" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.8)'}>Marketplace</a></li>
                        <li><a href="/farmers" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.8)'}>Our Farmers</a></li>
                        <li><a href="/about" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.8)'}>About Us</a></li>
                    </ul>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Contact Us</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li className="flex" style={{ gap: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
                            <MapPin size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>123 Agri Valley, Green District, 90210</span>
                        </li>
                        <li className="flex" style={{ gap: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
                            <Phone size={20} style={{ flexShrink: 0 }} />
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li className="flex" style={{ gap: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
                            <Mail size={20} style={{ flexShrink: 0 }} />
                            <span>support@techfarmer.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mt-12" style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                &copy; {new Date().getFullYear()} Tech Farmer. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
