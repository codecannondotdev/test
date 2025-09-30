<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asdfasdfasd extends Model
{
    use HasFactory, Searchable;

    protected $table = 'asdfasdfasds';

    protected $guarded = [];

    protected $searchable = [
        'email',
        'first_name',
        'last_name',
        'phone_number',
    ];

    protected $casts = [
        'date_of_birth' => 'datetime',
        'boolean' => 'boolean',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'member_id');
    }

    public function memberships()
    {
        return $this->hasMany(Membership::class, 'member_id');
    }

    public function attendedClasses()
    {
        return $this->belongsToMany(FitnessClass::class, 'attended_classes_attendees', 'attendees_id', 'attended_classes_id');
    }
}
