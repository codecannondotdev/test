<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RadiologyReport extends Model
{
    use HasFactory, Searchable;

    protected $table = 'radiology_reports';

    protected $guarded = [];

    protected $searchable = [
        'study_type',
        'report_date',
    ];

    protected $casts = [
        'report_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function imagingStudy()
    {
        return $this->belongsTo(ImagingStudy::class, 'imaging_study_id');
    }
}
