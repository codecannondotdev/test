<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DICOMInstance extends Model
{
    use HasFactory, Searchable;

    protected $table = 'dicom_instances';

    protected $guarded = [];

    protected $searchable = [
        'uid',
        'sop_class',
        'stored_at',
    ];

    protected $casts = [
        'stored_at' => 'datetime',
    ];

    public function imagingStudy()
    {
        return $this->belongsTo(ImagingStudy::class, 'imaging_study_id');
    }

    public function integration()
    {
        return $this->belongsTo(Integration::class, 'integration_id');
    }
}
