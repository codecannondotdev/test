<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory, Searchable;

    protected $table = 'appointments';

    protected $guarded = [];

    protected $searchable = [
        'appointment_date_time',
        'reason',
        'status',
        'room',
    ];

    protected $casts = [
        'appointment_date_time' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }

    public function nurse()
    {
        return $this->belongsTo(Nurse::class, 'nurse_id');
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function treatment()
    {
        return $this->hasOne(Treatment::class, 'appointment_id');
    }
}
