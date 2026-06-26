import React, { useEffect, useState } from 'react';
import { Truck, Sprout, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight, Zap, Star, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

const Home = () => {
    const { user } = useAuth();
    const { products } = useProducts();
    const navigate = useNavigate();
    const [activeBanner, setActiveBanner] = useState(0);

    const categories = [
        { name: 'Vegetables', icon: '🌽', id: 'leafy' },
        { name: 'Fresh Fruits', icon: '🍎', id: 'seasonal' },
        { name: 'Organic', icon: '🌿', id: 'organic' },
        { name: 'Root Crops', icon: '🥔', id: 'root' },
        { name: 'Dairy & Eggs', icon: '🥛', id: 'dairy' },
        { name: 'Staples', icon: '🌾', id: 'staples' },
        { name: 'Combo Packs', icon: '📦', id: 'combo' },
        { name: 'Offers', icon: '🏷️', id: 'offers' },
    ];

    const banners = [
        {
            id: 1,
            title: "Big Farmer Days",
            subtitle: "Up to 50% Off on Fresh Harvest",
            img: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            color: "#2e7d32"
        },
        {
            id: 2,
            title: "Morning Freshness",
            subtitle: "Harvested at 4 AM, On your plate by 10 AM",
            img: "https://images.unsplash.com/photo-1595856453084-9d5f7b4ea39c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            color: "#1565c0"
        },
        {
            id: 3,
            title: "Organic Revolution",
            subtitle: "Chemical-free produce for a healthier you",
            img: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            color: "#ef6c00"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [banners.length]);

    const dealsOfTheDay = products.slice(0, 5);
    const topRated = products.slice(2, 7);

    useEffect(() => {
        if (user && user.role === 'farmer') {
            navigate('/farmer-dashboard');
        }
    }, [user, navigate]);

    if (user?.role === 'delivery') {
        return (
            <div className="section container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ maxWidth: '900px', textAlign: 'center' }}>
                    <div style={{
                        backgroundColor: 'rgba(33, 150, 243, 0.1)', width: '100px', height: '100px',
                        borderRadius: '50%', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', margin: '0 auto 2rem', color: '#2196f3'
                    }}>
                        <Truck size={50} />
                    </div>
                    <h1 className="title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '2rem' }}>
                        The Heartbeat of Freshness
                    </h1>
                    <div style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                        <p style={{ marginBottom: '1.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                            "To the world, you are a delivery person. To the farmer, you are the bridge. To the family, you are the provider of health."
                        </p>
                        <p>
                            Welcome to the Tech Farmer Logistics Portal. Your role is critical. Every mile you travel ensures that the hard work of our farmers isn't wasted and that our community receives the nutrition they deserve, exactly when they need it.
                        </p>
                    </div>
                    <div className="flex justify-center" style={{ gap: '1.5rem' }}>
                        <Link to="/delivery-dashboard" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
                            View My Deliveries
                        </Link>
                        <Link to="/profile" className="btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
                            Update My Profile
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: '#f1f3f6', paddingBottom: '3rem' }}>
            {/* Categories Bar */}
            <div style={{ backgroundColor: '#fff', boxShadow: '0 1px 1px rgba(0,0,0,.1)', padding: '1rem 0' }}>
                <div className="container overflow-x-auto" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', padding: '0 1rem' }}>
                    {categories.map((cat, idx) => (
                        <Link key={idx} to={`/marketplace?category=${cat.id}`} className="flex flex-col items-center" style={{ minWidth: '80px', textDecoration: 'none' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#333' }}>{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Carousel Banner */}
            <div className="container mt-4" style={{ position: 'relative', height: '350px', overflow: 'hidden', borderRadius: '4px' }}>
                {banners.map((banner, idx) => (
                    <div
                        key={banner.id}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: activeBanner === idx ? 1 : 0,
                            transition: 'opacity 0.8s ease-in-out',
                            backgroundImage: `linear-gradient(to right, ${banner.color}cc, transparent), url(${banner.img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 4rem',
                            color: '#fff'
                        }}
                    >
                        {activeBanner === idx && (
                            <div style={{ maxWidth: '500px' }}>
                                <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>{banner.title}</h2>
                                <p style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9 }}>{banner.subtitle}</p>
                                <Link to="/marketplace" className="btn-primary" style={{ backgroundColor: '#fff', color: banner.color, padding: '0.75rem 2rem' }}>
                                    Shop Now
                                </Link>
                            </div>
                        )}
                    </div>
                ))}
                <button
                    onClick={() => setActiveBanner((activeBanner - 1 + banners.length) % banners.length)}
                    style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.3)', padding: '1rem', borderRadius: '4px', color: '#fff' }}
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => setActiveBanner((activeBanner + 1) % banners.length)}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.3)', padding: '1rem', borderRadius: '4px', color: '#fff' }}
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Deals of the Day Section */}
            <div className="container mt-4">
                <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,.08)' }}>
                    <div className="flex justify-between items-center mb-6" style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
                        <div className="flex items-center" style={{ gap: '1rem' }}>
                            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>Deals of the Day</h2>
                            <div className="flex items-center" style={{ color: 'var(--primary)', gap: '0.5rem', fontWeight: 600 }}>
                                <Clock size={20} />
                                <span id="timer">22:45:12 Left</span>
                            </div>
                        </div>
                        <Link to="/marketplace" className="btn-primary" style={{ fontSize: '0.875rem' }}>View All</Link>
                    </div>
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        {dealsOfTheDay.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Promotional Banner */}
            <div className="container mt-4 grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                <div style={{ height: '200px', backgroundColor: '#e3f2fd', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', border: '1px solid #bbdefb' }}>
                    <div>
                        <h3 style={{ color: '#1565c0', fontSize: '1.5rem', fontWeight: 700 }}>Direct From Farm</h3>
                        <p style={{ color: '#1e88e5' }}>Save up to 30% on direct orders</p>
                        <Link to="/marketplace" className="btn-primary mt-4" style={{ backgroundColor: '#1565c0', display: 'inline-flex', textDecoration: 'none' }}>Learn More</Link>
                    </div>
                    <Sprout size={80} color="#64b5f6" />
                </div>
                <div style={{ height: '200px', backgroundColor: '#f1f8e9', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', border: '1px solid #dcedc8' }}>
                    <div>
                        <h3 style={{ color: '#2e7d32', fontSize: '1.5rem', fontWeight: 700 }}>Free Delivery</h3>
                        <p style={{ color: '#43a047' }}>On orders above ₹499 today</p>
                        <Link to="/marketplace" className="btn-primary mt-4" style={{ display: 'inline-flex', textDecoration: 'none' }}>Check Now</Link>
                    </div>
                    <Truck size={80} color="#81c784" />
                </div>
            </div>

            {/* Top Rated Section */}
            <div className="container mt-4">
                <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,.08)' }}>
                    <div className="flex justify-between items-center mb-6" style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
                        <div className="flex items-center" style={{ gap: '1rem' }}>
                            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>Recommended For You</h2>
                            <div className="flex items-center" style={{ color: '#ffc107', gap: '0.25rem' }}>
                                <Star size={20} fill="#ffc107" />
                                <Star size={20} fill="#ffc107" />
                                <Star size={20} fill="#ffc107" />
                            </div>
                        </div>
                        <Link to="/marketplace" className="btn-primary" style={{ fontSize: '0.875rem' }}>View All</Link>
                    </div>
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        {topRated.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Trust Section */}
            <div className="container mt-8 section" style={{ backgroundColor: '#fff', borderRadius: '4px', textAlign: 'center' }}>
                <h2 className="title" style={{ fontSize: '1.75rem', marginBottom: '3rem' }}>Why Tech Farmer?</h2>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <div>
                        <ShieldCheck size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Quality Assurance</h4>
                        <p className="text-secondary">Multi-level quality checks before every delivery.</p>
                    </div>
                    <div>
                        <Zap size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Express Delivery</h4>
                        <p className="text-secondary">Get your orders within 2 hours in selected cities.</p>
                    </div>
                    <div>
                        <Sprout size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Support Farmers</h4>
                        <p className="text-secondary">90% of your payment goes directly to the farmer.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
