<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingMethod extends Model
{
    use HasFactory, Searchable;

    protected $table = 'shipping_methods';

    protected $guarded = [];

    protected $searchable = [
        'method_name',
        'description',
        'cost',
    ];

    protected $casts = [
    ];

    public function shipments()
    {
        return $this->hasMany(Shipment::class, 'shipping_method_id');
    }
}
