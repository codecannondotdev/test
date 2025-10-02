<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory, Searchable;

    protected $table = 'patients';

    protected $guarded = [];

    protected $searchable = [
        'first_name',
        'last_name',
        'gender',
        'contact_number',
        'email',
        'address',
        'insurance_provider',
        'insurance_policy_number',
        'emergency_contact_name',
        'emergency_contact_phone',
    ];

    protected $casts = [
        'date_of_birth' => 'datetime',
    ];

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'patient_id');
    }

    public function treatments()
    {
        return $this->hasMany(Treatment::class, 'patient_id');
    }

    public function billings()
    {
        return $this->hasMany(Billing::class, 'patient_id');
    }
}
