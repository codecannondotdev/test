<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FitnessClass extends Model
{
    use HasFactory, Searchable;

    protected $table = 'fitness_classs';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'description',
        'schedule',
    ];

    protected $casts = [
        'schedule' => 'datetime',
    ];

    public function trainer()
    {
        return $this->belongsTo(Trainer::class, 'trainer_id');
    }

    public function attendees()
    {
        return $this->belongsToMany(Asdfasdfasd::class, 'attended_classes_attendees', 'attended_classes_id', 'attendees_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'fitness_class_id');
    }
}
