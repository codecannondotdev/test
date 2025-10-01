<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory, Searchable;

    protected $table = 'attendances';

    protected $guarded = [];

    protected $searchable = [
        'date',
        'status',
        'notes',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function shiftAssignment()
    {
        return $this->belongsTo(ShiftAssignment::class, 'shift_assignment_id');
    }
}
