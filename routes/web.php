<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
Route::get('/', function () {
    return Inertia::render('Products/ProductList');
})->name('products');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Products page route
Route::middleware(['auth'])->group(function () {
    Route::get('/products', function () {
        return Inertia::render('Products/ProductList');
    })->name('products');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/cart', function () {
        return Inertia::render('Cart/Cart');
    })->name('cart');
});

require __DIR__.'/auth.php';
