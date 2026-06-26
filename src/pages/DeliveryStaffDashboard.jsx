import React, { useState } from 'react';
import { Package, User, Store, Navigation, Phone, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DeliveryStaffDashboard = () => {
    const { user, updateAnyUser } = useAuth();
    
    // Get the most recent active delivery
    const deliveries = user?.deliveries || [];
    const activeDeliveryData = deliveries.length > 0 ? deliveries[deliveries.length - 1] : null;

    const handleGetDirections = (location) => {
        if (!location) return;
        const encodedLocation = encodeURIComponent(location);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
    };

    const handleCall = (phoneNumber) => {
        if (!phoneNumber) return;
        window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
    };

    const handleMarkAsDelivered = () => {
        if (!activeDeliveryData) return;
        if (window.confirm('Are you sure you want to mark this order as delivered?')) {
            const updatedDeliveries = deliveries.map(d => 
                d.id === activeDeliveryData.id ? { ...d, status: 'Delivered' } : d
            );
            updateAnyUser(user.email, { deliveries: updatedDeliveries });
        }
    };

    // Prepare display data from the active delivery
    const activeDelivery = activeDeliveryData ? {
        id: activeDeliveryData.id,
        product: activeDeliveryData.items?.[0]?.name || 'Fresh Produce',
        quantity: activeDeliveryData.items?.[0]?.qty || 'N/A',
        farmerName: 'Local Farmer Hub', // Default for now
        pickupLocation: 'Nearest AGRO Collection Center',
        customerName: activeDeliveryData.customerName || 'Customer',
        dropLocation: activeDeliveryData.dropLocation || 'Address not provided',
        customerPhone: activeDeliveryData.customerPhone || '',
        farmerPhone: '+91 88776 65544',
        status: activeDeliveryData.status
    } : null;

    const isDelivered = activeDelivery?.status === 'Delivered';

    return (
        <div className="section container">
            <div className="flex justify-between items-center mb-8 flex-wrap" style={{ gap: '1rem' }}>
                <div>
                    <h1 className="title" style={{ fontSize: '2.5rem', margin: 0 }}>Delivery Dashboard</h1>
                    <p className="text-secondary">Welcome back, {user?.name || 'Delivery Staff'}. {isDelivered ? 'Great job! You have no active deliveries.' : 'You have 1 active delivery.'}</p>
                </div>
                <div style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.875rem' }}>
                    Status: Online & Active
                </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Logistics View Card */}
                {!activeDelivery ? (
                    <div className="card" style={{ gridColumn: 'span 2', padding: '4rem 2rem', textAlign: 'center' }}>
                         <Package size={48} color="var(--border-color)" style={{ margin: '0 auto 1rem' }} />
                         <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No active deliveries</h2>
                         <p className="text-secondary">Orders assigned to you by the system will appear here.</p>
                    </div>
                ) : !isDelivered ? (
                    <div className="card" style={{ gridColumn: 'span 2', padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--background-base)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Active Delivery: {activeDelivery.id}</h2>
                            <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem' }}>{activeDelivery.status}</span>
                        </div>

                        <div style={{ padding: '2rem' }}>
                            {/* Logistics Flow */}
                            <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
                                {/* Pickup */}
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
                                        backgroundColor: 'rgba(46, 125, 50, 0.1)', color: 'var(--primary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                    }}>
                                        <Store size={24} />
                                    </div>
                                    <div style={{ flex: 1, paddingBottom: '3rem' }}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem' }}>Pick Up Point (Farmer)</p>
                                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{activeDelivery.farmerName}</h3>
                                                <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>{activeDelivery.pickupLocation}</p>
                                            </div>
                                            <button
                                                onClick={() => handleGetDirections(activeDelivery.pickupLocation)}
                                                className="btn-outline"
                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                                            >
                                                Map
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleCall(activeDelivery.farmerPhone)}
                                            className="btn-outline"
                                            style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                                        >
                                            <Phone size={14} /> Call Farmer
                                        </button>
                                    </div>
                                </div>

                                {/* Connecting Line */}
                                <div style={{
                                    position: 'absolute', left: '23px', top: '48px', bottom: '48px',
                                    width: '2px', borderLeft: '2px dashed var(--border-color)'
                                }}></div>

                                {/* Drop */}
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
                                        backgroundColor: 'rgba(33, 150, 243, 0.1)', color: '#2196f3',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                    }}>
                                        <User size={24} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#2196f3', marginBottom: '0.5rem' }}>Drop Location (Customer)</p>
                                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{activeDelivery.customerName}</h3>
                                                <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>{activeDelivery.dropLocation}</p>
                                            </div>
                                            <button
                                                onClick={() => handleGetDirections(activeDelivery.dropLocation)}
                                                className="btn-outline"
                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                                            >
                                                Map
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleCall(activeDelivery.customerPhone)}
                                            className="btn-outline"
                                            style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                                        >
                                            <Phone size={14} /> Call Customer
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product & Quantity Summary */}
                            <div style={{
                                backgroundColor: 'var(--background-base)', padding: '1.5rem',
                                borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <div className="flex items-center" style={{ gap: '1rem' }}>
                                    <Package size={24} color="var(--primary)" />
                                    <div>
                                        <h4 style={{ fontWeight: 600 }}>{activeDelivery.product}</h4>
                                        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Item for Delivery</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>QUANTITY</p>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{activeDelivery.quantity}</h3>
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => handleGetDirections(activeDelivery.dropLocation)}
                                    className="btn-primary"
                                    style={{ flex: 1, justifyContent: 'center', padding: '1rem' }}
                                >
                                    <Navigation size={20} /> Get Directions
                                </button>
                                <button
                                    onClick={handleMarkAsDelivered}
                                    className="btn-outline"
                                    style={{ flex: 1, justifyContent: 'center', padding: '1rem', color: 'var(--primary)', borderColor: 'var(--primary)' }}
                                >
                                    <CheckCircle size={20} /> Mark as Delivered
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="card" style={{ gridColumn: 'span 2', padding: '4rem 2rem', textAlign: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(46, 125, 50, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <CheckCircle size={48} />
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Delivery Completed!</h2>
                        <p className="text-secondary" style={{ maxWidth: '400px', margin: '0 auto 2rem' }}>You've successfully delivered the order to {activeDelivery.customerName}. Your earnings will be updated shortly.</p>
                        <button
                            onClick={() => {
                                // Archive/remove the completed delivery from the active list
                                const updatedDeliveries = deliveries.filter(d => d.id !== activeDelivery.id);
                                updateAnyUser(user.email, { deliveries: updatedDeliveries });
                            }}
                            className="btn-primary"
                            style={{ padding: '0.75rem 2rem' }}
                        >
                            Return to Queue
                        </button>
                    </div>
                )}

                {/* Sidebar Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Daily Summary</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="flex justify-between">
                                <span className="text-secondary">Deliveries Done</span>
                                <span style={{ fontWeight: 700 }}>{isDelivered ? 9 : 8}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-secondary">Total Earnings</span>
                                <span style={{ fontWeight: 700 }}>₹{isDelivered ? '1,440' : '1,240'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-secondary">Current Rating</span>
                                <span style={{ fontWeight: 700, color: 'var(--accent)' }}>4.9★</span>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '1.5rem', backgroundColor: 'rgba(46, 125, 50, 0.05)', border: '1px solid rgba(46, 125, 50, 0.2)' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>Next Up</h3>
                        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>2 more orders waiting in your queue from the Karnal hub.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryStaffDashboard;
