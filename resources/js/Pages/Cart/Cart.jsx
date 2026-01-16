import React, { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Header from '@/Components/Header';
import { Link } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';

export default function Cart() {
    const { cartItems: contextCartItems, cartCount, removeFromCart, updateCartQuantity } = useCart();
    const [cartItemsWithDetails, setCartItemsWithDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingQuantity, setUpdatingQuantity] = useState({});

    // Sample products data (same as ProductList.jsx)
    const sampleProducts = [
        {
            id: 1,
            name: "Nike Air Max 270 Running Shoes",
            price: 149.99,
            original_price: 189.99,
            stock_quantity: 3,
            image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
            category: "Shoes"
        },
        {
            id: 2,
            name: "Modern Ergonomic Office Chair",
            price: 299.99,
            stock_quantity: 12,
            image_url: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&h=500&fit=crop",
            category: "Furniture"
        },
        {
            id: 3,
            name: "Elegant Summer Floral Dress",
            price: 79.99,
            original_price: 99.99,
            stock_quantity: 2,
            image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop",
            category: "Fashion"
        },
        {
            id: 4,
            name: "Minimalist Table Lamp",
            price: 45.99,
            stock_quantity: 8,
            image_url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
            category: "Home Decor"
        },
        {
            id: 5,
            name: "Adidas Ultraboost Sneakers",
            price: 179.99,
            stock_quantity: 0,
            image_url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop",
            category: "Shoes"
        },
        {
            id: 6,
            name: "Scandinavian Dining Chair Set",
            price: 399.99,
            stock_quantity: 5,
            image_url: "https://images.unsplash.com/photo-1503602642458-232111445657?w=500&h=500&fit=crop",
            category: "Furniture"
        },
        {
            id: 7,
            name: "Classic Black Evening Dress",
            price: 129.99,
            stock_quantity: 15,
            image_url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&h=500&fit=crop",
            category: "Fashion"
        },
        {
            id: 8,
            name: "Ceramic Vase Set - 3 Piece",
            price: 34.99,
            stock_quantity: 1,
            image_url: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&h=500&fit=crop",
            category: "Home Decor"
        },
        {
            id: 9,
            name: "Puma RS-X Trainers",
            price: 119.99,
            original_price: 140.00,
            stock_quantity: 20,
            image_url: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&h=500&fit=crop",
            category: "Shoes"
        },
        {
            id: 10,
            name: "Velvet Accent Armchair",
            price: 549.99,
            stock_quantity: 4,
            image_url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=500&fit=crop",
            category: "Furniture"
        },
        {
            id: 11,
            name: "Bohemian Maxi Dress",
            price: 89.99,
            stock_quantity: 7,
            image_url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=500&fit=crop",
            category: "Fashion"
        },
        {
            id: 12,
            name: "Modern Wall Art Canvas Set",
            price: 79.99,
            stock_quantity: 3,
            image_url: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500&h=500&fit=crop",
            category: "Home Decor"
        },
        {
            id: 13,
            name: "Converse Chuck Taylor All Star",
            price: 65.99,
            stock_quantity: 25,
            image_url: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&h=500&fit=crop",
            category: "Shoes"
        },
        {
            id: 14,
            name: "L-Shaped Gaming Desk",
            price: 279.99,
            original_price: 349.99,
            stock_quantity: 2,
            image_url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=500&fit=crop",
            category: "Furniture"
        },
        {
            id: 15,
            name: "Casual Denim Shirt Dress",
            price: 59.99,
            stock_quantity: 11,
            image_url: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500&h=500&fit=crop",
            category: "Fashion"
        },
        {
            id: 16,
            name: "Decorative Throw Pillow Set",
            price: 39.99,
            stock_quantity: 0,
            image_url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&h=500&fit=crop",
            category: "Home Decor"
        },
        {
            id: 17,
            name: "New Balance 574 Classic",
            price: 84.99,
            stock_quantity: 18,
            image_url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&h=500&fit=crop",
            category: "Shoes"
        },
        {
            id: 18,
            name: "Reclining Leather Sofa",
            price: 1299.99,
            stock_quantity: 3,
            image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
            category: "Furniture"
        },
        {
            id: 19,
            name: "Knitted Sweater Dress",
            price: 69.99,
            original_price: 89.99,
            stock_quantity: 5,
            image_url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop",
            category: "Fashion"
        },
        {
            id: 20,
            name: "Wooden Coffee Table",
            price: 189.99,
            stock_quantity: 6,
            image_url: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=500&h=500&fit=crop",
            category: "Furniture"
        },
        {
            id: 21,
            name: "Moroccan Area Rug 5x7",
            price: 159.99,
            stock_quantity: 4,
            image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=500&fit=crop",
            category: "Home Decor"
        },
        {
            id: 22,
            name: "Vans Old Skool Sneakers",
            price: 69.99,
            stock_quantity: 1,
            image_url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop",
            category: "Shoes"
        },
        {
            id: 23,
            name: "Wrap Midi Dress - Floral Print",
            price: 94.99,
            stock_quantity: 9,
            image_url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=500&fit=crop",
            category: "Fashion"
        },
        {
            id: 24,
            name: "Metal Floor Lamp - Industrial",
            price: 119.99,
            original_price: 149.99,
            stock_quantity: 12,
            image_url: "https://images.unsplash.com/photo-1550603302-d8cf8bde1f6d?w=500&h=500&fit=crop",
            category: "Home Decor"
        }
    ];

    // Load cart items with full product details
    useEffect(() => {
        const loadCartDetails = () => {
            if (contextCartItems && Object.keys(contextCartItems).length > 0) {
                const itemsArray = Object.values(contextCartItems).map(cartItem => {
                    const product = sampleProducts.find(p => p.id === cartItem.product_id);
                    return {
                        ...cartItem,
                        name: product?.name || 'Unknown Product',
                        price: product?.price || 0,
                        image: product?.image_url || '',
                    };
                });
                setCartItemsWithDetails(itemsArray);
            } else {
                setCartItemsWithDetails([]);
            }
            setLoading(false);
        };

        loadCartDetails();
    }, [contextCartItems]);

    // Update quantity
    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        
        setUpdatingQuantity(prev => ({ ...prev, [productId]: true }));
        
        try {
            const result = await updateCartQuantity(productId, newQuantity);
            if (!result.success) {
                alert('Error updating quantity');
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Error updating quantity');
        } finally {
            setUpdatingQuantity(prev => ({ ...prev, [productId]: false }));
        }
    };

    // Handle remove item
    const handleRemoveItem = async (productId) => {
        const result = await removeFromCart(productId);
        if (result.success) {
            // Item removed successfully
            console.log('Item removed from cart');
        } else {
            alert('Error removing item from cart');
        }
    };

    // Calculate totals
    const subtotal = cartItemsWithDetails.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        <p className="mt-4 text-gray-600">Loading cart...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
                    <p className="text-blue-100 mt-2">{cartCount} items in your cart</p>
                </div>
            </div>

            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    
                    {cartItemsWithDetails.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                            <div className="text-gray-400 mb-4">
                                <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                            <p className="text-gray-500 mb-6">Add some products to get started!</p>
                            <Link
                                href="/products"
                                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Cart Items Section */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartItemsWithDetails.map(item => (
                                    <div
                                        key={item.product_id}
                                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
                                    >
                                        <div className="flex items-center gap-6">
                                            
                                            {/* Product Image */}
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={item.image || `https://placehold.co/100x100/e2e8f0/64748b?text=${encodeURIComponent(item.name)}`}
                                                    alt={item.name}
                                                    className="w-24 h-24 object-cover rounded-lg"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-3">
                                                    ${item.price.toFixed(2)} each
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm text-gray-600 font-medium">Quantity:</span>
                                                    <div className="flex items-center gap-2">
                                                        <button 
                                                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1 || updatingQuantity[item.product_id]}
                                                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-12 text-center font-semibold text-gray-900">
                                                            {updatingQuantity[item.product_id] ? '...' : item.quantity}
                                                        </span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                            disabled={updatingQuantity[item.product_id]}
                                                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price and Remove */}
                                            <div className="flex flex-col items-end gap-4">
                                                <div className="text-xl font-bold text-gray-900">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                                
                                                {/* Delete Button */}
                                                <button 
                                                    onClick={() => handleRemoveItem(item.product_id)}
                                                    className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors group"
                                                >
                                                    <TrashIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm font-semibold">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary Section */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                                    
                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Shipping</span>
                                            <span className="font-semibold">Free</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Tax (10%)</span>
                                            <span className="font-semibold">${tax.toFixed(2)}</span>
                                        </div>
                                        
                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-gray-900">Total</span>
                                                <span className="text-2xl font-bold text-blue-600">
                                                    ${total.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Checkout Button */}
                                    <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg">
                                        Proceed to Checkout
                                    </button>

                                    {/* Continue Shopping Link */}
                                    <Link
                                        href="/products"
                                        className="w-full mt-3 text-blue-600 hover:text-blue-700 font-semibold py-2 text-sm inline-block text-center"
                                    >
                                        ← Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}