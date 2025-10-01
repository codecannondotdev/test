<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VaccineRecord extends Model
{
    use HasFactory, Searchable;

    protected $table = 'vaccine_records';

    protected $guarded = [];

    protected $searchable = [
        'vaccine_name',
        'date_administered',
        'dose_number',
    ];

    protected $casts = [
        'date_administered' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function immunization()
    {
        return $this->belongsTo(Immunization::class, 'immunization_id');
    }
}
