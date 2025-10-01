<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nurse extends Model
{
    use HasFactory, Searchable;

    protected $table = 'nurses';

    protected $guarded = [];

    protected $searchable = [
        'first_name',
        'last_name',
        'license_number',
        'shift_type',
        'phone',
        'email',
    ];

    protected $casts = [
    ];

    public function assignments()
    {
        return $this->hasMany(ShiftAssignment::class, 'nurse_id');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'nurse_id');
    }

    public function trainingRecords()
    {
        return $this->hasMany(TrainingRecord::class, 'nurse_id');
    }

    public function departments()
    {
        return $this->belongsToMany(Department::class, 'departments_nurses', 'nurses_id', 'departments_id');
    }

    public function wards()
    {
        return $this->belongsToMany(Ward::class, 'nurses_wards', 'nurses_id', 'wards_id');
    }
}
