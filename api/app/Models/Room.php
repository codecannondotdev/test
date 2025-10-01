<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory, Searchable;

    protected $table = 'rooms';

    protected $guarded = [];

    protected $searchable = [
        'room_number',
        'type',
        'capacity',
    ];

    protected $casts = [
    ];

    public function wards()
    {
        return $this->belongsToMany(Ward::class, 'rooms_wards', 'rooms_id', 'wards_id');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'location_id');
    }

    public function schedules()
    {
        return $this->belongsToMany(Schedule::class, 'rooms_schedules', 'rooms_id', 'schedules_id');
    }

    public function facility()
    {
        return $this->belongsTo(Facility::class, 'facility_id');
    }
}
