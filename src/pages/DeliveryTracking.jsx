import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DeliveryTracking = () => {
    const { user } = useAuth();
    
    // Get the latest order for this customer
    const latestOrder = user?.orders && user.orders.length > 0 
        ? user.orders[user.orders.length - 1] 
        : { id: 'ORD-209485', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'Out for Delivery' };

    const orderTime = new Date(latestOrder.timestamp);
    
    const formatOrderTime = (minutesToAdd) => {
        const time = new Date(orderTime.getTime() + minutesToAdd * 60000);
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const steps = [
        { id: 0, title: 'Order Processing', desc: 'We are preparing your order', icon: <Clock size={24} />, time: formatOrderTime(5) },
        { id: 1, title: 'Packed', desc: 'Your order is ready for pickup', icon: <Package size={24} />, time: formatOrderTime(25) },
        { id: 2, title: 'Out for Delivery', desc: 'Driver is on the way', icon: <Truck size={24} />, time: formatOrderTime(45) },
        { id: 3, title: 'Delivered', desc: 'Order reached destination', icon: <CheckCircle size={24} />, time: `ETA ${formatOrderTime(120)}` },
    ];

    // Determine current step based on status
    const statusMap = { 'Processing': 0, 'Packed': 1, 'Out for Delivery': 2, 'Delivered': 3 };
    const currentStep = statusMap[latestOrder.status] ?? 2;

    const driver = latestOrder.assignedDriver || { name: 'Vikram Rao', rating: '4.8★' };

    return (
        <div className="section container flex justify-center">
            <div className="card" style={{ width: '100%', maxWidth: '800px', padding: '0' }}>

                {/* Header content */}
                <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--primary-dark)', color: '#fff' }}>
                    <div className="flex justify-between items-start flex-wrap" style={{ gap: '1rem' }}>
                        <div>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Track Your Order</h1>
                            <p style={{ color: 'rgba(255,255,255,0.8)' }}>Order #{latestOrder.id}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.25rem' }}>Estimated Delivery</p>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Today, {formatOrderTime(120)}</h2>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div style={{ height: '250px', backgroundColor: '#e0e0e0', position: 'relative', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14000!2d77.0!3d28.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1600000000000"
                        style={{ width: '100%', height: '100%', border: 0, opacity: 0.6, pointerEvents: 'none' }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Map Overlay"
                    ></iframe>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '1rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Truck size={20} />
                        </div>
                        <div>
                            <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Driver is 15 mins away</p>
                            <p className="text-secondary" style={{ fontSize: '0.75rem' }}>Arriving soon</p>
                        </div>
                    </div>
                </div>

                {/* Tracking Timeline */}
                <div style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '2rem' }}>Delivery Status</h3>

                    <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                        {/* Vertical Line */}
                        <div style={{ position: 'absolute', left: '0', top: '24px', bottom: '24px', width: '2px', backgroundColor: 'var(--border-color)', transform: 'translate(11px, 0)' }}></div>

                        {steps.map((step, index) => {
                            const isCompleted = index < currentStep;
                            const isCurrent = index === currentStep;

                            return (
                                <div key={step.id} style={{ position: 'relative', marginBottom: index === steps.length - 1 ? '0' : '2.5rem', opacity: isCompleted || isCurrent ? 1 : 0.5 }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '-2rem',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        backgroundColor: isCompleted ? 'var(--primary)' : (isCurrent ? '#fff' : 'var(--background-base)'),
                                        border: `2px solid ${isCompleted || isCurrent ? 'var(--primary)' : 'var(--border-color)'}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        zIndex: 2,
                                        boxShadow: isCurrent ? '0 0 0 4px rgba(46, 125, 50, 0.2)' : 'none'
                                    }}>
                                        {isCompleted && <CheckCircle size={14} />}
                                    </div>

                                    <div className="flex justify-between items-start">
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <div style={{
                                                padding: '0.75rem',
                                                borderRadius: 'var(--radius-md)',
                                                backgroundColor: isCurrent ? 'rgba(46, 125, 50, 0.1)' : 'var(--background-base)',
                                                color: isCurrent ? 'var(--primary)' : 'var(--text-secondary)'
                                            }}>
                                                {step.icon}
                                            </div>
                                            <div>
                                                <h4 style={{ fontWeight: 600, color: isCurrent ? 'var(--primary-dark)' : 'var(--text-primary)', fontSize: '1.125rem', marginBottom: '0.25rem' }}>{step.title}</h4>
                                                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>{step.desc}</p>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                                            {step.time}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Delivery Details Contact */}
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--background-base)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="flex items-center" style={{ gap: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0e0e0', backgroundImage: `url(https://ui-avatars.com/api/?name=${encodeURIComponent(driver.name)}&background=2e7d32&color=fff)`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        <div>
                            <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{driver.name}</p>
                            <p className="text-secondary" style={{ fontSize: '0.75rem' }}>Delivery Executive • {driver.rating || '4.8★'}</p>
                        </div>
                    </div>
                    <button className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                        Call Driver
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryTracking;
