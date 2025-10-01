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
        'type',
    ];

    protected $casts = [
    ];

    public function departments()
    {
        return $this->hasMany(Department::class, 'facility_id');
    }

    public function geoLocations()
    {
        return $this->hasMany(GeoLocation::class, 'facility_id');
    }

    public function rooms()
    {
        return $this->hasMany(Room::class, 'facility_id');
    }
}
