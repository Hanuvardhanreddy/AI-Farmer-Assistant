/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedSession = localStorage.getItem('agroSession');
        return savedSession ? JSON.parse(savedSession) : null;
    });

    const [allUsers, setAllUsers] = useState(() => {
        const savedUsers = localStorage.getItem('agroUsers_v2');
        return savedUsers ? JSON.parse(savedUsers) : [
            // Default mock users for testing
            { email: 'customer@test.com', password: '123', name: 'Test Customer', role: 'customer', orders: [] },
            { email: 'farmer@test.com', password: '123', name: 'Rajesh Kumar', role: 'farmer', products: [], incomingOrders: [] },
            { email: 'sunita@test.com', password: '123', name: 'Sunita Devi', role: 'farmer', products: [], incomingOrders: [] },
            { email: 'delivery@test.com', password: '123', name: 'Rahul (Delivery)', role: 'delivery', deliveries: [] },
            { email: 'driver2@test.com', password: '123', name: 'Vikram (Delivery)', role: 'delivery', deliveries: [] }
        ];
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('agroSession', JSON.stringify(user));
        } else {
            localStorage.removeItem('agroSession');
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('agroUsers_v2', JSON.stringify(allUsers));
    }, [allUsers]);

    const register = (userData) => {
        const exists = allUsers.find(u => u.email === userData.email);
        if (exists) {
            throw new Error('User with this email already exists.');
        }
        setAllUsers(prev => [...prev, userData]);
    };

    const login = (email, password) => {
        const foundUser = allUsers.find(u => u.email === email);
        if (!foundUser) {
            throw new Error('User not found. Please register first.');
        }
        if (foundUser.password !== password) {
            throw new Error('Invalid email or password.');
        }
        const updatedUser = { ...foundUser, lastLogin: Date.now() };
        setUser(updatedUser);
        setAllUsers(prev => prev.map(u => u.email === email ? updatedUser : u));
    };

    const logout = () => {
        setUser(null);
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        setAllUsers(prev => prev.map(u => u.email === updatedUser.email ? updatedUser : u));
    };

    const updateAnyUser = (email, updates) => {
        setAllUsers(prev => prev.map(u => u.email === email ? { ...u, ...updates } : u));
        // If the user being updated is also the currently logged-in user, update their session too
        if (user && user.email === email) {
            setUser(prev => ({ ...prev, ...updates }));
        }
    };

    return (
        <AuthContext.Provider value={{ user, allUsers, login, register, logout, updateUser, updateAnyUser }}>
            {children}
        </AuthContext.Provider>
    );
};
