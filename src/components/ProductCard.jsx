import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const isOutOfStock = (product.totalStock - product.soldCount) <= 0;

    const handleAddToCart = () => {
        if (isOutOfStock) return;
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', opacity: isOutOfStock ? 0.7 : 1 }}>
            <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '75%' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform var(--transition-normal)',
                        filter: isOutOfStock ? 'grayscale(0.5)' : 'none'
                    }}
                    onMouseOver={e => !isOutOfStock && (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {product.isOrganic && (
                        <span style={{
                            backgroundColor: 'var(--primary)',
                            color: '#fff',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '0.25rem 0.5rem',
                            borderRadius: 'var(--radius-sm)'
                        }}>
                            Organic
                        </span>
                    )}
                    {isOutOfStock && (
                        <span style={{
                            backgroundColor: '#d32f2f',
                            color: '#fff',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.25rem 0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            textTransform: 'uppercase'
                        }}>
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{product.name}</h3>
                    <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary-dark)' }}>₹{product.price}<span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/kg</span></span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem', flex: 1 }}>
                    By <strong>{product.farmerName}</strong>
                </p>

                <button
                    className="btn-primary"
                    disabled={isOutOfStock}
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '0.625rem',
                        backgroundColor: isOutOfStock ? '#9e9e9e' : isAdded ? 'var(--primary-dark)' : 'var(--primary)',
                        cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                        opacity: isOutOfStock ? 0.8 : 1
                    }}
                    onClick={handleAddToCart}
                >
                    {isOutOfStock ? 'Sold Out' : isAdded ? <><Check size={18} /> Added</> : <><ShoppingCart size={18} /> Add to Cart</>}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
