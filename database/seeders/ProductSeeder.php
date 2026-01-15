<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Githeri Mix',
            'price' => 250,
            'stock_quantity' => 50,
        ]);

        Product::create([
            'name' => 'Beans',
            'price' => 120,
            'stock_quantity' => 100,
        ]);

        Product::create([
            'name' => 'Maize',
            'price' => 80,
            'stock_quantity' => 200,
        ]);
    }
}
