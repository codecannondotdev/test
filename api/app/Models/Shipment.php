<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    use HasFactory, Searchable;

    protected $table = 'shipments';

    protected $guarded = [];

    protected $searchable = [
        'shipment_date',
        'carrier',
        'tracking_number',
    ];

    protected $casts = [
        'shipment_date' => 'datetime',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id');
    }

    public function shipmentItems()
    {
        return $this->hasMany(ShipmentItem::class, 'shipment_id');
    }

    public function shippingMethod()
    {
        return $this->belongsTo(ShippingMethod::class, 'shipping_method_id');
    }
}
