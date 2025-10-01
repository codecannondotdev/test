<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhysicalTherapySession extends Model
{
    use HasFactory, Searchable;

    protected $table = 'physical_therapy_sessions';

    protected $guarded = [];

    protected $searchable = [
        'session_date',
        'duration_minutes',
        'therapist_notes',
    ];

    protected $casts = [
        'session_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }
}
