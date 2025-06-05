<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mine extends Model
{
    use HasFactory, Searchable;

    protected $table = 'mines';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'location',
        'capacity',
        'status',
    ];

    protected $casts = [
    ];

    public function miningOperations()
    {
        return $this->hasMany(MiningOperation::class, 'mine_id');
    }
}
