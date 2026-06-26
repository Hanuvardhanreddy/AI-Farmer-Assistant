/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Try to load cart from local storage on initial render
        const savedCart = localStorage.getItem('agroCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save to local storage whenever cart changes
    useEffect(() => {
        localStorage.setItem('agroCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                // Increment quantity if already in cart
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            // Add new item to cart
            return [...prevItems, { ...product, quantity }];
        });
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
        );
    };

    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Derived state
    const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 0 ? 50 : 0; // Simple standard delivery logic
    const totalBill = subtotal + deliveryFee;

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            totalItemsCount,
            subtotal,
            deliveryFee,
            totalBill
        }}>
            {children}
        </CartContext.Provider>
    );
};
