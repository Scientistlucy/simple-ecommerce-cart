<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Jobs\LowStockNotificationJob;

class CartController extends Controller
{
    // Get cart items
    public function get(Request $request)
    {
        if (Auth::check()) {
            // For authenticated users
            $cartItems = CartItem::with('product')
                ->where('user_id', Auth::id())
                ->get();
        } else {
            // For guest users using session
            $sessionCart = Session::get('cart', []);
            $cartItems = [];
            
            foreach ($sessionCart as $productId => $quantity) {
                $product = Product::find($productId);
                if ($product) {
                    $cartItems[] = [
                        'id' => $productId,
                        'product_id' => $productId,
                        'quantity' => $quantity,
                        'product' => $product
                    ];
                }
            }
        }

        return response()->json($cartItems);
    }

    // Add item to cart
  // Add item to cart
public function add(Request $request)
{
    $request->validate([
        'product_id' => 'required|exists:products,id',
        'quantity' => 'required|integer|min:1',
    ]);

    // Get the product
    $product = Product::find($request->product_id);

    if (Auth::check()) {
        // For authenticated users
        $cartItem = CartItem::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            CartItem::create([
                'user_id' => Auth::id(),
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }
    } else {
        // For guest users
        $cart = Session::get('cart', []);
        
        if (isset($cart[$request->product_id])) {
            $cart[$request->product_id] += $request->quantity;
        } else {
            $cart[$request->product_id] = $request->quantity;
        }
        
        Session::put('cart', $cart);
    }

    // Check if stock is low and dispatch job
    if ($product->stock_quantity <= 5 && $product->stock_quantity > 0) {
        // Dispatch the low stock notification job
        LowStockNotificationJob::dispatch($product);
    }

    return response()->json(['message' => 'Product added to cart']);
}
    // Remove item from cart
    public function remove(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        if (Auth::check()) {
            CartItem::where('user_id', Auth::id())
                ->where('product_id', $request->product_id)
                ->delete();
        } else {
            $cart = Session::get('cart', []);
            unset($cart[$request->product_id]);
            Session::put('cart', $cart);
        }

        return response()->json(['message' => 'Product removed from cart']);
    }

    // Update cart item quantity
    public function update(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        if (Auth::check()) {
            $cartItem = CartItem::where('user_id', Auth::id())
                ->where('product_id', $request->product_id)
                ->first();

            if ($cartItem) {
                $cartItem->quantity = $request->quantity;
                $cartItem->save();
            }
        } else {
            $cart = Session::get('cart', []);
            $cart[$request->product_id] = $request->quantity;
            Session::put('cart', $cart);
        }

        return response()->json(['message' => 'Cart updated']);
    }

    // Clear cart
    public function clear(Request $request)
    {
        if (Auth::check()) {
            CartItem::where('user_id', Auth::id())->delete();
        } else {
            Session::forget('cart');
        }

        return response()->json(['message' => 'Cart cleared']);
    }
}