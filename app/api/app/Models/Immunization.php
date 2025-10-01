<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Immunization extends Model
{
    use HasFactory, Searchable;

    protected $table = 'immunizations';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'schedule',
    ];

    protected $casts = [
    ];

    public function vaccineRecords()
    {
        return $this->hasMany(VaccineRecord::class, 'immunization_id');
    }

    public function patients()
    {
        return $this->belongsToMany(Patient::class, 'immunizations_patients', 'immunizations_id', 'patients_id');
    }
}
