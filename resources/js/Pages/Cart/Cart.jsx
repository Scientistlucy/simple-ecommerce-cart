import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Header from '@/Components/Header';
import { Link } from '@inertiajs/react';

export default function Cart() {
    // Hardcoded sample cart items
    const cartItems = [
        { id: 1, name: 'Githeri Mix', price: 250, quantity: 2, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop' },
        { id: 2, name: 'Beans', price: 120, quantity: 1, image: 'https://images.unsplash.com/photo-1589927986089-35812378d14d?w=200&h=200&fit=crop' },
        { id: 3, name: 'Maize', price: 80, quantity: 3, image: 'https://images.unsplash.com/photo-1603048588665-791ca8ffe3d8?w=200&h=200&fit=crop' },
    ];

    // Hardcoded total calculation
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <Header />
            
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
                    <p className="text-blue-100 mt-2">{cartItems.length} items in your cart</p>
                </div>
            </div>

            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    
                    {cartItems.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                            <div className="text-gray-400 mb-4">
                                <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                            <p className="text-gray-500 mb-6">Add some products to get started!</p>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Cart Items Section */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map(item => (
                                    <div
                                        key={item.id}
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
                                                        <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition-colors">
                                                            -
                                                        </button>
                                                        <span className="w-12 text-center font-semibold text-gray-900">
                                                            {item.quantity}
                                                        </span>
                                                        <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition-colors">
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
                                                <button className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors group">
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
                                            <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Shipping</span>
                                            <span className="font-semibold">Free</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Tax</span>
                                            <span className="font-semibold">${(totalPrice * 0.1).toFixed(2)}</span>
                                        </div>
                                        
                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-gray-900">Total</span>
                                                <span className="text-2xl font-bold text-blue-600">
                                                    ${(totalPrice * 1.1).toFixed(2)}
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