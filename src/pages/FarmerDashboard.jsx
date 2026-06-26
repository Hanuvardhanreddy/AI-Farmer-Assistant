import React, { useState } from 'react';
import { Package, Plus, ClipboardList, Clock, MapPin, Edit, Trash2, Sprout, Check, TrendingUp, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

const FarmerDashboard = () => {
    const { user, updateAnyUser } = useAuth();
    const { products, addProduct, deleteProduct } = useProducts();
    const [activeTab, setActiveTab] = useState('ordered');

    // Local state for farm details
    const [farmInfo, setFarmInfo] = useState({
        farmName: user?.name || '',
        specialty: 'Organic Produce',
        address: user?.address || ''
    });
    const [isSaved, setIsSaved] = useState(false);

    // Form state for adding product
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        quantity: '',
        isOrganic: false,
        image: '',
        description: ''
    });

    // Filter products belonging to this farmer
    const myProducts = products.filter(p => p.farmerName === user?.name);

    // Get orders from user context
    const allFarmerOrders = user?.incomingOrders || [];
    const orderedProducts = allFarmerOrders.filter(o => o.status === 'Ordered');
    const processingOrders = allFarmerOrders.filter(o => o.status === 'Processing');

    // Analytics Calculation
    const totalOrdersCount = allFarmerOrders.length;
    const totalIncome = allFarmerOrders.reduce((sum, order) => sum + order.amount, 0);

    const handleStatusUpdate = (orderId, newStatus) => {
        const updatedOrders = allFarmerOrders.map(o => 
            o.id === orderId ? { ...o, status: newStatus } : o
        );
        updateAnyUser(user.email, { incomingOrders: updatedOrders });
    };

    const handleUpdateFarm = (e) => {
        e.preventDefault();
        if (user) {
            updateAnyUser(user.email, { name: farmInfo.farmName, address: farmInfo.address });
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        addProduct({
            name: newProduct.name,
            price: Number(newProduct.price),
            category: newProduct.category || 'Seasonal',
            farmerName: user?.name || 'Local Farmer',
            image: newProduct.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600',
            isOrganic: newProduct.isOrganic,
            totalStock: Number(newProduct.quantity)
        });

        // Reset form and switch tab
        setNewProduct({ name: '', price: '', category: '', quantity: '', isOrganic: false, image: '', description: '' });
        setActiveTab('inventory');
        alert('Product added successfully!');
    };

    return (
        <div className="section container">
            <div className="flex justify-between items-center mb-8 flex-wrap" style={{ gap: '1rem' }}>
                <div>
                    <h1 className="title" style={{ fontSize: '2.5rem', margin: 0 }}>Farmer Dashboard</h1>
                    <p className="text-secondary">Welcome back, <strong style={{color: 'var(--primary-dark)'}}>{user?.name || 'Farmer'}</strong>! Manage your produce and orders.</p>
                </div>
                <button
                    className="btn-primary"
                    onClick={() => setActiveTab('add')}
                >
                    <Plus size={20} /> Add Product
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '1rem', backgroundColor: 'rgba(46, 125, 50, 0.1)', color: 'var(--primary)', borderRadius: 'var(--radius-md)' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-secondary" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Total Income</p>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹{totalIncome.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '1rem', backgroundColor: 'rgba(33, 150, 243, 0.1)', color: '#2196f3', borderRadius: 'var(--radius-md)' }}>
                        <ClipboardList size={24} />
                    </div>
                    <div>
                        <p className="text-secondary" style={{ fontSize: '0.875rem', fontWeight: 500 }}>No. of Orders</p>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalOrdersCount}</h3>
                    </div>
                </div>

                <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '1rem', backgroundColor: 'rgba(255, 152, 0, 0.1)', color: '#ff9800', borderRadius: 'var(--radius-md)' }}>
                        <Package size={24} />
                    </div>
                    <div>
                        <p className="text-secondary" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Active Packing</p>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{processingOrders.length}</h3>
                    </div>
                </div>
            </div>

            {/* Tabs Layout */}
            <div className="card" style={{ overflow: 'hidden' }}>
                <div className="flex" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--background-base)', overflowX: 'auto' }}>
                    <button
                        style={{
                            padding: '1rem 1.5rem',
                            fontWeight: 600,
                            borderBottom: activeTab === 'ordered' ? '3px solid var(--primary)' : '3px solid transparent',
                            color: activeTab === 'ordered' ? 'var(--primary-dark)' : 'var(--text-secondary)',
                            transition: 'all var(--transition-fast)',
                            whiteSpace: 'nowrap'
                        }}
                        onClick={() => setActiveTab('ordered')}
                    >
                        <ClipboardList size={18} style={{ marginRight: '0.5rem' }} /> Ordered Products
                    </button>
                    <button
                        style={{
                            padding: '1rem 1.5rem',
                            fontWeight: 600,
                            borderBottom: activeTab === 'processing' ? '3px solid var(--primary)' : '3px solid transparent',
                            color: activeTab === 'processing' ? 'var(--primary-dark)' : 'var(--text-secondary)',
                            transition: 'all var(--transition-fast)',
                            whiteSpace: 'nowrap'
                        }}
                        onClick={() => setActiveTab('processing')}
                    >
                        <Clock size={18} style={{ marginRight: '0.5rem' }} /> Processing Orders
                    </button>
                    <button
                        style={{
                            padding: '1rem 1.5rem',
                            fontWeight: 600,
                            borderBottom: activeTab === 'inventory' ? '3px solid var(--primary)' : '3px solid transparent',
                            color: activeTab === 'inventory' ? 'var(--primary-dark)' : 'var(--text-secondary)',
                            transition: 'all var(--transition-fast)',
                            whiteSpace: 'nowrap'
                        }}
                        onClick={() => setActiveTab('inventory')}
                    >
                        <BarChart3 size={18} style={{ marginRight: '0.5rem' }} /> My Inventory
                    </button>
                    <button
                        style={{
                            padding: '1rem 1.5rem',
                            fontWeight: 600,
                            borderBottom: activeTab === 'farm-details' ? '3px solid var(--primary)' : '3px solid transparent',
                            color: activeTab === 'farm-details' ? 'var(--primary-dark)' : 'var(--text-secondary)',
                            transition: 'all var(--transition-fast)',
                            whiteSpace: 'nowrap'
                        }}
                        onClick={() => setActiveTab('farm-details')}
                    >
                        <Sprout size={18} style={{ marginRight: '0.5rem' }} /> Farm Details & Address
                    </button>
                    <button
                        style={{
                            padding: '1rem 1.5rem',
                            fontWeight: 600,
                            borderBottom: activeTab === 'add' ? '3px solid var(--primary)' : '3px solid transparent',
                            color: activeTab === 'add' ? 'var(--primary-dark)' : 'var(--text-secondary)',
                            transition: 'all var(--transition-fast)',
                            display: activeTab === 'add' ? 'block' : 'none',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add New Product
                    </button>
                </div>

                <div style={{ padding: '2rem' }}>
                    {activeTab === 'ordered' && (
                        <div style={{ overflowX: 'auto' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Incoming Orders</h2>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Order ID</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Customer</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Items</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Amount</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderedProducts.length > 0 ? orderedProducts.map(order => (
                                        <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1rem', fontWeight: 600 }}>{order.id}</td>
                                            <td style={{ padding: '1rem' }}>{order.customer}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{order.items}</td>
                                            <td style={{ padding: '1rem', fontWeight: 600 }}>₹{order.amount}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 500, backgroundColor: 'rgba(255, 152, 0, 0.1)', color: '#ff9800' }}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <button 
                                                    className="btn-primary" 
                                                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                                                    onClick={() => handleStatusUpdate(order.id, 'Processing')}
                                                >
                                                    Pack Order
                                                </button>
                                            </td>
                                        </tr>
                                    )) : <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No new orders.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'processing' && (
                        <div style={{ overflowX: 'auto' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Active Packing & Delivery</h2>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Order ID</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Customer</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Items</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {processingOrders.length > 0 ? processingOrders.map(order => (
                                        <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1rem', fontWeight: 600 }}>{order.id}</td>
                                            <td style={{ padding: '1rem' }}>{order.customer}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{order.items}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 500, backgroundColor: 'rgba(33, 150, 243, 0.1)', color: '#2196f3' }}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <button 
                                                    className="btn-outline" 
                                                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', color: 'var(--primary)', borderColor: 'var(--primary)' }}
                                                    onClick={() => handleStatusUpdate(order.id, 'Shipped')}
                                                >
                                                    Ship Now
                                                </button>
                                            </td>
                                        </tr>
                                    )) : <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No orders in processing.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'inventory' && (
                        <div style={{ overflowX: 'auto' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>My Inventory Tracking</h2>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Product Name</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Uploaded</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Quantity Sold</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Quantity Left</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myProducts.length > 0 ? myProducts.map(product => {
                                        const left = product.totalStock - product.soldCount;
                                        const stockStatus = left <= 0 ? 'Out of Stock' : left < 20 ? 'Low Stock' : 'In Stock';
                                        return (
                                            <tr key={product.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                <td style={{ padding: '1rem', fontWeight: 600 }}>{product.name}</td>
                                                <td style={{ padding: '1rem' }}>{product.totalStock} kg</td>
                                                <td style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 600 }}>{product.soldCount} kg</td>
                                                <td style={{ padding: '1rem', color: left <= 10 ? '#d32f2f' : 'inherit', fontWeight: 600 }}>{left} kg</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: 'var(--radius-full)',
                                                        fontSize: '0.875rem',
                                                        fontWeight: 500,
                                                        backgroundColor: stockStatus === 'In Stock' ? 'rgba(46, 125, 50, 0.1)' : stockStatus === 'Low Stock' ? 'rgba(255, 152, 0, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                                                        color: stockStatus === 'In Stock' ? 'var(--primary)' : stockStatus === 'Low Stock' ? '#ff9800' : '#d32f2f'
                                                    }}>
                                                        {stockStatus}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <div className="flex" style={{ gap: '0.5rem' }}>
                                                        <button style={{ padding: '0.5rem', color: 'var(--primary)' }} title="Edit Product"><Edit size={18} /></button>
                                                        <button
                                                            style={{ padding: '0.5rem', color: '#d32f2f' }}
                                                            title="Delete Product"
                                                            onClick={() => { if (window.confirm('Delete this product?')) deleteProduct(product.id); }}
                                                        ><Trash2 size={18} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }) : <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>You haven't uploaded any products yet.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'farm-details' && (
                        <div style={{ maxWidth: '700px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Your Farm Profile</h2>
                            <form className="card" style={{ padding: '2rem' }} onSubmit={handleUpdateFarm}>
                                <div className="input-group">
                                    <label className="input-label">Farm / Business Name</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={farmInfo.farmName}
                                        onChange={(e) => setFarmInfo({ ...farmInfo, farmName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Farm Specialty</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={farmInfo.specialty}
                                        onChange={(e) => setFarmInfo({ ...farmInfo, specialty: e.target.value })}
                                        placeholder="Organic, Grains, Fruits, etc."
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Physical Address / Farm Location</label>
                                    <textarea
                                        className="input-field"
                                        rows="3"
                                        value={farmInfo.address}
                                        onChange={(e) => setFarmInfo({ ...farmInfo, address: e.target.value })}
                                        required
                                        style={{ resize: 'vertical' }}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {isSaved ? <><Check size={18} /> Farm Details Updated</> : 'Save Farm Info'}
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'add' && (
                        <form style={{ maxWidth: '600px', margin: '0 auto' }} onSubmit={handleAddProduct}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem' }}>Add New Product</h2>

                            <div className="input-group">
                                <label className="input-label">Product Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g., Fresh Organic Carrots"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="input-group">
                                    <label className="input-label">Category</label>
                                    <select
                                        className="input-field"
                                        value={newProduct.category}
                                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Leafy">Leafy Vegetables</option>
                                        <option value="Root">Root Vegetables</option>
                                        <option value="Seasonal">Seasonal Specials</option>
                                        <option value="Dairy">Dairy & Eggs</option>
                                        <option value="Staples">Staples</option>
                                        <option value="Combo">Combo Packs</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Price per Kg (₹)</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        placeholder="40"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="input-group">
                                    <label className="input-label">Initial Stock Quantity (kilos)</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        placeholder="100"
                                        value={newProduct.quantity}
                                        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="input-group mt-2">
                                    <label className="input-label">&nbsp;</label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            style={{ accentColor: 'var(--primary)', width: '20px', height: '20px' }}
                                            checked={newProduct.isOrganic}
                                            onChange={(e) => setNewProduct({ ...newProduct, isOrganic: e.target.checked })}
                                        />
                                        <span style={{ fontWeight: 500 }}>Certified Organic</span>
                                    </label>
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Image URL</label>
                                <input
                                    type="url"
                                    className="input-field"
                                    placeholder="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"
                                    value={newProduct.image}
                                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Description</label>
                                <textarea
                                    className="input-field"
                                    rows="4"
                                    placeholder="Describe the freshness, source, etc."
                                    style={{ resize: 'vertical' }}
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="flex" style={{ gap: '1rem', marginTop: '2rem' }}>
                                <button type="button" className="btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setActiveTab('inventory')}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                                    Publish Product
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FarmerDashboard;
