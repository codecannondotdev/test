<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory, Searchable;

    protected $table = 'scores';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'value',
        'interpretation',
    ];

    protected $casts = [
    ];

    public function riskAssessment()
    {
        return $this->belongsTo(RiskAssessment::class, 'risk_assessment_id');
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }
}
