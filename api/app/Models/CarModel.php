<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarModel extends Model
{
    use HasFactory, Searchable;

    protected $table = 'car_models';

    protected $guarded = [];

    protected $searchable = [
        'model_name',
        'engine_type',
        'features',
        'base_price',
    ];

    protected $casts = [
    ];

    public function productionBatches()
    {
        return $this->hasMany(ProductionBatch::class, 'car_model_id');
    }

    public function salesOrders()
    {
        return $this->hasMany(SalesOrder::class, 'car_model_id');
    }

    public function inventoryItems()
    {
        return $this->hasMany(Inventory::class, 'car_model_id');
    }
}
