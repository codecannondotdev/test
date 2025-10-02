<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReturnModel extends Model
{
    use HasFactory, Searchable;

    protected $table = 'returns';

    protected $guarded = [];

    protected $searchable = [
        'return_date',
        'reason',
        'condition',
    ];

    protected $casts = [
        'return_date' => 'datetime',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function product()
    {
        return $this->belongsToMany(Product::class, 'product_returns', 'returns_id', 'product_id');
    }
}
