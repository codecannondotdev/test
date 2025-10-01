<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MortalityReport extends Model
{
    use HasFactory, Searchable;

    protected $table = 'mortality_reports';

    protected $guarded = [];

    protected $searchable = [
        'date_of_death',
        'cause',
        'reviewed_by',
    ];

    protected $casts = [
        'date_of_death' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function investigation()
    {
        return $this->hasOne(AutopsyReport::class, 'mortality_report_id');
    }
}
