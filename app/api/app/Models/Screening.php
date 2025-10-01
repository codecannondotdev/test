<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Screening extends Model
{
    use HasFactory, Searchable;

    protected $table = 'screenings';

    protected $guarded = [];

    protected $searchable = [
        'type',
        'date',
        'result',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function followUp()
    {
        return $this->hasOne(FollowUp::class, 'screening_id');
    }
}
