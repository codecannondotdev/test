<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory, Searchable;

    protected $table = 'orders';

    protected $guarded = [];

    protected $searchable = [
        'order_date',
        'status',
        'total_amount',
    ];

    protected $casts = [
        'order_date' => 'datetime',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

    public function transactions()
    {
        return $this->belongsToMany(Transaction::class, 'order_transactions', 'order_id', 'transactions_id');
    }

    public function shipment()
    {
        return $this->hasMany(Shipment::class, 'order_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'order_id');
    }

    public function returns()
    {
        return $this->hasMany(ReturnModel::class, 'order_id');
    }
}
