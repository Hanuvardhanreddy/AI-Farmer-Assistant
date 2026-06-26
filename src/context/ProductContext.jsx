/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const initialProducts = [
    {
        id: 1,
        name: 'Fresh Spinach',
        category: 'Leafy',
        price: 40,
        farmerName: 'Rajesh Kumar',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: true,
        totalStock: 50,
        soldCount: 0
    },
    {
        id: 2,
        name: 'Organic Tomatoes',
        category: 'Leafy',
        price: 60,
        farmerName: 'Sunita Devi',
        image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: true,
        totalStock: 100,
        soldCount: 0
    },
    {
        id: 4,
        name: 'Alphanso Mango',
        category: 'Seasonal',
        price: 450,
        farmerName: 'Vijay Patil',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: true,
        totalStock: 30,
        soldCount: 0
    },
    {
        id: 5,
        name: 'Fresh Carrots',
        category: 'Root',
        price: 50,
        farmerName: 'Meena Reddy',
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: false,
        totalStock: 60,
        soldCount: 0
    },
    {
        id: 6,
        name: 'Organic Bananas',
        category: 'Seasonal',
        price: 60,
        farmerName: 'Suresh Raina',
        image: 'https://images.unsplash.com/photo-1571771894821-ad9962a1264e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: true,
        totalStock: 120,
        soldCount: 0
    },
    {
        id: 7,
        name: 'Cauliflower',
        category: 'Leafy',
        price: 45,
        farmerName: 'Gopal Krishnan',
        image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ec3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: false,
        totalStock: 40,
        soldCount: 0
    },
    {
        id: 8,
        name: 'Farm Potatoes',
        category: 'Root',
        price: 35,
        farmerName: 'Harish Verma',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: false,
        totalStock: 150,
        soldCount: 0
    },
    {
        id: 10,
        name: 'Green Cucumbers',
        category: 'Leafy',
        price: 30,
        farmerName: 'Sunita Devi',
        image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: false,
        totalStock: 90,
        soldCount: 0
    },
    {
        id: 11,
        name: 'Red Bell Peppers',
        category: 'Leafy',
        price: 120,
        farmerName: 'Amit Singh',
        image: 'https://images.unsplash.com/photo-1563565312879-843f1ec6122d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: true,
        totalStock: 35,
        soldCount: 0
    },
    {
        id: 12,
        name: 'Fresh Garlic',
        category: 'Root',
        price: 150,
        farmerName: 'Meena Reddy',
        image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: true,
        totalStock: 60,
        soldCount: 0
    },
    {
        id: 15,
        name: 'Sweet Strawberries',
        category: 'Seasonal',
        price: 180,
        farmerName: 'Vijay Patil',
        image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: true,
        totalStock: 40,
        soldCount: 0
    },
    {
        id: 16,
        name: 'Fresh Oranges',
        category: 'Seasonal',
        price: 90,
        farmerName: 'Suresh Raina',
        image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: false,
        totalStock: 110,
        soldCount: 0
    },
    {
        id: 17,
        name: 'Seedless Grapes',
        category: 'Seasonal',
        price: 110,
        farmerName: 'Amit Singh',
        image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: true,
        totalStock: 80,
        soldCount: 0
    },
    {
        id: 18,
        name: 'Sweet Pineapple',
        category: 'Seasonal',
        price: 80,
        farmerName: 'Vijay Patil',
        image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: false,
        totalStock: 50,
        soldCount: 0
    },
    {
        id: 20,
        name: 'Fresh Watermelon',
        category: 'Seasonal',
        price: 40,
        farmerName: 'Sunita Devi',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: false,
        totalStock: 70,
        soldCount: 0
    },
    {
        id: 21,
        name: 'Fresh Farm Milk',
        category: 'Dairy',
        price: 60,
        farmerName: 'Rajesh Kumar',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: true,
        totalStock: 100,
        soldCount: 0
    },
    {
        id: 23,
        name: 'Basmati Rice',
        category: 'Staples',
        price: 110,
        farmerName: 'Harish Verma',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: false,
        totalStock: 300,
        soldCount: 0
    },
    {
        id: 24,
        name: 'Yellow Moong Dal',
        category: 'Staples',
        price: 140,
        farmerName: 'Gopal Krishnan',
        image: 'https://images.unsplash.com/photo-1547058886-af779930e527?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: true,
        totalStock: 150,
        soldCount: 0
    },
    {
        id: 25,
        name: 'Fruit Basket Combo',
        category: 'Combo',
        price: 350,
        farmerName: 'Vijay Patil',
        image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: true,
        totalStock: 25,
        soldCount: 0
    },
    {
        id: 26,
        name: 'Daily Veggies Combo',
        category: 'Combo',
        price: 200,
        farmerName: 'Rajesh Kumar',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isOrganic: false,
        totalStock: 40,
        soldCount: 0
    }
];

export const ProductProvider = ({ children }) => {
    const formatName = (name) => {
        if (!name) return name;
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    const formatProduct = (product) => ({
        ...product,
        name: formatName(product.name)
    });

    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('agroProducts_v3');
        let currentProducts = initialProducts;
        if (savedProducts) {
            const parsed = JSON.parse(savedProducts);
            if (parsed.length > 0 && parsed[0].totalStock !== undefined) {
                // Filter out irrelevant categories and merge
                const allowedCategories = ['Seasonal', 'Leafy', 'Root', 'Organic', 'Dairy', 'Staples', 'Combo'];
                const validParsed = parsed.filter(p => allowedCategories.includes(p.category));
                const parsedIds = new Set(validParsed.map(p => p.id));
                const newDefaults = initialProducts.filter(p => !parsedIds.has(p.id));
                currentProducts = [...newDefaults, ...validParsed];
            }
        }
        return currentProducts.map(formatProduct);
    });

    useEffect(() => {
        localStorage.setItem('agroProducts_v3', JSON.stringify(products));
    }, [products]);

    const addProduct = (newProduct) => {
        setProducts(prevProducts => [
            formatProduct({
                ...newProduct,
                id: Date.now(),
                soldCount: 0,
                totalStock: newProduct.totalStock || 0
            }),
            ...prevProducts
        ]);
    };

    const deleteProduct = (productId) => {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    };

    const updateStock = (productId, quantitySold) => {
        setProducts(prevProducts => prevProducts.map(p =>
            p.id === productId ? { ...p, soldCount: p.soldCount + quantitySold } : p
        ));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateStock }}>
            {children}
        </ProductContext.Provider>
    );
};
