<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ward extends Model
{
    use HasFactory, Searchable;

    protected $table = 'wards';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'floor',
        'capacity',
    ];

    protected $casts = [
    ];

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function beds()
    {
        return $this->hasMany(Bed::class, 'ward_id');
    }

    public function nurses()
    {
        return $this->belongsToMany(Nurse::class, 'nurses_wards', 'wards_id', 'nurses_id');
    }

    public function admissions()
    {
        return $this->hasMany(Admission::class, 'ward_id');
    }

    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'rooms_wards', 'wards_id', 'rooms_id');
    }

    public function devices()
    {
        return $this->belongsToMany(Device::class, 'devices_locations', 'locations_id', 'devices_id');
    }
}
