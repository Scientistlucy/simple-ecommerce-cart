<?php

namespace App\Models;
use App\Models\User;    // <-- add this
use App\Models\Product; // <-- add this

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
 public function user()
{
    return $this->belongsTo(User::class);
}

public function product()
{
    return $this->belongsTo(Product::class);
}
   //
}
