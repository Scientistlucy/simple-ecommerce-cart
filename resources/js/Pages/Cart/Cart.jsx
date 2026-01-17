import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/Components/Header';
import { TrashIcon, XMarkIcon, ShoppingCartIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useCart } from '@/Contexts/CartContext';
import { Link } from '@inertiajs/react';

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

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [updatingQuantity, setUpdatingQuantity] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Use cart context to refresh count
  const { fetchCart } = useCart();

  // Fetch cart items on component mount
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cart');
      setCartItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  const showToast = (message) => {
    setToast(message);
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setUpdatingQuantity(prev => ({ ...prev, [productId]: true }));

    try {
      const response = await axios.post('/api/cart/update', {
        product_id: productId,
        quantity: newQuantity
      });

      if (response.data) {
        // Reload cart items
        await loadCartItems();
        // Refresh cart count in header
        await fetchCart();

        const product = cartItems.find(item => item.product_id === productId);
        showToast(`${product.product.name} quantity updated successfully!`);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      showToast('Failed to update quantity');
    } finally {
      setUpdatingQuantity(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleRemoveItem = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmRemoveItem = async () => {
    if (itemToDelete) {
      try {
        const response = await axios.post('/api/cart/remove', {
          product_id: itemToDelete.product_id
        });

        if (response.data) {
          // Reload cart items
          await loadCartItems();
          // Refresh cart count in header
          await fetchCart();
          
          showToast(`${itemToDelete.product.name} removed from cart`);
        }
      } catch (error) {
        console.error('Error removing item:', error);
        showToast('Failed to remove item');
      } finally {
        setShowDeleteModal(false);
        setItemToDelete(null);
      }
    }
  };

  const cancelRemoveItem = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.product?.price || 0);
    const quantity = parseInt(item.quantity || 0);
    return total + (price * quantity);
  }, 0);
  
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const cartCount = cartItems.reduce((count, item) => count + parseInt(item.quantity || 0), 0);

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
      <div className="min-h-screen bg-gray-50">
        {/* Toast Notification */}
        {toast && (
          <Toast 
            message={toast} 
            onClose={() => setToast(null)} 
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
              <div className="text-center">
                {/* Warning Icon */}
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Remove Item from Cart?
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to remove <span className="font-semibold text-gray-900">"{itemToDelete?.product?.name}"</span> from your cart? This action cannot be undone.
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={cancelRemoveItem}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmRemoveItem}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Yes, Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-blue-600 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
            <p className="text-blue-100 mt-2">{cartCount} items in your cart</p>
          </div>
        </div>

        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <ShoppingCartIcon className="mx-auto h-24 w-24 text-gray-400 mb-4" />
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
                {/* Cart Items */}
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
                            src={item.product?.image_url || `https://placehold.co/100x100/e2e8f0/64748b?text=${encodeURIComponent(item.product?.name || 'Product')}`}
                            alt={item.product?.name || 'Product'}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {item.product?.name || 'Unknown Product'}
                          </h3>
                          {item.product?.category && (
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                              {item.product.category}
                            </span>
                          )}
                          <p className="text-gray-600 text-sm mb-3">
                            ${parseFloat(item.product?.price || 0).toFixed(2)} each
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
                            ${(parseFloat(item.product?.price || 0) * parseInt(item.quantity || 0)).toFixed(2)}
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item)}
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

                {/* Order Summary */}
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

                    <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg">
                      Proceed to Checkout
                    </button>

                    <Link 
                      href="/products" 
                      className="block w-full mt-3 text-center text-blue-600 hover:text-blue-700 font-semibold py-2 text-sm"
                    >
                      ← Continue Shopping
                    </Link>
                  </div>
                </div>
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
          @keyframes scale-in {
            from {
              transform: scale(0.9);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-scale-in {
            animation: scale-in 0.2s ease-out;
          }
        `}</style>
      </div>
    </>
  );
}