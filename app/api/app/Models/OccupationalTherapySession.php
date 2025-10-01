<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OccupationalTherapySession extends Model
{
    use HasFactory, Searchable;

    protected $table = 'occupational_therapy_sessions';

    protected $guarded = [];

    protected $searchable = [
        'session_date',
        'goals',
        'outcome',
    ];

    protected $casts = [
        'session_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }
}
