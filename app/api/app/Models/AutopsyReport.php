<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutopsyReport extends Model
{
    use HasFactory, Searchable;

    protected $table = 'autopsy_reports';

    protected $guarded = [];

    protected $searchable = [
        'findings',
        'conclusion',
        'report_date',
    ];

    protected $casts = [
        'report_date' => 'datetime',
    ];

    public function mortalityReport()
    {
        return $this->belongsTo(MortalityReport::class, 'mortality_report_id');
    }
}
