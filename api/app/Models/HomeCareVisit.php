<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeCareVisit extends Model
{
    use HasFactory, Searchable;

    protected $table = 'home_care_visits';

    protected $guarded = [];

    protected $searchable = [
        'visit_date',
        'services_provided',
        'distance_travelled',
    ];

    protected $casts = [
        'visit_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function geoLocation()
    {
        return $this->belongsTo(GeoLocation::class, 'geo_location_id');
    }
}
