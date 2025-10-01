<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    use HasFactory, Searchable;

    protected $table = 'treatments';

    protected $guarded = [];

    protected $searchable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'status',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function supervisingDoctor()
    {
        return $this->belongsTo(Doctor::class, 'supervising_doctor_id');
    }

    public function carePlan()
    {
        return $this->belongsTo(CarePlan::class, 'care_plan_id');
    }

    public function procedures()
    {
        return $this->hasMany(Procedure::class, 'treatment_id');
    }

    public function medications()
    {
        return $this->belongsToMany(Medication::class, 'medications_treatments', 'treatments_id', 'medications_id');
    }

    public function diagnosis()
    {
        return $this->belongsTo(Diagnosis::class, 'diagnosis_id');
    }
}
