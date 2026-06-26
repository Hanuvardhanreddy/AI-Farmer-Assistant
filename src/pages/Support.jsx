import React, { useState } from 'react';
import { Headphones, MessageSquare, Send, Mail, Phone, MapPin, CheckCircle2, Star } from 'lucide-react';

const Support = () => {
    const [contactForm, setContactForm] = useState({ subject: '', message: '' });
    const [feedbackForm, setFeedbackForm] = useState({ rating: 5, comment: '', category: 'General' });
    const [submitted, setSubmitted] = useState({ contact: false, feedback: false });

    const handleContactSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setSubmitted({ ...submitted, contact: true });
        setTimeout(() => setSubmitted({ ...submitted, contact: false }), 5000);
        setContactForm({ subject: '', message: '' });
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setSubmitted({ ...submitted, feedback: true });
        setTimeout(() => setSubmitted({ ...submitted, feedback: false }), 5000);
        setFeedbackForm({ rating: 5, comment: '', category: 'General' });
    };

    return (
        <div className="section container" style={{ maxWidth: '1000px' }}>
            <div className="text-center mb-12">
                <h1 className="title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>How can we help?</h1>
                <p className="text-secondary" style={{ fontSize: '1.125rem' }}>
                    Have a question, feedback, or need assistance? Our team is here for you.
                </p>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

                {/* Contact Us Section */}
                <div className="flex flex-col" style={{ gap: '2rem' }}>
                    <div className="card" style={{ padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Headphones className="text-primary" /> Contact Us
                        </h2>

                        <div className="flex flex-col" style={{ gap: '1.25rem', marginBottom: '2rem' }}>
                            <div className="flex items-start" style={{ gap: '1rem' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)', borderRadius: '50%' }}>
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: 600, margin: 0 }}>Email Us</p>
                                    <p className="text-secondary" style={{ fontSize: '0.875rem' }}>support@techfarmer.com</p>
                                </div>
                            </div>
                            <div className="flex items-start" style={{ gap: '1rem' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(33, 150, 243, 0.1)', color: '#2196f3', borderRadius: '50%' }}>
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: 600, margin: 0 }}>Call Support</p>
                                    <p className="text-secondary" style={{ fontSize: '0.875rem' }}>+91 98765 43210 (Mon-Sat, 9am-6pm)</p>
                                </div>
                            </div>
                        </div>

                        {submitted.contact ? (
                            <div className="text-center" style={{ padding: '2rem', backgroundColor: 'rgba(46, 125, 50, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-light)' }}>
                                <CheckCircle2 size={48} className="text-primary" style={{ margin: '0 auto 1rem' }} />
                                <h3 style={{ margin: 0 }}>Message Sent!</h3>
                                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>We'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleContactSubmit}>
                                <div className="input-group">
                                    <label className="input-label">Subject</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Order Issue, Delivery Delay, etc."
                                        value={contactForm.subject}
                                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Message</label>
                                    <textarea
                                        className="input-field"
                                        rows="4"
                                        placeholder="Describe your issue in detail..."
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                        required
                                        style={{ resize: 'vertical' }}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                    <Send size={18} /> Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="flex flex-col" style={{ gap: '2rem' }}>
                    <div className="card" style={{ padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <MessageSquare className="text-primary" /> Share Feedback
                        </h2>

                        <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                            Your suggestions help us build a better platform for everyone.
                        </p>

                        {submitted.feedback ? (
                            <div className="text-center" style={{ padding: '2rem', backgroundColor: 'rgba(46, 125, 50, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-light)' }}>
                                <Star size={48} className="text-primary" style={{ margin: '0 auto 1rem' }} />
                                <h3 style={{ margin: 0 }}>Thank You!</h3>
                                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>We appreciate your valuable feedback.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleFeedbackSubmit}>
                                <div className="input-group">
                                    <label className="input-label">Category</label>
                                    <select
                                        className="input-field"
                                        value={feedbackForm.category}
                                        onChange={(e) => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                                    >
                                        <option value="General">General Experience</option>
                                        <option value="Marketplace">Marketplace & Products</option>
                                        <option value="AppUI">App Design/Interface</option>
                                        <option value="Delivery">Delivery Service</option>
                                        <option value="FarmerPortal">Farmer Features</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Rating</label>
                                    <div className="flex" style={{ gap: '0.5rem' }}>
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <button
                                                key={num}
                                                type="button"
                                                onClick={() => setFeedbackForm({ ...feedbackForm, rating: num })}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: '0.25rem',
                                                    color: num <= feedbackForm.rating ? '#ffc107' : 'var(--border-color)',
                                                    transition: 'transform 0.2s'
                                                }}
                                                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'}
                                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                                <Star size={28} fill={num <= feedbackForm.rating ? '#ffc107' : 'none'} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Your Comments</label>
                                    <textarea
                                        className="input-field"
                                        rows="4"
                                        placeholder="What can we improve?"
                                        value={feedbackForm.comment}
                                        onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                                        required
                                        style={{ resize: 'vertical' }}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                    Submit Feedback
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Support;
