import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch user's cart items
        axios.get('/api/cart')
            .then(response => setCartItems(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Cart</h1>
            {cartItems.length === 0 && <p>Your cart is empty</p>}
            {cartItems.map(item => (
                <div key={item.id} className="border p-4 rounded mb-2">
                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                    <p>Price: ${item.product.price}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
        </div>
    );
}
