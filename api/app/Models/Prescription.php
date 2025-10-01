<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    use HasFactory, Searchable;

    protected $table = 'prescriptions';

    protected $guarded = [];

    protected $searchable = [
        'dose',
        'frequency',
        'duration',
        'instructions',
    ];

    protected $casts = [
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function prescriber()
    {
        return $this->belongsTo(Doctor::class, 'prescriber_id');
    }

    public function medication()
    {
        return $this->belongsTo(Medication::class, 'medication_id');
    }

    public function pharmacyOrder()
    {
        return $this->hasOne(PharmacyOrder::class, 'prescription_id');
    }
}
