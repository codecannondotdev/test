<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    use HasFactory, Searchable;

    protected $table = 'warehouses';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'location_description',
    ];

    protected $casts = [
    ];

    public function inventories()
    {
        return $this->hasMany(Inventory::class, 'warehouse_id');
    }

    public function shipments()
    {
        return $this->hasMany(Shipment::class, 'warehouse_id');
    }

    public function locations()
    {
        return $this->hasMany(Location::class, 'warehouse_id');
    }
}
