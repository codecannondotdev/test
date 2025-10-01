<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory, Searchable;

    protected $table = 'doctors';

    protected $guarded = [];

    protected $searchable = [
        'first_name',
        'last_name',
        'specialty',
        'email',
        'license_number',
    ];

    protected $casts = [
    ];

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'doctor_id');
    }

    public function treatments()
    {
        return $this->hasMany(Treatment::class, 'supervising_doctor_id');
    }

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class, 'prescriber_id');
    }

    public function departments()
    {
        return $this->belongsToMany(Department::class, 'departments_doctors', 'doctors_id', 'departments_id');
    }

    public function labTests()
    {
        return $this->hasMany(LabTest::class, 'ordering_doctor_id');
    }

    public function surgeries()
    {
        return $this->belongsToMany(Surgery::class, 'surgeons_surgeries', 'surgeons_id', 'surgeries_id');
    }

    public function anesthesia()
    {
        return $this->hasMany(Anesthesia::class, 'anesthesiologist_id');
    }

    public function referralsMade()
    {
        return $this->hasMany(Referral::class, 'referring_provider_id');
    }

    public function referralsReceived()
    {
        return $this->hasMany(Referral::class, 'receiving_provider_id');
    }

    public function specialties()
    {
        return $this->belongsToMany(Specialty::class, 'doctors_specialties', 'doctors_id', 'specialties_id');
    }

    public function labOrders()
    {
        return $this->hasMany(LabOrder::class, 'ordered_by_id');
    }
}
