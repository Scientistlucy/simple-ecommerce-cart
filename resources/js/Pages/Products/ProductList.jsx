import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/Components/Header';
import { useCart } from '@/Contexts/CartContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

// Toast Notification Component
const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]">
                <div className="flex-shrink-0">
                    <CheckCircleIcon className="w-6 h-6" />
                </div>
                <p className="font-medium flex-1">{message}</p>
                <button 
                    onClick={onClose}
                    className="flex-shrink-0 hover:bg-green-700 rounded-full p-1 transition-colors"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState({});
    const [toast, setToast] = useState(null);

    // Use cart context
    const { addToCart: addToCartContext } = useCart();

    useEffect(() => {
        // Fetch products from backend
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    const showToast = (message) => {
        setToast(message);
    };

    const addToCart = async (productId) => {
        setAddingToCart(prev => ({ ...prev, [productId]: true }));

        // Use context method
        const result = await addToCartContext(productId, 1);

        if (result.success) {
            // Find the product name from the fetched products
            const product = products.find(p => p.id === productId);
            
            // Show success toast
            showToast(`${product.name} added to cart successfully!`);
        } else {
            alert("Error adding to cart");
        }

        setAddingToCart(prev => ({ ...prev, [productId]: false }));
    };

    const getStockDisplay = (stock) => {
        if (stock === 0) return { text: 'Out of Stock', color: 'text-red-600', show: true };
        if (stock <= 5) return { text: `Only ${stock} left`, color: 'text-orange-600', show: true };
        return { text: '', color: '', show: false };
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        <p className="mt-4 text-gray-600">Loading products...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            
            {/* Toast Notification */}
            {toast && (
                <Toast 
                    message={toast} 
                    onClose={() => setToast(null)} 
                />
            )}
            
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Shop The Latest Collection
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
                        Discover amazing deals on fashion, furniture, footwear, and home decor
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Products Count */}
                    <div className="mb-8 flex items-center justify-between">
                        <p className="text-gray-700 text-lg">
                            <span className="font-bold text-gray-900">{products.length}</span> Products Available
                        </p>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {products.map(product => {
                            const stockDisplay = getStockDisplay(product.stock_quantity);
                            const isOutOfStock = product.stock_quantity === 0;
                            
                            return (
                                <div
                                    key={product.id}
                                    id={`product-${product.id}`}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                                >
                                    {/* Product Image */}
                                    <div className="relative overflow-hidden bg-gray-100 aspect-square">
                                        <img
                                            src={product.image_url || `https://placehold.co/500x500/e2e8f0/64748b?text=${encodeURIComponent(product.name)}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        
                                        {/* Out of Stock Overlay */}
                                        {isOutOfStock && (
                                            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                                                <span className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm">
                                                    Out of Stock
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-5">
                                        {/* Category Badge */}
                                        {product.category && (
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
                                                {product.category}
                                            </span>
                                        )}

                                        {/* Product Name */}
                                        <h2 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3rem] leading-tight">
                                            {product.name}
                                        </h2>

                                        {/* Price */}
                                        <div className="mb-3">
                                            <span className="text-2xl font-extrabold text-gray-900">
                                                ${parseFloat(product.price).toFixed(2)}
                                            </span>
                                        </div>

                                        {/* Stock Status */}
                                        {stockDisplay.show && (
                                            <div className="mb-4">
                                                <span className={`text-xs font-bold ${stockDisplay.color} bg-opacity-10 px-2 py-1 rounded`}>
                                                    {stockDisplay.text}
                                                </span>
                                            </div>
                                        )}

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={() => addToCart(product.id)}
                                            disabled={addingToCart[product.id] || isOutOfStock}
                                            className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center space-x-2 text-sm ${
                                                isOutOfStock
                                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                    : addingToCart[product.id]
                                                    ? 'bg-blue-400 text-white cursor-wait'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-md hover:shadow-xl'
                                            }`}
                                        >
                                            {addingToCart[product.id] ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span>Adding...</span>
                                                </>
                                            ) : isOutOfStock ? (
                                                <span>Unavailable</span>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    <span>Add to Cart</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {products.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No products available at the moment.</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes slide-in {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
            `}</style>
        </>
    );
}