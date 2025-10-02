<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory, Searchable;

    protected $table = 'suppliers';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'contact_email',
        'phone_number',
    ];

    protected $casts = [
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'supplier_id');
    }

    public function purchaseOrders()
    {
        return $this->hasMany(PurchaseOrder::class, 'supplier_id');
    }
}
