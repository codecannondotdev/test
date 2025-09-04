<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Studio extends Model
{
    use HasFactory, Searchable;

    protected $table = 'studios';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'location',
        'capacity',
    ];

    protected $casts = [
    ];

    public function equipments()
    {
        return $this->hasMany(Equipment::class, 'studio_id');
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'studio_id');
    }
}
