<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory, Searchable;

    protected $table = 'inventories';

    protected $guarded = [];

    protected $searchable = [
        'inventory_type',
        'item_name',
        'quantity_on_hand',
        'location',
    ];

    protected $casts = [
        'last_updated' => 'datetime',
    ];

    public function material()
    {
        return $this->belongsTo(Material::class, 'material_id');
    }

    public function carModel()
    {
        return $this->belongsTo(CarModel::class, 'car_model_id');
    }
}
