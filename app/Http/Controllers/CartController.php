<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    public function get()
    {
        $cart = Session::get('cart', []);
        $count = array_sum(array_column($cart, 'quantity'));
        
        return response()->json([
            'items' => $cart,
            'count' => $count
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = Session::get('cart', []);
        $productId = $request->product_id;
        
        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] += $request->quantity;
        } else {
            $cart[$productId] = [
                'product_id' => $productId,
                'quantity' => $request->quantity
            ];
        }
        
        Session::put('cart', $cart);
        
        $count = array_sum(array_column($cart, 'quantity'));
        
        return response()->json([
            'message' => 'Product added to cart',
            'count' => $count,
            'cart' => $cart
        ]);
    }

    public function remove(Request $request)
    {
        $cart = Session::get('cart', []);
        $productId = $request->product_id;
        
        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            Session::put('cart', $cart);
        }
        
        return response()->json(['message' => 'Product removed from cart']);
    }

    public function clear()
    {
        Session::forget('cart');
        return response()->json(['message' => 'Cart cleared']);
    }

public function update(Request $request)
{
    $request->validate([
        'product_id' => 'required|integer',
        'quantity' => 'required|integer|min:1'
    ]);

    $cart = Session::get('cart', []);
    $productId = $request->product_id;
    
    if (isset($cart[$productId])) {
        $cart[$productId]['quantity'] = $request->quantity;
        Session::put('cart', $cart);
    }
    
    $count = array_sum(array_column($cart, 'quantity'));
    
    return response()->json([
        'message' => 'Cart updated',
        'count' => $count,
        'cart' => $cart
    ]);
}
}