<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiskAssessment extends Model
{
    use HasFactory, Searchable;

    protected $table = 'risk_assessments';

    protected $guarded = [];

    protected $searchable = [
        'tool_name',
        'score',
        'assessment_date',
    ];

    protected $casts = [
        'assessment_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function scores()
    {
        return $this->hasMany(Score::class, 'risk_assessment_id');
    }
}
