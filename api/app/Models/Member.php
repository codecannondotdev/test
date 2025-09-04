<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory, Searchable;

    protected $table = 'members';

    protected $guarded = [];

    protected $searchable = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'membership_start_date',
    ];

    protected $casts = [
        'membership_start_date' => 'datetime',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'member_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'member_id');
    }

    public function feedbacks()
    {
        return $this->hasMany(Feedback::class, 'member_id');
    }
}
