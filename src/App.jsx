import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Marketplace from './pages/Marketplace';
import Cart from './pages/Cart';
import FarmerDashboard from './pages/FarmerDashboard';
import DeliveryTracking from './pages/DeliveryTracking';
import DeliveryStaffDashboard from './pages/DeliveryStaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Support from './pages/Support';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/support" element={<Support />} />

                {/* Protected Routes */}
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/farmer-dashboard" element={<ProtectedRoute><FarmerDashboard /></ProtectedRoute>} />
                <Route path="/delivery-dashboard" element={<ProtectedRoute><DeliveryStaffDashboard /></ProtectedRoute>} />
                <Route path="/tracking" element={<ProtectedRoute><DeliveryTracking /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </main>
            <Footer />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
