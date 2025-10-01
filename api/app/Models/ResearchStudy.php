<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchStudy extends Model
{
    use HasFactory, Searchable;

    protected $table = 'research_studies';

    protected $guarded = [];

    protected $searchable = [
        'title',
        'principal_investigator',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function clinicalTrials()
    {
        return $this->hasMany(ClinicalTrial::class, 'research_study_id');
    }

    public function participants()
    {
        return $this->belongsToMany(Patient::class, 'participants_research_studies', 'research_studies_id', 'participants_id');
    }
}
