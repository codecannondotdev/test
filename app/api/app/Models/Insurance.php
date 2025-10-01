<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insurance extends Model
{
    use HasFactory, Searchable;

    protected $table = 'insurances';

    protected $guarded = [];

    protected $searchable = [
        'provider_name',
        'policy_number',
        'coverage_type',
    ];

    protected $casts = [
        'preauthorization_required' => 'boolean',
    ];

    public function patients()
    {
        return $this->belongsToMany(Patient::class, 'insurances_patients', 'insurances_id', 'patients_id');
    }

    public function insuranceClaims()
    {
        return $this->hasMany(InsuranceClaim::class, 'insurance_id');
    }
}
