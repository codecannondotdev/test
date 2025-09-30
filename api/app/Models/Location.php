<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory, Searchable;

    protected $table = 'locations';

    protected $guarded = [];

    protected $searchable = [
        'aisle',
        'section',
        'shelf',
    ];

    protected $casts = [
    ];

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id');
    }
}
