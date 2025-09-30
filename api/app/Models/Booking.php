<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory, Searchable;

    protected $table = 'bookings';

    protected $guarded = [];

    protected $searchable = [
        'booking_date',
        'status',
    ];

    protected $casts = [
        'booking_date' => 'datetime',
    ];

    public function member()
    {
        return $this->belongsTo(Asdfasdfasd::class, 'member_id');
    }

    public function fitnessClass()
    {
        return $this->belongsTo(FitnessClass::class, 'fitness_class_id');
    }
}
