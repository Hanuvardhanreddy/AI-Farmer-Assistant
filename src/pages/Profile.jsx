import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, MapPin, Phone, Mail, Check, LogOut, Package, ExternalLink, Calendar, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user, updateUser, logout } = useAuth();

    // Local state to handle editing the saved address
    const [address, setAddress] = useState(user?.address || '');
    const [isSaved, setIsSaved] = useState(false);

    // User order data
    const orderHistory = user?.orders || [];

    const handleUpdateAddress = (e) => {
        e.preventDefault();
        if (user) {
            // Update user context with new address
            updateUser({ ...user, address: address });
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }
    };

    if (!user) {
        return (
            <div className="section container text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h2>Please log in to view your profile.</h2>
            </div>
        );
    }

    return (
        <div className="section container" style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="title" style={{ margin: 0 }}>My Profile</h1>
                <div className="flex" style={{ gap: '1rem' }}>
                    <Link to="/support" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', borderColor: 'var(--primary)' }}>
                        <HelpCircle size={18} /> Need Help?
                    </Link>
                    <button onClick={logout} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d32f2f', borderColor: '#d32f2f' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', alignItems: 'start' }}>

                {/* Left Column: Profile Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)' }}>
                                <User size={40} />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>{user.name}</h2>
                                <span style={{ display: 'inline-block', backgroundColor: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: 600, textTransform: 'capitalize' }}>
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                            <div>
                                <label className="text-secondary" style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                    <Mail size={16} /> Email Address
                                </label>
                                <div style={{ fontWeight: 500, fontSize: '1.125rem' }}>{user.email}</div>
                            </div>
                            <div>
                                <label className="text-secondary" style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                    <Phone size={16} /> Phone Number
                                </label>
                                <div style={{ fontWeight: 500, fontSize: '1.125rem' }}>{user.phone || 'Not provided'}</div>
                            </div>
                        </div>

                        {user.role !== 'delivery' ? (
                            <form onSubmit={handleUpdateAddress} style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MapPin size={20} color="var(--primary)" /> Saved Delivery Address
                                </h3>
                                <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>We'll use this address as the default for your orders.</p>

                                <div className="input-group">
                                    <textarea
                                        className="input-field"
                                        rows="3"
                                        placeholder="Enter your full apartment or street address..."
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        style={{ resize: 'vertical' }}
                                    />
                                </div>
                                <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', justifyContent: 'center' }}>
                                    {isSaved ? <><Check size={18} /> Address Saved</> : 'Update Address'}
                                </button>
                            </form>
                        ) : (
                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Package size={20} color="var(--primary)" /> Logistics Performance
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div className="flex justify-between items-center" style={{ backgroundColor: 'var(--background-base)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                        <div>
                                            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', margin: 0, textTransform: 'uppercase' }}>Staff ID</p>
                                            <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700 }}>DSL-2024-9921</h4>
                                        </div>
                                        <div style={{ color: 'var(--primary)' }}>#9921</div>
                                    </div>
                                    <div className="flex justify-between items-center" style={{ backgroundColor: 'var(--background-base)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                        <div>
                                            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', margin: 0, textTransform: 'uppercase' }}>Completed Orders</p>
                                            <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700 }}>142</h4>
                                        </div>
                                        <div style={{ color: 'var(--primary)' }}><Check size={20} /></div>
                                    </div>
                                    <div className="flex justify-between items-center" style={{ backgroundColor: 'var(--background-base)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                        <div>
                                            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', margin: 0, textTransform: 'uppercase' }}>Total Earnings</p>
                                            <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)' }}>₹22,450</h4>
                                        </div>
                                        <div style={{ color: 'var(--accent)', fontWeight: 700 }}>+₹1,2k This Week</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Order History */}
                {user.role === 'customer' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="flex justify-between items-center">
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Order History</h2>
                            <span className="text-secondary" style={{ fontSize: '0.875rem' }}>{orderHistory.length} orders total</span>
                        </div>

                        {orderHistory.length === 0 ? (
                            <div className="card text-center" style={{ padding: '2rem' }}>
                                <Package size={40} color="var(--border-color)" style={{ margin: '0 auto 1rem' }} />
                                <p>You haven't placed any orders yet.</p>
                                <Link to="/marketplace" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Shop Now</Link>
                            </div>
                        ) : orderHistory.map(order => (
                            <div key={order.id} className="card" style={{ padding: '1.5rem', transition: 'transform var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center" style={{ gap: '0.5rem', marginBottom: '0.25rem' }}>
                                            <Package size={18} color="var(--primary)" />
                                            <span style={{ fontWeight: 700, fontSize: '1rem' }}>{order.id}</span>
                                        </div>
                                        <div className="flex items-center text-secondary" style={{ gap: '0.4rem', fontSize: '0.875rem' }}>
                                            <Calendar size={14} /> {order.date}
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        backgroundColor: order.status === 'Delivered' ? 'rgba(46, 125, 50, 0.1)' : 'rgba(33, 150, 243, 0.1)',
                                        color: order.status === 'Delivered' ? 'var(--primary)' : '#2196f3'
                                    }}>
                                        {order.status}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1.5rem', backgroundColor: 'var(--background-base)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between" style={{ fontSize: '0.9rem', marginBottom: idx !== order.items.length - 1 ? '0.5rem' : 0 }}>
                                            <span>{item.name}</span>
                                            <span style={{ fontWeight: 600 }}>{item.qty}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-secondary" style={{ fontSize: '0.75rem', margin: 0 }}>Total Amount</p>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>₹{order.amount}</h4>
                                    </div>
                                    {order.status === 'Out for Delivery' && (
                                        <Link to="/tracking" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', gap: '0.4rem' }}>
                                            Track <ExternalLink size={14} />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
