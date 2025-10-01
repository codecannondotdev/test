<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarePlan extends Model
{
    use HasFactory, Searchable;

    protected $table = 'care_plans';

    protected $guarded = [];

    protected $searchable = [
        'title',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function treatments()
    {
        return $this->hasMany(Treatment::class, 'care_plan_id');
    }

    public function careTeam()
    {
        return $this->belongsTo(CareTeam::class, 'care_team_id');
    }

    public function caseManager()
    {
        return $this->belongsTo(CaseManager::class, 'case_manager_id');
    }
}
