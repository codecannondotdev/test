<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory, Searchable;

    protected $table = 'documents';

    protected $guarded = [];

    protected $searchable = [
        'filename',
        'content_type',
        'uploaded_at',
        'description',
    ];

    protected $casts = [
        'uploaded_at' => 'datetime',
    ];

    public function medicalRecord()
    {
        return $this->belongsTo(MedicalRecord::class, 'medical_record_id');
    }

    public function imagingStudy()
    {
        return $this->belongsTo(ImagingStudy::class, 'imaging_study_id');
    }

    public function legalHold()
    {
        return $this->belongsTo(LegalHold::class, 'legal_hold_id');
    }

    public function auditLogs()
    {
        return $this->hasMany(AuditLog::class, 'affected_record_id');
    }

    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class, 'related_model_id');
    }
}
