<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CareTeam extends Model
{
    use HasFactory, Searchable;

    protected $table = 'care_teams';

    protected $guarded = [];

    protected $searchable = [
        'name',
    ];

    protected $casts = [
    ];

    public function patients()
    {
        return $this->belongsToMany(Patient::class, 'care_team_patients', 'care_team_id', 'patients_id');
    }

    public function carePlans()
    {
        return $this->hasMany(CarePlan::class, 'care_team_id');
    }

    public function hospiceCare()
    {
        return $this->hasMany(HospiceCare::class, 'care_team_id');
    }

    public function palliativeCarePlans()
    {
        return $this->hasMany(PalliativeCarePlan::class, 'care_team_id');
    }
}
