<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factory extends Model
{
    use HasFactory, Searchable;

    protected $table = 'factories';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'location',
        'status',
    ];

    protected $casts = [
    ];

    public function productionBatches()
    {
        return $this->hasMany(ProductionBatch::class, 'factory_id');
    }
}
