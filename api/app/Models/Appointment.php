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
        'type',
        'start_time',
        'end_time',
        'status',
        'reason',
        'location',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
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

    public function visitNotes()
    {
        return $this->hasMany(Note::class, 'appointment_id');
    }

    public function discharge()
    {
        return $this->belongsTo(Discharge::class, 'discharge_id');
    }

    public function location()
    {
        return $this->belongsTo(Room::class, 'location_id');
    }

    public function queue()
    {
        return $this->belongsTo(Queue::class, 'queue_id');
    }

    public function waitingList()
    {
        return $this->hasMany(WaitingList::class, 'appointment_id');
    }

    public function telemedicineSession()
    {
        return $this->hasMany(TelemedicineSession::class, 'appointment_id');
    }

    public function type()
    {
        return $this->belongsTo(AppointmentType::class, 'type_id');
    }

    public function followUp()
    {
        return $this->hasMany(FollowUp::class, 'appointment_id');
    }

    public function referralSource()
    {
        return $this->belongsTo(ReferralSource::class, 'referral_source_id');
    }
}
