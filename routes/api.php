<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\Product;

// Route to get all products
Route::get('/products', function () {
    return Product::all();
});

// Route to add product to cart (your existing code)
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
