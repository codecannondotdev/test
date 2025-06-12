<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory, Searchable;

    protected $table = 'sessions';

    protected $guarded = [];

    protected $searchable = [
        'date',
        'start_time',
        'end_time',
        'capacity',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function fitnessClass()
    {
        return $this->belongsTo(ClassModel::class, 'fitness_class_id');
    }

    public function trainer()
    {
        return $this->belongsTo(Trainer::class, 'trainer_id');
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class, 'schedule_id');
    }

    public function facility()
    {
        return $this->belongsTo(Facility::class, 'facility_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'session_id');
    }
}
