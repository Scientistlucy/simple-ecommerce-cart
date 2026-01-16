import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/Components/Header';
import { useCart } from '@/Contexts/CartContext';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState({});

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
                console.log(error);
                setLoading(false);
            });
    }, []);

    const addToCart = async (productId) => {
        setAddingToCart(prev => ({ ...prev, [productId]: true }));

        // Use context method
        const result = await addToCartContext(productId, 1);

        if (result.success) {
            // Success feedback
            const productElement = document.getElementById(`product-${productId}`);
            if (productElement) {
                productElement.classList.add('ring-2', 'ring-green-400');
                setTimeout(() => {
                    productElement.classList.remove('ring-2', 'ring-green-400');
                }, 1000);
            }
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

    // Sample products for demonstration
  // Sample products for demonstration
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


    const displayProducts = sampleProducts;

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
                            <span className="font-bold text-gray-900">{displayProducts.length}</span> Products Available
                        </p>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {displayProducts.map(product => {
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
                                        
                                        {/* Sale Badge */}
                                        {product.original_price && product.original_price > product.price && (
                                            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                SALE
                                            </span>
                                        )}
                                        
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
                                        {/* Product Name */}
                                        <h2 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3rem] leading-tight">
                                            {product.name}
                                        </h2>

                                        {/* Price */}
                                        <div className="mb-3">
                                            <span className="text-2xl font-extrabold text-gray-900">
                                                ${parseFloat(product.price).toFixed(2)}
                                            </span>
                                            {product.original_price && product.original_price > product.price && (
                                                <span className="ml-2 text-sm text-gray-400 line-through">
                                                    ${parseFloat(product.original_price).toFixed(2)}
                                                </span>
                                            )}
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
                </div>
            </div>
        </>
    );
}