<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory, Searchable;

    protected $table = 'departments';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'floor',
    ];

    protected $casts = [
    ];

    public function doctors()
    {
        return $this->belongsToMany(Doctor::class, 'departments_doctors', 'departments_id', 'doctors_id');
    }

    public function nurses()
    {
        return $this->belongsToMany(Nurse::class, 'departments_nurses', 'departments_id', 'nurses_id');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'department_id');
    }

    public function wards()
    {
        return $this->hasMany(Ward::class, 'department_id');
    }

    public function specialties()
    {
        return $this->belongsToMany(Specialty::class, 'departments_specialties', 'departments_id', 'specialties_id');
    }

    public function facility()
    {
        return $this->belongsTo(Facility::class, 'facility_id');
    }
}
