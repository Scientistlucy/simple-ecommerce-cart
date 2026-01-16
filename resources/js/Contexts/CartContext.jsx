import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // Fetch cart on mount
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get('/api/cart');
            setCartItems(response.data.items || []);
            setCartCount(response.data.count || 0);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            const response = await axios.post('/api/cart/add', {
                product_id: productId,
                quantity: quantity,
            });
            
            // Update cart count
            setCartCount(prevCount => prevCount + quantity);
            
            // Optionally refresh full cart
            await fetchCart();
            
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Error adding to cart:', error);
            return { success: false, error: error.message };
        }
    };

    const updateCartQuantity = async (productId, newQuantity) => {
        try {
            const response = await axios.post('/api/cart/update', {
                product_id: productId,
                quantity: newQuantity,
            });
            
            // Refresh cart to get updated data
            await fetchCart();
            
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Error updating cart quantity:', error);
            return { success: false, error: error.message };
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.post('/api/cart/remove', { product_id: productId });
            await fetchCart();
            return { success: true };
        } catch (error) {
            console.error('Error removing from cart:', error);
            return { success: false, error: error.message };
        }
    };

    const clearCart = async () => {
        try {
            await axios.post('/api/cart/clear');
            setCartItems([]);
            setCartCount(0);
            return { success: true };
        } catch (error) {
            console.error('Error clearing cart:', error);
            return { success: false, error: error.message };
        }
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount,
            loading,
            addToCart,
            updateCartQuantity,
            removeFromCart,
            clearCart,
            refreshCart: fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}