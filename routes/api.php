<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\Product;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;

// Product routes
Route::get('/products', [ProductController::class, 'index']);

// Cart routes (with authentication)
Route::middleware('auth:sanctum')->post('/cart/add', function (Request $request) {
    $request->validate([
        'product_id' => 'required|exists:products,id',
        'quantity' => 'required|integer|min:1',
    ]);

    $user = $request->user();
    $cartItem = CartItem::where('user_id', $user->id)
        ->where('product_id', $request->product_id)
        ->first();

    if ($cartItem) {
        $cartItem->quantity += $request->quantity;
        $cartItem->save();
    } else {
        CartItem::create([
            'user_id' => $user->id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
        ]);
    }

    return response()->json(['message' => 'Product added to cart']);
});

// Cart routes with web middleware
Route::middleware(['web'])->group(function () {
    Route::get('/cart', [CartController::class, 'get']);
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::post('/cart/remove', [CartController::class, 'remove']);
    Route::post('/cart/clear', [CartController::class, 'clear']);
    Route::post('/cart/update', [CartController::class, 'update']);
});