import React, { useState } from 'react';
import { Users, Package, ShoppingCart, MessageSquare, Trash2, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('users'); // 'users', 'products', 'orders', 'feedback'

    const [usersList, setUsersList] = useState([
        { id: 'U-101', name: 'Ramesh Singh', role: 'Farmer', status: 'Active', joined: '2026-01-15' },
        { id: 'U-102', name: 'Priya M.', role: 'Customer', status: 'Active', joined: '2026-02-03' },
        { id: 'U-103', name: 'Vikram Rao', role: 'Delivery', status: 'Pending', joined: '2026-03-09' },
    ]);

    const [feedbackList, setFeedbackList] = useState([
        { id: 1, user: 'Priya M.', subject: 'Great freshness!', rating: 5, date: '2026-03-08', reply: null },
        { id: 2, user: 'Rahul K.', subject: 'Delivery delayed', rating: 3, date: '2026-03-05', reply: null },
    ]);

    const handleApprove = (userId) => {
        setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: 'Active' } : u));
    };

    const handleBan = (userId) => {
        setUsersList(prev => prev.map(u => 
            u.id === userId ? { ...u, status: u.status === 'Suspended' ? 'Active' : 'Suspended' } : u
        ));
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsersList(prev => prev.filter(u => u.id !== userId));
        }
    };

    const handleReplyFeedback = (feedbackId) => {
        const replyText = window.prompt('Enter your reply to the customer:');
        if (replyText) {
            setFeedbackList(prev => prev.map(fb => 
                fb.id === feedbackId ? { ...fb, reply: replyText } : fb
            ));
        }
    };

    return (
        <div className="section container">
            <div className="flex justify-between items-center mb-8 flex-wrap" style={{ gap: '1rem' }}>
                <div>
                    <h1 className="title" style={{ fontSize: '2.5rem', margin: 0 }}>Admin Panel</h1>
                    <p className="text-secondary">Platform Management Dashboard</p>
                </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: '1fr', gap: '2rem' }}>
                {/* Navigation Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    <button className={`btn-${activeTab === 'users' ? 'primary' : 'outline'}`} onClick={() => setActiveTab('users')} style={{ flex: 1, minWidth: '150px' }}>
                        <Users size={18} /> Manage Users
                    </button>
                    <button className={`btn-${activeTab === 'products' ? 'primary' : 'outline'}`} onClick={() => setActiveTab('products')} style={{ flex: 1, minWidth: '150px' }}>
                        <Package size={18} /> Farm Products
                    </button>
                    <button className={`btn-${activeTab === 'orders' ? 'primary' : 'outline'}`} onClick={() => setActiveTab('orders')} style={{ flex: 1, minWidth: '150px' }}>
                        <ShoppingCart size={18} /> All Orders
                    </button>
                    <button className={`btn-${activeTab === 'feedback' ? 'primary' : 'outline'}`} onClick={() => setActiveTab('feedback')} style={{ flex: 1, minWidth: '150px' }}>
                        <MessageSquare size={18} /> Customer Feedback
                    </button>
                </div>

                {/* Content Area */}
                <div className="card" style={{ padding: '2rem' }}>

                    {activeTab === 'users' && (
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>User Management</h2>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>ID</th>
                                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Name</th>
                                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Role</th>
                                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Joined</th>
                                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Status</th>
                                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usersList.map(user => (
                                            <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                <td style={{ padding: '1rem', fontWeight: 600 }}>{user.id}</td>
                                                <td style={{ padding: '1rem' }}>{user.name}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--background-base)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600 }}>{user.role}</span>
                                                </td>
                                                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{user.joined}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: 'var(--radius-full)',
                                                        fontSize: '0.875rem',
                                                        fontWeight: 500,
                                                        backgroundColor: user.status === 'Active' ? 'rgba(46, 125, 50, 0.1)' : user.status === 'Pending' ? 'rgba(255, 152, 0, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                                                        color: user.status === 'Active' ? 'var(--primary)' : user.status === 'Pending' ? '#ff9800' : '#d32f2f'
                                                    }}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <div className="flex" style={{ gap: '0.5rem' }}>
                                                        <button
                                                            onClick={() => handleApprove(user.id)}
                                                            style={{ padding: '0.25rem', color: 'var(--primary)', cursor: user.status === 'Active' ? 'not-allowed' : 'pointer', opacity: user.status === 'Active' ? 0.5 : 1, background: 'none', border: 'none' }}
                                                            disabled={user.status === 'Active'}
                                                            title="Approve"
                                                        >
                                                            <CheckCircle size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleBan(user.id)}
                                                            style={{ padding: '0.25rem', color: '#ff9800', cursor: 'pointer', background: 'none', border: 'none' }}
                                                            title={user.status === 'Suspended' ? 'Unban' : 'Suspend'}
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            style={{ padding: '0.25rem', color: '#d32f2f', cursor: 'pointer', background: 'none', border: 'none' }}
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className="text-center" style={{ padding: '4rem 0' }}>
                            <Package size={48} color="var(--border-color)" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>Global Product Catalog</h3>
                            <p className="text-secondary">View and moderate all products listed by farmers across the platform.</p>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="text-center" style={{ padding: '4rem 0' }}>
                            <ShoppingCart size={48} color="var(--border-color)" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>All Platform Transactions</h3>
                            <p className="text-secondary">Monitor order statuses and manage disputes.</p>
                        </div>
                    )}

                    {activeTab === 'feedback' && (
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Customer Feedback</h2>
                            <div className="grid" style={{ gap: '1rem' }}>
                                {feedbackList.map(fb => (
                                    <div key={fb.id} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div className="flex justify-between items-start flex-wrap" style={{ gap: '1rem' }}>
                                            <div>
                                                <div className="flex items-center" style={{ gap: '1rem', marginBottom: '0.5rem' }}>
                                                    <h4 style={{ fontWeight: 600 }}>{fb.user}</h4>
                                                    <span style={{ fontSize: '0.875rem', color: '#fbc02d', fontWeight: 700 }}>★ {fb.rating}/5</span>
                                                </div>
                                                <p style={{ color: 'var(--text-primary)' }}>"{fb.subject}"</p>
                                                <p className="text-secondary" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>{fb.date}</p>
                                            </div>
                                            <button
                                                className="btn-outline"
                                                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', cursor: 'pointer' }}
                                                onClick={() => handleReplyFeedback(fb.id)}
                                            >
                                                {fb.reply ? 'Update Reply' : 'Reply'}
                                            </button>
                                        </div>
                                        {fb.reply && (
                                            <div style={{ backgroundColor: 'var(--background-base)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary)', textAlign: 'left' }}>
                                                <p style={{ fontSize: '0.875rem', fontWeight: 600, margin: '0 0 0.25rem 0', color: 'var(--primary-dark)' }}>Admin Reply:</p>
                                                <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-secondary)' }}>{fb.reply}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
