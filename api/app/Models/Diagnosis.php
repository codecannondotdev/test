<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diagnosis extends Model
{
    use HasFactory, Searchable;

    protected $table = 'diagnoses';

    protected $guarded = [];

    protected $searchable = [
        'code',
        'description',
        'primary',
    ];

    protected $casts = [
        'primary' => 'boolean',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function treatments()
    {
        return $this->hasMany(Treatment::class, 'diagnosis_id');
    }
}
