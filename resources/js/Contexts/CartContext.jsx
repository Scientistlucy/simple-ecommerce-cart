import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    // Fetch cart count and items from backend
    const fetchCart = async () => {
        try {
            const response = await axios.get('/api/cart');
            if (response.data) {
                setCartItems(response.data);
                // Calculate total count from all items
                const totalCount = response.data.reduce((sum, item) => sum + item.quantity, 0);
                setCartCount(totalCount);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    // Fetch cart on component mount
    useEffect(() => {
        fetchCart();
    }, []);

    // Add item to cart
    const addToCart = async (productId, quantity = 1) => {
        try {
            const response = await axios.post('/api/cart/add', {
                product_id: productId,
                quantity: quantity
            });

            if (response.data) {
                // Refresh cart after adding
                await fetchCart();
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            return { success: false, message: 'Failed to add item to cart' };
        }
    };

    // Remove item from cart
    const removeFromCart = async (productId) => {
        try {
            const response = await axios.post('/api/cart/remove', {
                product_id: productId
            });

            if (response.data) {
                await fetchCart();
                return { success: true };
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
            return { success: false };
        }
    };

    // Update cart item quantity
    const updateCartItem = async (productId, quantity) => {
        try {
            const response = await axios.post('/api/cart/update', {
                product_id: productId,
                quantity: quantity
            });

            if (response.data) {
                await fetchCart();
                return { success: true };
            }
        } catch (error) {
            console.error('Error updating cart:', error);
            return { success: false };
        }
    };

    // Clear entire cart
    const clearCart = async () => {
        try {
            const response = await axios.post('/api/cart/clear');
            if (response.data) {
                await fetchCart();
                return { success: true };
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
            return { success: false };
        }
    };

    return (
        <CartContext.Provider 
            value={{ 
                cartCount, 
                cartItems,
                addToCart, 
                removeFromCart,
                updateCartItem,
                clearCart,
                fetchCart 
            }}
        >
            {children}
        </CartContext.Provider>
    );
};