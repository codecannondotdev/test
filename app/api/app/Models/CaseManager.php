<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseManager extends Model
{
    use HasFactory, Searchable;

    protected $table = 'case_managers';

    protected $guarded = [];

    protected $searchable = [
        'name',
    ];

    protected $casts = [
        'assigned_since' => 'datetime',
    ];

    public function patients()
    {
        return $this->belongsToMany(Patient::class, 'case_manager_patients', 'case_manager_id', 'patients_id');
    }

    public function carePlans()
    {
        return $this->hasMany(CarePlan::class, 'case_manager_id');
    }
}
