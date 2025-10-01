<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClinicalTrial extends Model
{
    use HasFactory, Searchable;

    protected $table = 'clinical_trials';

    protected $guarded = [];

    protected $searchable = [
        'title',
        'phase',
        'status',
    ];

    protected $casts = [
    ];

    public function patients()
    {
        return $this->belongsToMany(Patient::class, 'clinical_trials_patients', 'clinical_trials_id', 'patients_id');
    }

    public function researchStudy()
    {
        return $this->belongsTo(ResearchStudy::class, 'research_study_id');
    }
}
