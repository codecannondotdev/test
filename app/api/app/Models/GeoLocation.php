<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeoLocation extends Model
{
    use HasFactory, Searchable;

    protected $table = 'geo_locations';

    protected $guarded = [];

    protected $searchable = [
        'latitude',
        'longitude',
        'description',
    ];

    protected $casts = [
    ];

    public function facility()
    {
        return $this->belongsTo(Facility::class, 'facility_id');
    }

    public function homeCareVisits()
    {
        return $this->hasMany(HomeCareVisit::class, 'geo_location_id');
    }
}
