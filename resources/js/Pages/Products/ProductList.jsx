import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch products from backend
        axios.get('/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error));
    }, []);

    const addToCart = (productId) => {
        setLoading(true);

        axios.post('/api/cart/add', {
            product_id: productId,
            quantity: 1,  // default 1 for now
        })
        .then(response => {
            alert(response.data.message); // shows "Product added to cart"
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            alert("Error adding to cart");
            setLoading(false);
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border p-4 rounded">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock_quantity}</p>
                        <button
                            onClick={() => addToCart(product.id)}
                            disabled={loading}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {loading ? "Adding..." : "Add to Cart"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
