<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HospiceCare extends Model
{
    use HasFactory, Searchable;

    protected $table = 'hospice_cares';

    protected $guarded = [];

    protected $searchable = [
        'start_date',
        'plan_summary',
        'status',
    ];

    protected $casts = [
        'start_date' => 'datetime',
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
