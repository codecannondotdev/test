<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShiftAssignment extends Model
{
    use HasFactory, Searchable;

    protected $table = 'shift_assignments';

    protected $guarded = [];

    protected $searchable = [
        'assignment_date',
        'role',
        'notes',
    ];

    protected $casts = [
        'assignment_date' => 'datetime',
    ];

    public function shift()
    {
        return $this->belongsTo(Shift::class, 'shift_id');
    }

    public function nurse()
    {
        return $this->belongsTo(Nurse::class, 'nurse_id');
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class, 'schedule_id');
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class, 'shift_assignment_id');
    }
}
