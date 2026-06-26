import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useSearchParams } from 'react-router-dom';

const Marketplace = () => {
    const { products: allProducts } = useProducts();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('Recommended');

    const categories = [
        { name: 'All', id: 'All' },
        { name: 'Vegetables', id: 'Leafy' },
        { name: 'Fresh Fruits', id: 'Seasonal' },
        { name: 'Organic', id: 'Organic' },
        { name: 'Root Crops', id: 'Root' },
        { name: 'Dairy & Eggs', id: 'Dairy' },
        { name: 'Staples', id: 'Staples' },
        { name: 'Combo Packs', id: 'Combo' }
    ];

    useEffect(() => {
        const catParam = searchParams.get('category');
        if (catParam) {
            // Map home page category IDs to Marketplace category labels/IDs
            const categoryMap = {
                'leafy': 'Leafy',
                'seasonal': 'Seasonal',
                'organic': 'Organic',
                'root': 'Root',
                'dairy': 'Dairy',
                'staples': 'Staples',
                'combo': 'Combo',
                'offers': 'All' // For now, show all for offers
            };
            setSelectedCategory(categoryMap[catParam] || 'All');
        }
    }, [searchParams]);

    const filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.farmerName && product.farmerName.toLowerCase().includes(searchTerm.toLowerCase()));

        let matchesCategory = true;
        if (selectedCategory === 'Organic') {
            matchesCategory = product.isOrganic;
        } else if (selectedCategory !== 'All') {
            matchesCategory = product.category === selectedCategory;
        }

        return matchesSearch && matchesCategory;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Newest Arrivals') return b.id - a.id;
        return 0; // Recommended (unsorted for now)
    });

    return (
        <div className="section container">
            <div className="flex justify-between items-center mb-8 flex-wrap" style={{ gap: '1rem' }}>
                <div>
                    <h1 className="title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Marketplace</h1>
                    <p className="text-secondary">Fresh, healthy produce directly from our farmers.</p>
                </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'minmax(250px, 300px) 1fr', gap: '2rem', alignItems: 'start' }}>

                {/* Sidebar Filter */}
                <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '100px' }}>
                    <div className="flex items-center mb-6" style={{ gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                        <SlidersHorizontal size={20} color="var(--primary)" />
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Filters</h3>
                    </div>

                    <div className="input-group mb-6">
                        <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Search size={16} /> Search Produce
                        </label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Search by name or farmer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <h4 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-secondary)' }}>Categories</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-sm)',
                                        backgroundColor: selectedCategory === category.id ? 'var(--primary)' : 'transparent',
                                        color: selectedCategory === category.id ? '#fff' : 'var(--text-primary)',
                                        textAlign: 'left',
                                        transition: 'all var(--transition-fast)'
                                    }}
                                >
                                    {category.name}
                                    {selectedCategory === category.id && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fff' }} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        className="btn-outline"
                        style={{ width: '100%' }}
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('All');
                            setSortBy('Recommended');
                            setSearchParams({});
                        }}
                    >
                        Clear Filters
                    </button>
                </div>

                {/* Product Grid */}
                <div>
                    <div className="mb-4 text-secondary flex justify-between items-center text-sm" style={{ padding: '1rem', backgroundColor: 'var(--background-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <span>Showing <strong>{sortedProducts.length}</strong> products</span>
                        <div className="flex items-center" style={{ gap: '0.5rem' }}>
                            <Filter size={16} />
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                            >
                                <option value="Recommended">Sort by: Recommended</option>
                                <option value="Price: Low to High">Price: Low to High</option>
                                <option value="Price: High to Low">Price: High to Low</option>
                                <option value="Newest Arrivals">Newest Arrivals</option>
                            </select>
                        </div>
                    </div>

                    {sortedProducts.length > 0 ? (
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
                            {sortedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="card text-center" style={{ padding: '4rem 2rem' }}>
                            <Search size={48} color="var(--border-color)" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No products found</h3>
                            <p className="text-secondary">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
          .card[style*="position: sticky"] {
            position: static !important;
          }
        }
      `}</style>
        </div>
    );
};

export default Marketplace;
