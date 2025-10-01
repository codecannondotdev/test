<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PalliativeCarePlan extends Model
{
    use HasFactory, Searchable;

    protected $table = 'palliative_care_plans';

    protected $guarded = [];

    protected $searchable = [
    ];

    protected $casts = [
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function careTeam()
    {
        return $this->belongsTo(CareTeam::class, 'care_team_id');
    }
}
