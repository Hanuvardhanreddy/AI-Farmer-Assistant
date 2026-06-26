import React, { useState } from 'react';
import { User, Sprout, Truck, LogIn, UserPlus, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('customer');
    const [error, setError] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        extra: '' // For role-specific like Vehicle Reg or Farm Details
    });

    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
        if (successMsg) setSuccessMsg('');
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePhone = (phone) => {
        return /^\d{10}$/.test(phone);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        // Email Validation (Required for both Login and Register)
        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!isLogin) {
            // Phone Validation (Required for Register)
            if (!validatePhone(formData.phone)) {
                setError('Please enter a valid 10-digit phone number.');
                return;
            }

            // Name Validation
            if (formData.name.length < 2) {
                setError('Name must be at least 2 characters long.');
                return;
            }

            // Password Validation (Simple check)
            if (formData.password.length < 3) {
                setError('Password must be at least 3 characters long.');
                return;
            }
        }

        try {
            if (isLogin) {
                // Login logic using stored credentials
                login(formData.email, formData.password);
                console.log('User Logged In:', formData.email);
                // Redirect to Home after success
                navigate('/home');
            } else {
                // Register logic with validation
                const userData = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: role,
                    phone: formData.phone,
                    address: role === 'delivery' ? '' : formData.address,
                    vehicleReg: role === 'delivery' ? formData.extra : '',
                    history: [],
                    earnings: 0
                };
                register(userData);
                console.log('User Registered:', userData);
                setSuccessMsg('Registration successful! Please login to continue.');
                setIsLogin(true); // Switch to login view
                // Reset password field for security
                setFormData(prev => ({ ...prev, password: '' }));
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const roles = [
        { id: 'customer', label: 'Customer', icon: <User size={20} /> },
        { id: 'farmer', label: 'Farmer', icon: <Sprout size={20} /> },
        { id: 'delivery', label: 'Delivery Staff', icon: <Truck size={20} /> }
    ];

    return (
        <div className="section container flex items-center justify-center" style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--background-base)' }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>

                {/* Toggle Login/Register */}
                <div className="flex" style={{ backgroundColor: 'var(--background-base)', padding: '0.25rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
                    <button
                        onClick={() => setIsLogin(true)}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 600,
                            backgroundColor: isLogin ? 'var(--background-card)' : 'transparent',
                            color: isLogin ? 'var(--primary)' : 'var(--text-secondary)',
                            boxShadow: isLogin ? 'var(--shadow-sm)' : 'none',
                            transition: 'all var(--transition-fast)'
                        }}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 600,
                            backgroundColor: !isLogin ? 'var(--background-card)' : 'transparent',
                            color: !isLogin ? 'var(--primary)' : 'var(--text-secondary)',
                            boxShadow: !isLogin ? 'var(--shadow-sm)' : 'none',
                            transition: 'all var(--transition-fast)'
                        }}
                    >
                        Register
                    </button>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 className="title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                        {isLogin ? 'Welcome Back' : 'Create an Account'}
                    </h2>
                    <p className="text-secondary">
                        {isLogin ? 'Enter your credentials to access your account.' : 'Join our agricultural marketplace today.'}
                    </p>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: 'rgba(211, 47, 47, 0.1)',
                        color: '#d32f2f',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        border: '1px solid rgba(211, 47, 47, 0.2)'
                    }}>
                        {error}
                    </div>
                )}

                {successMsg && (
                    <div style={{
                        backgroundColor: 'rgba(46, 125, 50, 0.1)',
                        color: 'var(--primary)',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        border: '1px solid rgba(46, 125, 50, 0.2)'
                    }}>
                        {successMsg}
                    </div>
                )}

                {/* Role Selection */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label className="input-label">I am a...</label>
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                        {roles.map(r => (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => setRole(r.id)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '1rem 0.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: `2px solid ${role === r.id ? 'var(--primary)' : 'var(--border-color)'}`,
                                    backgroundColor: role === r.id ? 'rgba(46, 125, 50, 0.05)' : 'transparent',
                                    color: role === r.id ? 'var(--primary)' : 'var(--text-secondary)',
                                    transition: 'all var(--transition-fast)'
                                }}
                            >
                                {r.icon}
                                <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{r.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-group">
                            <label className="input-label">Full Name</label>
                            <input type="text" name="name" className="input-field" placeholder="John Doe" value={formData.name} onChange={handleChange} required={!isLogin} />
                        </div>
                    )}

                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <input type="email" name="email" className="input-field" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input type="password" name="password" className="input-field" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                    </div>

                    {!isLogin && (
                        <>
                            <div className="input-group">
                                <label className="input-label">Phone Number</label>
                                <input type="tel" name="phone" className="input-field" placeholder="10-digit number" value={formData.phone} onChange={handleChange} required />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Primary Address</label>
                                <textarea name="address" className="input-field" placeholder="Full address for deliveries" value={formData.address} onChange={handleChange} required rows="2" style={{ resize: 'vertical' }}></textarea>
                            </div>
                        </>
                    )}

                    {!isLogin && role === 'delivery' && (
                        <div className="input-group">
                            <label className="input-label">Vehicle Registration Number</label>
                            <input type="text" name="extra" className="input-field" placeholder="KA-01-AB-1234" value={formData.extra} onChange={handleChange} required />
                        </div>
                    )}

                    <button type="submit" className="btn-primary mt-4" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1rem' }}>
                        {isLogin ? <><LogIn size={20} /> Sign In</> : <><UserPlus size={20} /> Sign Up</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
