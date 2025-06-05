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
        'shipment_number',
        'shipment_date',
        'quantity_shipped',
        'destination',
        'status',
        'carrier',
    ];

    protected $casts = [
        'shipment_date' => 'datetime',
    ];

    public function salesOrder()
    {
        return $this->belongsTo(SalesOrder::class, 'sales_order_id');
    }
}
