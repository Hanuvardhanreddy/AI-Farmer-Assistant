import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, CreditCard, MapPin, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        deliveryFee,
        totalBill
    } = useCart();

    const { user, allUsers, updateAnyUser } = useAuth();
    const navigate = useNavigate();

    // Local state for delivery details, initialized with user info if available
    const [deliveryDetails, setDeliveryDetails] = useState({
        address: user?.address || '',
        phone: user?.phone || ''
    });

    // Update local state if user profile changes (e.g. they update it in Profile page)
    useEffect(() => {
        if (user) {
            setDeliveryDetails(prev => { // eslint-disable-line react-hooks/set-state-in-effect
                if (prev.address === (user.address || '') && prev.phone === (user.phone || '')) {
                    return prev;
                }
                return {
                    address: user.address || '',
                    phone: user.phone || ''
                };
            });
        }
    }, [user]);

    const handleCheckout = (e) => {
        e.preventDefault();
        
        if (user) {
            // Logic to find the most recently logged-in delivery staff
            const deliveryStaff = allUsers
                .filter(u => u.role === 'delivery')
                .sort((a, b) => (b.lastLogin || 0) - (a.lastLogin || 0));

            const assignedDriver = deliveryStaff.length > 0 ? deliveryStaff[0] : null;

            const newOrder = {
                id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
                date: new Date().toISOString().split('T')[0],
                timestamp: new Date().toISOString(),
                amount: totalBill,
                status: 'Processing',
                items: cartItems.map(item => ({ name: item.name, qty: `${item.quantity}${item.unit || 'kg'}` })),
                assignedDriver: assignedDriver ? {
                    name: assignedDriver.name,
                    email: assignedDriver.email,
                    phone: assignedDriver.phone || '+91 98765 43210'
                } : null
            };

            // Update customer's orders
            updateAnyUser(user.email, { orders: [...(user.orders || []), newOrder] });

            // Update driver's deliveries
            if (assignedDriver) {
                updateAnyUser(assignedDriver.email, {
                    deliveries: [...(assignedDriver.deliveries || []), {
                        ...newOrder,
                        customerName: user.name,
                        customerPhone: user.phone || '+91 99999 88888',
                        dropLocation: deliveryDetails.address
                    }]
                });
            }

            // Update farmers' incoming orders
            const itemsByFarmer = cartItems.reduce((acc, item) => {
                if (!acc[item.farmerName]) acc[item.farmerName] = [];
                acc[item.farmerName].push(item);
                return acc;
            }, {});

            Object.entries(itemsByFarmer).forEach(([farmerName, items]) => {
                const farmer = allUsers.find(u => u.name === farmerName && u.role === 'farmer');
                if (farmer) {
                    const farmerOrder = {
                        id: newOrder.id,
                        customer: user.name,
                        date: newOrder.date,
                        items: items.map(i => `${i.name} (${i.quantity}${i.unit || 'kg'})`).join(', '),
                        amount: items.reduce((sum, i) => sum + (i.price * i.quantity), 0),
                        status: 'Ordered'
                    };
                    updateAnyUser(farmer.email, {
                        incomingOrders: [...(farmer.incomingOrders || []), farmerOrder]
                    });
                }
            });
        }
        
        alert(`Checkout initiated for ${user?.name || 'User'}! \nTotal amount: ₹${totalBill} \nShipping to: ${deliveryDetails.address}`);
        clearCart();
        navigate('/tracking');
    };

    return (
        <div className="section container">
            <h1 className="title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="card text-center" style={{ padding: '4rem 2rem' }}>
                    <ShoppingCart size={48} color="var(--border-color)" style={{ margin: '0 auto 1rem' }} />
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your cart is empty</h2>
                    <Link to="/marketplace" className="btn-primary">Browse Marketplace</Link>
                </div>
            ) : (
                <div className="grid" style={{ gridTemplateColumns: 'minmax(300px, 2fr) minmax(300px, 1fr)', gap: '2rem', alignItems: 'start' }}>

                    {/* Cart Items */}
                    <div className="card" style={{ padding: '0' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Cart Items ({cartItems.length})</h2>
                        </div>

                        <div>
                            {cartItems.map(item => (
                                <div key={item.id} className="flex" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', gap: '1.5rem' }}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                                    />
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{item.name}</h3>
                                                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Sold by: {item.farmerName}</p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary-dark)' }}>₹{item.price * item.quantity}</span>
                                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>₹{item.price}/kg</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex items-center" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                                                <button
                                                    type="button"
                                                    style={{ padding: '0.5rem', backgroundColor: 'var(--background-base)', transition: 'background-color var(--transition-fast)' }}
                                                    aria-label="Decrease quantity"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                                                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--background-base)'}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span style={{ padding: '0 1rem', fontWeight: 500, minWidth: '40px', textAlign: 'center' }}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    style={{ padding: '0.5rem', backgroundColor: 'var(--background-base)', transition: 'background-color var(--transition-fast)' }}
                                                    aria-label="Increase quantity"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                                                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--background-base)'}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d32f2f', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
                                                onClick={() => removeFromCart(item.id)}
                                                onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(211, 47, 47, 0.1)'}
                                                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <Trash2 size={18} /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checkout & Summary */}
                    <div>
                        <div className="card mb-4" style={{ padding: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Order Summary</h2>

                            <div className="flex justify-between mb-3 text-secondary">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between mb-4 text-secondary">
                                <span>Delivery Fee (Standard)</span>
                                <span>₹{deliveryFee}</span>
                            </div>

                            <div className="flex justify-between mb-6" style={{ fontSize: '1.25rem', fontWeight: 700, borderTop: '1px dashed var(--border-color)', paddingTop: '1rem' }}>
                                <span>Total Bill</span>
                                <span style={{ color: 'var(--primary-dark)' }}>₹{totalBill}</span>
                            </div>
                        </div>

                        <form className="card" style={{ padding: '1.5rem' }} onSubmit={handleCheckout}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={20} color="var(--primary)" /> Delivery Details
                            </h3>

                            <div className="input-group">
                                <label className="input-label">Full Address</label>
                                <textarea
                                    className="input-field"
                                    rows="3"
                                    placeholder="Apartment, Street, City, ZIP Code"
                                    required
                                    style={{ resize: 'vertical' }}
                                    value={deliveryDetails.address}
                                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="input-group">
                                <label className="input-label">Phone Number</label>
                                <input
                                    type="tel"
                                    className="input-field"
                                    placeholder="10-digit mobile number"
                                    required
                                    value={deliveryDetails.phone}
                                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })}
                                />
                            </div>

                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CreditCard size={20} color="var(--primary)" /> Payment Method
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}>
                                    <input type="radio" name="payment" defaultChecked style={{ accentColor: 'var(--primary)' }} />
                                    <span style={{ flex: 1, fontWeight: 500 }}>Cash on Delivery</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}>
                                    <input type="radio" name="payment" style={{ accentColor: 'var(--primary)' }} />
                                    <span style={{ flex: 1, fontWeight: 500 }}>UPI/Net Banking</span>
                                </label>
                            </div>

                            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.125rem' }}>
                                Pay ₹{totalBill} & Place Order
                            </button>
                        </form>
                    </div>

                </div>
            )}
            <style>{`
        @media (max-width: 900px) {
          .grid[style*="grid-template-columns: minmax(300px, 2fr) minmax(300px, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
};

export default Cart;
