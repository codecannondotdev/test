<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesOrder extends Model
{
    use HasFactory, Searchable;

    protected $table = 'sales_orders';

    protected $guarded = [];

    protected $searchable = [
        'order_number',
        'order_date',
        'status',
    ];

    protected $casts = [
        'order_date' => 'datetime',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function carModel()
    {
        return $this->belongsTo(CarModel::class, 'car_model_id');
    }

    public function shipments()
    {
        return $this->hasMany(Shipment::class, 'sales_order_id');
    }
}
