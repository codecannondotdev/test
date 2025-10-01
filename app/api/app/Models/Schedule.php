<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory, Searchable;

    protected $table = 'schedules';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'effective_from',
        'effective_to',
    ];

    protected $casts = [
        'effective_from' => 'datetime',
        'effective_to' => 'datetime',
    ];

    public function shiftAssignments()
    {
        return $this->hasMany(ShiftAssignment::class, 'schedule_id');
    }

    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'rooms_schedules', 'schedules_id', 'rooms_id');
    }
}
