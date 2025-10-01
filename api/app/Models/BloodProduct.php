<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BloodProduct extends Model
{
    use HasFactory, Searchable;

    protected $table = 'blood_products';

    protected $guarded = [];

    protected $searchable = [
        'product_type',
        'storage_temperature',
        'shelf_life_days',
    ];

    protected $casts = [
    ];

    public function transfusions()
    {
        return $this->hasMany(Transfusion::class, 'blood_product_id');
    }
}
