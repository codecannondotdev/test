<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PathologyReport extends Model
{
    use HasFactory, Searchable;

    protected $table = 'pathology_reports';

    protected $guarded = [];

    protected $searchable = [
        'specimen_description',
        'findings',
        'report_date',
    ];

    protected $casts = [
        'report_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function samples()
    {
        return $this->hasMany(Specimen::class, 'pathology_report_id');
    }
}
