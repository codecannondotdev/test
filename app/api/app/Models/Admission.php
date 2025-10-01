<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admission extends Model
{
    use HasFactory, Searchable;

    protected $table = 'admissions';

    protected $guarded = [];

    protected $searchable = [
        'admission_date',
        'reason',
        'status',
    ];

    protected $casts = [
        'admission_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function ward()
    {
        return $this->belongsTo(Ward::class, 'ward_id');
    }

    public function bed()
    {
        return $this->belongsTo(Bed::class, 'bed_id');
    }

    public function discharge()
    {
        return $this->hasOne(Discharge::class, 'admission_id');
    }
}
