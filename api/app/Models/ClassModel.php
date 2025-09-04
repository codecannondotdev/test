<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassModel extends Model
{
    use HasFactory, Searchable;

    protected $table = 'classes';

    protected $guarded = [];

    protected $searchable = [
        'title',
        'description',
        'class_date',
        'capacity',
    ];

    protected $casts = [
        'class_date' => 'datetime',
    ];

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'class_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'class_id');
    }

    public function feedbacks()
    {
        return $this->hasMany(Feedback::class, 'class_id');
    }

    public function program()
    {
        return $this->belongsTo(Program::class, 'program_id');
    }

    public function instructor()
    {
        return $this->belongsTo(Instructor::class, 'instructor_id');
    }
}
