import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { totalItemsCount } = useCart();
  const { user } = useAuth();

  return (
    <nav style={{
      backgroundColor: 'var(--background-card)',
      borderBottom: '1px solid var(--border-color)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center" style={{ gap: '0.5rem', color: 'var(--primary)' }}>
          <Leaf size={28} />
          <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Tech Farmer</span>
        </Link>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="nav-links">
          <Link to="/home" style={{ fontWeight: 500, transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Home</Link>
          {(!user || (user.role !== 'farmer' && user.role !== 'delivery')) && (
            <Link to="/marketplace" style={{ fontWeight: 500, transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Marketplace</Link>
          )}
          {user && user.role === 'farmer' && (
            <Link to="/farmer-dashboard" style={{ fontWeight: 500, transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Dashboard</Link>
          )}
          <Link to="/support" style={{ fontWeight: 500, transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Support</Link>
          {user && user.role === 'admin' && (
            <Link to="/admin" style={{ fontWeight: 500, transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Admin</Link>
          )}
          {user && user.role === 'delivery' && (
            <Link to="/delivery-dashboard" style={{ fontWeight: 500, transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Dashboard</Link>
          )}
        </div>

        <div className="flex items-center" style={{ gap: '1rem' }}>
          {user && user.role !== 'farmer' && user.role !== 'delivery' && (
            <Link to="/cart" style={{ padding: '0.5rem', borderRadius: '50%', position: 'relative', transition: 'background-color var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--background-base)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'} aria-label="Cart">
              <ShoppingCart size={24} color="var(--text-secondary)" />
              {totalItemsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  fontSize: '0.65rem',
                  fontWeight: 'bold',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'translate(25%, -25%)'
                }}>
                  {totalItemsCount}
                </span>
              )}
            </Link>
          )}

          {user ? (
            <div className="flex items-center" style={{ gap: '0.75rem' }}>
              <Link to="/profile" className="flex items-center" style={{ gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span style={{ display: 'none' }} className="login-text">{user.name}</span>
              </Link>
            </div>
          ) : (
            <Link to="/auth" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
              <User size={18} />
              <span style={{ display: 'none' }} className="login-text">Login/Register</span>
            </Link>
          )}

          <button style={{ padding: '0.5rem', display: 'block' }} className="menu-btn" aria-label="Menu">
            <Menu size={24} color="var(--text-secondary)" />
          </button>
        </div>
      </div>
      <style>{`
        @media (min-width: 768px) {
          .nav-links { display: flex !important; }
          .menu-btn { display: none !important; }
          .login-text { display: inline !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
