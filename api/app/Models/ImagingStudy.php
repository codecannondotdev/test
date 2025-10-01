<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagingStudy extends Model
{
    use HasFactory, Searchable;

    protected $table = 'imaging_studies';

    protected $guarded = [];

    protected $searchable = [
        'study_type',
        'study_date',
    ];

    protected $casts = [
        'study_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'imaging_study_id');
    }

    public function dicomInstances()
    {
        return $this->hasMany(DICOMInstance::class, 'imaging_study_id');
    }

    public function radiologyReport()
    {
        return $this->hasMany(RadiologyReport::class, 'imaging_study_id');
    }
}
