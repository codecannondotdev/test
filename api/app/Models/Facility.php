<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    use HasFactory, Searchable;

    protected $table = 'facilities';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'address',
        'description',
    ];

    protected $casts = [
    ];

    public function equipment()
    {
        return $this->hasMany(Equipment::class, 'facility_id');
    }

    public function sessions()
    {
        return $this->hasMany(Session::class, 'facility_id');
    }
}
