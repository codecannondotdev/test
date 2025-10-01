<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmergencyContact extends Model
{
    use HasFactory, Searchable;

    protected $table = 'emergency_contacts';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'relationship',
        'phone',
        'alternate_phone',
    ];

    protected $casts = [
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }
}
