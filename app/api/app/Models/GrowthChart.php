<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GrowthChart extends Model
{
    use HasFactory, Searchable;

    protected $table = 'growth_charts';

    protected $guarded = [];

    protected $searchable = [
        'measurement_date',
        'weight',
        'height',
        'head_circumference',
    ];

    protected $casts = [
        'measurement_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }
}
