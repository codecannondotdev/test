<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShipmentItem extends Model
{
    use HasFactory, Searchable;

    protected $table = 'shipment_items';

    protected $guarded = [];

    protected $searchable = [
        'quantity',
        'condition',
    ];

    protected $casts = [
    ];

    public function shipment()
    {
        return $this->belongsTo(Shipment::class, 'shipment_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
